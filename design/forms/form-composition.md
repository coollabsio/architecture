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

Validation examples should cover more than one field type when documenting a form pattern:

- **Domain:** require a domain-like value such as `api.example.com`.
- **Email:** require a mailbox-like value such as `ops@example.com`.
- **Phone:** allow an optional international phone-like value such as `+1 555 123 4567`, but reject arbitrary text.

## Colors

Use neutral light surfaces and Coolify coolgray dark surfaces. In dark mode, standalone form cards should use the darker `base` surface so `coolgray-100` inputs remain visibly separated from the form background. Purple is the light-mode accent; warning yellow is the dark-mode accent. Errors use red/error.

## Typography

Use compact `text-sm` body text. Labels are medium weight; errors are `text-xs text-error`.

## Layout

Keep spacing compact. Overlays use centered/floating surfaces with neutral borders. Forms use a compact section title/description, vertical field stacks, and a bottom save/action row when needed. Do not place dark inputs on the same `coolgray-100` surface as the form body; use `dark:bg-base` for the form card.

## Elevation & Depth

Use borders and subtle overlay shadows only. Avoid heavy shadows and gradients.

## Shapes

Use `rounded-sm`.

## Components

Compose existing V2 primitives: Button, Input, FormField, HelperTooltip, RequiredAsterisk, Dialog, KBD.

## Do's and Don'ts

- Do support keyboard/focus states.
- Do keep content compact.
- Do include real semantic validation examples for domain, email, and phone/tel fields when demonstrating validation behavior.
- Do preserve light/dark accent rules.
- Don't use legacy patterns or large rounded marketing UI.

## Implementation Notes

Prefer the closest Shadcn-Svelte primitive and extend locally for Coolify density/colors.

Standalone form card baseline:

```txt
rounded-sm border border-neutral-200 bg-white p-4
dark:border-coolgray-300 dark:bg-base
```

## Review Checklist

- [ ] Section title is present when the form appears as a standalone card.
- [ ] Dark standalone form background is darker than the inputs (`dark:bg-base` behind `dark:bg-coolgray-100` inputs).
- [ ] Domain, email, and phone/tel examples include validation, not only dirty state.
- [ ] Accessible labels and states are present.
- [ ] Works in light and dark mode.
- [ ] Uses existing migrated components where possible.
- [ ] Avoids old design references.

## Claude Improvement Notes

Add async/loading and server-error variants after product usage is clearer.

## Source References

- `DESIGN_V2.md`
