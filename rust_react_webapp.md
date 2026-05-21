# React Single-Page Web Apps with Vite + TanStack

Opinionated stack guide for **React-specific, browser-rendered web app
frontends**: a React + Vite SPA that uses shadcn/ui (Radix-based) for UI
components and TanStack Router + TanStack Query for routing and server state,
shipped as static assets to any HTTP host (nginx, S3+CloudFront, Cloudflare
Pages, GitHub Pages, embedded into a Rust binary, etc.). Library picks, why,
and the gotchas that bit us.

This is an archetype guide, not a generic React style guide, React Native
guide, Next.js / RSC guide, or full-stack BFF template. Keep React 19 +
Vite as the frontend assumption, TanStack Router as the router, TanStack
Query as the default server-state layer, Tailwind 4 + shadcn/ui as the UI
component baseline, and align all UI with [`DESIGN.md`](./DESIGN.md)
and its split `design/` component specs; adapt the replaceable defaults below
only when a project has a concrete reason.

## Scope

Use this for React frontends that ship as a static SPA, own their UI
component system, and call a backend HTTP API (or embed inside a backend
binary as static assets). Do not use it as the default for Next.js
RSC/server-component projects, React Native apps, Remix/React Router data
loader-first apps, micro-frontend orchestration, or pure component libraries.

## Architecture assumptions

This guide assumes:

- The product ships as a static SPA (build output is a folder of HTML +
  hashed JS/CSS).
- A separate backend serves the HTTP API under a documented base URL or
  same-origin `/api`.
- Browser server/API state uses TanStack Query by default.
- Browser routing uses TanStack Router (file-based, type-safe).
- The visual contract for UI primitives comes from `DESIGN.md` and the
  matching files in `design/`.
- Deployment is via static host or reverse proxy; the SPA shell is served as
  fallback for unknown paths so deep-linked client routes survive direct
  navigation.

If these assumptions do not hold, treat this file as inspiration, not a
template.

## When not to use this

Do not start from this guide if:

- The app needs server-side rendering or React Server Components.
- The frontend is built with Next.js / Remix / Astro / Nuxt and that
  decision is fixed.
- The product is a React Native mobile app.
- The frontend is part of a federated micro-frontend host that already
  imposes module-level boundaries.
- The project is a published React component library crate.

## Replaceable defaults

React + Vite is the fixed frontend assumption for this guide. shadcn/ui is
the default UI component system: use it for buttons, forms, dialogs, menus,
tables, cards, navigation, and other reusable UI primitives. TanStack Query
is the default server/API state layer for browser UI that talks to the
backend. TanStack Router is the default browser router. The visual and
interaction contract for UI primitives comes from
[`DESIGN.md`](./DESIGN.md) and the matching file in `design/`;
treat those files as the frontend design SSOT. These defaults are replaceable
only when the project has a concrete operational or product reason recorded
in the feature plan or README:

| Default | Replace when | Common alternative |
|---|---|---|
| TanStack Router | App is one screen, or a strict SSR/RSC requirement makes Next.js mandatory | React Router, file-based Next.js router |
| TanStack Query | App is tiny enough that direct `fetch` is clearer, or the project chose RTK Query / SWR before this guide existed | RTK Query, SWR, Apollo Client (GraphQL only) |
| shadcn/ui (Radix + tailwind-variants) | Product has an established design system and the feature plan documents the replacement | Mantine, Chakra, MUI, in-house |
| Tailwind 4 (CSS-first `@theme`) | Org standardizes on CSS-in-JS / Panda / Vanilla Extract for compile-time strictness | Panda, Vanilla Extract, plain CSS modules |
| `useSyncExternalStore` hooks for client state | Real shared client state grows complex (multiplayer cursors, optimistic mutation chains, deep selectors) and tests prove the pattern is paying for itself | Zustand, Jotai, Redux Toolkit |
| Bun | Org standardizes on Node/pnpm/npm | pnpm or npm |
| Static nginx serving | Need SSR, edge functions, RSC | Vercel, Cloudflare Pages, Rust + `rust-embed` |
| `npx shadcn add` source-of-truth | Components diverged enough that CLI churn is now net-negative | Owned-in-tree primitives without `components.json` |

> This file is the shared SSOT for this stack. App repos should reference it
> directly instead of keeping local copies. Index lives in
> [`README.md`](./README.md) of this repo.

---

## Mission shape

- **Single static build.** `bun run build` → folder of HTML + hashed assets.
  No runtime Node server in production unless the host explicitly needs one.
- **Routing + server-state-first.** TanStack Router handles client routing
  and code-splitting; TanStack Query handles cache, refetch, retry, mutation,
  optimistic update, and invalidation.
- **Owned-in-tree UI.** shadcn/ui generates source files into
  `src/components/ui/`; review them like app code. No runtime UI library.
- **Plans live in `docs/plans/`; this file remains the frontend architecture
  SSOT.** No feature without a plan.

---

## Workspace layout

```
package.json             # bun workspace root, dev scripts
bun.lock                 # lockfile (text)
vite.config.ts           # Vite + TanStack Router plugin + Tailwind plugin
tsconfig.json            # strict, bundler resolution, @/ alias
components.json          # shadcn CLI config
index.html               # SPA shell, pre-hydration theme script
src/
  main.tsx               # QueryClientProvider + RouterProvider + theme init
  app.css                # Tailwind v4 @theme, semantic tokens, base layer
  routeTree.gen.ts       # auto-generated by router plugin (gitignored)
  routes/                # file-based routes (TanStack Router)
    __root.tsx           # layout shell
    index.tsx            # root redirect or landing
    <segment>/<page>.tsx
  components/
    ui/                  # shadcn/ui primitives (owned in tree)
    <feature>/           # feature composites
  hooks/                 # useAppearance, useCommandPalette, ...
  lib/
    utils.ts             # cn() helper (clsx + tailwind-merge)
    query/               # query client config + key factories + mock fetchers
  vite-env.d.ts
```

The router plugin generates `routeTree.gen.ts` at dev/build time. Gitignore
it.

---

## Frontend stack

| Concern | Pick | Why |
|---|---|---|
| Framework | **React 19** | Server-aware hooks (`useTransition`, `useDeferredValue`, `useOptimistic`, `use` for promises), automatic batching, ref-as-prop. |
| Bundler / dev server | **Vite** with `@vitejs/plugin-react` | Fast HMR, ESM-native dev, mature production bundler. |
| Router | **TanStack Router** (`@tanstack/react-router` + `@tanstack/router-plugin`) | File-based routes, type-safe links, search-params API, code splitting, `defaultPreload: "intent"`. |
| Server/API state | **TanStack Query v5** (`@tanstack/react-query`) | Cache, refetch, retry, mutation, optimistic update, invalidation. Stack default. |
| Styling | **Tailwind v4** (`@tailwindcss/vite`) with CSS-first `@theme` | Tokens declared in `app.css`, utilities generated on demand. |
| UI components | **shadcn/ui** (Radix + `tailwind-variants`) via `npx shadcn@latest add` | Owned-in-tree files. Visual contract from `DESIGN.md`. |
| Class merge | `clsx` + `tailwind-merge` via `cn()` | Standard shadcn pattern. |
| Variant maps | `tailwind-variants` (`tv`) | Same as shadcn upstream. |
| Local UI state | Plain React + `useSyncExternalStore` module-state hooks | Pattern lifted from Laravel React starter kit's `use-appearance`. No store library needed for most apps. |
| Icons | `lucide-react` | shadcn default. |
| Toasts | `sonner` | shadcn default. |
| Command palette | `cmdk` | shadcn default. |
| Forms | `react-hook-form` + `zod` | For non-trivial forms. Simple inputs stay uncontrolled or controlled by `useState`. |
| Package manager + runtime | **bun** | One binary for install + run + lockfile. |
| Linting | Prettier + the IDE TS server | Optional ESLint; keep config minimal. |
| Tests | Vitest (unit/component) + Playwright (E2E later) | Vitest reuses Vite config. |
| TypeScript | `strict: true`, `verbatimModuleSyntax: true` (optional), `paths: { "@/*": ["./src/*"] }` | Standard. |

### Frontend design contract

- Use [`DESIGN.md`](./DESIGN.md) as the router for all React UI.
  It points to the component/page spec that must be followed before writing
  TSX markup.
- Start each reusable UI element from the closest shadcn/ui primitive (`npx
  shadcn@latest add <name>`), then apply the Coolify visual decisions,
  variants, spacing, typography, states, and accessibility requirements from
  the matching `design/` Markdown file.
- Coolify visual contract layered on top of shadcn defaults: sharp 4px radii
  (`--radius: 0.25rem`), inset-shadow inputs with 4px left dirty/focus bar
  (not a real `border`), purple `coollabs` light / yellow `warning` dark
  accent swap mapped to `--ring`, semantic palette (success green, warning
  yellow, destructive red) kept raw where it signals real status.
- Do not invent ad-hoc styles when a spec is missing — use only documented
  primitives and record the gap in the feature plan.
- New pages and component wrappers must pass `bun run typecheck`, `bun run
  build`, and the matching design spec's review checklist.

### shadcn/ui setup

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

- Add primitives with `bunx shadcn@latest add <name>`. Commit the generated
  files. Patch class strings to match the Coolify visual contract (radii,
  inset shadow, dirty bar) after adding.
- Alias shadcn semantic tokens (`--background`, `--foreground`, `--card`,
  `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`,
  `--destructive`, `--border`, `--input`, `--ring`, `--radius`) onto the
  Coolify palette in `:root` + `.dark` overrides. Mirror raw vars into
  `@theme inline { --color-* }` so Tailwind utilities (`bg-primary`,
  `text-muted-foreground`, `ring-ring`) work everywhere.
- `--primary` / `--accent` / `--ring` may swap per mode where the visual
  contract calls for the purple/yellow swap (focus rings, text accents).
  Components whose Coolify spec uses brand purple in **both** modes (e.g. the
  `highlighted` button background) must use the raw `coollabs` palette token,
  not `--primary`.

### TanStack Router gotchas

- Use the file-based router. Enable `autoCodeSplitting` in the Vite plugin.
- Pin one `QueryClient` at module scope; pass it to `QueryClientProvider`
  above `<RouterProvider>`. Tests create a fresh `QueryClient` per test and
  disable retries unless retry is under test.
- `defaultPreload: "intent"` keeps navigation snappy without prefetching
  everything.
- For SPA hosting under a path prefix (e.g. `/react/`), set
  `base: process.env.BASE_PATH ?? "/"` in `vite.config.ts` and
  `basepath: import.meta.env.BASE_URL.replace(/\/$/, "") || undefined` on the
  router. SPA shell must be served as fallback for unknown paths under that
  prefix.
- Define stable query-key factories next to API client modules, e.g.
  `projectKeys.list(filters)`, `projectKeys.detail(id)`. Never build keys
  from mutable objects whose identity changes every render.
- Mutations must explicitly update or invalidate every affected query key.
  Add at least one integration test for one create/update/delete mutation so
  stale list/detail views are caught early.

### Local UI state without a library

The Laravel React starter kit ships a `use-appearance.tsx` hook using
`useSyncExternalStore` over module-scoped state. Same pattern works for
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

- Persist to `localStorage` from inside the setter for state that must
  survive reload (theme, sidebar collapsed). Hydrate via a pre-React inline
  script in `index.html` to avoid FOUC.
- Add Zustand / Jotai only when client state grows complex enough that
  hand-rolled subscribers become a maintenance burden — write a feature plan
  entry documenting the reason.

### Tailwind 4 + theme

- Declare raw palette in `@theme { --color-coollabs: #6b16ed; ... }`.
- Declare shadcn semantic vars in `:root` + `.dark` overrides.
- Mirror them into Tailwind via `@theme inline { --color-background:
  var(--background); ... --radius-sm: var(--radius); }`.
- Use `@custom-variant dark (&:where(.dark, .dark *));` to keep `dark:`
  prefixes working with class-based dark mode.
- Pre-hydration inline script in `index.html` reads localStorage theme key
  and toggles `.dark` on `<html>` before main bundle loads.

---

## Routing / deployment shape

### Static SPA

- `bun run build` → `dist/` (Vite default).
- Serve `dist/` from any static host. Configure SPA fallback so unknown
  paths under the app's prefix serve `index.html` (deep-link survival).
- Nginx pattern for path-prefixed deployment:

  ```nginx
  location = /myapp { return 301 /myapp/; }
  location /myapp/ {
    try_files $uri /myapp/index.html;
  }
  ```

  Avoid `$uri/` (forces trailing-slash 301s when a same-named directory
  exists in the prerendered output).

### Path-prefixed builds

- Build with `BASE_PATH=/myapp/ bun run build`. Vite rewrites all asset URLs
  to start with `/myapp/`.
- Router picks the prefix up via `import.meta.env.BASE_URL`. Don't hardcode
  it in route definitions.
- TanStack Router file-based paths stay logical (`/components/buttons`); the
  basepath is applied at runtime.

### Embedded into a Rust/Go/Node binary

- Build to `dist/`. The host binary embeds via `rust-embed` (Rust),
  `embed.FS` (Go), or `import.meta.glob` (Node).
- Host serves `index.html` as fallback for unknown paths. API routes live
  under `/api/...`.

---

## Hardening

### CSP and security headers

When self-hosting (nginx fronting the static build, or a backend serving
both API + SPA), enforce:

- `Content-Security-Policy` — baseline:
  `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; form-action 'self'`.
  Vite's production HTML usually has no inline scripts (the pre-hydration
  theme script is the exception — either keep `'unsafe-inline'` for scripts
  while the inline theme bootstrapper exists, add a nonce/hash, or move
  theme bootstrap into a module). Inline `<style>` from Tailwind's CSS file
  is fine.
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` (extend per
  product).
- `Strict-Transport-Security` only when the public base URL is HTTPS; never
  on localhost HTTP.

### Asset caching

- Vite emits hashed asset filenames under `assets/`. Serve those with
  `Cache-Control: public, immutable, max-age=31536000`.
- Serve `index.html` with short or no-cache headers so deploys pick up new
  asset hashes.

### Cross-origin

- If the API is on a different origin than the SPA, configure CORS
  explicitly on the API side. Never combine credentialed browser auth with
  wildcard `Access-Control-Allow-Origin: *`.
- Prefer same-origin deployment (reverse proxy serves both `/` and `/api`).
  Removes CORS, simplifies cookies.

---

## Testing strategy

Three layers, in increasing realism:

1. **Unit** — Vitest. Pure logic, hooks via `@testing-library/react`'s
   `renderHook`. No real network.
2. **Component / integration** — Vitest + `@testing-library/react`. Mount
   pages with a fresh `QueryClient` (retries off), mock fetchers from
   `src/lib/query/`. Assert at least one mutation invalidates affected list
   queries.
3. **E2E** — Playwright against a built SPA (`bun run preview`) or against
   the production reverse-proxy URL. Defer until UI has interactive flows
   worth scripting (auth, multi-step forms, command palette).

CI runs `bun run typecheck`, `bun run build`, and (when present) `bun run
test`. Fail the job on type errors or build errors.

---

## One-command local dev

```bash
bun install
bun dev
```

`vite.config.ts` should set `server: { host: "0.0.0.0" }` only when needed
(LAN testing). Default to `127.0.0.1` to avoid exposing dev servers on
public networks.

For a paired backend (e.g. Rust archetype + this React SPA in the same
repo), a root-level `scripts/dev.sh` starts both with shared lifecycle (see
[`rust_svelte_webapp.md`](./rust_svelte_webapp.md) "One-command local
dev").

---

## Hard rules learned (grep monthly)

1. **Bound every list render.** If a list can grow without limit (logs,
   tail, search results), virtualize (`@tanstack/react-virtual`) or paginate
   server-side.
2. **No `useEffect` for derived state.** Compute during render or via
   `useMemo`. `useEffect` is for synchronizing with external systems.
3. **No `useEffect` for data fetching.** Use TanStack Query.
4. **Query keys are stable factories.** Never build a key from a
   freshly-allocated object literal at every render.
5. **Mutations invalidate or update.** A `useMutation` that does neither
   leaves stale data on the screen.
6. **`data-slot="<name>"` on every primitive root.** shadcn convention;
   downstream consumers depend on it for nested styling.
7. **shadcn primitives reference semantic tokens.** `bg-card`,
   `text-muted-foreground`, `border-input`, `ring-ring`, not raw palette
   colors, unless the Coolify spec explicitly requires a non-swapping
   brand color (e.g. the `highlighted` button background uses raw
   `coollabs`).
8. **Theme bootstrap before React.** Inline script in `index.html` reads
   localStorage and toggles `.dark` before the main bundle loads, otherwise
   the first paint flashes the wrong theme.
9. **Frontend UI follows `DESIGN.md`.** Before implementing or
   changing UI, open `DESIGN.md`, follow the matching `design/` spec,
   and complete its review checklist.
10. **Default UI components are shadcn/ui.** Add components with `bunx
    shadcn@latest add ...`; do not introduce another component library
    unless the feature plan documents the concrete reason.
11. **Default server/API state is TanStack Query.** Shared displayed API
    data and mutations go through `@tanstack/react-query`; direct `fetch`
    is for one-off/no-cache calls only.
12. **Default router is TanStack Router file-based.** Add a search-param
    schema for filters that need URL state.
13. **Static SPA fallback uses `index.html`.** Configure the nginx /
    backend / Vite preview to serve `index.html` for unknown paths under
    the app's prefix. Don't ship `404.html`.
14. **Path-prefixed deploys set Vite `base` AND router `basepath`.** Setting
    only one breaks asset URLs or breaks navigation.
15. **`dark:` siblings come off once a token encodes the swap.** Keep
    `dark:` only where the swap is asymmetric (not encoded by `--primary` /
    `--card` / etc.).
16. **Plans before code.** One commit per task.

---

## Coollabs defaults (opinionated — adjust to taste)

- **Conventional Commits.** Subject under 72 chars, body explains *why*.
- **TypeScript strict.** `tsc --noEmit` is a CI gate.
- **AGPL-3.0-or-later** for self-host-friendly OSS at coollabs.
- One frontend, one route tree, one `QueryClient`. Multiple `QueryClient`
  instances usually signal a missing test seam, not a real architectural
  need.
- Theme persistence key is app-scoped (e.g. `coolify-react-theme`) to avoid
  collisions when multiple Coolify apps share a host.

---

## New-project checklist

1. Confirm this archetype fits: React SPA, Vite, TanStack Router, TanStack
   Query, shadcn/ui, deployed to a static host (or embedded into a backend
   binary).
2. Review replaceable defaults and record any project-specific swaps in the
   feature plan or README; keep this file as the shared architecture SSOT.
3. `bun create vite@latest <app> -- --template react-ts` (or copy from
   `mockups/shadcn-react-sample`).
4. Pin deps: `react@19`, `react-dom@19`, `@tanstack/react-router`,
   `@tanstack/router-plugin`, `@tanstack/react-query`,
   `@tanstack/react-query-devtools`, `@tailwindcss/vite`, `tailwindcss@4`,
   `tailwind-variants`, `clsx`, `tailwind-merge`, `lucide-react`, `sonner`,
   `cmdk`, plus the Radix packages each shadcn primitive needs.
5. `bunx shadcn@latest init` (interactive once) → commit `components.json`.
6. Add Tailwind v4 to `vite.config.ts` via `@tailwindcss/vite`. Configure
   `TanStackRouterVite({ target: "react", autoCodeSplitting: true })` and
   `react()`. Set `resolve.alias["@"] = path.resolve("./src")`.
7. Write `src/app.css`: import Tailwind, declare `@theme` raw Coolify
   palette + `@theme inline` shadcn semantic-token alias layer, declare
   `:root` / `.dark` semantic CSS vars, add `@custom-variant dark`, body
   defaults in `@layer base`.
8. Write `index.html`: pre-hydration inline script reading
   `localStorage.<theme-key>` and toggling `.dark` before main bundle loads.
9. `src/hooks/use-appearance.tsx`: `useSyncExternalStore` over module state,
   `initializeTheme()` to be called once from `src/main.tsx` before
   `createRoot`. Persist mode to localStorage; sync via `matchMedia` for
   `system`.
10. `src/main.tsx`: build a `QueryClient` with
    `defaultOptions.queries.staleTime`, mount `<QueryClientProvider>` +
    `<RouterProvider>` + `<Toaster>` + dev-only `<ReactQueryDevtools>`.
    Call `initializeTheme()` before render.
11. `src/routes/__root.tsx`: layout shell with `<Outlet/>`.
12. Per `DESIGN.md`: add primitives via shadcn CLI, patch class
    strings to match the Coolify visual contract (4px radii, inset-shadow
    inputs with 4px dirty bar, purple/yellow ring swap).
13. `src/lib/query/`: API client + stable query key factories +
    development-time mock fetchers.
14. Configure deployment: pick static SPA, path-prefixed SPA, or embedded.
    Wire SPA fallback in the host (nginx, Rust binary, etc.).
15. CI: `bun install --frozen-lockfile`, `bun run typecheck`, `bun run
    build`. Add Vitest job once tests exist.
16. Add docs: feature plan(s) in `docs/plans/`, mention `DESIGN.md`
    + `design/` review checklist requirement in `README.md`.
