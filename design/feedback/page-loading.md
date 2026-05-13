---
version: alpha
name: Coolify Page Loading Skeleton
description: Page loading skeleton and blocking loading state patterns.
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

# Page Loading / Skeleton

## Overview

Use Skeleton blocks for page content and Spinner for short blocking actions. Match page surfaces with neutral/coolgray backgrounds.

## Colors

Use neutral light-mode surfaces and Coolify dark-mode `coolgray` surfaces. Accent/focus colors follow purple in light mode and yellow in dark mode.

## Typography

Use compact `text-sm` body text. Titles, where present, use bold Coolify heading style.

## Layout

Use Skeleton blocks for page content and Spinner for short blocking actions. Match page surfaces with neutral/coolgray backgrounds.

## Exact Layout Recipe

```txt
feedback-row: flex items-center gap-2 text-sm
spinner: size-4 animate-spin
skeleton: animate-pulse rounded-sm bg-neutral-200 dark:bg-coolgray-200
loading-text: text-sm text-neutral-600 dark:text-neutral-400
button-loading: keep text visible, place spinner after text
```

## Exact Classes

```txt
spinner: size-4 animate-spin text-current
inline-loading: flex items-center gap-2 text-sm font-medium text-black dark:text-white
skeleton: animate-pulse rounded-sm bg-neutral-200 dark:bg-coolgray-200
page-loading-stack: space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base
```

## Elevation & Depth

Use borders and subtle shadows only where the component is an overlay. Avoid heavy shadows and gradients.

## Shapes

Use `rounded-sm`.

## Components

Compose existing components where needed: Button, Badge, Input, Spinner, and links.

## Do's and Don'ts

Do reserve layout space with skeletons. Don't show large spinners for whole pages unless blocking.

## Implementation Notes

Prefer the closest Shadcn-Svelte primitive and extend locally for Coolify density/colors.

## Review Checklist

- [ ] Uses Shadcn-Svelte `Skeleton` for page/content placeholders and Spinner only for short blocking states.
- [ ] Skeleton blocks reserve the final layout dimensions closely enough to avoid large layout shift.
- [ ] Skeletons use `animate-pulse rounded-sm bg-neutral-200 dark:bg-coolgray-200`.
- [ ] Inline loading rows use `flex items-center gap-2 text-sm` and keep copy short.
- [ ] Button loading keeps the original button text visible and places the spinner after the text.
- [ ] Spinner is `size-4 animate-spin`, inherits text color in buttons, and uses yellow accent only where documented.
- [ ] Full-page blocking loaders are reserved for app/page transitions that genuinely block interaction.
- [ ] Loading states remain readable on `gray-50`, `white`, `base`, and `coolgray-100` surfaces.
- [ ] Reduced-motion users are not forced into excessive animation beyond minimal spinner/skeleton affordance.
- [ ] No oversized spinners, centered empty-screen loaders for normal data fetches, gradients, or heavy shadows are introduced.

## Claude Improvement Notes

Future variants can be added after real product screens expose more states.

## Source References

- `DESIGN.md`
