---
version: alpha
name: Coolify Form Composition and Validation
description: Form layout, required markers, dirty states, validation errors, and save action composition.
colors:
  surface: "#ffffff"
  base: "#101010"
  text: "#000000"
  muted: "#737373"
  neutral-200: "#e5e5e5"
  coolgray-100: "#181818"
  coolgray-200: "#202020"
  coolgray-300: "#242424"
  coollabs: "#6b16ed"
  warning: "#fbbf24"
  success: "#16a34a"
  error: "#ef4444"
typography:
  body:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
components:
  component:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
---

# Form Composition / Validation

## Overview

Compose FormField, Input, HelperTooltip, RequiredAsterisk, Button. Required marker must include accessible required text. Dirty fields use the input accent bar. Errors use compact red text below fields. Validate field semantics, for example domain fields should reject arbitrary text and require a domain-like value.

Submitted forms must also reserve a compact form-level feedback pattern for saved and failed states. Field errors explain what to fix next to each control; form-level success/error feedback confirms the result of the save action or summarizes server-side failure.

Validation examples should cover more than one field type when documenting a form pattern:

- **Domain:** require a domain-like value such as `api.example.com`.
- **Email:** require a mailbox-like value such as `ops@example.com`.
- **Phone:** allow an optional international phone-like value such as `+1 555 123 4567`, but reject arbitrary text.

## Colors

Use neutral light surfaces and Coolify coolgray dark surfaces. In dark mode, this sample intentionally uses a lighter `dark:bg-coolgray-100` form card on a `dark:bg-coolgray-200` stage, so the inputs must switch to `dark:bg-app-base` for contrast. If a form instead uses a `dark:bg-app-base` card, default `dark:bg-coolgray-100` inputs are acceptable. Never let form controls blend into a same-color gray background. Purple is the light-mode accent; warning yellow is the dark-mode accent. Errors use red/error.

Submitted success uses the Alert success variant: green accent/fill with readable text in both themes. Submitted failures use Alert destructive/error styling. Do not use purple/yellow accent callouts for success or error feedback; reserve purple/yellow for focus and non-semantic accents.

## Typography

Use compact `text-sm` body text. Labels are medium weight; field errors are `text-xs text-error`. Form-level feedback titles use Alert typography: `text-sm font-bold`; body remains `text-sm`.

## Layout

Keep spacing compact. Overlays use centered/floating surfaces with neutral borders. Forms use a compact section title/description, vertical field stacks, optional form-level submitted feedback, and a bottom save/action row when needed. For the lighter form-card sample, place `dark:bg-app-base` inputs/textareas on the `dark:bg-coolgray-100` form body.

Place submitted feedback directly below the form header and above fields. Keep the form visible after submit; do not replace the entire form with a success page unless the workflow is complete and cannot be edited further.

## Exact Layout Recipe

```txt
stage: rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-coolgray-200
form-card: space-y-4 rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100
header: border-b border-neutral-200 pb-3 dark:border-coolgray-300
title: text-base font-bold text-black dark:text-white
description: mt-1 text-sm text-neutral-600 dark:text-neutral-400
field-stack: space-y-4
form-feedback: Alert, directly below header, before field-stack
form-feedback-success: Alert variant success, aria-live polite/status region
form-feedback-error: Alert variant destructive, role alert for blocking save/server failures
field: use FormField exact classes
input: use Input exact classes with dark:bg-app-base when inside this dark:bg-coolgray-100 form card
input-on-gray-panel: use design/forms/input.md context contrast rule
textarea-on-gray-panel: use design/forms/textarea.md context contrast rule
action-row: flex items-center justify-between border-t border-neutral-200 pt-3 dark:border-coolgray-300
meta: text-xs text-neutral-500 dark:text-neutral-400
submit: Button highlighted, h-8 unless auth page says h-12
```

## Exact Classes

```txt
stage: rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-coolgray-200
form: space-y-4 rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100
form-input: dark:bg-app-base when inside the dark:bg-coolgray-100 form
header: border-b border-neutral-200 pb-3 dark:border-coolgray-300
title: text-base font-bold text-black dark:text-white
description: mt-1 text-sm text-neutral-600 dark:text-neutral-400
form-feedback: grid grid-cols-[1rem_1fr] gap-2 rounded-sm border p-3 text-sm
form-feedback-success: border-green-600 bg-green-50 text-green-900 dark:border-green-700 dark:bg-green-950/40 dark:text-green-200
form-feedback-error: border-red-600 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200
action-row: flex items-center justify-between border-t border-neutral-200 pt-3 dark:border-coolgray-300
semantic-validation: domain, email, and phone/tel examples must show compact text-xs error messages
```

## Elevation & Depth

Use borders and subtle overlay shadows only. Avoid heavy shadows and gradients.

## Shapes

Use `rounded-sm`.

## Components

Compose existing design primitives: Button, Input, FormField, HelperTooltip, RequiredAsterisk, Alert, Dialog, KBD.

### Submitted feedback

Use `design/overlays/alert.md` for saved and failed submit states.

Success:

```svelte
<Alert variant="success" title="Settings saved" aria-live="polite" showIcon={false}>
  Your settings were saved. Keep the form in place and confirm the saved state inline.
</Alert>
```

Error/server failure:

```svelte
<Alert variant="destructive" title="Could not save settings" role="alert" showIcon={false}>
  Fix the highlighted fields below, then save again.
</Alert>
```

Use the success alert after a successful save. Use a destructive alert when the save request fails, when server validation returns a form-level error, or when the user attempts to submit invalid fields. Field-specific messages still belong below each field. Do not show the default Alert icon for these submitted form states; the title and color already communicate the state.

## Do's and Don'ts

- Do support keyboard/focus states.
- Do keep content compact.
- Do include real semantic validation examples for domain, email, and phone/tel fields when demonstrating validation behavior.
- Do ensure inputs and textareas have stronger contrast when placed on gray panels.
- Do preserve light/dark accent rules.
- Do show saved confirmation inline below the form header after a successful submit.
- Do show blocking submit/server failures as a destructive Alert below the form header and keep field-level errors next to controls.
- Do keep success/error feedback compact; it should not push actions far below the fold.
- Don't let input/textarea surfaces blend into gray/coolgray backgrounds.
- Don't use legacy patterns or large rounded marketing UI.
- Don't replace editable settings forms with full-page success states for ordinary saves.
- Don't use toast-only feedback for saves that need an accessible, persistent confirmation.

## Implementation Notes

Prefer the closest Shadcn-Svelte primitive and extend locally for Coolify density/colors.

Mockups must show submitted feedback as separate visible examples, not only as an interactive state hidden behind a submit action. The form-composition mock route should include:

- default/interactive validation form,
- success/saved submitted form,
- error/failed submitted form.

The reusable primitives chooser must also expose submitted states as direct entries:

- `Form Composition` → `/components/form-composition`
- `Form Success State` → `/components/form-composition-success`
- `Form Error State` → `/components/form-composition-error`

Standalone form card baseline used by the mockup:

```txt
stage: rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-coolgray-200
form: rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100
inputs: dark:bg-app-base
```

## Review Checklist

- [ ] Section title is present when the form appears as a standalone card.
- [ ] Dark standalone form sample uses lighter `dark:bg-coolgray-100` card on `dark:bg-coolgray-200` stage, with `dark:bg-app-base` inputs for contrast.
- [ ] Inputs and textareas on gray/coolgray panels use the context contrast rules from their component specs.
- [ ] Domain, email, and phone/tel examples include validation, not only dirty state.
- [ ] Successful submit state uses a compact success Alert directly below the form header.
- [ ] Failed submit/server state uses a compact destructive Alert directly below the form header and field-specific errors remain below fields.
- [ ] Success feedback uses `aria-live="polite"` or equivalent status semantics; blocking errors use `role="alert"`.
- [ ] Accessible labels and states are present.
- [ ] Works in light and dark mode.
- [ ] Uses existing migrated components where possible.
- [ ] Avoids references to removed/deprecated design docs.

## Claude Improvement Notes

Add async/loading progress examples after product usage is clearer.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/form-composition/+page.svelte`

- `DESIGN.md`
