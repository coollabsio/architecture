# Docker — React mockup image

Multi-stage `Dockerfile` (repo root) builds the React mockup
(`mockups/shadcn-react-sample`) and serves it via nginx in a single
container at `/`.

The SPA uses `try_files $uri /index.html` so deep links survive reloads.

## Build + run locally

```bash
docker build -t coollabs-mockups .
docker run --rm -p 8080:80 coollabs-mockups
open http://localhost:8080
```

Smoke check (in another shell):

```bash
for u in / /components/buttons /pages/main-view; do
  curl -s -o /dev/null -w "%{http_code} $u\n" http://localhost:8080$u
done
```

## Notes

- React build runs `bun run build` → `dist/`, copied to nginx web root.
  Vite `base` stays `/`; TanStack Router serves from root.
- Nginx runs as `nginx:1.27-alpine`. No volumes — image is self-contained.
- `.dockerignore` excludes `node_modules`, build outputs, and dotfiles.
