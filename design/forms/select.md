---
version: alpha
name: Coolify Select
description: Native/Shadcn-Svelte select control using Coolify's inset input shadow system and stacked up/down chevron.
colors:
  primary: "#6b16ed"
  coollabs: "#6b16ed"
  warning: "#fcd452"
  surface: "#ffffff"
  text: "#000000"
  white: "#ffffff"
  neutral-200: "#e5e5e5"
  neutral-300: "#d4d4d4"
  neutral-500: "#737373"
  neutral-400: "#a3a3a3"
  neutral-700: "#404040"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
typography:
  select-text:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  select-padding-y: 0.375rem
  select-padding-x: 0.5rem
  select-padding-right: 2.5rem
  chevron-size: 1rem
  dirty-bar-width: 0.25rem
  border-shadow-width: 0.125rem
components:
  select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.select-text}"
    rounded: "{rounded.sm}"
    padding: "{spacing.select-padding-y} {spacing.select-padding-right} {spacing.select-padding-y} {spacing.select-padding-x}"
  select-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.white}"
    typography: "{typography.select-text}"
    rounded: "{rounded.sm}"
    padding: "{spacing.select-padding-y} {spacing.select-padding-right} {spacing.select-padding-y} {spacing.select-padding-x}"
  select-disabled:
    backgroundColor: "{colors.neutral-200}"
    textColor: "{colors.neutral-700}"
    typography: "{typography.select-text}"
    rounded: "{rounded.sm}"
  select-disabled-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.neutral-400}"
    typography: "{typography.select-text}"
    rounded: "{rounded.sm}"
---

# Select

## Overview

The Coolify Select is a compact select control that shares the Input inset shadow system and uses a stacked up/down chevron on the right.

For simple option lists, prefer a native `<select>` styled with this spec. For complex searchable menus, multi-select, async options, or rich item rendering, use a separate combobox/select primitive spec instead of overloading this one.

Start from the local Shadcn-Svelte `Select` primitive when a custom select is needed:

```svelte
<script lang="ts">
  import * as Select from "$lib/components/ui/select/index.js";
</script>
```

For ordinary forms, a local `NativeSelect` wrapper around `<select>` is acceptable and often better because it preserves native semantics.

## Colors

Select colors match Input:

- **Light surface:** white background, black text.
- **Dark surface:** `coolgray-100` background, white text.
- **Resting simulated border:** `neutral-200` in light mode, `coolgray-300` in dark mode.
- **Focus/dirty left bar:** `coollabs` purple in light mode, `warning` yellow in dark mode.
- **Chevron:** black in light mode, white in dark mode.
- **Disabled:** flat muted background and muted text; no inset shadow.

Do not use a normal `border` utility for the main select outline.

## Typography

Select text uses Geist Sans at `text-sm` with regular weight.

Labels and helper icons are handled by the Form Field component, not by the Select primitive.

## Layout

Default select layout:

- `block`
- `w-full`
- `py-1.5`
- `pl-2`
- `pr-10` / `2.5rem`
- `text-sm`
- `rounded-sm`
- `border-0`
- `appearance-none` for native select wrappers
- `focus-visible:outline-none`

The right chevron is the same explicit stacked up/down SVG used by Dropdown triggers. It sits at `right-2 top-1/2`, uses `size-4`, `stroke-width=1.5`, `stroke="currentColor"`, black in light mode and white in dark mode.

## Elevation & Depth

Selects use the same layered inset shadows as Input.

Resting state:

```css
box-shadow: inset 4px 0 0 transparent, inset 0 0 0 2px #e5e5e5;
```

Resting dark state:

```css
box-shadow: inset 4px 0 0 transparent, inset 0 0 0 2px #242424;
```

Focus/dirty light state:

```css
box-shadow: inset 4px 0 0 #6b16ed, inset 0 0 0 2px #e5e5e5;
```

Focus/dirty dark state:

```css
box-shadow: inset 4px 0 0 #fcd452, inset 0 0 0 2px #242424;
```

Disabled state removes the inset shadow entirely:

```css
box-shadow: none;
```

## Shapes

Selects use `rounded-sm` / 4px.

The chevron is not inside a separate pill or button surface.

## Components

### Native select wrapper

Recommended wrapper for simple form selects:

```svelte
<NativeSelect value={direction} dirty={direction !== initialDirection}>
  <option value="allow-www-and-non-www">Allow www & non-www.</option>
  <option value="redirect-to-www">Redirect to www.</option>
  <option value="redirect-to-non-www">Redirect to non-www.</option>
</NativeSelect>
```

Recommended native select class:

```txt
block w-full appearance-none rounded-sm border-0 bg-white bg-[right_0.5rem_center] bg-no-repeat px-2 py-1.5 pr-10 text-sm text-black focus-visible:outline-none disabled:bg-neutral-200 disabled:text-neutral-700 dark:bg-coolgray-100 dark:text-white dark:disabled:bg-coolgray-100/40 dark:disabled:text-neutral-400
```

Recommended chevron overlay:

```svelte
<svg
  class="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-black dark:text-white"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  aria-hidden="true"
>
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9L12 5.25 15.75 9" />
</svg>
```

This must match the Dropdown trigger chevron.

### Dirty-state API

Use either a `dirty` prop or `data-dirty="true"` on the local select primitive.

Preferred usage:

```svelte
<NativeSelect value={direction} dirty={direction !== initialDirection} />
```

Rendered state:

```html
<select data-dirty="true"></select>
```

### Shadow classes

Use the same shadow classes as Input:

```txt
[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_#e5e5e5] dark:[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_#242424]
focus-visible:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_2px_#e5e5e5] dark:focus-visible:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_2px_#242424]
data-[dirty=true]:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_2px_#e5e5e5] dark:data-[dirty=true]:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_2px_#242424]
disabled:[box-shadow:none]
```

### Shadcn-Svelte Select

If using Shadcn-Svelte `Select`, style `Select.Trigger` to visually match the native wrapper:

- no normal border outline,
- inset shadow border,
- stacked up/down chevron,
- `h-auto` with `py-1.5`,
- `rounded-sm`,
- dirty state via `data-dirty` on the trigger.

Use Shadcn-Svelte content/item patterns only for complex selects. Do not make ordinary native selects behave like action dropdown menus.

## Do's and Don'ts

- Do use the same inset shadow system as Input.
- Do use the same explicit stacked up/down chevron SVG as Dropdown, with black light stroke and white dark stroke.
- Do reserve `pr-10` / `2.5rem` for the chevron.
- Do use `data-dirty="true"` or a `dirty` prop for dirty state.
- Do keep native select wrappers for simple forms.
- Do remove the inset shadow for disabled state.
- Don't use a single down chevron for this select pattern.
- Don't use normal border/ring styling for the primary outline.
- Don't confuse action Dropdown Menu with form Select.
- Don't add gradients, large radii, heavy shadows, or separate chevron button chrome.
- Don't introduce framework-specific dirty directives.

## Implementation Notes

This section is intentionally outside the core DESIGN.md section list and should be preserved by tools that follow the Google `design.md` consumer behavior for unknown sections.

- Select intentionally mirrors Input's shadow and dirty-state behavior.
- Keep Dropdown Menu and Select separate in V2 docs even if both use a chevron.
- A future Combobox component should cover searchable option lists.

## Review Checklist

- [ ] Uses native `<select>` wrapper or Shadcn-Svelte `Select` as the base.
- [ ] Uses `border-0` and inset `box-shadow`, not normal borders, for the main outline.
- [ ] Resting state has a transparent 4px left bar and 2px simulated border.
- [ ] Focus state uses a 4px left bar: purple in light mode, yellow in dark mode.
- [ ] Dirty state matches focus state via `dirty` prop or `data-dirty="true"`.
- [ ] Disabled state removes the inset shadow entirely.
- [ ] Chevron matches Dropdown trigger: two separate up/down paths, `size-4`, `stroke-width=1.5`, black in light mode, white in dark mode.
- [ ] Select reserves `pr-10` / `2.5rem` for the chevron.
- [ ] No single down chevron, normal border/ring outline, large radius, or heavy shadow introduced.

## Claude Improvement Notes

Potential cleanup ideas for a later implementation pass:

1. Decide whether all simple selects should use `NativeSelect` while Shadcn `Select` is reserved for rich/custom lists.
2. Extract shared Input/Select shadow classes into a shared form-control helper once Textarea is migrated.
3. Create a separate Combobox spec for searchable selects.

Do not apply these improvements automatically while migrating. Preserve this V2 spec first, then change after explicit review.

## Source References

- Google DESIGN.md spec: `https://github.com/google-labs-code/design.md`.
- Shadcn-Svelte Select docs: `https://www.shadcn-svelte.com/docs/components/select`.
