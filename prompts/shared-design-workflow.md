# Shared Coolify Design Prompt Workflow

Use this workflow from every prompt under `prompts/` that creates, migrates, or reviews UI/design/mockup work.

## Source of truth

Read these files first, in order:

1. `DESIGN.md`
2. `design/tokens.md`
3. latest relevant entries in `design/CHANGELOG.md`
4. `design/manifest.json`
5. every relevant migrated component/page spec found through `design/manifest.json`
6. `design/REVIEW_CHECKLIST.md` when implementing, migrating, or reviewing concrete changes

Treat local docs as source of truth over memory, generated output, or older snippets.

## Manifest rules

- Use `design/manifest.json` to map UI needs to design specs and mock routes.
- Do not keep a hard-coded migrated-component list in prompts.
- Read each mapped `design/...md` file before implementing or reviewing that component.
- Prefer mock routes from the manifest for visual nuance.
- If a needed component is `Pending` or missing, keep markup minimal and explicitly report the spec gap instead of inventing detailed styling.

## Global visual contract

Follow these unless a component spec says otherwise:

- Dense, sharp, operational UI.
- Shadcn-Svelte primitive first, Coolify visual layer second.
- Light accent: `coollabs` purple.
- Dark accent/focus: `warning` yellow.
- Dark operational surfaces: `coolgray-*`.
- Default radius: `rounded-sm`.
- Default controls: compact, usually `h-8`, `px-2`, `gap-2`, `text-sm`.
- Prefer flat bordered or inset-shadow surfaces.
- Avoid undocumented gradients, soft shadows, large radii, decorative depth, and marketing spacing.

## Implementation and review rules

Do:

- preserve behavior, routes, data flow, accessibility, and public APIs unless a spec requires a structural change;
- use documented primitives, variants, compositions, tokens, states, density, spacing, radius, and layout rules;
- verify light and dark behavior when colors, focus rings, or surfaces change;
- check changed work against `design/REVIEW_CHECKLIST.md`.

Do not:

- redesign beyond documented specs;
- create undocumented variants or one-off style systems;
- use raw booleans where documented Shadcn-Svelte-style variants or states exist;
- copy mockup-only details that contradict Markdown specs;
- introduce Laravel, Blade, Livewire, Alpine, PHP, or unrelated project-specific details into Shadcn-Svelte specs.

## Spec gap response

Use this pattern when a spec is missing or pending:

```md
Spec gap found:

- UI need: ...
- Missing/pending spec: ...
- Temporary implementation: minimal semantic markup only
- Follow-up needed: create/update `design/...md` before detailed styling
```

## Required final response

For UI/design/mockup changes, include:

```md
## Design files read

- `DESIGN.md`
- `design/tokens.md`
- `design/CHANGELOG.md`
- `design/manifest.json`
- `design/...`

## Files changed

- `path`

## Alignment summary

- changed X to match `design/...`
- removed Y because undocumented
- preserved Z behavior

## Mockups checked

- route/path or “none available in manifest”

## Checklist result

- pass/fail against `design/REVIEW_CHECKLIST.md`

## Validation

- commands run
- commands skipped and why

## Remaining design gaps

- missing/pending specs, if any
```

## Suggested validation commands

Run project-appropriate checks, for example:

```bash
bun run check
bun run lint
bun run test
bun run build
```

For design-doc or prompt workflow changes, run:

```bash
bun run design:manifest
bun run design:check
```

For the mockup sandbox, run:

```bash
cd mockups/shadcn-svelte-sample
bun run check
bun run build
```
