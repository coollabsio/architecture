---
version: alpha
name: Coolify Main View Layouts
description: Page-level layouts for Coolify-style dashboard, split master-detail, and single-section workspace screens.
colors:
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  neutral-200: "#e5e5e5"
  neutral-300: "#d4d4d4"
  coolgray-100: "#181818"
  coolgray-200: "#202020"
  coolgray-300: "#242424"
  base: "#101010"
  white: "#ffffff"
typography:
  page-title:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 1.875rem
    fontWeight: 700
    lineHeight: 2.25rem
  body-sm:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  page-padding: 1.5rem
  section-gap: 1rem
components:
  main-view-coolify:
    backgroundColor: "{colors.base}"
    textColor: "{colors.white}"
    typography: "{typography.body-sm}"
  split-view-panel:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.white}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
---

# Main View Layouts

## Overview

Main View Layouts define page-level composition. V2 supports at least three approved main views:

1. **Coolify resource grid:** page title, optional description, then Coolbox/Card sections.
2. **Split master-detail:** left list/search/action panel and right detail/empty-state panel, as used by inbox/mail-style screens.
3. **Single-section workspace:** one bordered section with resource header/actions, metadata, optional Subsidebar, and one main workspace canvas.

## Colors

Use the app shell background (`gray-50` light, `base` dark). Main surfaces use white/coolgray panels with neutral borders. Empty states use muted text and dark neutral blocks.

## Typography

Page title uses `text-3xl font-bold tracking-tight`. Optional description uses `text-sm text-neutral-600 dark:text-neutral-400`.

## Layout

### Coolify resource grid

```txt
Page header
Optional description
Grid of Coolbox links / Card sections
```

Recommended classes:

```txt
mx-auto w-full max-w-6xl px-6 py-10
mb-6
grid gap-4 sm:grid-cols-2 xl:grid-cols-3
```

### Single-section workspace

Use this when the page is one self-contained resource detail view, not a grid and not a list/detail split. The reference shape is a single bordered section containing resource title/environment, metadata, actions, a Subsidebar for section navigation, and a visual/content canvas.

```txt
[ resource title + environment                   actions ]
[ metadata row ]
[ Subsidebar ] [ one main workspace/canvas/content area ]
```

Recommended section classes:

```txt
min-h-[42rem] rounded-sm border border-neutral-200 bg-white dark:border-coolgray-300 dark:bg-coolgray-100
```

The workspace/canvas can use a subtle dot grid or neutral panel background only when it represents a map/topology/workflow view. Keep the grid subtle and do not use decorative gradients.

### Split master-detail

```txt
[ left panel/list/search/actions ] [ right detail panel/empty state ]
```

Recommended classes:

```txt
grid min-h-[calc(100vh-5rem)] gap-2 lg:grid-cols-[32rem_1fr]
```

Panel classes:

```txt
rounded-sm border border-neutral-200 bg-white dark:border-coolgray-300 dark:bg-coolgray-100
```

Left panel anatomy:

- Header row with title and actions.
- Search/input row.
- Scrollable list area.
- Empty/list items use compact cards.

Right panel anatomy:

- Detail content, or centered empty state.
- Empty state can use `rounded-sm bg-neutral-100 p-8 text-center dark:bg-coolgray-200`.

## Elevation & Depth

Use borders and panel surfaces. Avoid heavy shadows.

## Shapes

Use `rounded-sm` for panels, coolboxes, and empty-state blocks.

## Components

Use these migrated specs inside main views:

- `design/containers/coolbox.md`
- `design/containers/card.md`
- `design/forms/button.md`
- `design/forms/input.md`
- `design/status/badge.md`
- `design/overlays/callout.md`
- `design/navigation/sidebar-navbar.md`
- `design/navigation/subsidebar.md`

## Do's and Don'ts

- Do choose the Coolify resource grid for dashboard/index pages.
- Do choose split master-detail for inbox/log/message/configuration browsers.
- Do choose single-section workspace for resource detail pages with tabs and one primary content/canvas region.
- Do make descriptions optional.
- Do keep sections compact and bordered.
- Don't invent large marketing hero sections.
- Don't use large radius, gradients, or heavy shadows.

## Implementation Notes

Main views are layouts, not primitives. They should compose existing V2 components and should not override their component-level styling.

## Review Checklist

- [ ] Page title is present.
- [ ] Description is optional and concise.
- [ ] Resource grid uses Coolbox/Card sections.
- [ ] Split view has two clear panels with independent scroll/list/detail areas.
- [ ] Single-section view has resource header, metadata, actions, Subsidebar when needed, and one primary workspace.
- [ ] Uses borders, not heavy shadows.

## Claude Improvement Notes

Future specs can add dashboard metrics, command-center, or log-view layouts if needed.

## Source References

- `DESIGN_V2.md`
- `design/containers/coolbox.md`
- `design/navigation/sidebar-navbar.md`
- `design/navigation/subsidebar.md`
