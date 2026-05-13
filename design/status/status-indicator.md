---
version: alpha
name: Coolify Status Indicator
description: Compact dot plus text/badge composition for live operational state.
colors:
  success: "#16a34a"
  warning: "#fcd452"
  error: "#dc2626"
  muted: "#737373"
  text: "#000000"
  white: "#ffffff"
  coolgray-100: "#181818"
typography:
  label-sm:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.25rem
rounded:
  full: 9999px
spacing:
  dot-size: 0.5rem
  gap: 0.375rem
components:
  status-running:
    backgroundColor: "{colors.success}"
    textColor: "{colors.text}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
  status-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.text}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
  status-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.white}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
---

# Status Indicator

## Overview

Status Indicator is a small composition for live service, deployment, and worker state. It combines a colored dot with short text and may optionally include the migrated Badge.

## Colors

Use semantic colors only: green success, yellow warning, red error, neutral muted/unknown. Do not use purple for operational status.

## Typography

Text uses `text-sm font-medium`; supporting timestamps use `text-xs text-neutral-500 dark:text-neutral-400`.

## Layout

Use `inline-flex items-center gap-1.5`. Dot is `size-2 rounded-full shrink-0`. Keep label short.

## Elevation & Depth

No shadows or raised surfaces.

## Shapes

The dot is circular. If paired with Badge, Badge remains `rounded-sm`.

## Components

Recommended classes:

```txt
inline-flex items-center gap-1.5 text-sm font-medium text-black dark:text-white
```

Dot variants:

```txt
size-2 shrink-0 rounded-full bg-green-600
size-2 shrink-0 rounded-full bg-warning
size-2 shrink-0 rounded-full bg-error
size-2 shrink-0 rounded-full bg-neutral-400
```

## Do's and Don'ts

- Do pair color with readable text.
- Do use green/yellow/red only for state.
- Don't rely on color alone.
- Don't turn status indicators into buttons.

## Implementation Notes

For screen readers, include the status text in the accessible name. Animated/pulsing status is not part of V2 unless separately approved.

## Review Checklist

- [ ] Uses dot + text, not color alone.
- [ ] Dot is `size-2` and `rounded-full`.
- [ ] Status colors are semantic.

## Claude Improvement Notes

A future live-status variant may document optional subtle pulse for actively deploying services.

## Source References

- `DESIGN_V2.md`
- `design/status/badge.md`
