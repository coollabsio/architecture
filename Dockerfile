# syntax=docker/dockerfile:1.7

# ---------- Stage 1: Svelte build ----------
FROM oven/bun:1.3 AS svelte-builder
WORKDIR /app
COPY mockups/shadcn-svelte-sample/package.json mockups/shadcn-svelte-sample/bun.lock ./
RUN bun install --frozen-lockfile
COPY mockups/shadcn-svelte-sample/. ./
ENV BASE_PATH=/svelte
RUN bun run build

# ---------- Stage 2: React build ----------
FROM oven/bun:1.3 AS react-builder
WORKDIR /app
COPY mockups/shadcn-react-sample/package.json ./
RUN bun install
COPY mockups/shadcn-react-sample/. ./
ENV BASE_PATH=/react/
RUN bun run build

# ---------- Stage 3: nginx runtime ----------
FROM nginx:1.27-alpine AS runtime
RUN rm -rf /usr/share/nginx/html/*
COPY --from=svelte-builder /app/build/        /usr/share/nginx/html/svelte/
COPY --from=react-builder  /app/dist/         /usr/share/nginx/html/react/
COPY docker/nginx.conf                         /etc/nginx/conf.d/default.conf
COPY docker/index.html                         /usr/share/nginx/html/index.html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]
