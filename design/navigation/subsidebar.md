---
version: alpha
name: Coolify Subsidebar
description: Secondary vertical or horizontal navigation for resource detail screens inside a main view.
colors:
  text: "#404040"
  text-active: "#000000"
  hover-light: "#d4d4d4"
  active-light: "#e5e5e5"
  coolgray-100: "#181818"
  coolgray-200: "#202020"
  warning: "#fbbf24"
typography:
  item:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  item-x: 0.5rem
  item-y: 0.25rem
  gap: 0.5rem
components:
  subsidebar:
    textColor: "{colors.text}"
    typography: "{typography.item}"
    rounded: "{rounded.sm}"
---

# Subsidebar

## Overview

Subsidebar is the secondary navigation used inside resource detail pages. It follows Coolify's `sub-menu-wrapper` / `sub-menu-item` pattern. It can be vertical as a compact left column, or horizontal as a scrollable top row for compact top-level sections.

Use it when a resource has multiple configuration sections such as General, Environment Variables, Persistent Storages, Webhooks, Resource Operations, Tags, or Danger Zone.

## Colors

Inactive items use muted neutral text. Hover uses neutral gray in light mode and `coolgray-100` in dark mode. Active uses `bg-neutral-200 text-black` in light mode and `dark:bg-coolgray-200 dark:text-warning` in dark mode.

## Typography

Items use `text-sm`, single-line truncation, and regular weight. Do not make inactive items bold.

## Layout

### Vertical

Use vertical when the section list is longer or the page has settings/configuration content.

Recommended wrapper:

```txt
flex w-full flex-col items-start gap-2 sm:w-48 sm:min-w-48 sm:flex-shrink-0
```

Recommended item:

```txt
flex min-h-7 w-full min-w-0 items-center gap-2 truncate rounded-sm px-2 py-1 text-sm
```

Place vertical navigation inside a resource layout as:

```txt
flex flex-col gap-8 sm:flex-row
[ Subsidebar ] [ content ]
```

### Horizontal

Use horizontal when the navigation is a compact top-level resource section row. It must scroll horizontally on small screens.

Recommended wrapper:

```txt
scrollbar flex min-h-10 w-full flex-nowrap items-center gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap pb-1
```

Recommended item difference:

```txt
shrink-0
```

## Exact Layout Recipe

```txt
nav-text: text-sm font-medium
nav-muted: text-neutral-600 dark:text-neutral-400
nav-active: text-black dark:text-white
nav-focus: focus-visible:ring-2 focus-visible:ring-coollabs dark:focus-visible:ring-warning
nav-item-radius: rounded-sm
nav-item-padding: px-2 py-1 for dense nav; px-3 py-2 for larger horizontal regions
```

## Exact Classes

```txt
nav-link: rounded-sm text-sm font-medium text-neutral-600 hover:text-coollabs focus-visible:ring-2 focus-visible:ring-coollabs dark:text-neutral-400 dark:hover:text-warning dark:focus-visible:ring-warning
active-link: text-black dark:text-white
separator: text-neutral-400
tab-trigger: inline-flex h-8 cursor-pointer items-center justify-center rounded-sm px-2 text-sm font-medium transition-colors
```

## Elevation & Depth

Use no border, shadow, or background wrapper. Only item hover/active backgrounds communicate state.

## Shapes

Use `rounded-sm` for item backgrounds.

## Components

- Links are anchors.
- External items may show the external-link icon from `design/navigation/external-link.md`.
- Active state follows sidebar/navbar color rules.

## Do's and Don'ts

- Do use for secondary resource navigation, not global app navigation.
- Do keep labels short and single-line.
- Do preserve the yellow active state in dark mode.
- Don't use horizontal mode for long/deep settings navigation; prefer vertical there.
- Don't add a card/background wrapper around the subsidebar.

## Implementation Notes

Base this on a local Shadcn-Svelte-compatible component. It does not need a Shadcn primitive because it is semantic navigation made from anchors.

## Review Checklist

- [ ] Vertical variant uses left-column layout on desktop.
- [ ] Horizontal variant scrolls safely on smaller screens.
- [ ] Active item is clear in light and dark mode.
- [ ] Items truncate safely.
- [ ] No wrapper box/background around the subsidebar.

## Claude Improvement Notes

Future versions may add nested groups if Coolify needs deeper resource navigation.

## Source References

- `design/navigation/sidebar-navbar.md`
- Coolify `sub-menu-wrapper` / `sub-menu-item` pattern
