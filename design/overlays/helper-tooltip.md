---
version: alpha
name: Coolify Helper Tooltip
description: Compact Tooltip/Hover Card helper pattern for info icons and short contextual help.
colors:
  primary: "#6b16ed"
  warning: "#fcd452"
  surface: "#282828"
  text: "#ffffff"
  base: "#101010"
typography:
  helper-text:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1rem
rounded:
  sm: 0.25rem
spacing:
  padding-y: 0.375rem
  padding-x: 0.5rem
  icon-size: 1rem
components:
  helper-tooltip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.helper-text}"
    rounded: "{rounded.sm}"
---

# Helper Tooltip

## Overview

Helper Tooltip documents the reusable info-icon tooltip used near labels and dense settings. It extracts the Form Field helper behavior into a standalone overlay spec.

## Colors

Info trigger uses purple in light mode and yellow in dark mode. Tooltip content uses dark neutral surface with white text in both modes.

## Typography

Tooltip content uses `text-xs leading-4`. Keep helper copy short.

## Layout

Trigger is `inline-flex size-4 items-center justify-center rounded-full`. Tooltip content is content-fit with wrapping for long text: `min-w-max max-w-[min(20rem,calc(100vw-2rem))] whitespace-normal`.

## Elevation & Depth

Use `shadow-sm` only for overlay separation.

## Shapes

Use `rounded-full` trigger and `rounded-sm` tooltip.

## Components

Start from Shadcn-Svelte `Tooltip`; use `Hover Card` only for rich content.

```txt
z-50 min-w-max max-w-[min(20rem,calc(100vw-2rem))] whitespace-normal rounded-sm bg-coolgray-400 px-2 py-1.5 text-xs leading-4 text-white shadow-sm
```

## Do's and Don'ts

- Do use an info `i`, not an eye icon.
- Do fit short text naturally.
- Don't use fixed width for all tooltips.
- Don't put forms/actions inside Tooltip; use Hover Card/Dialog.

## Implementation Notes

On touch devices, make helper content reachable via click/focus as well as hover.

## Review Checklist

- [ ] Trigger icon is visible at 16px.
- [ ] Tooltip fits short text and wraps long text.
- [ ] Focus/keyboard access works.

## Claude Improvement Notes

A rich helper hover-card variant can be documented later.

## Source References

- `DESIGN_V2.md`
- `design/forms/form-field.md`
