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
  appBase: "#101010"
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
    backgroundColor: "{colors.appBase}"
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

Main View Layouts define page-level composition. The design system supports at least three approved main views:

1. **Coolify resource grid:** page title, optional description, then Coolbox/Card sections.
2. **Split master-detail:** left list/search/action panel and right detail/empty-state panel, as used by inbox/mail-style screens.
3. **Single-section workspace:** one bordered section with resource header/actions, metadata, optional Subsidebar, and one main workspace canvas.

## Colors

Use the app shell background (`gray-50` light, `base` dark). Main surfaces use white/coolgray panels with neutral borders. Empty states use muted text and dark neutral blocks.

## Typography

Page title uses `text-3xl font-bold tracking-tight`. Optional description uses `text-sm text-neutral-600 dark:text-neutral-400`.

## Layout

### Main content top padding

If a main view includes breadcrumbs above the title, use the normal top padding (`py-8` in a full application shell, or `py-10` for standalone centered samples). If breadcrumbs are not rendered, reduce the content top padding so the title does not look pushed down by an empty breadcrumb row.

```txt
with-breadcrumbs: min-w-0 px-6 py-8
without-breadcrumbs: min-w-0 px-6 pb-8 pt-5
```

Never reserve blank vertical space for missing breadcrumbs.

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

This layout may reference Laravel Cloud as visual inspiration for a resource/topology workspace: compact resource header, environment metadata, side section navigation, and connected service/database-style cards in one canvas. Treat this as inspiration only; implementation must still use Coolify tokens and Shadcn-Svelte primitives.

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

When showing this as a sample/mockup, include a small hint such as “Inspired by Laravel Cloud-style resource workspaces” so the intent is clear without turning the component into a Laravel-specific implementation.

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

## Exact Layout Recipe

```txt
page: mx-auto min-h-screen max-w-6xl px-6 py-10
full-app-main-with-breadcrumbs: min-w-0 px-6 py-8
full-app-main-without-breadcrumbs: min-w-0 px-6 pb-8 pt-5
sample-shell: rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100
header: mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200
spec-label: mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning
page-title: text-3xl font-bold tracking-tight text-black dark:text-white
page-description: mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400
layout-stage: space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base
```

## Exact Classes

```txt
resource-grid: mx-auto w-full max-w-5xl py-4; grid gap-4 sm:grid-cols-2 xl:grid-cols-3
split-grid: grid min-h-[42rem] gap-2 lg:grid-cols-[32rem_1fr]
split-panel: rounded-sm border border-neutral-200 bg-white dark:border-coolgray-300 dark:bg-coolgray-100
single-section: min-h-[42rem] rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100
single-title-row: flex flex-wrap items-start justify-between gap-4
single-resource-title: text-2xl font-bold text-black dark:text-white
single-env-text: text-2xl text-neutral-600 dark:text-neutral-400
workspace-canvas: min-h-[30rem] rounded-sm border border-neutral-200 p-6 dark:border-coolgray-300 dark:bg-coolgray-200
```

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

### Form control surface contrast

When a main view renders `Input`, search fields, `Select`, or `Textarea` inside gray/neutral panels, the control surface must be darker/lighter than the container so it does not blend in.

```txt
light gray panel: parent bg-gray-50 or bg-neutral-100 + control bg-white
dark app-base panel: parent dark:bg-app-base + control dark:bg-coolgray-100
dark gray panel: parent dark:bg-coolgray-100 + control dark:bg-app-base
```

Follow the exact context-contrast rules from `design/forms/input.md`, `design/forms/select.md`, and `design/forms/textarea.md`.

## Do's and Don'ts

- Do choose the Coolify resource grid for dashboard/index pages.
- Do choose split master-detail for inbox/log/message/configuration browsers.
- Do choose single-section workspace for resource detail pages with tabs and one primary content/canvas region.
- Do reduce top padding when breadcrumbs are absent.
- Do make descriptions optional.
- Do keep sections compact and bordered.
- Don't leave an empty breadcrumb-height gap above page titles.
- Don't invent large marketing hero sections.
- Don't use large radius, gradients, or heavy shadows.

## Implementation Notes

Main views are layouts, not primitives. They should compose existing components and should not override their component-level styling.

## Review Checklist

- [ ] Any input/search/select/textarea controls on gray or coolgray panels have a visible contrast step; no same-color control-on-panel pairing.
- [ ] Page title is present.
- [ ] Description is optional and concise.
- [ ] Main view with breadcrumbs uses normal top padding; main view without breadcrumbs uses reduced top padding and no empty breadcrumb gap.
- [ ] Resource grid uses Coolbox/Card sections.
- [ ] Split view has two clear panels with independent scroll/list/detail areas.
- [ ] Single-section view has resource header, metadata, actions, Subsidebar when needed, and one primary workspace.
- [ ] Single-section topology samples may mention Laravel Cloud as visual inspiration, but still use Coolify tokens and Shadcn-Svelte primitives.
- [ ] Uses borders, not heavy shadows.

## Claude Improvement Notes

Future specs can add dashboard metrics, command-center, or log-view layouts if needed.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/pages/main-view/+page.svelte`

- `DESIGN.md`
- `design/containers/coolbox.md`
- `design/navigation/sidebar-navbar.md`
- `design/navigation/subsidebar.md`
