---
version: alpha
name: Coolify Radio Group
description: Shadcn-Svelte Radio Group primitive for compact single-choice settings rows.
colors:
  primary: "#6b16ed"
  warning: "#fcd452"
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  white: "#ffffff"
  neutral-200: "#e5e5e5"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
  base: "#101010"
typography:
  label-md:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  full: 9999px
spacing:
  control-size: 1rem
  row-gap: 1rem
  row-padding-y: 0.25rem
components:
  radio-control:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    size: "{spacing.control-size}"
  radio-control-checked:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    size: "{spacing.control-size}"
  radio-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.label-md}"
---

# Radio Group

## Overview

The Coolify Radio Group is a compact Shadcn-Svelte `Radio Group` primitive for mutually exclusive choices in settings screens.

Use it when exactly one option should be selected. If several options can be enabled independently, use Checkbox instead.

## Colors

- Light control: white fill, neutral border, purple selected dot.
- Dark control: `coolgray-100` fill, neutral dark border, yellow focus ring.
- Selected state keeps the control surface calm and uses a colored inner dot.
- Disabled state uses muted text and reduced row opacity, not hidden contrast.

## Typography

Labels use `text-sm` regular body text. Optional descriptions use `text-xs` muted text.

## Layout

Default row layout mirrors Checkbox:

```txt
[ label + optional description grows ] [ radio control ]
```

Use `flex max-w-full cursor-pointer flex-row items-center gap-4 rounded-sm px-2 py-1` so the hover background has breathing room on both sides. Long labels wrap in a `min-w-0 grow` wrapper. The radio control is `size-4 shrink-0`.

## Exact Layout Recipe

```txt
group: grid gap-1
row: flex max-w-full cursor-pointer flex-row items-center gap-4 rounded-sm px-2 py-1
row-text-wrap: min-w-0 grow
label: text-sm text-black dark:text-white
description: mt-0.5 text-xs text-neutral-500 dark:text-neutral-400
control: size-4 shrink-0 rounded-full border
indicator: size-2 rounded-full
hover: row hover background must not touch text edges because row has px-2 py-1
```

## Exact Classes

```txt
row: flex max-w-full cursor-pointer flex-row items-center gap-4 rounded-sm px-2 py-1 hover:bg-neutral-100 dark:hover:bg-coolgray-100
control: grid size-4 place-items-center rounded-full border border-neutral-300 bg-white outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-coollabs peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-coolgray-100 dark:peer-focus-visible:ring-warning dark:peer-focus-visible:ring-offset-base
indicator: size-2 rounded-full bg-coollabs dark:bg-warning
label: text-sm text-black dark:text-white
description: text-xs text-neutral-500 dark:text-neutral-400
```

## Elevation & Depth

Radio controls do not use shadows. Rows may use subtle hover background in dark mode only.

## Shapes

Radio controls are fully rounded circles. Do not make them square or switch-like.

## Components

### Radio Group primitive

Start from Shadcn-Svelte `Radio Group`:

```bash
bunx shadcn-svelte@latest add radio-group
```

Recommended control classes:

```txt
size-4 shrink-0 cursor-pointer rounded-full border border-neutral-300 bg-white outline-none focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:bg-coolgray-100 dark:focus-visible:ring-warning dark:focus-visible:ring-offset-base
```

Checked indicator:

```txt
size-2 rounded-full bg-coollabs dark:bg-warning
```

## Do's and Don'ts

- Do use Radio Group only for single-choice settings.
- Do keep controls `size-4`, circular, and right-aligned in dense rows.
- Do give hoverable rows `rounded-sm px-2 py-1` so the background does not touch the text or container edge.
- Do use purple/yellow focus rings.
- Don't use checkbox checkmarks for radio options.
- Don't use large card-like selectable tiles unless a separate tile-radio spec is created.

## Implementation Notes

Use Shadcn-Svelte primitives for ARIA and keyboard behavior. Native radio inputs are acceptable in small forms if they preserve `name`, `checked`, and keyboard behavior.

## Review Checklist

- [ ] Exactly one option can be selected.
- [ ] Control is circular, `size-4`, and `shrink-0`.
- [ ] Selected state uses inner dot, not a checkmark.
- [ ] Disabled state remains readable.

## Claude Improvement Notes

A future variant could document selectable card rows for larger plan choices, but this spec should stay dense and form-oriented.

## Source References

- `DESIGN_V2.md`
- Shadcn-Svelte Radio Group primitive
- Existing V2 Checkbox row composition
