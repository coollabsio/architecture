---
version: alpha
name: Coolify Command Palette
description: Global search and command launcher overlay.
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

# Command Palette

## Overview

Use a Dialog/Command primitive. Centered top overlay, search input first, keyboard hints, compact result rows, empty state. Results must be keyboard navigable.

## Colors

Use neutral light surfaces and Coolify coolgray dark surfaces. Purple is the light-mode accent; warning yellow is the dark-mode accent. Errors use red/error.

## Typography

Use compact `text-sm` body text. Labels are medium weight; errors are `text-xs text-error`.

## Layout

Keep spacing compact. Overlays use centered/floating surfaces with neutral borders. Forms use vertical field stacks and a bottom save/action row when needed.

## Exact Layout Recipe

```txt
dialog: fixed inset-0 z-50 flex items-start justify-center px-4 pt-24
surface: w-full max-w-xl rounded-sm border border-neutral-200 bg-white p-2 shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100
input: use design/forms/input.md exact classes
list: mt-2 max-h-80 overflow-y-auto overscroll-contain
item: flex w-full items-center justify-between rounded-sm px-2 py-2 text-left text-sm
kbd-hint: text-xs text-neutral-500
```

## Exact Classes

```txt
item: flex w-full items-center justify-between rounded-sm px-2 py-2 text-left text-sm text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-coolgray-200
backdrop: fixed inset-0 z-40 bg-black/60
```

## Elevation & Depth

Use borders and subtle overlay shadows only. Avoid heavy shadows and gradients.

## Shapes

Use `rounded-sm`.

## Components

Compose existing V2 primitives: Button, Input, FormField, HelperTooltip, RequiredAsterisk, Dialog, KBD.

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
- [ ] Avoids old design references.

## Claude Improvement Notes

Add async/loading and server-error variants after product usage is clearer.

## Source References

- `DESIGN_V2.md`
