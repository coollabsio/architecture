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

Compose existing V2 components where needed: Button, Badge, Input, Spinner, and links.

## Do's and Don'ts

Do use horizontal overflow on small screens. Do keep rows dense. Don't use large card-like rows for normal tables.

## Implementation Notes

Prefer the closest Shadcn-Svelte primitive and extend locally for Coolify density/colors.

## Review Checklist

- [ ] Uses compact spacing.
- [ ] Works in light and dark mode.
- [ ] Uses existing V2 primitives where possible.
- [ ] Avoids legacy design references.

## Claude Improvement Notes

Future variants can be added after real product screens expose more states.

## Source References

- `DESIGN_V2.md`
