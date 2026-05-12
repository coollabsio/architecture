---
name: coollabs-architecture
description: Use for Coollabs architecture decisions, Coolify design-system guidance, self-hostable product architecture, and Rust single-binary web apps with SvelteKit, shadcn-svelte, SQLite, embedded frontend assets, and operational CLI patterns. Before relying on guidance, use the latest https://github.com/coollabsio/architecture content.
---

# Coollabs Architecture

Use the latest `coollabsio/architecture` repository as the source of truth.

## Freshness rule

Before applying guidance, ensure repository content is current:

- If already inside a local clone of `https://github.com/coollabsio/architecture`, fetch/pull latest changes before reading files.
- If not inside a clone, obtain or inspect the latest GitHub content before relying on local/stale copies.
- Do not treat copied snippets, old checkouts, or memory as authoritative when the repository is available.

## How to use

1. Read `README.md` first. Treat it as the index.
2. Select the relevant source file:
   - Design, UI, Tailwind, Livewire, Coolify visual language, components, colors, spacing, and AI UI review: read `DESIGN.md`.
   - Rust web apps/services with SvelteKit, shadcn-svelte, SQLite, embedded frontend, `axum`, `sqlx`, single-binary deployment, and CLI/admin operations: read `RUST_WEB_APP_SERVICES.md`.
3. Apply the guidance directly. Prefer repository rules over generic framework defaults.
4. Mention the file path or section used when giving recommendations.
5. If the user's project does not match a doc's stated scope, say so and treat the doc as inspiration, not a template.

## Design reminders

When using `DESIGN.md`, preserve these signature traits unless the doc has changed:

- Light mode accent: Coollabs purple.
- Dark mode accent: warning yellow; never purple as the dark-mode accent.
- Sharp 4px radii by default.
- Inset box-shadow inputs with a 4px dirty-bar indicator.
- Dark-first, utilitarian UI.

## Rust web app reminders

When using `RUST_WEB_APP_SERVICES.md`, preserve these assumptions unless the doc has changed:

- One self-hostable Rust binary.
- Rust server owns HTTP API and static frontend serving.
- SvelteKit SPA embedded into the binary.
- SQLite and filesystem blobs by default.
- Postgres/S3 are swappable via traits when justified.
- Admin and maintenance actions live as CLI subcommands in the same binary.
