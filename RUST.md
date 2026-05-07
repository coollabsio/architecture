# Rust + SvelteKit + shadcn (single-binary)

High-level reference for **Rust backend + SvelteKit + shadcn-svelte
frontend** projects that ship as a single self-hostable binary with the
frontend embedded into the executable. Library picks, why, and the gotchas
that bit us.

> Copy this file into a new project's `docs/architecture.md`, swap the
> project name, prune sections that don't apply. Index lives in
> [`README.md`](./README.md) of this repo.

---

## Mission shape

- **Single static binary.** No external runtime deps beyond what
  `cargo build --release` produces. Frontend is embedded inside the binary.
- **Embedded-friendly storage by default.** SQLite + filesystem blobs;
  external Postgres / S3 are swap-in via traits, not migrations.
- **Wire-compat first when applicable.** If the API mimics an upstream
  service, ship a contract test that runs the real upstream client.
- **Plans live in `docs/plans/`. Architecture lives in `docs/architecture.md`.**
  No feature without a plan.

---

## Workspace layout

Cargo workspace with `[workspace.dependencies]` so every crate pins
versions through the root. Split crates by responsibility, not by layer.
Example skeleton:

```
Cargo.toml               # workspace root
crates/
  <domain>/              # one or more domain crates (pure types, no I/O)
  storage/               # storage traits + concrete impls
  server/                # axum binary + CLI + frontend embed
frontend/                # SvelteKit SPA, embedded into the binary
docs/
  plans/                 # one plan per feature (timestamped)
  architecture.md        # this file
tests/contract/<client>/ # real upstream client harness (when wire-compat)
.github/workflows/ci.yml
```

The only crate with a `[[bin]]` is `server`. Everything else is a library
the server (and the integration tests) consume.

---

## Backend stack

| Concern | Pick | Why |
|---|---|---|
| HTTP | **`axum` 0.7** | Tokio-native, ergonomic extractors, shared state via `with_state`, `tower-http` ecosystem. |
| Async runtime | `tokio` (full features) | Default; integrates with sqlx + axum. |
| SQL | **`sqlx` + SQLite (bundled)** | Async, compile-time-checked queries optional, bundled SQLite means no system lib. |
| Migrations | **`sqlx::migrate!`** with `.up.sql`/`.down.sql` | See gotcha below. |
| HTTP middleware | `tower-http` (`RequestBodyLimitLayer`, `TraceLayer`, `SetResponseHeaderLayer`, `CorsLayer`) | Standard hardening + observability. |
| CLI | **`clap` 4 derive** | Multi-subcommand binary. Default subcommand `serve` keeps `./app` UX. |
| Errors | `thiserror` (libs) + `anyhow` (glue) | thiserror per typed enum, anyhow `Internal(#[from])` glues unknown errors. |
| Logging | `tracing` + `tracing-subscriber` (env-filter, fmt) | Industry default. |
| Compression | `flate2` (gzip/deflate) + `brotli` + `zstd` | Cover real-world `Content-Encoding`. |
| UUIDs / hashing | `uuid` v4/v7, `sha2` | Standard. |
| Frontend embed | **`rust-embed`** + `mime_guess` | Compile-time embed of `frontend/build/` into the binary; SPA fallback to `200.html` for unknown routes. |
| Build orchestration | `build.rs` running `bun install` + `bun run build` | One `cargo build` produces a working binary including frontend. |
| Object storage trait | hand-rolled `BlobStore` | FS impl now, S3 (`aws-sdk-s3`) later — same trait. |

### Storage pattern

Trait-bounded backends. One error enum with explicit `NotFound`:

```rust
pub enum StorageError {
    NotFound,
    Backend(#[from] anyhow::Error),
}
```

So the HTTP layer can map `NotFound → 404` and everything else → 500. Any
"map all backend errors to 404" shortcut hides incidents.

### Migrations: `sqlx::migrate!` (Laravel-style)

- Files named `<timestamp>_<name>.up.sql` + `<timestamp>_<name>.down.sql`.
- `sqlx::migrate!("./migrations").run(&pool)` embeds the dir at compile
  time; tracked in `_sqlx_migrations` with checksums + dirty detection.
- Wrap with three CLI subcommands: `db migrate`, `db revert`, `db info`.

**Gotchas (these all bit us):**
- **SQLite < 3.35 cannot `DROP COLUMN`.** Down-migrations that removed
  columns must recreate the table (CREATE _tmp / INSERT SELECT / DROP /
  RENAME). Otherwise re-applying the up-migration fails with
  `duplicate column name`.
- **Don't write your own runner that swallows `"already exists"` errors.**
  It hides real failures.
- **`Migrator::undo(target)` undoes migrations newer than `target`.** To
  revert *just* the latest, set `target` = second-most-recent applied
  version (or `-1` if only one is applied).
- **Don't bind `Option::None` to a column with a `NOT NULL DEFAULT`.**
  Either omit the column from the INSERT or supply a value. Add a
  regression test asserting the DEFAULT applies.

### CLI shape

One binary, multiple subcommands via `clap` derive. `serve` is the default
subcommand so `./app` keeps booting the HTTP server even after admin
commands are added. Add admin subcommands per resource as needed
(`<resource> create|list`, `db migrate|revert|info`, `users add`, …).

Same pattern as `gitlab-rails`, `discourse-rake`, `nextcloud occ`.
Operators don't ship a second admin binary; init containers + backup
scripts work; admin actions and the future web UI hit the same code.

### HTTP hardening (always-on)

- `RequestBodyLimitLayer` on the router (e.g. 50 MiB). Otherwise axum
  buffers up to 2 GiB by default.
- Global response security headers via `tower-http`'s
  `SetResponseHeaderLayer` (enable the `set-header` feature) or equivalent
  middleware:
  - `Content-Security-Policy`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-Frame-Options: DENY` plus CSP `frame-ancestors 'none'`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Strict-Transport-Security` **only** when the public base URL is HTTPS;
    never emit HSTS on localhost HTTP.
- Baseline CSP for embedded SvelteKit SPA:
  `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; form-action 'self'`.
  SvelteKit static output can include an inline bootstrap/module script in the
  generated HTML shell, so `script-src 'self'` alone may break the embedded SPA.
  Keep `'unsafe-inline'` for scripts until you verify the built `200.html` /
  `index.html` has no inline scripts or you add a nonce/hash-based CSP. Tighten
  per app; remove `'unsafe-inline'` for styles if the built frontend allows it.
- Integration-test headers for at least one API response and one static
  response. Test HSTS separately: absent for local HTTP config, present for
  HTTPS production config.
- `Read::take(LIMIT + 1)` on every decompressor. A 100 KB gzip can
  decompress to 100 GB.
- Distinct `NotFound` variants per resource in your handler error enum
  (e.g. `UserNotFound`, `OrderNotFound`). Separate `BadRequest` from
  parser-level errors so 400s from missing JSON fields don't share a
  variant with malformed-payload errors.

---

## Frontend stack

| Concern | Pick | Why |
|---|---|---|
| Framework | **SvelteKit** | Lean, file-based routing, first-class TS. |
| Adapter | **`@sveltejs/adapter-static`** | Produces a folder of HTML + assets ready to embed. |
| Fallback file | **`200.html`** | `index.html` collides with prerendered home; `200.html` is the SvelteKit-recommended SPA shell. |
| Render mode | `prerender = false; ssr = false` in `+layout.ts` | Pure SPA against the Rust API. |
| Styling | **Tailwind v3** | shadcn-svelte still pinned to v3 ecosystem at time of writing. |
| Components | **shadcn-svelte primitives** (or hand-rolled Tailwind tokens until Svelte 5 runes is fully supported) | Distinctive, owned-in-tree components, no runtime lib. |
| Compiler mode | `compilerOptions.runes = false` until shadcn-svelte fully supports Svelte 5 runes | Otherwise you hit `Cannot use $$restProps in runes mode`. |
| Package manager + runtime | **`bun`** | Single binary handling install, run, test, bundle. Faster than pnpm/npm; lockfile is `bun.lock` (text). |

### shadcn-svelte gotcha

- shadcn-svelte CLI install (`bunx shadcn-svelte@latest init`) is
  interactive — annoying for first bootstrap in CI/agent flows. Either
  hand-roll the Tailwind tokens (border / muted / destructive HSL values
  copied from shadcn defaults) or run it locally before committing.
- Until shadcn-svelte fully supports Svelte 5 runes, keep
  `compilerOptions.runes = false` in `svelte.config.js`. Migrate when the
  upstream issue resolves.

### Embedding into the Rust binary

- `rust-embed` has a `#[derive(Embed)] #[folder = "$CARGO_MANIFEST_DIR/../../frontend/build"]`
  pattern — embeds the entire dir into the binary at compile time.
- axum router gets a `.fallback(...)` handler that serves the matching
  embedded file with `mime_guess`, falling back to `200.html` for unknown
  paths so deep-linked SPA routes work on direct load.
- Put API routes under `/api/...`. `/` and unknown paths serve the SPA
  shell, so the client router takes over once the page loads.

### `build.rs` orchestration gotchas

- `bun install` only when `node_modules/` is missing **or** when
  `package.json` / `bun.lock` mtime > `node_modules` mtime. Otherwise dep
  upgrades silently miss.
- Provide a `<APP>_SKIP_FRONTEND=1` env escape hatch for backend-only
  iteration; create an empty `build/` directory so `rust-embed` still
  compiles when the frontend build is skipped.
- Emit `cargo:rerun-if-changed=` for `frontend/src`, `package.json`,
  `bun.lock`. Otherwise touching frontend code doesn't trigger rebuilds.
- Bun must be on PATH in CI. Use `oven-sh/setup-bun@v2` action; it caches
  by `bun.lock` like `setup-node`.

---

## Testing strategy

Four layers, in increasing realism:

1. **Unit** — `cargo test` inside `mod tests`. Pure logic, no I/O.
2. **Integration** — spin up the axum router via
   `tower::ServiceExt::oneshot` against a `tempfile::TempDir` data dir.
   No real network. Test helper exposed from `lib.rs`, **always-on** (not
   feature-gated) so integration tests in `tests/` can use it without
   `--features`.
3. **Contract** — spawn the binary, point the **real** upstream SDK at it,
   assert via the server's own read API. Seed initial data via the CLI
   (not raw SQL), so the CLI itself is on the contract path.
4. **E2E UI** — Playwright. Defer until UI has interactive flows worth
   scripting.

CI: two jobs (`rust` + `contract`) wired with `RUSTFLAGS: "-D warnings"`,
frontend deps installed before `cargo` so `build.rs` succeeds.

---

## Hard rules learned (grep monthly)

1. **Bound every network input.** Body size + decompression size.
2. **No `.unwrap()` in non-test code.** Use `.expect("reason")` so the
   panic site documents the precondition.
3. **Don't bind `Option::None` to a column with a `NOT NULL DEFAULT`.**
   Add a regression test asserting the default applies.
4. **Distinct `NotFound` variants per resource.** Don't reuse one.
5. **Don't catch backend errors as 404.** Match on the storage error
   enum.
6. **Don't roll your own migration runner.** sqlx tracks state correctly.
7. **CLI default subcommand = `serve`.** Otherwise `./app` breaks for
   existing users when admin commands are added.
8. **`200.html` not `index.html` for the SvelteKit SPA fallback.**
9. **`runes = false` until shadcn-svelte ships full Svelte 5 support.**
10. **Plans before code.** One commit per task.

---

## Conventions (opinionated — adjust to taste)

- **Conventional Commits.** Subject under 72 chars, body explains *why*.
- **`rustfmt` + `clippy --all-targets -- -D warnings` are CI gates.**
- **AGPL-3.0-or-later** for self-host-friendly OSS at coollabs.
- Single env-var prefix for all config (e.g. `MYAPP_*`). `from_env()` is
  the single source of truth; CLI flags push into env before config loads.
- Twelve-factor: no config file, env-driven only.

---

## Versioning + GitHub releases

### Source of truth

- **One app version.** Put it in the workspace root `Cargo.toml`:

  ```toml
  [workspace.package]
  version = "X.Y.Z"
  ```

- Every workspace crate inherits it:

  ```toml
  [package]
  version.workspace = true
  ```

- The shipped binary exposes the same version through clap:

  ```rust
  #[derive(Parser)]
  #[command(author, version, about)]
  struct Cli {
      #[command(subcommand)]
      command: Option<Commands>,
  }
  ```

  So `./app --version` prints the Cargo package version.

- Don't make `frontend/package.json` the source of truth. The frontend is an
  embedded implementation detail of the app release unless the project ships a
  standalone frontend package.

### Release policy

- Use SemVer: `X.Y.Z`.
- GitHub release tags are `vX.Y.Z`.
- The tag **must match** `[workspace.package].version`. Example:
  `version = "1.4.2"` → tag `v1.4.2`.
- Release artifacts are built from tags only, not arbitrary branches.
- Don't version individual crates independently unless you publish them as
  separate Rust crates. For one shipped binary, one workspace version is enough.

### GitHub Actions release workflow

Add `.github/workflows/release.yml` to each app repo. Replace
`<server-package>` and `<bin-name>` with the real package and binary names.

```yaml
name: release

on:
  push:
    tags:
      - "v*.*.*"

permissions:
  contents: write

env:
  CARGO_TERM_COLOR: always
  RUSTFLAGS: "-D warnings"

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: dtolnay/rust-toolchain@stable
        with:
          components: rustfmt, clippy

      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - uses: Swatinem/rust-cache@v2

      - name: Install frontend deps
        run: bun install --frozen-lockfile
        working-directory: frontend

      - name: Check tag matches Cargo version
        run: |
          VERSION="$(python3 - <<'PY'
          import tomllib
          with open("Cargo.toml", "rb") as f:
              print(tomllib.load(f)["workspace"]["package"]["version"])
          PY
          )"
          TAG="${GITHUB_REF_NAME#v}"
          test "$VERSION" = "$TAG" || {
            echo "Cargo version $VERSION does not match tag $GITHUB_REF_NAME"
            exit 1
          }

      - name: fmt
        run: cargo fmt --all -- --check

      - name: clippy
        run: cargo clippy --all-targets --all-features -- -D warnings

      - name: test
        run: cargo test --all --all-features

      - name: Build release binary
        run: cargo build --release -p <server-package>

      - name: Package artifact
        run: |
          mkdir -p dist
          cp target/release/<bin-name> dist/<bin-name>
          tar -C dist -czf <bin-name>-linux-x86_64.tar.gz <bin-name>
          sha256sum <bin-name>-linux-x86_64.tar.gz > <bin-name>-linux-x86_64.tar.gz.sha256

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          files: |
            <bin-name>-linux-x86_64.tar.gz
            <bin-name>-linux-x86_64.tar.gz.sha256
          generate_release_notes: true
```

This is the boring default. Use `cargo-dist` later only when you need a full
cross-platform installer/update story.

### Manual release checklist

1. Pick the next SemVer (`X.Y.Z`).
2. Update root `Cargo.toml` `[workspace.package].version`.
3. Confirm workspace crates use `version.workspace = true`.
4. Update changelog / release notes if the project has one.
5. Run local CI equivalents:

   ```bash
   cargo fmt --all -- --check
   cargo clippy --all-targets --all-features -- -D warnings
   cargo test --all --all-features
   cargo build --release -p <server-package>
   ```

6. Commit: `chore: release vX.Y.Z`.
7. Tag: `git tag -a vX.Y.Z -m "vX.Y.Z"`.
8. Push commit + tag: `git push && git push origin vX.Y.Z`.
9. Verify the GitHub Release exists and contains the binary + checksum.
10. Download the artifact and run `./app --version`; it must print `X.Y.Z`.

### Release gotchas

- **Don't tag without bumping Cargo.** CI should fail if tag and Cargo version
  differ.
- **Don't version frontend separately** unless it is a separate product.
- **Don't publish branch-built release artifacts.** Rebuild from immutable tags.
- **Don't hand-edit GitHub Releases after CI** except for release-note wording;
  artifacts should be reproducible from the tag.

---

## New-project checklist

1. `cargo new` → restructure as workspace per layout above.
2. Pin workspace deps: `axum`, `sqlx + sqlite`, `tokio`, `tower-http`,
   `rust-embed`, `mime_guess`, `clap`, `thiserror`, `anyhow`, `tracing`,
   `flate2` + `brotli` + `zstd`.
3. `crates/storage/migrations/<timestamp>_init.up.sql` + `.down.sql`;
   wire `sqlx::migrate!`.
4. clap multi-subcommand binary, `serve` default, `db migrate/revert/info`.
5. `frontend/`: SvelteKit + adapter-static (`fallback: '200.html'`,
   `prerender = false`, `ssr = false`, `runes = false`), Tailwind v3,
   shadcn-svelte primitives. Use **bun** as the package manager + runtime.
6. `build.rs` orchestrating `bun install` + `bun run build`; mtime-guarded
   re-install; `<APP>_SKIP_FRONTEND` escape hatch.
7. axum `.fallback(rust_embed handler)` + `RequestBodyLimitLayer`.
8. `test_support::test_app()` helper + first integration test +
   (when wire-compat) first contract test.
9. CI: rust + (optional) contract jobs, `RUSTFLAGS: "-D warnings"`.
10. Versioning: root `[workspace.package].version`, member crates with
    `version.workspace = true`, and clap `#[command(version)]` so
    `./app --version` works.
11. Release workflow: `.github/workflows/release.yml` triggered by `vX.Y.Z`
    tags, with Cargo/tag version check, release binary, checksum, and GitHub
    Release upload.
12. Re-read "Hard rules" once a month. Grep for new violations.
