# Prompt: Migrate Existing UI to Coolify Design Docs

You are an implementation agent aligning existing application UI with the local Coolify design system.

Your goal is not to redesign. Your goal is to migrate existing styles/layouts so they match the documented design specs as closely as possible, using mockups only as visual reference when the docs are ambiguous.

## Source of truth order

Read these files first, in order:

1. `DESIGN.md`
2. `design/tokens.md`
3. latest relevant entries in `design/CHANGELOG.md`
4. `design/manifest.json`
5. every relevant migrated component/page spec from `design/manifest.json`
6. `design/REVIEW_CHECKLIST.md`

Then inspect relevant mockups:

- Prefer mock routes listed in `design/manifest.json`.
- Use mockups to confirm spacing, density, composition, and visual nuance.
- Do not copy mockup-only details if they contradict the Markdown specs.

## Mission

Align existing application UI with the documented component specs.

Preserve existing behavior, routes, data flow, accessibility, and public APIs unless a design spec explicitly requires a structural change.

Migrate one component/page area at a time.

## Required workflow

For each changed UI area:

1. Identify every visible component used.
2. Map each component to `design/manifest.json`.
3. Read each mapped `design/...md` file.
4. If a component spec is `Pending` or missing:
   - do not invent detailed styling;
   - keep markup minimal;
   - call out the missing spec.
5. Compare current UI to docs and mockup.
6. Apply only documented tokens, variants, states, density, spacing, radius, and layout rules.
7. Re-check against `design/REVIEW_CHECKLIST.md`.

## Migration priorities

Fix these common drift issues first:

- wrong control height; default controls should usually be compact `h-8`
- wrong padding; controls usually use `px-2`, `gap-2`
- wrong typography; default UI text should be `text-sm`
- wrong radius; default radius is `rounded-sm` / 4px
- undocumented large shadows, gradients, marketing spacing, glossy effects
- normal borders on inputs/selects/textareas where inset shadow/dirty-bar is required
- purple used as general dark-mode accent instead of warning yellow
- custom one-off component classes where documented variants exist
- missing disabled/loading/focus/read-only states
- mockup visual details lost: density, grouping, alignment, icon placement, compact surfaces

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
- Avoid undocumented gradients, soft shadows, large radii, decorative depth.

## Component mapping rules

Use `design/manifest.json`; do not guess.

Examples:

- Buttons → `design/forms/button.md`
- Inputs → `design/forms/input.md`
- Form labels/helper/error → `design/forms/form-field.md`
- Selects → `design/forms/select.md`
- Textareas → `design/forms/textarea.md`
- Checkboxes → `design/forms/checkbox.md`
- Cards/surfaces → `design/containers/card.md`
- Badges/status → `design/status/*.md`
- Alerts/callouts/modals/tooltips → `design/overlays/*.md`
- Sidebar/tabs/breadcrumbs/links → `design/navigation/*.md`
- Page shells/layouts → `design/layouts/main-view.md`, `design/pages/*.md`

## Mockup usage rules

Use mockups as reference for:

- exact visual density
- composition
- relative spacing
- grouping
- dark/light behavior
- component combinations
- small details not obvious from prose

But:

- docs override mockups on conflicts
- do not introduce new variants from mockups unless documented
- if mockup shows an undocumented pattern, call it out instead of silently copying

## Implementation rules

Do:

- use documented Shadcn-Svelte primitives/compositions
- use documented variants/states
- keep behavior and accessibility intact
- make minimal diffs
- remove stale one-off styling when a documented component handles it
- verify light and dark modes when colors/focus/surfaces change

Do not:

- redesign the page
- invent new component language
- add marketing spacing or decorative visuals
- create undocumented variants
- hard-code styles that should come from component variants
- skip small states like hover, focus-visible, disabled, loading, readonly, dirty

## Review checklist before finishing

Check every changed file against:

- `design/REVIEW_CHECKLIST.md`
- relevant component/page specs
- relevant mock route if available

Specifically verify:

- component primitive matches the spec
- density matches the spec
- radius matches the spec
- colors match light/dark token rules
- focus rings match purple/yellow rules
- inputs/selects/textareas use documented inset shadow/dirty behavior
- disabled/loading/read-only states are readable
- accessibility notes are preserved
- no undocumented visual effects were added

## If specs are missing

Use this response pattern:

```md
Spec gap found:

- UI need: ...
- Missing/pending spec: ...
- Temporary implementation: minimal semantic markup only
- Follow-up needed: create/update `design/...md` before detailed styling
```

## Required final response

Include:

```md
## Design files read

- `DESIGN.md`
- `design/tokens.md`
- `design/CHANGELOG.md`
- `design/manifest.json`
- `design/...`

## UI files changed

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

If working in the mockup sandbox:

```bash
cd mockups/shadcn-svelte-sample
bun run check
bun run build
```

## Agent reminder

Small details matter. Do not stop at “roughly similar.” Check height, padding, radius, font size, line height, state colors, icon placement, hover/focus behavior, disabled/read-only/loading states, and dark-mode behavior against the Markdown specs and mockups.
