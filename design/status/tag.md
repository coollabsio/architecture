---
version: alpha
name: Coolify Tag
description: Compact removable or metadata tag built from Badge-like styling.
colors:
  primary: "#6b16ed"
  warning: "#fcd452"
  surface: "#ffffff"
  text: "#000000"
  neutral-200: "#e5e5e5"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
typography:
  tag-xs:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1rem
rounded:
  sm: 0.25rem
spacing:
  height: 1.25rem
  padding-x: 0.375rem
components:
  tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.tag-xs}"
    rounded: "{rounded.sm}"
---

# Tag

## Overview

Tag is a compact label for versions, branches, labels, and small metadata. It can be static or removable, but it is not a primary action.

## Colors

Default tags use neutral surfaces. Accent tags may use purple in light mode and yellow text/accent in dark mode only when indicating selection/filter state.

## Typography

Use `text-xs font-medium leading-4`. Tags should be one to three short words.

## Layout

Base tag: `inline-flex h-5 items-center gap-1 rounded-sm border px-1.5`. Removable tags add an icon button at `size-4` inside the tag.

## Exact Layout Recipe

```txt
inline-status: inline-flex h-5 max-w-full items-center gap-1 rounded-sm border px-1.5 text-xs font-medium leading-4
status-row: inline-flex min-w-0 items-center gap-2 text-sm
status-dot: size-2 shrink-0 rounded-full
metadata-text: truncate text-xs text-neutral-500 dark:text-neutral-400
```

## Exact Classes

```txt
badge-default: border-neutral-200 bg-neutral-100 text-black dark:border-coolgray-300 dark:bg-coolgray-200 dark:text-white
badge-success: border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300
badge-warning: border-yellow-300 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-200
badge-error: border-red-300 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300
tag-removable-button: -mr-0.5 grid size-4 place-items-center rounded-sm hover:bg-neutral-100 dark:hover:bg-coolgray-200
```

## Elevation & Depth

No shadows.

## Shapes

Use `rounded-sm`, not pills.

## Components

Build from Badge styles when static. For removable tags, compose text plus a small close button.

```txt
inline-flex h-5 max-w-full items-center gap-1 rounded-sm border border-neutral-200 bg-white px-1.5 text-xs font-medium dark:border-coolgray-300 dark:bg-coolgray-100
```

## Do's and Don'ts

- Do keep tags short.
- Do make removable close controls keyboard accessible.
- Don't use tags as large buttons.
- Don't use rounded-full pills by default.

## Implementation Notes

If a tag is clickable, render an anchor/button with the same visual class and a clear accessible label.

## Review Checklist

- [ ] Tag is `h-5`, `text-xs`, `rounded-sm`.
- [ ] Removable tag has accessible close button.
- [ ] No heavy decoration.

## Claude Improvement Notes

Filter-chip behavior can be documented later as a separate selected/removable tag variant.

## Source References

- Mockup reference: `mockups/shadcn-react-sample/src/routes/components/tag.tsx`

- `DESIGN.md`
- `design/status/badge.md`
