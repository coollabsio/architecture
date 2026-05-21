---
name: coolify-design-system
description: Use for Coolify UI/design-system guidance, shadcn/ui (React) components, Tailwind styling, design.md component specs, mockups, tokens, light/dark theme behavior, and AI UI/design review. Before relying on guidance, use the latest https://github.com/coollabsio/architecture content.
---

# Coolify Design System

Use the latest `coollabsio/architecture` repository as the source of truth for Coolify UI/design decisions.

## Freshness rule

Before applying guidance, ensure repository content is current:

- If already inside a local clone of `https://github.com/coollabsio/architecture`, fetch/pull latest changes before reading files.
- If not inside a clone, obtain or inspect the latest GitHub content before relying on local/stale copies.
- Do not treat copied snippets, old checkouts, or memory as authoritative when the repository is available.

## When to use

Use this skill for:

- Coolify visual language and product UI decisions.
- shadcn/ui (React) + Tailwind component implementation.
- Design-doc edits, migrations, reviews, and mockup updates.
- Component/page specs following `google-labs-code/design.md`.
- Light/dark theme behavior, tokens, spacing, radius, density, focus, loading, empty, disabled, and error states.

Do not use this skill for backend architecture unless UI/design behavior is involved.

## Required reading order

Before UI implementation, design-doc editing, or mockup updates, read:

1. `README.md` for repository context.
2. `DESIGN.md` as the design-system index/router.
3. `design/tokens.md` for shared tokens.
4. Latest relevant entries in `design/CHANGELOG.md`.
5. `design/manifest.json` to locate component/page specs and mock routes.
6. Every relevant migrated `design/...md` spec found through the manifest.
7. `design/REVIEW_CHECKLIST.md` before implementation/review is considered complete.

If a needed spec is pending or missing, do not invent detailed styling. Keep markup minimal and call out the spec gap.

## Design reminders

Preserve these traits unless the current docs say otherwise:

- Light mode accent: Coollabs purple.
- Dark mode accent/focus: warning yellow; never use purple as the general dark-mode accent.
- Dense, dark-first, utilitarian operational UI.
- Sharp 4px radii by default.
- Compact controls, usually `h-8`, `px-2`, `gap-2`, `text-sm`.
- Inset box-shadow inputs with a 4px dirty/focus bar where specified.
- Prefer shadcn/ui primitives first, Coolify visual layer second.
- Avoid undocumented gradients, large radii, glossy effects, marketing spacing, and decorative shadows.

## After UI/design changes

After any UI/design/mockup change:

1. Check work against `design/REVIEW_CHECKLIST.md`.
2. Regenerate `design/manifest.json` with `bun run design:manifest` if lookup table, paths, statuses, or mock routes changed.
3. Update `design/CHANGELOG.md` with the design change and future agent action.
4. Update matching mockups/screenshots when visual behavior changes.
5. Report design files read, relevant specs, mock routes checked, and validation commands run.

## Useful commands

Use project scripts when available:

```bash
bun run design:manifest
bun run design:check
bunx @google/design.md lint design/forms/button.md
bunx @google/design.md export design/forms/button.md --format tailwind > theme.json
bunx @google/design.md export design/forms/button.md --format dtcg > tokens.json
```

Use `bunx` for `@google/design.md`; `npx` may mishandle the `.md` package suffix.
