---
version: alpha
name: Coolify Table
description: Dense resource data table for operational/admin pages.
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

# Table

## Overview

Use Shadcn-Svelte Table/Data Table as base. Compact rows, neutral borders, hover row background, sticky/scroll overflow where needed. Actions go right; statuses use Badge/Status Indicator.

## Colors

Use neutral light-mode surfaces and Coolify dark-mode `coolgray` surfaces. Accent/focus colors follow purple in light mode and yellow in dark mode.

## Typography

Use compact `text-sm` body text. Titles, where present, use bold Coolify heading style.

## Layout

Use Shadcn-Svelte Table/Data Table as base. Compact rows, neutral borders, hover row background, sticky/scroll overflow where needed. Actions go right; statuses use Badge/Status Indicator.

## Exact Layout Recipe

```txt
wrapper: w-full overflow-x-auto rounded-sm border border-neutral-200 dark:border-coolgray-300
table: w-full min-w-[42rem] border-collapse text-left text-sm
header: border-b border-neutral-200 bg-neutral-100 text-xs font-bold uppercase tracking-wide text-neutral-600 dark:border-coolgray-300 dark:bg-coolgray-200 dark:text-neutral-400
row: hover:bg-neutral-100 dark:hover:bg-coolgray-200
cell: px-3 py-2 align-middle
actions: flex items-center justify-end gap-2
```

## Exact Classes

```txt
table-wrap: w-full overflow-x-auto rounded-sm border border-neutral-200 dark:border-coolgray-300
thead: border-b border-neutral-200 bg-neutral-100 text-xs font-bold uppercase tracking-wide text-neutral-600 dark:border-coolgray-300 dark:bg-coolgray-200 dark:text-neutral-400
tr: hover:bg-neutral-100 dark:hover:bg-coolgray-200
th-td: px-3 py-2
```

## Elevation & Depth

Use borders and subtle shadows only where the component is an overlay. Avoid heavy shadows and gradients.

## Shapes

Use `rounded-sm`.

## Components

Compose existing components where needed: Button, Badge, Input, Spinner, and links.

### Form control surface contrast

When this spec renders `Input`, `PasswordInput`, command/search input, or `Textarea` inside gray/neutral panels, the control surface must be darker/lighter than the container so it does not blend in.

```txt
light gray panel: parent bg-gray-50 or bg-neutral-100 + control bg-white
dark base panel: parent dark:bg-base + control dark:bg-coolgray-100
dark gray panel: parent dark:bg-coolgray-100 + control dark:bg-base
```

Follow the exact context-contrast rule from `design/forms/input.md` and `design/forms/textarea.md`.

## Do's and Don'ts

Do use horizontal overflow on small screens. Do keep rows dense. Don't use large card-like rows for normal tables.

## Implementation Notes

Prefer the closest Shadcn-Svelte primitive and extend locally for Coolify density/colors.

## Review Checklist

- [ ] Any input/search/textarea controls on gray or coolgray panels have a visible contrast step; no same-color control-on-panel pairing.
- [ ] Uses Shadcn-Svelte `Table` / Data Table primitives as the base, not a custom div-grid for tabular data.
- [ ] Wrapper allows horizontal overflow on small screens: `w-full overflow-x-auto`.
- [ ] Table keeps dense operational spacing: `text-sm`, header `text-xs`, cells `px-3 py-2`.
- [ ] Header is uppercase, bold, muted, and separated by a neutral/coolgray border.
- [ ] Rows use hover states: `hover:bg-neutral-100` in light mode and `dark:hover:bg-coolgray-200` or `dark:hover:bg-coolgray-300` in dark mode.
- [ ] First/primary cell is visually stronger when needed, but secondary cells stay muted/readable.
- [ ] Row actions align right with `flex items-center justify-end gap-2` and use Button/Dropdown primitives.
- [ ] Status values use Status Indicator / Badge specs rather than ad-hoc colored dots.
- [ ] Empty, loading, and error states reserve table/card space and do not shift the page layout abruptly.
- [ ] No heavy shadows, large row cards, gradients, or undocumented border/radius changes are introduced.

## Claude Improvement Notes

Future variants can be added after real product screens expose more states.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/table/+page.svelte`

- `DESIGN.md`
