# syntax=docker/dockerfile:1.7

# ---------- Stage 1: React build ----------
FROM oven/bun:1.3 AS react-builder
WORKDIR /app
COPY mockups/shadcn-react-sample/package.json ./
RUN bun install
COPY mockups/shadcn-react-sample/. ./
RUN bun run build

# ---------- Stage 2: nginx runtime ----------
FROM nginx:1.27-alpine AS runtime
RUN rm -rf /usr/share/nginx/html/*
COPY --from=react-builder /app/dist/  /usr/share/nginx/html/
COPY docker/nginx.conf                /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]
