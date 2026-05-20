# Docker — combined sandbox image

Multi-stage `Dockerfile` (repo root) builds both mockups and serves them via
nginx in a single container:

| Path | Sandbox |
|---|---|
| `/` | Landing page (`docker/index.html`) — links to both. |
| `/svelte/` | SvelteKit mockup (`mockups/shadcn-svelte-sample`) built with `BASE_PATH=/svelte`. |
| `/react/` | React mockup (`mockups/shadcn-react-sample`) built with `BASE_PATH=/react/`. |

Both SPAs use `try_files $uri /<prefix>/index.html` so deep links survive
reloads.

## Build + run locally

```bash
docker build -t coollabs-mockups .
docker run --rm -p 8080:80 coollabs-mockups
open http://localhost:8080
```

Smoke check (in another shell):

```bash
for u in / /svelte/ /react/ /svelte/components/buttons /react/pages/main-view; do
  curl -s -o /dev/null -w "%{http_code} $u\n" http://localhost:8080$u
done
```

## Notes

- Svelte build sets `paths.base` via `BASE_PATH=/svelte` (see
  `mockups/shadcn-svelte-sample/svelte.config.js`).
- React build sets Vite `base` via `BASE_PATH=/react/` and the TanStack Router
  picks it up via `import.meta.env.BASE_URL` in `src/main.tsx`.
- Prerender on the Svelte side is configured with `handleHttpError: "ignore"`
  because the mockup has hardcoded `/components/*` and `/pages/*` hrefs that
  bypass the `base` prefix; the SPA shell handles them at runtime.
- Nginx runs as `nginx:1.27-alpine`. No volumes — image is self-contained.
- `.dockerignore` excludes `node_modules`, build outputs, and dotfiles.
