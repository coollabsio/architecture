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

The Coolify Alert is a compact Shadcn-Svelte `Alert` primitive for contextual information, warnings, errors, and success messages. It replaces generic callout boxes for migrated design-system screens.

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

## Exact Layout Recipe

```txt
overlay-surface: rounded-sm border border-neutral-200 bg-white p-4 shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100
overlay-title: text-base font-bold text-black dark:text-white
overlay-description: text-sm text-neutral-600 dark:text-neutral-400
overlay-body: text-sm text-neutral-700 dark:text-neutral-300
overlay-actions: flex flex-wrap justify-end gap-2
close-button: grid size-8 place-items-center rounded-sm
```

## Exact Classes

```txt
surface: rounded-sm border border-neutral-200 bg-white p-4 text-black shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white
header: flex items-start justify-between gap-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200
footer: flex flex-wrap justify-end gap-2 border-t border-neutral-200 pt-3 dark:border-coolgray-200
backdrop: fixed inset-0 z-40 bg-black/60
content: fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2
```

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

- `DESIGN.md`
- Shadcn-Svelte Alert primitive
