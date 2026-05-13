---
version: alpha
name: Coolify Breadcrumbs
description: Compact Shadcn-Svelte Breadcrumb navigation for dashboard hierarchy.
colors:
  primary: "#6b16ed"
  warning: "#fcd452"
  text: "#000000"
  muted: "#737373"
  white: "#ffffff"
typography:
  crumb-sm:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  gap: 0.375rem
components:
  breadcrumb:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.crumb-sm}"
    rounded: "{rounded.sm}"
---

# Breadcrumbs

## Overview

Breadcrumbs show page hierarchy in compact dashboard screens. Use Shadcn-Svelte `Breadcrumb` semantics or ordered-list markup.

## Colors

Inactive crumbs are muted. Current page is black in light mode and white in dark mode. Hover/focus links use purple in light mode and yellow in dark mode.

## Typography

Use `text-sm font-medium`. Do not uppercase breadcrumbs.

## Layout

Use `flex flex-wrap items-center gap-1.5`. Separator is a small `/` or chevron with muted text.

## Elevation & Depth

No surfaces or shadows.

## Shapes

Focusable crumb links use `rounded-sm` for focus ring only.

## Components

Start from Shadcn-Svelte `Breadcrumb`:

```bash
bunx shadcn-svelte@latest add breadcrumb
```

Link class:

```txt
rounded-sm text-neutral-600 hover:text-coollabs focus-visible:ring-2 focus-visible:ring-coollabs dark:text-neutral-400 dark:hover:text-warning dark:focus-visible:ring-warning
```

## Do's and Don'ts

- Do mark current page with `aria-current="page"`.
- Do keep hierarchy short.
- Don't use breadcrumbs as primary navigation.

## Implementation Notes

Use an ordered list for semantics when building custom markup.

## Review Checklist

- [ ] Current page has `aria-current="page"`.
- [ ] Links have visible hover/focus states.
- [ ] Breadcrumbs wrap cleanly.

## Claude Improvement Notes

Sidebar integration can define when breadcrumbs are hidden on narrow pages.

## Source References

- `DESIGN_V2.md`
- Shadcn-Svelte Breadcrumb primitive
