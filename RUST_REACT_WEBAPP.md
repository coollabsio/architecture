# Rust Single-Binary Web Apps with React

Opinionated stack guide for **React-specific, web app based Rust
services**: a Rust HTTP/API backend plus a React + Vite frontend that uses
shadcn/ui for UI components, TanStack Router for routing, and TanStack Query
for Rust API/server state, shipped as a single self-hostable binary with the
frontend embedded into the executable. Library picks, why, and the gotchas
that bit us.

This is an archetype guide, not a generic Rust web-services guide, Rust style
guide, CLI-only service template, library template, firmware guide, or non-web
service architecture. Keep React 19 + Vite as the frontend assumption,
shadcn/ui as the UI component baseline, TanStack Router as the router, and
TanStack Query as the default Rust API/server-state layer; align all frontend
UI with [`DESIGN.md`](./DESIGN.md) and its split `design/` component specs;
adapt the replaceable defaults below only when a project has a concrete reason.

## Scope

Use this for Rust services that expose a web app or HTTP API, own their
React frontend bundle, and benefit from single-binary self-hosting. Do not
use it as the default for generic Rust crates, CLI-only tools, workers without a
web UI, embedded/firmware projects, or services where the frontend is deployed
separately.

## Architecture assumptions

This guide assumes:

- The product ships as one self-hostable binary.
- The Rust server owns both the HTTP API and static frontend serving.
- The frontend is a static React + Vite SPA embedded into the Rust binary.
- Browser server/API state uses TanStack Query by default.
- Browser routing uses TanStack Router (file-based, type-safe).
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
- The app needs runtime SSR or React Server Components as a core product
  requirement.
- The service is multi-node-first with Postgres as a hard requirement.
- The project is a library crate, CLI tool, worker, firmware, or protocol
  daemon.

## Replaceable defaults

React + Vite is the fixed frontend assumption for this guide. shadcn/ui is
the default UI component system: use it for buttons, forms, dialogs, menus,
tables, cards, navigation, and other reusable UI primitives. TanStack Query is
the default server/API state layer for browser UI that talks to the Rust API.
TanStack Router is the default browser router. The visual and interaction
contract for UI primitives comes from [`DESIGN.md`](./DESIGN.md) and the
matching file in `design/`; treat those files as the frontend design SSOT.
These defaults are replaceable only when the project has a concrete operational
or product reason recorded in the feature plan or README:

| Default | Replace when | Common alternative |
|---|---|---|
| SQLite | Multi-node writes, central DB ops, or managed DB policy is required | Postgres |
| Filesystem blobs | Blob data must be shared across nodes or backed by object lifecycle policies | S3-compatible storage |
| `rust-embed` static serving | Assets should be cached globally or served outside the binary | CDN / reverse-proxy static hosting |
| Bun | Org standardizes on Node/pnpm/npm | pnpm or npm |
| shadcn/ui UI components/primitives | Product has an established design system and the feature plan documents the replacement | Mantine, Chakra, MUI, in-house React components |
| TanStack Router | App is one screen, or a strict SSR/RSC requirement makes Next.js mandatory | React Router, Next.js file-based router |
| TanStack Query for server/API state | App is tiny/static enough that direct `fetch` is clearer, or the feature plan documents another state architecture | RTK Query, SWR, Apollo Client (GraphQL only) |
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
package.json             # root dev scripts, including `bun run dev`
scripts/dev.sh           # one-command frontend + backend dev runner
crates/
  <domain>/              # one or more domain crates (pure types, no I/O)
  storage/               # storage traits + concrete impls
  server/                # axum binary + CLI + frontend embed
frontend/                # React + Vite SPA, embedded into the binary
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
| Frontend embed | **`rust-embed`** + `mime_guess` | Compile-time embed of `frontend/dist/` into the binary; SPA fallback to `index.html` for unknown routes. |
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
- For single-binary products where availability is preferred over strict
  migration immutability, use a tiny wrapper around `sqlx`'s `Migrate` trait
  instead of calling `Migrator::run()` directly:
  - applied migration + matching checksum: skip;
  - applied migration + different checksum: emit a structured `tracing::warn!`
    with version, description, stored checksum, and embedded checksum, then
    skip;
  - pending migration: apply normally through `conn.apply(migration)`;
  - dirty/partially-applied migration: fail startup and require operator
    repair.
  This preserves bootability if an already-applied migration was edited in a
  release, without mutating `_sqlx_migrations`. It is an intentional policy
  choice: checksum drift must be visible in logs/monitoring, and new schema
  changes should still be shipped as new timestamped migrations.

**Gotchas (these all bit us):**
- **SQLite < 3.35 cannot `DROP COLUMN`.** Down-migrations that removed
  columns must recreate the table (CREATE _tmp / INSERT SELECT / DROP /
  RENAME). Otherwise re-applying the up-migration fails with
  `duplicate column name`.
- **Never silently ignore checksum drift.** If the project chooses lenient
  checksum handling for availability, warn loudly and continue only for
  already-successful migrations. Dirty migrations and failed pending migrations
  still stop the process.
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
- Baseline CSP for embedded React SPA:
  `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; form-action 'self'`.
  Vite's production HTML usually has no inline scripts, **except** the
  pre-hydration theme bootstrap script in `index.html` that toggles `.dark`
  before the main bundle loads. That inline script means `script-src 'self'`
  alone may break first paint or be blocked. Keep `'unsafe-inline'` for scripts
  until that bootstrap script is nonce/hash-based or moved into a module.
  Inline `<style>` from Tailwind's CSS file is fine; tighten per app and remove
  `'unsafe-inline'` for styles if the built frontend allows it.
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
| Framework | **React 19** | Server-aware hooks (`useTransition`, `useDeferredValue`, `useOptimistic`, `use` for promises), automatic batching, ref-as-prop. |
| Bundler / dev server | **Vite** with `@vitejs/plugin-react` | Fast HMR, ESM-native dev, mature production bundler. `vite build` produces a folder of HTML + assets ready to embed. |
| Production output | **`vite build` → `dist/`** | A folder of HTML + hashed assets ready to embed; `index.html` is the only HTML output, so it doubles as the SPA fallback shell. |
| Render mode | Client-only SPA against the Rust API | Vite SPA is client-only by default; no SSR/prerender config to disable. |
| Router | **TanStack Router** (`@tanstack/react-router` + `@tanstack/router-plugin`) | File-based routes, type-safe links, search-params API, code splitting, `defaultPreload: "intent"`, `autoCodeSplitting`. |
| Styling | **Tailwind 4** (`@tailwindcss/vite`) | Default new apps to Tailwind 4 with CSS-first `@theme`; downgrade only if the chosen shadcn/ui release cannot support it. |
| Design system | **[`DESIGN.md`](./DESIGN.md) + `design/` specs** | Required frontend visual/interaction SSOT. Before implementing a page or component, open the matching design spec and apply its tokens, exact layout recipe, states, accessibility notes, and checklist. |
| Components | **shadcn/ui UI components/primitives** (Radix + `tailwind-variants`) | Required UI baseline for buttons, forms, dialogs, menus, tables, cards, navigation, and reusable UI; add components with `bunx shadcn@latest add`; owned-in-tree, no runtime lib; extend generated primitives according to `DESIGN.md`; verify generated components against React 19 + Tailwind 4 in CI. |
| Class merge | `clsx` + `tailwind-merge` via `cn()` | Standard shadcn pattern. |
| Variant maps | `tailwind-variants` (`tv`) | Same as shadcn upstream. |
| Server/API state | **`@tanstack/react-query`** (v5) | Default cache, refetch, retry, mutation, optimistic-update, and invalidation layer for browser UI talking to the Rust API. |
| Local UI state | Plain React + `useSyncExternalStore` module-state hooks | Keep simple component/dialog/filter state in React; no Zustand/Jotai/Redux by default. |
| Icons | `lucide-react` | shadcn default. |
| Toasts | `sonner` | shadcn default. |
| Command palette | `cmdk` | shadcn default. |
| Forms | `react-hook-form` + `zod` | For non-trivial forms. Simple inputs stay uncontrolled or controlled by `useState`. |
| Compiler mode | **React 19 / Tailwind 4 defaults** | Use React 19 + Tailwind 4 defaults for new apps; downgrade only for a documented shadcn/ui compatibility issue. |
| Package manager + runtime | **`bun`** | Single binary handling install, run, test, bundle. Faster than pnpm/npm; lockfile is `bun.lock` (text). |

### Frontend design contract

- Use [`DESIGN.md`](./DESIGN.md) as the router for all frontend UI. It is the
  single consolidated design doc covering both the React and SvelteKit stacks,
  and it points to the component/page spec that must be followed before writing
  React/TSX markup.
- Start each reusable UI element from the closest shadcn/ui primitive, then
  apply the Coolify visual decisions, variants, spacing, typography, states, and
  accessibility requirements from the matching `design/` Markdown file.
- Do not copy Laravel, Blade, Livewire, Alpine, or project-specific frontend
  implementation details into Rust web app frontends. The implementation stack
  for this archetype is React 19 + Vite + Tailwind 4 + shadcn/ui + TanStack
  Router + TanStack Query.
- When a needed component is not yet listed in `DESIGN.md`, do not invent a new
  ad-hoc style. Either add the component spec first using the DESIGN.md format,
  or use only already-documented primitives and record the gap in the feature
  plan.
- New pages and component wrappers must pass both app checks (`tsc --noEmit`,
  build, tests where applicable) and the matching design spec's review
  checklist.

### shadcn/ui gotcha

- Use shadcn/ui for reusable UI components by default. Do not introduce
  another component library, parallel design system, or ad-hoc component set
  unless the project plan documents the product/design-system reason.
- Add shadcn/ui components with the CLI, e.g.
  `bunx shadcn@latest add button dialog dropdown-menu table form`.
  Commit the generated owned-in-tree component files (under
  `src/components/ui/`) and review them like app code instead of copy-pasting
  components from docs by hand.
- `components.json` lives at the project root. Recommended config:

  ```json
  {
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "new-york",
    "rsc": false,
    "tsx": true,
    "tailwind": {
      "config": "",
      "css": "src/app.css",
      "baseColor": "neutral",
      "cssVariables": true,
      "prefix": ""
    },
    "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils",
      "ui": "@/components/ui",
      "lib": "@/lib",
      "hooks": "@/hooks"
    },
    "iconLibrary": "lucide"
  }
  ```

- shadcn/ui CLI init (`bunx shadcn@latest init`) is interactive — annoying for
  first bootstrap in CI/agent flows. Either hand-roll the Tailwind tokens
  (border / muted / destructive values copied from shadcn defaults) or run it
  locally before committing.
- Alias shadcn semantic tokens (`--background`, `--foreground`, `--card`,
  `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`,
  `--destructive`, `--border`, `--input`, `--ring`, `--radius`) onto the
  Coolify palette in `:root` + `.dark` overrides, and mirror them into
  `@theme inline { --color-* }` so Tailwind utilities (`bg-primary`,
  `text-muted-foreground`, `ring-ring`) work everywhere.
- Default new apps to React 19 + Tailwind 4. Keep the shadcn/ui version aligned
  with the React/Tailwind versions in use, and verify generated components,
  local wrappers, `tsc --noEmit`, and the production build in CI. Downgrade to
  Tailwind v3 only for a documented compatibility issue.

### TanStack Router + Query gotchas

- Install and configure `@tanstack/react-query` by default for non-trivial
  frontend API reads and mutations. It is the server-state layer; do not
  hand-roll a parallel cache/invalidation system with ad-hoc hooks.
- Use the TanStack Router file-based router as the app shell and route tree.
  Enable `autoCodeSplitting` in the `@tanstack/router-plugin` Vite plugin. The
  plugin generates `routeTree.gen.ts` at dev/build time; gitignore it.
- Create one app-level `QueryClient` at module scope and wrap the app with
  `QueryClientProvider` above `<RouterProvider>`. In tests, create a fresh
  `QueryClient` per test and disable retries unless the retry behavior itself is
  under test.
- `defaultPreload: "intent"` keeps navigation snappy without prefetching
  everything.
- Define stable query-key factories near each API client module, e.g.
  `projectKeys.list(filters)` and `projectKeys.detail(id)`. Never build keys
  from mutable objects whose identity changes every render.
- Mutations must explicitly update or invalidate every affected query key. Add a
  component/integration test for at least one create/update/delete mutation so
  stale list/detail views are caught early.
- Direct `fetch` is still fine for tiny one-off/no-cache calls, bootstrap
  config, file downloads, and endpoints where cache/invalidation would be
  ceremony. Shared displayed API data should use Query.
- Use plain React + `useSyncExternalStore` module-state hooks for simple local
  UI state. Add Zustand/Jotai only for complex shared client-only state, with a
  feature-plan entry documenting the reason.

### Local UI state without a library

The Laravel React starter kit ships a `use-appearance.tsx` hook using
`useSyncExternalStore` over module-scoped state. The same pattern works for
sidebar collapse, command-palette open state, toast queue, etc:

```ts
import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let open = false;
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const notify = () => listeners.forEach((l) => l());

export function useCommandPalette() {
  const isOpen = useSyncExternalStore(subscribe, () => open, () => false);
  const setOpen = (next: boolean) => {
    open = next;
    notify();
  };
  return { open: isOpen, setOpen, toggle: () => setOpen(!open) } as const;
}
```

- Persist to `localStorage` from inside the setter for state that must survive
  reload (theme, sidebar collapsed). Hydrate via the pre-React inline script in
  `index.html` to avoid FOUC.
- Add Zustand / Jotai only when client state grows complex enough that
  hand-rolled subscribers become a maintenance burden — write a feature plan
  entry documenting the reason.

### Embedding into the Rust binary

- `rust-embed` has a `#[derive(Embed)] #[folder = "$CARGO_MANIFEST_DIR/../../frontend/dist"]`
  pattern — embeds the entire dir into the binary at compile time.
- axum router gets a `.fallback(...)` handler that serves the matching
  embedded file with `mime_guess`, falling back to `index.html` for unknown
  paths so deep-linked SPA routes work on direct load. `index.html` is Vite's
  only HTML output, so there is no prerendered-home collision to work around.
- Put API routes under `/api/...`. `/` and unknown paths serve the SPA
  shell, so the TanStack Router takes over once the page loads.

### `build.rs` orchestration gotchas

Use `build.rs` frontend orchestration only for app repositories that ship one
binary. Do not copy this pattern into published library crates. Keep the build
deterministic, cache-friendly, offline-aware, and escapable.

- `bun install` only when `node_modules/` is missing **or** when
  `package.json` / `bun.lock` mtime > `node_modules` mtime. Otherwise dep
  upgrades silently miss.
- Provide a `SKIP_FRONTEND=1` env escape hatch for backend-only
  iteration; create an empty `dist/` directory so `rust-embed` still
  compiles when the frontend build is skipped.
- Emit `cargo:rerun-if-changed=` for `frontend/src`, `package.json`,
  `bun.lock`. Otherwise touching frontend code doesn't trigger rebuilds.
- Make CI install Bun before `cargo build`; pin a Bun major or exact version
  per app instead of relying on floating behavior forever.
- If CI builds the frontend separately, make `build.rs` detect the existing
  `frontend/dist/` artifact and skip package-manager work.

### One-command local dev

Every app repo should expose one root command that starts the React/Vite dev
server and the Rust backend together:

```bash
bun run dev
```

This command is for development only. It should:

- run Vite with React HMR from `frontend/`;
- keep Vite on one fixed local URL (`127.0.0.1:5173`) and fail if that port
  is already in use instead of silently switching ports;
- print only the one URL developers should open; keep the backend URL out of
  the startup banner unless it is needed for debugging;
- run the Rust server under `cargo-watch` so backend changes restart the
  process;
- set `SKIP_FRONTEND=1` for the backend watcher so every Rust rebuild does not
  also rebuild/embed the frontend;
- clean up both child processes on `Ctrl-C`.

Canonical root `package.json`:

```json
{
  "name": "<app-name>",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "bash scripts/dev.sh"
  }
}
```

Canonical `frontend/package.json` dev script:

```json
{
  "scripts": {
    "dev": "vite --host 127.0.0.1 --port 5173 --strictPort --clearScreen false --logLevel error"
  }
}
```

Canonical `scripts/dev.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

command -v bun >/dev/null 2>&1 || {
  echo "bun is required for frontend dev." >&2
  exit 1
}

command -v cargo >/dev/null 2>&1 || {
  echo "cargo is required for backend dev." >&2
  exit 1
}

cargo watch --version >/dev/null 2>&1 || {
  echo "cargo-watch is required. Install it with: cargo install cargo-watch" >&2
  exit 1
}

frontend_pid=""
backend_pid=""

cleanup() {
  local status=$?
  trap - EXIT INT TERM
  if [[ -n "$frontend_pid" ]]; then kill "$frontend_pid" 2>/dev/null || true; fi
  if [[ -n "$backend_pid" ]]; then kill "$backend_pid" 2>/dev/null || true; fi
  wait "$frontend_pid" "$backend_pid" 2>/dev/null || true
  exit "$status"
}

trap cleanup EXIT INT TERM

echo "<App> dev mode"
echo "Open: http://127.0.0.1:5173"
echo

(
  cd "$ROOT/frontend"
  exec bun run dev
) &
frontend_pid=$!

(
  cd "$ROOT"
  exec env SKIP_FRONTEND=1 cargo watch \
    -w crates \
    -w Cargo.toml \
    -w Cargo.lock \
    -i target \
    -x 'run -p <server-package> -- serve'
) &
backend_pid=$!

while true; do
  if ! kill -0 "$frontend_pid" 2>/dev/null; then wait "$frontend_pid"; exit $?; fi
  if ! kill -0 "$backend_pid" 2>/dev/null; then wait "$backend_pid"; exit $?; fi
  sleep 1
done
```

Keep production-like local testing separate: `bun run build` in `frontend/`,
then `cargo run -p <server-package> -- serve` with the embedded frontend.

### Path-prefixed builds

When the SPA is served under a path prefix (e.g. `/myapp/`):

- Build with `BASE_PATH=/myapp/ bun run build`. Vite rewrites all asset URLs
  via `base: process.env.BASE_PATH ?? "/"` in `vite.config.ts`.
- TanStack Router picks the prefix up at runtime via
  `basepath: import.meta.env.BASE_URL.replace(/\/$/, "") || undefined`. Don't
  hardcode the prefix in route definitions; file-based paths stay logical.
- The Rust SPA fallback must serve `index.html` for unknown paths under that
  prefix so deep links survive direct navigation.

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

Frontend-side tests use Vitest (unit/component, reusing the Vite config) with
`@testing-library/react`: mount pages with a fresh `QueryClient` (retries off)
and mock fetchers from `src/lib/query/`.

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

- Serve fingerprinted assets with long-lived immutable cache headers. Vite emits
  hashed asset filenames under `assets/`; serve those with
  `Cache-Control: public, immutable, max-age=31536000`.
- Serve `index.html` (the SPA shell) with short or no-cache headers so deploys
  pick up new asset hashes.
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

# Install Bun for the embedded React + Vite build.
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
  `frontend/dist/`, `.git/`, local data dirs, and secrets.
- Copy lockfiles before source where practical. Use `bun install
  --frozen-lockfile` and `cargo build --locked`.
- Do not pass secrets through Docker build args or bake them into image layers.
  Runtime secrets come from env / secret stores.
- Smoke-test the built image on Linux before pushing it.
- If CI builds the frontend outside Docker, make the Dockerfile accept a copied
  `frontend/dist/` artifact and skip package-manager work consistently.

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
8. **`index.html` is the React/Vite SPA fallback.** It is Vite's only HTML
   output; serve it for unknown paths so deep-linked client routes survive
   direct load. Don't ship a `404.html`.
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
16. **Default to React 19 + Tailwind 4.** Downgrade React or Tailwind only for a
    documented shadcn/ui compatibility issue verified in CI.
17. **Frontend UI follows `DESIGN.md`.** Before implementing or changing
    React UI, open [`DESIGN.md`](./DESIGN.md), follow the matching
    `design/` spec, and complete its review checklist.
18. **Default UI components are shadcn/ui.** Add components with
    `bunx shadcn@latest add ...`; do not introduce another component
    library or ad-hoc component system unless the feature plan documents the
    concrete product/design-system reason.
19. **Default server/API state is TanStack Query.** Shared displayed Rust API
    data and mutations go through `@tanstack/react-query`; direct `fetch` is
    for one-off/no-cache calls only.
20. **Plans before code.** One commit per task.

---

## Coollabs defaults (opinionated — adjust to taste)

- **Conventional Commits.** Subject under 72 chars, body explains *why*.
- **`rustfmt` + `clippy --all-targets -- -D warnings` are CI gates.**
- **`tsc --noEmit` is a frontend CI gate** alongside `bun run build`.
- **AGPL-3.0-or-later** for self-host-friendly OSS at coollabs.
- Shared runtime config uses unprefixed env vars; app-specific prefixes are for
  product/domain-specific settings only. `from_env()` is the single source of
  truth; CLI flags push into env before config loads.
- Twelve-factor: no config file, env-driven only.
- One frontend, one route tree, one `QueryClient`. Multiple `QueryClient`
  instances usually signal a missing test seam, not a real architectural need.

---

## Upgrade and migration policy

The binary version, database schema, and embedded React bundle are one
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
   embedded React + Vite SPA, SQLite/filesystem defaults, reverse-proxy deploy.
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
11. `frontend/`: React 19 + Vite (`@vitejs/plugin-react`), Tailwind 4 via
    `@tailwindcss/vite`, and shadcn/ui UI components/primitives verified in CI.
    `vite build` produces `dist/`. Use [`DESIGN.md`](./DESIGN.md) as the
    frontend UI router, follow the matching `design/` component/page spec for
    tokens, exact layout recipes, states, and review checklist, then add
    reusable primitives with `bunx shadcn@latest add ...` unless a documented
    product/design-system reason replaces shadcn/ui. Commit `components.json`.
    Use **bun** unless the project chooses a documented replacement.
12. Add `@tanstack/react-query`: build one module-scope `QueryClient`, mount the
    app-level `QueryClientProvider` above `<RouterProvider>`, define query-key
    conventions next to API clients, use Query for shared Rust API
    data/mutations, and add at least one smoke/regression test that proves a
    mutation invalidates or updates affected list/detail queries.
13. Add `@tanstack/react-router` + `@tanstack/router-plugin`: file-based routes
    under `src/routes/`, `autoCodeSplitting: true`, `defaultPreload: "intent"`,
    `__root.tsx` layout shell. Gitignore the generated `routeTree.gen.ts`.
14. `build.rs` orchestrating `bun install` + `bun run build` (producing
    `dist/`); mtime-guarded re-install; existing-artifact detection;
    `SKIP_FRONTEND` escape hatch that creates an empty `dist/`.
15. Add root `package.json` + `scripts/dev.sh` so `bun run dev` starts
    Vite/React HMR (`127.0.0.1:5173 --strictPort`) and the `cargo-watch`
    backend together.
16. axum `.fallback(rust_embed handler)` serving `frontend/dist` with
    `index.html` fallback, plus `RequestBodyLimitLayer` + security headers +
    static asset cache policy.
17. Add config/secrets validation, `/healthz`, `/readyz`, graceful shutdown,
    reverse-proxy/trusted-header policy, and backup/restore notes. Test
    `/healthz` and `/readyz` separately, including unready dependencies.
18. Add first-party browser session auth: cookie policy, server-side session or
    signed-cookie decision, CSRF protection for unsafe methods, CORS policy,
    password hashing, logout invalidation, and audit events.
19. Add a `RateLimiter` trait with in-memory default plus documented Redis/DB
    swap path. Enforce login/reset/import/export/search limits before exposing
    user accounts or public write endpoints.
20. Add `test_support::test_app()` helper + first integration test +
    (when wire-compat) first contract test. Include auth/CSRF/rate-limit
    regression tests once those routes exist.
21. Add `Dockerfile` + `.dockerignore`: multi-stage build, non-root runtime,
    `/data` volume, `/healthz` health check, and documented distroless/runtime
    base decision.
22. Add Linux GHCR container CI: PR build/smoke-test without push, `main`
    `sha-<shortsha>` images for test deployments, and SemVer tag images for
    releases.
23. Define upgrade policy: startup auto-migrate default, `AUTO_MIGRATE=0`
    escape hatch, backup-before-migrate rule, downgrade stance, and seeded old-DB
    migration tests.
24. CI: rust + (optional) contract jobs, `RUSTFLAGS: "-D warnings"`, frontend
    deps installed before `cargo`, plus `tsc --noEmit` + `bun run build`.
25. Versioning: root `[workspace.package].version`, member crates with
    `version.workspace = true`, and clap `#[command(version)]` so
    `./app --version` works.
26. Release workflow: `.github/workflows/release.yml` triggered by `vX.Y.Z`
    tags, with Cargo/tag version check, release binary, checksum, and GitHub
    Release upload.
27. Re-read "Hard rules" once a month. Grep for new violations.
