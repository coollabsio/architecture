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

```
Cargo.toml               # workspace root
crates/
  protocol/              # wire types, no I/O
  ingest/                # parsing, validation, normalization
  storage/               # storage traits + impls
  server/                # axum binary + CLI + frontend embed
frontend/                # SvelteKit SPA, embedded into binary
docs/
  plans/                 # one plan per feature (timestamped)
  architecture.md        # this file
tests/contract/<sdk>/    # real upstream SDK harness
.github/workflows/ci.yml
```

Cargo workspace with `[workspace.dependencies]` so every crate pins versions
through the root.

---

## Backend stack

| Concern | Pick | Why |
|---|---|---|
| HTTP | **`axum` 0.7** | Tokio-native, ergonomic extractors, shared state via `with_state`, `tower-http` ecosystem. |
| Async runtime | `tokio` (full features) | Default; integrates with sqlx + axum. |
| SQL | **`sqlx` + SQLite (bundled)** | Async, compile-time-checked queries optional, bundled SQLite means no system lib. |
| Migrations | **`sqlx::migrate!`** with `.up.sql`/`.down.sql` | See gotcha below. |
| HTTP middleware | `tower-http` (`RequestBodyLimitLayer`, `TraceLayer`, `CorsLayer`) | Standard. |
| CLI | **`clap` 4 derive** | Multi-subcommand binary. Default subcommand `serve` keeps `./app` UX. |
| Errors | `thiserror` (libs) + `anyhow` (glue) | thiserror per typed enum, anyhow `Internal(#[from])` glues unknown errors. |
| Logging | `tracing` + `tracing-subscriber` (env-filter, fmt) | Industry default. |
| Compression | `flate2` (gzip/deflate) + `brotli` + `zstd` | Cover real-world `Content-Encoding`. |
| UUIDs / hashing | `uuid` v4/v7, `sha2` | Standard. |
| Frontend embed | **`rust-embed`** + `mime_guess` | Compile-time embed of `frontend/build/` into the binary; SPA fallback to `200.html` for unknown routes. |
| Build orchestration | `build.rs` running `pnpm install` + `pnpm build` | One `cargo build` produces a working binary including frontend. |
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

One binary, multiple subcommands via `clap`:

```
app                              # default → serve
app serve [--addr ... --data-dir ...]
app db migrate | revert | info
app orgs create|list
app projects create|list
```

Same pattern as `gitlab-rails`, `discourse-rake`, `nextcloud occ`.
Operators don't ship a second admin binary; init containers + backup
scripts work; admin actions and the future web UI hit the same code.

### HTTP hardening (always-on)

- `RequestBodyLimitLayer` on the router (e.g. 50 MiB). Otherwise axum
  buffers up to 2 GiB by default.
- `Read::take(LIMIT + 1)` on every decompressor. A 100 KB gzip can
  decompress to 100 GB.
- Distinct `NotFound` variants per resource (`ProjectNotFound`,
  `IssueNotFound`, …) and a separate `BadRequest` variant. Don't reuse
  `BadEnvelope` for missing JSON fields.

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
| Package manager | **`pnpm`** | Fast, deterministic, plays well with monorepos and CI caches. |

### shadcn-svelte gotcha

- shadcn-svelte CLI install (`pnpm dlx shadcn-svelte@latest init`) is
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
  embedded file with `mime_guess`, falling back to `200.html` so deep
  links like `/issues/<id>` work on direct load.
- API routes live under `/api/...`. The `/` and unknown paths serve the
  SPA shell.

### `build.rs` orchestration gotchas

- `pnpm install` only when `node_modules/` is missing **or** when
  `package.json` / `pnpm-lock.yaml` mtime > `node_modules` mtime.
  Otherwise dep upgrades silently miss.
- Provide an `AIO_SKIP_FRONTEND=1` env escape hatch for backend-only
  iteration. Create an empty `build/` so `rust-embed` still compiles.
- Emit `cargo:rerun-if-changed=` for `frontend/src`, `package.json`,
  `pnpm-lock.yaml`. Otherwise touching frontend code doesn't trigger
  rebuilds.

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

## Conventions

- **Conventional Commits.** Subject under 72 chars, body explains *why*.
- **`rustfmt` + `clippy --all-targets -- -D warnings` are CI gates.**
- **AGPL-3.0-or-later** by default for self-host-friendly OSS.
- `APP_*` env-var prefix for all config. `from_env()` is the single
  source of truth; CLI flags push into env before config loads.
- Twelve-factor: no config file, env-driven only.

---

## Things deliberately deferred (and why)

| Deferred | Trigger to add |
|---|---|
| Auth on `/api/*` | Multi-user / public deployment. |
| S3 blob backend | Disk full or multi-node. |
| Columnar event store (DuckDB / ClickHouse-embedded) | Query workload demands it. |
| Source maps / symbolication | Releases CRUD lands first. |
| Rate limiting + per-DSN throttling | Real traffic needs it. |
| Real-time updates (SSE / WebSocket) | Polling-refresh UX complaint. |
| Playwright E2E | UI gains interactive flows worth scripting. |
| `shadcn-svelte` CLI install | Svelte 5 runes support stabilizes upstream. |

---

## New-project checklist

1. `cargo new` → restructure as workspace per layout above.
2. Pin workspace deps: `axum`, `sqlx + sqlite`, `tokio`, `tower-http`,
   `rust-embed`, `mime_guess`, `clap`, `thiserror`, `anyhow`, `tracing`,
   `flate2` + `brotli` + `zstd`.
3. `crates/storage/migrations/<timestamp>_init.up.sql` + `.down.sql`.
   Wire `sqlx::migrate!`.
4. clap multi-subcommand binary, `serve` default, `db migrate/revert/info`.
5. `frontend/`: SvelteKit + adapter-static (`fallback: '200.html'`,
   `prerender = false`, `ssr = false`, `runes = false`), Tailwind v3,
   shadcn-svelte primitives.
6. `build.rs` orchestrating `pnpm install`/`build`; mtime-guarded
   re-install; `AIO_SKIP_FRONTEND` escape hatch.
7. axum `.fallback(rust_embed handler)` + `RequestBodyLimitLayer`.
8. `test_support::test_app()` + first integration test + first contract
   test.
9. CI: rust + contract jobs, `RUSTFLAGS: "-D warnings"`.
10. Re-read "Hard rules" once a month. Grep for new violations.
