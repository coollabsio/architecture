---
version: alpha
name: Coolify Alert
description: Shadcn-Svelte Alert primitive for compact notices, warnings, errors, and operational callouts.
colors:
  primary: "#6b16ed"
  warning: "#fcd452"
  success: "#16a34a"
  error: "#dc2626"
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  neutral-200: "#e5e5e5"
  coolgray-100: "#181818"
  coolgray-200: "#202020"
  coolgray-300: "#242424"
  base: "#101010"
typography:
  title-sm:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 700
    lineHeight: 1.25rem
  body-sm:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  padding: 0.75rem
  icon-size: 1rem
components:
  alert-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
  alert-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
  alert-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
---

# Alert

## Overview

The Coolify Alert is a compact Shadcn-Svelte `Alert` primitive for contextual information, warnings, errors, and success messages. It replaces generic callout boxes for migrated V2 screens.

## Colors

- Default/info: white or dark neutral surface with neutral border and purple accent icon.
- Success: green accent/fill for completed actions.
- Warning: yellow accent/fill with black text.
- Error/destructive: red accent/fill with high-contrast text.
- Dark mode default uses `coolgray-100`/`coolgray-200` surfaces.

## Typography

Title uses `text-sm font-bold`. Body uses `text-sm` with muted secondary text when needed.

## Layout

Use a dense layout with `rounded-sm border p-3`. Optional icon is `size-4 shrink-0`. Content stacks with `gap-1`. Action buttons sit below or right-aligned only if needed.

## Elevation & Depth

No large shadows. Alerts are inline surfaces, not modals.

## Shapes

Use `rounded-sm`. Avoid large rounded marketing callouts.

## Components

### Alert primitive

Start from Shadcn-Svelte `Alert`:

```bash
bunx shadcn-svelte@latest add alert
```

Base classes:

```txt
grid grid-cols-[1rem_1fr] gap-2 rounded-sm border p-3 text-sm
```

Variants:

- `default`: neutral surface, purple icon.
- `success`: green accent/icon, optional subtle green background.
- `warning`: yellow accent/icon.
- `destructive`: red accent/icon and clear destructive text.

## Do's and Don'ts

- Do keep copy short and actionable.
- Do include an accessible title for important alerts.
- Don't use alerts as generic cards.
- Don't add heavy shadows, gradients, or large radius.

## Implementation Notes

Use `role="alert"` for urgent errors. Use normal region/text for passive informational notices.

## Review Checklist

- [ ] Alert is compact, bordered, and `rounded-sm`.
- [ ] Semantic variant is obvious without being decorative.
- [ ] Urgent errors use `role="alert"`.

## Claude Improvement Notes

Future specs can split Toast/Sonner from inline Alert behavior.

## Source References

- `DESIGN_V2.md`
- Shadcn-Svelte Alert primitive
