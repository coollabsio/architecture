---
version: alpha
name: Coolify Badge
description: shadcn/ui Badge primitive for compact status, metadata, and severity labels.
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
  coolgray-300: "#242424"
  base: "#101010"
typography:
  badge-xs:
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
  badge-default:
    backgroundColor: "{colors.neutral-200}"
    textColor: "{colors.text}"
    typography: "{typography.badge-xs}"
    rounded: "{rounded.sm}"
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.surface}"
    typography: "{typography.badge-xs}"
    rounded: "{rounded.sm}"
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.text}"
    typography: "{typography.badge-xs}"
    rounded: "{rounded.sm}"
  badge-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.surface}"
    typography: "{typography.badge-xs}"
    rounded: "{rounded.sm}"
---

# Badge

## Overview

The Coolify Badge is a compact shadcn/ui `Badge` primitive for statuses, tags, version labels, and short metadata. It should feel dense and utilitarian, not pill-like or decorative.

## Colors

- Default: neutral surface with readable text.
- Success: green background with white text.
- Warning: yellow background with black text.
- Error: red background with white text.
- Accent: purple outline/subtle variant for selected metadata only.
- Dark mode uses dark neutral surfaces and keeps semantic variants saturated enough to read.

## Typography

Use `text-xs font-medium leading-4`. Avoid uppercase unless the source text is naturally short status language.

## Layout

Badges are inline-flex, `h-5`, `px-1.5`, `gap-1`, and `rounded-sm`. Optional leading dots/icons are `size-2` to `size-3`.

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

No shadows. Use border or fill only.

## Shapes

Use `rounded-sm`, not large pills. Badges are labels, not buttons.

## Components

### Badge primitive

Start from shadcn/ui `Badge`:

```bash
bunx shadcn@latest add badge
```

Base classes:

```txt
inline-flex h-5 max-w-full items-center gap-1 rounded-sm border px-1.5 text-xs font-medium leading-4
```

Variants:

- `default`: neutral surface and border.
- `success`: green fill.
- `warning`: yellow fill.
- `error`: red fill.
- `outline`: transparent surface with neutral border.
- `accent`: purple-tinted light variant; in dark mode keep it subtle.

## Do's and Don'ts

- Do keep badges short.
- Do use semantic colors only for semantic state.
- Don't make badges clickable unless documented as a separate tag/filter component.
- Don't use rounded-full pills by default.

## Implementation Notes

For live deployment status, pair Badge with accessible text; do not rely on color alone.

## Review Checklist

- [ ] Badge is `h-5`, `text-xs`, `rounded-sm`.
- [ ] Semantic variants have enough contrast.
- [ ] No gradients or shadows.

## Claude Improvement Notes

A later `status-indicator.md` can define dot + badge + timestamp patterns.

## Source References

- Mockup reference: `mockups/shadcn-react-sample/src/routes/components/badge.tsx`

- `DESIGN.md`
- shadcn/ui Badge primitive
