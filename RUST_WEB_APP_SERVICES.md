# Rust Single-Binary Web Apps with SvelteKit

Opinionated stack guide for **SvelteKit-specific, web app based Rust
services**: a Rust HTTP/API backend plus a SvelteKit + shadcn-svelte frontend,
shipped as a single self-hostable binary with the frontend embedded into the
executable. Library picks, why, and the gotchas that bit us.

This is an archetype guide, not a generic Rust web-services guide, Rust style
guide, CLI-only service template, library template, firmware guide, or non-web
service architecture. Keep SvelteKit as the frontend assumption; adapt the
replaceable defaults below only when a project has a concrete reason.

## Scope

Use this for Rust services that expose a web app or HTTP API, own their
SvelteKit frontend bundle, and benefit from single-binary self-hosting. Do not
use it as the default for generic Rust crates, CLI-only tools, workers without a
web UI, embedded/firmware projects, or services where the frontend is deployed
separately.

## Architecture assumptions

This guide assumes:

- The product ships as one self-hostable binary.
- The Rust server owns both the HTTP API and static frontend serving.
- The frontend is a static SvelteKit SPA embedded into the Rust binary.
- SQLite is the default local persistence layer.
- Filesystem blobs are the default object storage layer.
- Operators deploy the app behind a reverse proxy or platform ingress.
- Admin and maintenance actions live in the same binary as CLI subcommands.

If these assumptions do not hold, treat this file as inspiration, not a
template.

## When not to use this

Do not start from this guide if:

- The Rust service is API-only and does not own a frontend.
- The frontend is deployed separately from the Rust server.
- The app needs runtime SSR as a core product requirement.
- The service is multi-node-first with Postgres as a hard requirement.
- The project is a library crate, CLI tool, worker, firmware, or protocol
  daemon.

## Replaceable defaults

SvelteKit is the fixed frontend assumption for this guide. These defaults are
replaceable when the project has a concrete operational or product reason:

| Default | Replace when | Common alternative |
|---|---|---|
| SQLite | Multi-node writes, central DB ops, or managed DB policy is required | Postgres |
| Filesystem blobs | Blob data must be shared across nodes or backed by object lifecycle policies | S3-compatible storage |
| `rust-embed` static serving | Assets should be cached globally or served outside the binary | CDN / reverse-proxy static hosting |
| Bun | Org standardizes on Node/pnpm/npm | pnpm or npm |
| shadcn-svelte primitives | Product has an established design system | In-house Svelte components |
| `build.rs` frontend orchestration | Builds must be fully split between frontend and backend pipelines | CI-built frontend artifact copied before `cargo build` |
| GitHub Releases | Project deploys only through containers or a platform marketplace | Container registry / platform release flow |

> This file is the shared SSOT for this stack. App repos should reference it
> directly instead of keeping local copies. Index lives in
> [`README.md`](./README.md) of this repo.

---

## Mission shape

- **Single static binary.** No external runtime deps beyond what
  `cargo build --release` produces. Frontend is embedded inside the binary.
- **Embedded-friendly storage by default.** SQLite + filesystem blobs;
  external Postgres / S3 are swap-in via traits, not migrations.
- **Wire-compat first when applicable.** If the API mimics an upstream
  service, ship a contract test that runs the real upstream client.
- **Plans live in `docs/plans/`; this file remains the architecture SSOT.**
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
tests/contract/<client>/ # real upstream client harness (when wire-compat)
.github/workflows/ci.yml
```

The only crate with a `[[bin]]` is `server`. Everything else is a library
the server (and the integration tests) consume.

---

## Backend stack

| Concern | Pick | Why |
|---|---|---|
| HTTP | **`axum`** (current stable; last validated with 0.7) | Tokio-native, ergonomic extractors, shared state via `with_state`, `tower-http` ecosystem. |
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
- `serve` auto-runs pending migrations by default (see Upgrade and migration
  policy below), and the binary also exposes manual/admin controls:
  `db migrate`, `db revert`, `db info`.

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

### SQLite operations

SQLite is the default operational database for this archetype. Keep all SQLite
connection pragmas and maintenance behavior centralized in the DB pool/init
code, not scattered across handlers.

- **WAL mode by default.** Enable `PRAGMA journal_mode=WAL` for app databases so
  readers do not block the single writer. Use `PRAGMA synchronous=NORMAL` for
  the boring default; choose `FULL` only when the project explicitly accepts the
  write-latency tradeoff for stronger durability semantics.
- **Busy timeout.** Set `PRAGMA busy_timeout` or the sqlx SQLite connect option
  so transient write contention does not immediately fail with `database is
  locked`. This is not a license for long transactions: keep write transactions
  short, avoid network calls inside transactions, and batch writes deliberately.
- **Online backups only.** Use SQLite's online backup API through an app CLI
  command such as `backup create`. Do not casually copy a hot DB file, especially
  in WAL mode where `*.db`, `*.db-wal`, and `*.db-shm` must be treated together.
  Backups must include filesystem blobs and generated keys from the data dir.
- **Checkpointing.** WAL files can grow under sustained reads/writes. Run
  passive or truncate checkpoints during backup, shutdown, or maintenance
  windows; do not checkpoint aggressively on every request. Monitor WAL size
  when imports or long-lived readers exist.
- **`ANALYZE` / `VACUUM`.** Run `ANALYZE` after large data changes or as periodic
  maintenance so query plans stay sane. Run `VACUUM` only as an explicit
  maintenance action with enough disk and low traffic/downtime; never run it
  blindly at startup.
- **Switch to Postgres by trait, not by fork.** Keep storage traits DB-agnostic
  so a Postgres implementation can replace the SQLite implementation without
  changing handlers. Switch when the product needs multi-node writes, high write
  concurrency, central DB operations/backups, HA/failover, long analytical
  queries, row-level locking, or advanced SQL features that SQLite should not
  emulate.

### CLI shape

One binary, multiple subcommands via `clap` derive. `serve` is the default
subcommand so `./app` keeps booting the HTTP server even after admin
commands are added. Same pattern as `gitlab-rails`, `discourse-rake`,
`nextcloud occ`: operators don't ship a second admin binary; init containers +
backup scripts work; admin actions and the future web UI hit the same code.

Canonical subcommands:

| Command | Purpose |
|---|---|
| `serve` | Default command. Load config, validate runtime, auto-migrate unless disabled, start HTTP server, handle graceful shutdown. |
| `healthcheck` | App-native probe for distroless Docker. Check `/healthz` by URL or local internals with a timeout; never print secrets. |
| `db migrate` | Run pending checked-in migrations, fail fast on any error. |
| `db revert` | Revert to an explicit target only; require confirmation for destructive actions. |
| `db info` | Print app version, DB path, applied/pending migrations, dirty status, and WAL/checkpoint summary when available. |
| `backup create` | Use SQLite's online backup API and include blobs, generated keys, and other data-dir state. |
| `backup restore` | Restore from a validated backup archive. Require stopped server by default; refuse overwrite unless explicitly confirmed. |
| `users add` | Create first/admin or invited user. Read password from secure prompt/stdin/env only when safe; never log it. |

Output rules:

- Human-readable by default. Add `--json` for automation on `info`, `create`,
  and other script-facing commands. Keep JSON schemas stable.
- Progress, warnings, and diagnostics go to stderr. Machine-readable results go
  to stdout.
- Include enough context for operators: app version, data dir, DB path, and
  migration version where relevant. Never print secrets.

Exit code rules:

- `0` success.
- `1` expected operational/config/user error.
- `2` CLI usage or argument parse error.
- `>=10` unexpected/internal failure.
- `healthcheck` returns non-zero when unhealthy or timed out.

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
| Styling | **Tailwind 4** | Default new apps to Tailwind 4; downgrade only if the chosen shadcn-svelte release cannot support it. |
| Components | **shadcn-svelte primitives** | Distinctive, owned-in-tree components, no runtime lib; verify generated components against Svelte 5 + Tailwind 4 in CI. |
| Compiler mode | **Svelte 5 / runes-capable by default** | Use Svelte 5 defaults for new apps; disable runes only for a documented shadcn-svelte compatibility issue. |
| Package manager + runtime | **`bun`** | Single binary handling install, run, test, bundle. Faster than pnpm/npm; lockfile is `bun.lock` (text). |

### shadcn-svelte gotcha

- shadcn-svelte CLI install (`bunx shadcn-svelte@latest init`) is
  interactive — annoying for first bootstrap in CI/agent flows. Either
  hand-roll the Tailwind tokens (border / muted / destructive HSL values
  copied from shadcn defaults) or run it locally before committing.
- Default new apps to Svelte 5 + Tailwind 4. Keep Svelte compiler options
  aligned with the shadcn-svelte version in use, and verify generated components,
  local wrappers, `svelte-check`, and the production build in CI. Downgrade to
  non-runes mode or Tailwind v3 only for a documented compatibility issue.

### Embedding into the Rust binary

- `rust-embed` has a `#[derive(Embed)] #[folder = "$CARGO_MANIFEST_DIR/../../frontend/build"]`
  pattern — embeds the entire dir into the binary at compile time.
- axum router gets a `.fallback(...)` handler that serves the matching
  embedded file with `mime_guess`, falling back to `200.html` for unknown
  paths so deep-linked SPA routes work on direct load.
- Put API routes under `/api/...`. `/` and unknown paths serve the SPA
  shell, so the client router takes over once the page loads.

### `build.rs` orchestration gotchas

Use `build.rs` frontend orchestration only for app repositories that ship one
binary. Do not copy this pattern into published library crates. Keep the build
deterministic, cache-friendly, offline-aware, and escapable.

- `bun install` only when `node_modules/` is missing **or** when
  `package.json` / `bun.lock` mtime > `node_modules` mtime. Otherwise dep
  upgrades silently miss.
- Provide a `SKIP_FRONTEND=1` env escape hatch for backend-only
  iteration; create an empty `build/` directory so `rust-embed` still
  compiles when the frontend build is skipped.
- Emit `cargo:rerun-if-changed=` for `frontend/src`, `package.json`,
  `bun.lock`. Otherwise touching frontend code doesn't trigger rebuilds.
- Make CI install Bun before `cargo build`; pin a Bun major or exact version
  per app instead of relying on floating behavior forever.
- If CI builds the frontend separately, make `build.rs` detect the existing
  `frontend/build/` artifact and skip package-manager work.

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

## Runtime layout and config reference

All mutable runtime state lives under one data directory. In containers this is
usually `/data`; for local development it can default to a project-local or OS
app-data directory. Never rely on the image layer or repo checkout for durable
state.

### Data directory layout

Use app-specific names when needed, but keep this shape boring:

```
/data/
  app.db              # SQLite database
  app.db-wal          # SQLite WAL file, when present
  app.db-shm          # SQLite shared-memory file, when present
  blobs/              # filesystem object store
  keys/               # generated signing/encryption/session keys
  tmp/                # safe-to-delete temp files
  backups/            # optional local backup output
```

- The runtime UID/GID must be able to read/write the data dir. In containers,
  make the mounted volume writable by the non-root runtime user.
- `keys/` and `backups/` need restrictive permissions. Do not log their contents
  or bake them into images.
- `tmp/` is disposable and should tolerate cleanup on restart.
- Backups must treat `app.db`, WAL/SHM state, blobs, and keys as one consistency
  unit; prefer the app's backup CLI over filesystem copying.

### Standard env vars

Use the same unprefixed names for shared runtime config in every app. This keeps
the common deployment surface predictable for operators. Use an app-specific
prefix only for product/domain-specific settings.

| Env var | Required | Default | Notes |
|---|---:|---|---|
| `DATA_DIR` | production | `/data` in containers; local app-data in dev | Root for DB, blobs, keys, tmp, backups. |
| `HOST` | no | `127.0.0.1` locally; `0.0.0.0` in containers | Listen host. |
| `PORT` | no | `8080` | Listen port. |
| `PUBLIC_URL` | production | unset in local dev | Canonical external URL for redirects, cookies, HSTS, links. |
| `DATABASE_URL` | no | `sqlite://<DATA_DIR>/app.db` | Keep SQLite default; Postgres comes later via storage traits. |
| `LOG_LEVEL` | no | `info` | Maps to `tracing_subscriber` env filter. |
| `TRUSTED_PROXIES` | no | empty | Comma-separated proxy CIDRs allowed to set forwarded headers. |
| `AUTO_MIGRATE` | no | `1` | Set `0` when migrations run as a separate controlled step. |
| `SESSION_SECRET` | production once auth exists | generated/persisted in `keys/` when allowed | Signing/encryption root; never rotate casually without session impact. |

### Startup validation

Validate config before accepting traffic and fail fast with actionable errors:

- Data dir exists or can be created, is writable, and has safe permissions.
- SQLite opens, pragmas apply, migrations can run or pending migrations are
  reported clearly when auto-migration is disabled.
- `PUBLIC_URL`, when configured, parses as absolute HTTP(S). Production browser
  auth should require it; local dev may omit it.
- HTTPS `PUBLIC_URL` controls `Secure` cookies and HSTS. Never emit HSTS or force
  secure cookies for localhost HTTP.
- Session/auth key material exists or is generated once into `keys/`; never
  regenerate every boot.
- Trusted proxy CIDRs parse. Invalid proxy config is a startup error.
- Host/port are valid and the server can bind.

### Trusted proxy and public URL behavior

- Derive canonical external scheme/host from `PUBLIC_URL`, not from random
  request headers. Use it for redirects, absolute links, cookie security policy,
  HSTS decisions, and future OAuth/callback URLs.
- Trust `Forwarded` / `X-Forwarded-*` only when the immediate peer is in
  `TRUSTED_PROXIES`; otherwise use the socket IP and configured public
  URL.
- If credentials/cookies are used cross-origin, CORS origins must be explicit and
  consistent with `PUBLIC_URL`; wildcard credentialed CORS is forbidden.

---

## Production readiness

### Config and secrets

- Shared runtime config uses unprefixed env vars (`HOST`, `PORT`, `DATA_DIR`,
  etc.). Product-specific config may use an app-specific prefix. `from_env()` is
  the single source of truth; CLI flags push into env before config loads.
- Secrets come from env / secret stores, not files committed with defaults.
- Validate config at startup and fail fast with actionable errors.

### Health and readiness

- Expose `GET /healthz` for process liveness. It should not require DB access
  or external dependencies; if the process can answer HTTP, it is live.
- Expose `GET /readyz` for dependency readiness: DB connection, migration
  state, writable data directory, and required blob-store access. Return `503`
  until the app can safely serve normal traffic.
- Keep probe routes unauthenticated and outside `/api` when the deployment
  platform expects root-level probes. Never include secrets, paths with tokens,
  connection strings, or user data.
- Disable caching for probe responses. Use a stable small JSON shape, e.g.
  `{"status":"ok","version":"X.Y.Z"}`; include build/version metadata
  only when it is safe to expose.
- Avoid expensive checks on every probe. Cache readiness sub-checks briefly or
  check cheap invariants; do not run migrations from readiness.
- Integration-test healthy and unready states: live process with DB down should
  pass `/healthz` and fail `/readyz`.

### Graceful shutdown

- Handle SIGTERM/SIGINT via axum/Tokio graceful shutdown.
- Stop accepting new requests, let in-flight requests drain with a timeout, and
  flush tracing/log buffers before exit.
- Make background tasks cancellation-safe and join them during shutdown.

### Reverse proxy and trusted headers

- Assume TLS terminates at a reverse proxy or platform ingress unless the app
  explicitly owns TLS.
- Trust `Forwarded` / `X-Forwarded-*` headers only from configured proxy IPs.
- Derive secure-cookie, HSTS, public URL, and redirect behavior from explicit
  config, not blind header trust.

### Auth, sessions, cookies, and CSRF

Default to first-party browser auth. Do not design around third-party API tokens
unless the product explicitly needs them.

- Use a single explicit session cookie name/prefix per app. Set `HttpOnly`,
  `SameSite=Lax`, a narrow `Path`, and a bounded `Max-Age` / expiry.
- Mark cookies `Secure` only when public HTTPS is configured; never break local
  HTTP development by accident. Derive this from explicit public URL / TLS
  config, not blind proxy headers.
- Prefer server-side sessions keyed by an opaque random ID. If using signed or
  encrypted cookies, document key rotation, size limits, and invalidation
  behavior.
- Rotate the session ID after login and privilege changes. Invalidate the
  server-side session on logout, password change, user disable, and suspected
  compromise.
- Require CSRF protection for every cookie-authenticated unsafe method (`POST`,
  `PUT`, `PATCH`, `DELETE`). Use a synchronizer token or double-submit token
  tied to the session.
- Exempt non-cookie token/API routes only if the project explicitly adds them;
  browser session routes are never exempt by default. Test missing/invalid CSRF
  token returns `403`.
- Lock CORS to configured origins when credentials are used. Do not combine
  credentialed browser auth with wildcard origins.
- Hash passwords with Argon2id. Keep password hashing, token signing, session
  expiry, and CSRF policy in one auth module with tests.
- Use constant-time checks for secrets and reset/session tokens. Never log
  passwords, session IDs, CSRF tokens, reset tokens, or full cookie headers.
- Emit audit events for login, logout, password reset, invite acceptance, failed
  login bursts, and session invalidation.

### Rate limiting and abuse protection

Use a swappable rate-limit interface so handlers do not care whether limits are
in-memory, SQLite-backed, Redis-backed, or enforced by a platform later.

- Define a backend/application-layer `RateLimiter` trait around keys, limits,
  windows, and retry-after metadata. Start with an in-memory implementation for
  single-node dev/self-hosting; add Redis/DB-backed implementations without
  changing handlers.
- Apply layered limits through that trait: per-IP before auth, per-account after
  auth, and per-route for login, invite, password reset, imports, exports,
  search, webhooks, and other expensive endpoints.
- Derive client IP only from trusted proxy headers; otherwise use the socket IP.
  Document behavior behind Coolify / reverse proxies. Prefer user/account keys
  over IP keys once authenticated.
- Bound request body size, decompressed size, pagination limits, export size,
  search result count, and uploaded file count.
- Add request timeouts and concurrency limits for slow upstream calls, CPU-heavy
  handlers, imports/exports, and background-job enqueue paths.
- On limit hits, return `429` with `Retry-After` and a structured error body.
  Avoid user enumeration: login/reset responses should not reveal whether an
  account exists.
- Log and metric rate-limit hits by route/key type, not raw secrets or full IPs
  when privacy requirements apply.
- Test throttled login, throttled password reset, oversized payloads, pagination
  caps, and decompression-bomb rejection.

### Static asset caching

- Serve fingerprinted assets with long-lived immutable cache headers.
- Serve `200.html` / HTML shells with short or no-cache headers so deploys pick
  up new asset hashes.
- Add ETags or `Last-Modified` where practical; test API and static responses
  separately.

### Backup and restore

- Document the data directory layout: SQLite DB, migrations state, filesystem
  blobs, and any generated keys.
- Provide CLI commands or documented steps for consistent backup/restore.
- For SQLite, prefer online backup APIs or stop-the-world backups; never copy a
  hot DB file casually without WAL/checkpoint handling.
- Restore tests are more important than backup scripts. Add at least one.

### Observability

- Use structured `tracing` logs with request IDs.
- Log startup config summary without secrets.
- Add request latency/status logging and clear error categories.
- Add metrics/traces when the deployment target can consume them; otherwise keep
  the instrumentation seams ready.

### Background jobs

- Keep long-running jobs explicit: queue table, task registry, or supervised
  Tokio tasks.
- Jobs must be idempotent or resumable after process restart.
- Expose CLI/admin visibility for queued/running/failed jobs.

### API schema and versioning

- Put public API routes under `/api/...`; add `/api/vN/...` when external
  clients need compatibility guarantees.
- Keep request/response DTOs separate from storage models.
- For public APIs, generate OpenAPI or maintain contract tests with real
  clients.

---

## Container image guidance

The app still ships as one binary. A container image is just packaging,
isolation, and deployment ergonomics for platforms that expect OCI images; it
must not become a second runtime with hidden state.

### Runtime image defaults

- Use a multi-stage Dockerfile: a builder stage installs Rust + Bun and runs the
  frontend/Rust release build; the runtime stage contains only the app binary
  and runtime metadata it actually needs.
- Prefer distroless when it fits:
  - `gcr.io/distroless/cc-debian12` for typical dynamically linked glibc Rust
    binaries.
  - `gcr.io/distroless/static-debian12` only when the binary is truly static and
    CA/timezone needs are still satisfied.
- If distroless gets in the way of debugging, linkage, CA certs, timezone data,
  or health checks, choose a minimal Debian/Alpine-compatible runtime image
  deliberately and document why.
- Run as a non-root fixed UID/GID. Ensure the data directory is writable by that
  user and avoid root-owned generated files.
- Store persistent state only in a mounted data volume, e.g. `/data`: SQLite DB,
  migration state, filesystem blobs, generated keys, and local uploads. Never
  rely on the image layer for durable state.
- Expose only the HTTP port the app serves. Keep the root filesystem read-only
  when feasible, with `/data` as the writable mount.

### Dockerfile pattern

Replace `<bin-name>` and `<server-package>` per app. Keep the
health check app-native because distroless images usually do not include a shell,
`curl`, or `wget`.

```dockerfile
# syntax=docker/dockerfile:1.7

FROM rust:1-bookworm AS builder
WORKDIR /app

# Install Bun for the embedded SvelteKit build.
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# Copy manifests first for better Docker cache reuse.
COPY Cargo.toml Cargo.lock ./
COPY crates ./crates
COPY frontend/package.json frontend/bun.lock ./frontend/
RUN cd frontend && bun install --frozen-lockfile

# Copy the rest and build the release binary. Use --locked so Docker builds
# cannot silently update Rust dependencies.
COPY frontend ./frontend
COPY docs ./docs
RUN cargo build --release --locked -p <server-package>

FROM gcr.io/distroless/cc-debian12 AS runtime
WORKDIR /app

ENV DATA_DIR=/data
ENV HOST=0.0.0.0
ENV PORT=8080

COPY --from=builder /app/target/release/<bin-name> /app/<bin-name>

USER 65532:65532
VOLUME ["/data"]
EXPOSE 8080

# Implement this CLI subcommand in the app so distroless health checks do not
# depend on shell/curl/wget being present.
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD ["/app/<bin-name>", "healthcheck", "--url", "http://127.0.0.1:8080/healthz"]

ENTRYPOINT ["/app/<bin-name>"]
CMD ["serve"]
```

Use `/healthz` for Docker health checks. Use `/readyz` only in orchestrators that
separate liveness and readiness semantics; Docker's single `HEALTHCHECK` should
not restart a live process just because a dependency is temporarily unready.

### Container build hygiene

- Add a `.dockerignore` that excludes `target/`, `frontend/node_modules/`,
  `frontend/build/`, `.git/`, local data dirs, and secrets.
- Copy lockfiles before source where practical. Use `bun install
  --frozen-lockfile` and `cargo build --locked`.
- Do not pass secrets through Docker build args or bake them into image layers.
  Runtime secrets come from env / secret stores.
- Smoke-test the built image on Linux before pushing it.
- If CI builds the frontend outside Docker, make the Dockerfile accept a copied
  `frontend/build/` artifact and skip package-manager work consistently.

### Linux GHCR workflow

Default registry: GitHub Container Registry (`ghcr.io/<owner>/<repo>`).

Tag policy:

- Pull requests: build and smoke-test, but do not push.
- `main`: push deployable test images with `sha-<shortsha>` and optionally
  `main` tags.
- SemVer tags (`vX.Y.Z`): push release images with the `vX.Y.Z` tag and
  optionally `latest`.
- A `vX.Y.Z` image tag must match `[workspace.package].version = "X.Y.Z"`.
  SHA tags from `main` are test artifacts, not releases.

Add `.github/workflows/container.yml` to each app repo:

```yaml
name: container

on:
  pull_request:
  push:
    branches: [main]
    tags:
      - "v*.*.*"

permissions:
  contents: read
  packages: write

concurrency:
  group: container-${{ github.ref }}
  cancel-in-progress: true

env:
  CARGO_TERM_COLOR: always
  RUSTFLAGS: "-D warnings"
  IMAGE_NAME: ghcr.io/${{ github.repository }}

jobs:
  linux:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: dtolnay/rust-toolchain@stable
        with:
          components: rustfmt, clippy

      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.x

      - uses: Swatinem/rust-cache@v2

      - name: Install frontend deps
        run: bun install --frozen-lockfile
        working-directory: frontend

      - name: Check tag matches Cargo version
        if: startsWith(github.ref, 'refs/tags/v')
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

      - uses: docker/setup-buildx-action@v3

      - uses: docker/metadata-action@v5
        id: meta
        with:
          images: ${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=sha-,format=short,enable={{is_default_branch}}
            type=raw,value=main,enable={{is_default_branch}}
            type=ref,event=tag
            type=raw,value=latest,enable=${{ startsWith(github.ref, 'refs/tags/v') }}

      - name: Build image for smoke test
        uses: docker/build-push-action@v6
        with:
          context: .
          load: true
          tags: local/<bin-name>:smoke
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Smoke-test container
        run: |
          set -euxo pipefail
          docker volume create <bin-name>-data
          cid="$(docker run -d \
            -p 127.0.0.1:8080:8080 \
            -v <bin-name>-data:/data \
            -e DATA_DIR=/data \
            local/<bin-name>:smoke)"
          trap 'docker logs "$cid" || true; docker rm -f "$cid" || true; docker volume rm <bin-name>-data || true' EXIT
          for i in $(seq 1 30); do
            if curl -fsS http://127.0.0.1:8080/healthz; then
              exit 0
            fi
            sleep 1
          done
          exit 1

      - name: Login to GHCR
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Push image
        if: github.event_name != 'pull_request'
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

Keep the binary tarball release workflow separate unless the project decides to
ship only containers. The container workflow should never publish release images
from arbitrary branches; `main` SHA images are for test deployments, while SemVer
tags are releases.

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
9. **Browser sessions require CSRF on unsafe methods.** Cookie auth without
   CSRF tests is a bug.
10. **Rate limiting goes through a trait.** Do not bake Redis, SQLite, or
    in-memory limiter details into handlers.
11. **Never hot-copy SQLite backups.** Use the online backup path and include
    blobs/keys from the data dir.
12. **Auto-migration must fail fast.** Startup migration errors stop the app;
    downgrade requires tested down-migrations or DB restore.
13. **One data dir owns mutable state.** DB, blobs, keys, tmp, and backups live
    under the configured data dir, not the image/repo layer.
14. **Forwarded headers are opt-in.** Trust proxy headers only from configured
    proxies; use `PUBLIC_URL` for canonical external behavior.
15. **CLI output has contracts.** JSON results go to stdout, diagnostics to
    stderr, and exit codes are stable.
16. **Default to Svelte 5 + Tailwind 4.** Downgrade runes/Tailwind only for a
    documented shadcn-svelte compatibility issue verified in CI.
17. **Plans before code.** One commit per task.

---

## Coollabs defaults (opinionated — adjust to taste)

- **Conventional Commits.** Subject under 72 chars, body explains *why*.
- **`rustfmt` + `clippy --all-targets -- -D warnings` are CI gates.**
- **AGPL-3.0-or-later** for self-host-friendly OSS at coollabs.
- Shared runtime config uses unprefixed env vars; app-specific prefixes are for
  product/domain-specific settings only. `from_env()` is the single source of
  truth; CLI flags push into env before config loads.
- Twelve-factor: no config file, env-driven only.

---

## Upgrade and migration policy

The binary version, database schema, and embedded SvelteKit bundle are one
release unit. Upgrades should be boring for small self-hosted installs, but never
hide migration risk.

### Migration execution

- **Startup auto-migration is the default.** On `serve`, run checked-in
  `sqlx::migrate!` migrations before accepting normal traffic. If migration
  fails, fail startup loudly; do not start partially and do not swallow errors.
- Keep `db migrate`, `db revert`, and `db info` as the canonical manual/admin
  controls. Operators need them for init containers, controlled rollouts,
  debugging, and emergency procedures.
- Provide `AUTO_MIGRATE=0` for environments that require an explicit
  migration step before app startup. `db info` must make pending/applied schema
  state visible.
- Serialize migrations with the database's migration lock/state. In container or
  multi-process deployments, multiple instances may start at once; exactly one
  should migrate and the others should wait/fail predictably.
- Never run untracked SQL or best-effort fixups at startup. If schema changes are
  needed, commit them as migrations with tests.

### Backup before migrate

- A tested backup/restore path is required before destructive migrations. For
  SQLite, snapshot the online DB backup plus blobs, generated keys, and other
  data-dir state.
- For risky migrations, prefer an explicit release note and admin-visible warning.
  Auto-migrate should be boring for additive changes; destructive changes need a
  conscious project decision.
- Data backfills must be idempotent or resumable. Avoid one huge transaction for
  large user data; chunk when needed and record progress.

### Downgrades and compatibility

- Default stance: downgrades after schema migrations are unsupported unless the
  release includes tested down-migrations and compatibility notes. Binary
  rollback may require restoring the pre-upgrade backup.
- Prefer expand/contract migrations for compatibility: add nullable/new columns
  first, deploy code that writes both or reads both when needed, then remove old
  shape in a later release.
- Test `old seeded DB -> migrate -> run app` for every migration. Where down
  migrations are claimed, also test `migrate -> run -> revert -> run old app`.
- Expose app version and schema/migration status through `./app --version`,
  `db info`, and optionally an admin-only endpoint. The `vX.Y.Z` tag must match
  `[workspace.package].version = "X.Y.Z"`.

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
          bun-version: 1.x

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

1. Confirm this archetype fits: single binary, Rust-owned API/static serving,
   embedded SvelteKit SPA, SQLite/filesystem defaults, reverse-proxy deploy.
2. Review replaceable defaults and record any project-specific swaps in the
   feature plan or README; keep this file as the shared architecture SSOT.
3. Define runtime layout and config: data-dir structure, standard env vars,
   required production config, startup validation, `PUBLIC_URL`, and trusted
   proxy behavior.
4. `cargo new` → restructure as workspace per layout above.
5. Pin workspace deps: `axum`, `sqlx + sqlite`, `tokio`, `tower-http`,
   `rust-embed`, `mime_guess`, `clap`, `thiserror`, `anyhow`, `tracing`,
   `flate2` + `brotli` + `zstd`.
6. `crates/storage/migrations/<timestamp>_init.up.sql` + `.down.sql`;
   wire `sqlx::migrate!`, startup auto-migration, and `db migrate/revert/info`.
7. Centralize SQLite pragmas: WAL mode, busy timeout, checkpoint policy, and
   `ANALYZE` / `VACUUM` maintenance commands. Document when storage traits should
   get a Postgres implementation instead of stretching SQLite.
8. Add backup/restore CLI using SQLite's online backup API and include blobs,
   generated keys, and other data-dir state.
9. clap multi-subcommand binary, `serve` default, `db migrate/revert/info`,
   `backup create`, `backup restore`, `users add`, and app-native `healthcheck`.
10. Add CLI output contracts: human default, `--json` for automation, stdout vs
    stderr discipline, and exit-code tests.
11. `frontend/`: SvelteKit + adapter-static (`fallback: '200.html'`,
    `prerender = false`, `ssr = false`), Svelte 5 / runes-capable defaults,
    Tailwind 4, and shadcn-svelte primitives verified in CI. Use **bun** unless
    the project chooses a documented replacement.
12. `build.rs` orchestrating `bun install` + `bun run build`; mtime-guarded
    re-install; existing-artifact detection; `SKIP_FRONTEND` escape hatch.
13. axum `.fallback(rust_embed handler)` + `RequestBodyLimitLayer` + security
   headers + static asset cache policy.
14. Add config/secrets validation, `/healthz`, `/readyz`, graceful shutdown,
    reverse-proxy/trusted-header policy, and backup/restore notes. Test
    `/healthz` and `/readyz` separately, including unready dependencies.
15. Add first-party browser session auth: cookie policy, server-side session or
    signed-cookie decision, CSRF protection for unsafe methods, CORS policy,
    password hashing, logout invalidation, and audit events.
16. Add a `RateLimiter` trait with in-memory default plus documented Redis/DB
    swap path. Enforce login/reset/import/export/search limits before exposing
    user accounts or public write endpoints.
17. Add `test_support::test_app()` helper + first integration test +
    (when wire-compat) first contract test. Include auth/CSRF/rate-limit
    regression tests once those routes exist.
18. Add `Dockerfile` + `.dockerignore`: multi-stage build, non-root runtime,
    `/data` volume, `/healthz` health check, and documented distroless/runtime
    base decision.
19. Add Linux GHCR container CI: PR build/smoke-test without push, `main`
    `sha-<shortsha>` images for test deployments, and SemVer tag images for
    releases.
20. Define upgrade policy: startup auto-migrate default, `AUTO_MIGRATE=0`
    escape hatch, backup-before-migrate rule, downgrade stance, and seeded old-DB
    migration tests.
21. CI: rust + (optional) contract jobs, `RUSTFLAGS: "-D warnings"`, frontend
    deps installed before `cargo`.
22. Versioning: root `[workspace.package].version`, member crates with
    `version.workspace = true`, and clap `#[command(version)]` so
    `./app --version` works.
23. Release workflow: `.github/workflows/release.yml` triggered by `vX.Y.Z`
    tags, with Cargo/tag version check, release binary, checksum, and GitHub
    Release upload.
24. Re-read "Hard rules" once a month. Grep for new violations.
