# Coolify React component samples

React mockup of the Coolify design system. Built with React 19 + Vite +
TanStack Router + TanStack Query + Tailwind v4 + shadcn-style primitives
(Radix). Local UI state uses plain React + `useSyncExternalStore` hooks
(pattern lifted from the
[Laravel React starter kit's `use-appearance`](https://github.com/laravel/react-starter-kit/blob/main/resources/js/hooks/use-appearance.tsx)) —
no Zustand, no Redux, no provider.

## Why this exists

The Rust web-app stack documented in `RUST_REACT_WEBAPP.md` names TanStack
Query as the default server-state layer. This sandbox is the React reference
implementation of the Coolify design system: same component contract, same
routes, working Query + Router wiring out of the box.

## Stack

| Pick | Why |
|---|---|
| React 19 + Vite | Fast dev server, fast HMR, modern bundler. |
| TanStack Router (file-based) | Filesystem routing, typed links, autoCodeSplitting. |
| TanStack Query v5 | Default Rust-API server-state layer per the architecture docs. |
| `useSyncExternalStore` hooks | Theme + UI state. Theme persisted to `component-sample-react-theme`. |
| Tailwind v4 + shared `app.css` | All Coolify tokens declared in `@theme`. |
| Radix UI primitives + `tailwind-variants` | Coolify visual contract (4px radii, purple/yellow accents, inset-shadow inputs) on top of shadcn-style primitives. |
| cmdk | Command palette. |
| sonner | Toasts. |

## Run

```bash
bun install
bun dev
```

If Bun cannot write to its global cache in a sandboxed environment, pass a local
cache:

```bash
bun install --cache-dir .bun-cache
```

Build static files:

```bash
bun run build
```

Typecheck:

```bash
bun run typecheck
```

## Design update workflow

This mockup is a visual verification target, not the source of truth. If a
design doc and a mockup disagree, fix the mockup or the doc explicitly; do not
let agents infer a third style.

When design behavior changes:

1. Read root `DESIGN.md`, `design/tokens.md`, `design/CHANGELOG.md`, and
   `design/manifest.json`.
2. Update the matching route listed in `design/manifest.json`.
3. Keep `src/lib/component-registry.ts` aligned with `DESIGN.md`.
4. Capture light and dark screenshots for affected routes.
5. Add a `design/CHANGELOG.md` entry with the future agent action.

Use the top-right toolbar to switch between component pages and full page
samples. The component selector and page selector are driven by
`src/lib/component-registry.ts`.

Press **⌘K** anywhere to open the command palette.

## Implemented routes

Every route in `src/lib/component-registry.ts` is implemented. Component routes
live under `/components/<slug>` and full-page samples live under
`/pages/<slug>`. Page samples that benefit from server state
(`main-view`, `full-application-page`, `settings-page`) use TanStack Query
against mock fetchers in `src/lib/query/mock.ts` — open the React Query
Devtools (bottom-right in dev) to watch them fire.
