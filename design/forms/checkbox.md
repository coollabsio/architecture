---
version: alpha
name: Coolify Checkbox
description: Shadcn-Svelte Checkbox primitive styled as a compact, sharp, right-aligned form toggle with Coolify focus rings.
colors:
  primary: "#6b16ed"
  coollabs: "#6b16ed"
  warning: "#fcd452"
  surface: "#ffffff"
  text: "#000000"
  white: "#ffffff"
  neutral-200: "#e5e5e5"
  neutral-500: "#737373"
  neutral-700: "#404040"
  neutral-400: "#a3a3a3"
  base: "#101010"
  coolgray-100: "#181818"
  coolgray-400: "#282828"
typography:
  label-md:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  checkbox-size: 1rem
  row-gap: 1rem
  row-padding-y: 0.25rem
  row-padding-right: 0.5rem
components:
  checkbox:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.coolgray-400}"
    rounded: "{rounded.sm}"
    size: "{spacing.checkbox-size}"
  checkbox-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    size: "{spacing.checkbox-size}"
  checkbox-checked:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    size: "{spacing.checkbox-size}"
  checkbox-disabled:
    backgroundColor: "{colors.neutral-200}"
    textColor: "{colors.neutral-700}"
    rounded: "{rounded.sm}"
    size: "{spacing.checkbox-size}"
  checkbox-disabled-dark:
    backgroundColor: "{colors.base}"
    textColor: "{colors.neutral-400}"
    rounded: "{rounded.sm}"
    size: "{spacing.checkbox-size}"
  checkbox-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.label-md}"
    padding: "{spacing.row-padding-y} {spacing.row-padding-right} {spacing.row-padding-y} 0"
  checkbox-row-dark-hover:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.white}"
---

# Checkbox

## Overview

The Coolify Checkbox is a compact Shadcn-Svelte `Checkbox` primitive used for boolean settings and option rows.

The common layout is a full row with label/helper content on the left and the checkbox control on the right. The row is dense, clickable, and dark-hoverable when enabled.

Start from the local Shadcn-Svelte primitive:

```svelte
<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
</script>
```

If the primitive is missing, add it first:

```bash
bunx shadcn-svelte@latest add checkbox
```

## Colors

- **Unchecked light:** white surface with neutral border and coolgray check color token.
- **Unchecked dark:** `coolgray-100` surface.
- **Checked light:** purple `coollabs` fill with white check mark.
- **Checked dark:** yellow `warning` fill with black check mark, matching the Radio Group dark selected accent.
- **Focus:** purple `coollabs` ring in light mode, yellow `warning` ring in dark mode.
- **Disabled dark:** `base` background and not-allowed cursor.
- **Enabled row dark hover:** `coolgray-100` background.

## Typography

Checkbox labels use normal body text: Geist Sans, `text-sm`, regular weight.

If the row contains a title/description split, keep the title compact and use muted `text-xs` for secondary text.

## Layout

Default row layout:

```txt
[ label/helper content grows ] [ checkbox ]
```

Required row classes:

```txt
flex max-w-full flex-row items-center gap-4 py-1 pr-2
```

Enabled rows add:

```txt
cursor-pointer dark:hover:bg-coolgray-100
```

The inner label/composition should allow long labels to wrap:

```txt
flex w-full max-w-full min-w-0 items-center gap-4 px-0
```

Label text wrapper:

```txt
flex min-w-0 grow gap-2 break-words
```

Checkbox control is `shrink-0` so long labels do not compress it.

## Exact Layout Recipe

```txt
row: flex max-w-full flex-row items-center gap-4 py-1 pr-2 cursor-pointer dark:hover:bg-coolgray-100
row-hover-padding: keep py-1/pr-2 so hover background has breathing room
control: grid size-4 shrink-0 place-items-center rounded-sm border
label-wrap: flex min-w-0 grow gap-2 break-words
label-text: text-sm text-black dark:text-white
description: text-xs text-neutral-500 dark:text-neutral-400
selected-dark: yellow background, black check glyph
selected-light: purple background, white check glyph
```

## Exact Classes

```txt
control: grid size-4 shrink-0 cursor-pointer place-items-center rounded-sm border border-neutral-200 bg-white text-transparent outline-none transition-colors focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-700 data-[checked=true]:bg-coollabs data-[checked=true]:text-white dark:border-neutral-700 dark:data-[checked=true]:bg-warning dark:data-[checked=true]:text-black dark:bg-coolgray-100 dark:disabled:bg-base dark:disabled:text-neutral-400 dark:focus-visible:ring-warning dark:focus-visible:ring-offset-base
row: flex max-w-full flex-row items-center gap-4 py-1 pr-2 cursor-pointer dark:hover:bg-coolgray-100
check-icon: size-3 stroke-[3]
```

## Elevation & Depth

Checkboxes do not use shadows. State is conveyed by fill, border, check mark, row hover, and focus ring.

Do not add card-like backgrounds around simple checkbox rows.

## Shapes

Checkboxes use `rounded-sm` / 4px.

Do not use pill toggles for checkbox behavior unless migrating a separate Switch component.

## Components

### Base checkbox primitive

Recommended control class:

```txt
size-4 shrink-0 cursor-pointer rounded-sm border border-neutral-200 bg-white text-coolgray-400 outline-none focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 dark:border-neutral-700 dark:bg-coolgray-100 dark:text-white dark:disabled:bg-base dark:focus-visible:ring-warning dark:focus-visible:ring-offset-base
```

Checked state should fill purple and render a white check:

```txt
data-[state=checked]:bg-coollabs data-[state=checked]:text-white dark:data-[state=checked]:bg-warning dark:data-[state=checked]:text-black
```

If the local primitive uses a native checkbox rather than a fully custom control, use `accent-coollabs` in light mode and a dark-mode yellow override where possible, while keeping focus ring and radius rules.

### Checkbox row

Recommended row composition:

```svelte
<label class="flex max-w-full cursor-pointer flex-row items-center gap-4 py-1 pr-2 dark:hover:bg-coolgray-100">
  <span class="flex min-w-0 grow gap-2 break-words">Enable previews</span>
  <Checkbox />
</label>
```

Disabled row:

```txt
cursor-default opacity-60
```

The disabled checkbox itself still uses `disabled:cursor-not-allowed`.

### Helper content

If a checkbox label needs an info icon, compose it with the Form Field helper icon rules. Do not bake helper behavior into the checkbox primitive.

### Indeterminate state

If supported by the primitive, indeterminate state uses the same purple fill and white glyph as checked state.

## Do's and Don'ts

- Do start from Shadcn-Svelte `Checkbox`.
- Do keep checkbox controls `size-4`, `rounded-sm`, and `shrink-0`.
- Do use purple checked fill with white glyph in light mode.
- Do use yellow checked fill with black glyph in dark mode.
- Do use focus-visible ring: purple light, yellow dark, `ring-offset-2`.
- Do allow long labels to wrap without shrinking the checkbox.
- Do make enabled rows clickable with `cursor-pointer`.
- Don't use large switch/toggle styling for checkboxes.
- Don't add gradients, large radius, heavy shadows, or card wrappers.
- Don't bake helper tooltip behavior into the raw Checkbox primitive.
- Don't introduce framework-specific implementation details.

## Implementation Notes

This section is intentionally outside the core DESIGN.md section list and should be preserved by tools that follow the Google `design.md` consumer behavior for unknown sections.

- A custom Shadcn-style button control can represent checked state visually while a hidden/native input owns form semantics.
- For production, prefer the actual Shadcn-Svelte Checkbox primitive so keyboard and ARIA state behavior are handled correctly.

## Review Checklist

- [ ] Uses Shadcn-Svelte `Checkbox` as the base primitive.
- [ ] Checkbox is `size-4`, `rounded-sm`, `shrink-0`.
- [ ] Checked state uses purple/white in light mode and yellow/black in dark mode.
- [ ] Focus-visible ring uses `ring-coollabs` light / `dark:ring-warning` dark with `ring-offset-2`.
- [ ] Enabled row uses `cursor-pointer` and dark hover `dark:hover:bg-coolgray-100`.
- [ ] Long labels wrap without shrinking the checkbox.
- [ ] Disabled checkbox uses muted color and `disabled:cursor-not-allowed`.
- [ ] Helper icons, if present, follow Form Field rules.
- [ ] No large radius, switch styling, gradients, or heavy shadows introduced.

## Claude Improvement Notes

Potential cleanup ideas for a later implementation pass:

1. Decide if the design system needs a separate `switch.md` for toggle-like settings.
2. Add a richer checkbox group pattern if grouped options appear frequently.
3. Confirm indeterminate state visuals after integrating the real Shadcn-Svelte primitive.

Do not apply these improvements automatically while migrating. Preserve this component spec first, then change after explicit review.

## Source References

- Google DESIGN.md spec: `https://github.com/google-labs-code/design.md`.
- Shadcn-Svelte Checkbox docs: `https://www.shadcn-svelte.com/docs/components/checkbox`.
