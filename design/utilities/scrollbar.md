---
version: alpha
name: Coolify Scrollbar
description: Compact scrollbar treatment for scroll containers.
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

# Scrollbar

## Overview

Use native scrollbar styling/utility where possible. Scroll containers should be explicit, compact, and not hide important controls.

## Colors

Use neutral light-mode surfaces and Coolify dark-mode `coolgray` surfaces. Accent/focus colors follow purple in light mode and yellow in dark mode.

## Typography

Use compact `text-sm` body text. Titles, where present, use bold Coolify heading style.

## Layout

Use native scrollbar styling/utility where possible. Scroll containers should be explicit, compact, and not hide important controls.

## Elevation & Depth

Use borders and subtle shadows only where the component is an overlay. Avoid heavy shadows and gradients.

## Shapes

Use `rounded-sm`.

## Components

Compose existing V2 components where needed: Button, Badge, Input, Spinner, and links.

## Do's and Don'ts

Do use on logs, menus, tables. Don't depend on scrollbar color for meaning.

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
