# Prompt Test: Generate a Sample Layout from Design Markdown

You are an implementation agent testing whether the design-system Markdown files are clear enough to build from.

Your job is to read the local design docs and generate a sample Shadcn-Svelte mockup that demonstrates the documented design system without inventing undocumented styling.

## Shared workflow

Follow `prompts/shared-design-workflow.md` before generating code.

## Goal

Create a small sample application screen that shows how an upcoming Shadcn-Svelte project should look if it follows the design docs.

The sample should be a realistic operator/dashboard UI, not a generic component gallery.

Use this scenario:

> A self-hosted app dashboard for managing services, deployments, and environment settings.

## Required screen content

Generate one coherent page containing:

- App shell with a left navigation area or sidebar-like column.
- Main content area with page title and short description.
- At least two cards or surface sections.
- A service/deployment status area.
- A settings/action area.
- A footer or secondary action row.

## Component selection

Use `design/manifest.json`; do not hard-code component docs in this prompt.

1. Map the required screen content to migrated component/page specs.
2. Read every mapped spec before writing code.
3. Demonstrate the required variants, states, accessibility notes, and compositions from those specs.
4. Prefer dashboard-relevant migrated components such as actions, fields, feedback, navigation, status, and operational surfaces.
5. If a migrated component does not fit the scenario, omit it and explain why in the self-review.
6. If a needed component is pending or missing, use only minimal semantic markup and report the spec gap.

## Implementation rules

- Use Shadcn-Svelte primitives as the base.
- Use Tailwind utilities and Shadcn-Svelte conventions.
- Apply exact visual rules from the mapped specs, not from this prompt.
- Do not use Laravel, Blade, Livewire, Alpine, PHP, or unrelated project-specific implementation details.
- Do not invent new component specs for pending components.

## Deliverables

Produce code for a minimal local Shadcn-Svelte implementation. Use Bun for the mockup sandbox commands and lockfile.

Preferred output format:

1. Brief plan, maximum 5 bullets.
2. File tree.
3. Code blocks for each changed/created file.
4. Short explanation of how the output follows `DESIGN.md`, `design/tokens.md`, and every mapped spec.
5. Short self-review checklist showing which mapped component requirements are satisfied and which migrated specs were intentionally omitted.

If you are working inside a real repo, create or update files directly instead of only printing code.

## Suggested file structure

If no app exists yet, create a small mockup sandbox under this shape. Add only component folders required by the manifest-mapped specs you use:

```txt
mockups/shadcn-svelte-sample/
  README.md
  package.json
  bun.lock
  src/routes/+page.svelte
  src/lib/components/ui/button/index.ts
  src/lib/components/ui/button/button.svelte
  src/lib/components/ui/spinner/index.ts
  src/lib/components/ui/spinner/spinner.svelte
  src/lib/components/ui/dropdown-menu/index.ts
  src/lib/components/ui/dropdown-menu/dropdown-menu.svelte
  src/lib/components/ui/input/index.ts
  src/lib/components/ui/input/input.svelte
  src/lib/components/ui/input/password-input.svelte
  src/lib/components/ui/form-field/index.ts
  src/lib/components/ui/form-field/form-field.svelte
  src/lib/components/ui/select/index.ts
  src/lib/components/ui/select/native-select.svelte
  src/lib/components/ui/textarea/index.ts
  src/lib/components/ui/textarea/textarea.svelte
  src/lib/components/ui/checkbox/index.ts
  src/lib/components/ui/checkbox/checkbox.svelte
  src/lib/components/ui/checkbox/checkbox-row.svelte
  src/lib/components/ui/copy-button/index.ts
  src/lib/components/ui/copy-button/copy-button.svelte
  src/lib/utils.ts
```

The exact structure may vary if the existing project already has a SvelteKit/Shadcn-Svelte layout.

## Acceptance criteria

The generated result is successful if:

- It can be inspected as a realistic dashboard screen.
- It maps UI needs through `design/manifest.json`.
- It reads and applies each relevant migrated spec.
- It demonstrates the variants/states/accessibility notes required by the mapped specs.
- It avoids unrelated framework-specific implementation details.
- It does not introduce undocumented visual language.
- The screen feels compact, dark-first, utilitarian, and operational.

## Failure signals

The generated result should be considered a design-doc failure if the AI:

- Ignores `DESIGN.md`, `design/tokens.md`, `design/manifest.json`, or mapped component specs.
- Uses raw one-off booleans/classes instead of documented variants and states.
- Builds a generic Shadcn default UI without Coolify density/colors.
- Misses required variants, states, density, radius, color, focus, or accessibility notes from mapped specs.
- Uses purple as the general dark-mode accent outside documented exceptions.
- Adds gradients, large rounded corners, large shadows, or decorative marketing UI.
- Introduces Livewire, Blade, Laravel, Alpine, PHP, or unrelated framework concepts.

## Reviewer notes

When reviewing the output, evaluate the Markdown docs, not only the generated UI.

If the output is wrong, ask:

- Was the prompt unclear?
- Was `DESIGN.md` unclear?
- Was the mapped component/page spec too implementation-heavy or too vague?
- Did a mapped spec leave missing variant, state, accessibility, size, or theme details?
- Should pending components get temporary guidance before full migration?
