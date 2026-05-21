---
name: rust-single-binary-web-apps
description: Use for self-hostable Rust web app/service architecture with one deployable binary, Axum, SQLx, SQLite, embedded SvelteKit/Shadcn-Svelte frontend assets, filesystem blobs, swappable Postgres/S3 traits, TanStack Query, and operational CLI/admin patterns. Before relying on guidance, use the latest https://github.com/coollabsio/architecture content.
---

# Rust Single-Binary Web Apps

Use the latest `coollabsio/architecture` repository as the source of truth for Rust web app/service architecture.

## Freshness rule

Before applying guidance, ensure repository content is current:

- If already inside a local clone of `https://github.com/coollabsio/architecture`, fetch/pull latest changes before reading files.
- If not inside a clone, obtain or inspect the latest GitHub content before relying on local/stale copies.
- Do not treat copied snippets, old checkouts, or memory as authoritative when the repository is available.

## When to use

Use this skill for:

- Rust web app/service architecture decisions.
- Single-binary self-hostable product design.
- `axum`, `sqlx`, SQLite, migrations, embedded frontend assets, and static serving.
- SvelteKit SPA integration when discussed as part of Rust service architecture.
- TanStack Query patterns for Rust-owned API/server state.
- Filesystem blob storage by default, with S3/Postgres swappable behind traits when justified.
- Operational CLI/admin/maintenance subcommands in the same Rust binary.
- Bootstrap checklists, hard rules, and gotchas for new Rust services.

Do not use this skill for detailed UI styling or component compliance; use the Coolify design-system skill for that.

## Required reading order

Before giving architecture guidance or implementation recommendations, read:

1. `README.md` for repository context and stack index.
2. `rust_svelte_webapp.md` for the actual Rust web app/service guidance.
3. Relevant design docs only if the Rust work includes UI/component behavior:
   - `DESIGN.md`
   - `design/tokens.md`
   - `design/manifest.json`
   - relevant `design/...md` specs

If the user's project does not match the doc's stated scope, say so and treat the doc as inspiration, not a template.

## Architecture reminders

Preserve these assumptions unless the current docs say otherwise:

- One self-hostable Rust binary.
- Rust server owns HTTP API and static frontend serving.
- SvelteKit SPA can be embedded into the binary.
- SQLite and filesystem blobs are defaults.
- Postgres/S3 are swappable via traits when justified.
- Admin and maintenance actions live as CLI subcommands in the same binary.
- Prefer documented project rules over generic framework defaults.

## Output expectations

When giving recommendations:

- Mention the source file or section used, especially `rust_svelte_webapp.md`.
- Separate hard rules from optional tradeoffs.
- Call out scope mismatches, version-sensitive behavior, and operational consequences.
- Prefer concrete file/module boundaries, commands, and migration paths over abstract advice.
