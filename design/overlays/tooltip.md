---
version: alpha
name: Coolify Tooltip Variants
description: Generic action tooltip and helper tooltip variants.
colors:
  surface: "#ffffff"
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

# Tooltip Variants

## Overview

Use Shadcn-Svelte Tooltip/Hover Card as base. Action tooltips are compact hover/focus labels. Helper tooltips explain form labels and use the visible info icon pattern.

## Colors

Use neutral light surfaces and Coolify coolgray dark surfaces. Purple is the light-mode accent; warning yellow is the dark-mode accent. Errors use red/error.

## Typography

Use compact `text-sm` body text. Labels are medium weight; errors are `text-xs text-error`.

## Layout

Keep spacing compact. Overlays use centered/floating surfaces with neutral borders. Forms use vertical field stacks and a bottom save/action row when needed.

## Exact Layout Recipe

```txt
overlay-surface: rounded-sm border border-neutral-200 bg-white p-4 shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100
overlay-title: text-base font-bold text-black dark:text-white
overlay-description: text-sm text-neutral-600 dark:text-neutral-400
overlay-body: text-sm text-neutral-700 dark:text-neutral-300
overlay-actions: flex flex-wrap justify-end gap-2
close-button: grid size-8 place-items-center rounded-sm
```

## Exact Classes

```txt
surface: rounded-sm border border-neutral-200 bg-white p-4 text-black shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white
header: flex items-start justify-between gap-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200
footer: flex flex-wrap justify-end gap-2 border-t border-neutral-200 pt-3 dark:border-coolgray-200
backdrop: fixed inset-0 z-40 bg-black/60
content: fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2
```

## Elevation & Depth

Use borders and subtle overlay shadows only. Avoid heavy shadows and gradients.

## Shapes

Use `rounded-sm`.

## Components

Compose existing design primitives: Button, Input, FormField, HelperTooltip, RequiredAsterisk, Dialog, KBD.

## Do's and Don'ts

- Do support keyboard/focus states.
- Do keep content compact.
- Do preserve light/dark accent rules.
- Don't use legacy patterns or large rounded marketing UI.

## Implementation Notes

Prefer the closest Shadcn-Svelte primitive and extend locally for Coolify density/colors.

## Review Checklist

- [ ] Accessible labels and states are present.
- [ ] Works in light and dark mode.
- [ ] Uses existing migrated components where possible.
- [ ] Avoids references to removed/deprecated design docs.

## Claude Improvement Notes

Add async/loading and server-error variants after product usage is clearer.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/tooltip/+page.svelte`

- `DESIGN.md`
