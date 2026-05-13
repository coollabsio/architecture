---
version: alpha
name: Coolify Sidebar Navbar
description: Shadcn-Svelte Sidebar plus app navigation layout for dense dashboard navigation.
colors:
  primary: "#6b16ed"
  warning: "#fcd452"
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  neutral-400: "#a3a3a3"
  neutral-200: "#e5e5e5"
  neutral-300: "#d4d4d4"
  coolgray-100: "#181818"
  coolgray-200: "#202020"
  coolgray-300: "#242424"
  base: "#101010"
  white: "#ffffff"
typography:
  nav-sm:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
  brand-lg:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 2rem
rounded:
  sm: 0.25rem
spacing:
  sidebar-width: 16rem
  collapsed-width: 4rem
  item-height: 1.75rem
  item-gap: 0.75rem
components:
  sidebar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.nav-sm}"
  sidebar-dark:
    backgroundColor: "{colors.base}"
    textColor: "{colors.neutral-400}"
    typography: "{typography.nav-sm}"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.nav-sm}"
    rounded: "{rounded.sm}"
    height: "{spacing.item-height}"
  nav-item-active:
    backgroundColor: "{colors.neutral-200}"
    textColor: "{colors.text}"
    typography: "{typography.nav-sm}"
    rounded: "{rounded.sm}"
  nav-item-active-dark:
    backgroundColor: "{colors.coolgray-200}"
    textColor: "{colors.warning}"
    typography: "{typography.nav-sm}"
    rounded: "{rounded.sm}"
---

# Sidebar Navbar

## Overview

Sidebar Navbar is the main application navigation shell for dense operator dashboards. It combines a persistent left sidebar, brand/search/team controls, grouped navigation links, optional collapsed icon-only mode, and page-level content to the right.

Use Shadcn-Svelte `Sidebar` as the implementation base when available. If an app does not need the full primitive, compose semantic `nav`, `ul`, `li`, and anchor/button elements with the classes below.

## Colors

- **Sidebar light:** white surface, neutral border, muted text.
- **Sidebar dark:** `base` background, `coolgray-200` border, muted text.
- **Item hover light:** neutral hover (`bg-neutral-100` or `bg-neutral-200`) with black text.
- **Item hover dark:** `coolgray-100` with white text.
- **Active light:** neutral filled row with black text.
- **Active dark:** `coolgray-200` row with yellow `warning` text.
- **Focus:** purple in light mode, yellow in dark mode.

Do not use purple as the general dark-mode active item color. Yellow is the dark-mode navigation accent.

## Typography

- Brand: `text-2xl font-bold tracking-tight`.
- Main nav labels: `text-sm` regular weight.
- Section labels: `text-xs font-bold uppercase tracking-wide` only when sections need labels.
- Version/build metadata: `text-[10px]` or `text-xs` muted.

## Layout

Desktop layout:

```txt
[ fixed/relative sidebar ] [ main content ]
```

Recommended shell:

```txt
min-h-screen bg-gray-50 text-black dark:bg-base dark:text-neutral-400 lg:grid lg:grid-cols-[16rem_1fr]
```

Sidebar:

```txt
flex min-h-screen flex-col border-r border-neutral-300 bg-white px-2 dark:border-coolgray-200 dark:bg-base
```

Header area:

```txt
flex items-start gap-2 px-2 pb-4 pt-6
```

Nav list:

```txt
flex flex-col gap-1.5
```

Main nav item:

```txt
flex min-h-7 w-full min-w-0 items-center gap-3 truncate rounded-sm px-2 py-1 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs dark:text-neutral-400 dark:hover:bg-coolgray-100 dark:hover:text-white dark:focus-visible:ring-warning
```

Active item:

```txt
bg-neutral-200 text-black dark:bg-coolgray-200 dark:text-warning
```

Collapsed desktop sidebar:

- Width: about `4rem`.
- Items become square/icon-only: `size-8 justify-center px-0 gap-0 mx-auto`.
- Hide labels visually only at collapsed desktop breakpoint.
- Keep `title` or tooltip text for icon-only navigation.

Mobile:

- Prefer off-canvas Sheet/Sidebar behavior.
- If not implemented yet, collapse sidebar above content and keep nav horizontally scrollable only as a fallback.

## Elevation & Depth

Sidebar uses border separation, not heavy shadow. Off-canvas mobile sidebar may use overlay/backdrop from Sheet.

Top/page nav bars use `border-b-2` or `border-b` separation and no shadow by default.

## Shapes

Use `rounded-sm` for nav items and controls. Do not use pill navigation.

## Components

### Shadcn-Svelte primitive

Start from Shadcn-Svelte Sidebar for production app shells:

```bash
bunx shadcn-svelte@latest add sidebar
```

Map Coolify classes onto:

- `SidebarProvider`
- `Sidebar`
- `SidebarHeader`
- `SidebarContent`
- `SidebarGroup`
- `SidebarMenu`
- `SidebarMenuItem`
- `SidebarMenuButton`
- `SidebarFooter`
- `SidebarTrigger`

### Brand block

```svelte
<a href="/" class="text-2xl font-bold tracking-tight text-black hover:opacity-80 dark:text-white">Coolify</a>
<p class="text-[10px] text-neutral-500 dark:text-neutral-400">v4.0.0</p>
```

### Collapse trigger

Sidebar must include an internal collapse/expand trigger positioned on the border between the sidebar and the main view, matching Coolify's rounded chevron affordance. Do not place the primary collapse control as a normal square button inside the header and do not rely on an external page button.

Recommended trigger classes:

```txt
absolute -right-3 top-8 z-10 grid size-6 place-items-center rounded-full border border-neutral-300 bg-white text-black shadow-sm hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-coollabs dark:border-coolgray-200 dark:bg-base dark:text-warning dark:hover:bg-coolgray-100 dark:focus-visible:ring-warning
```

Requirements:

- Use `aria-label="Collapse sidebar"` / `aria-label="Expand sidebar"`.
- Use `aria-expanded` to reflect expanded state.
- Keep it visible in both expanded and collapsed modes.
- Position it halfway over the sidebar/main border with `absolute -right-3`.
- Use a small rounded chevron control (`size-6 rounded-full`), not a square header button.

### Optional team switcher

If a team switcher is required, place it directly below the header/search area and above the primary navigation list, matching Coolify's current placement. It is optional; do not reserve this space for apps without teams.

Expanded sidebar behavior:

```txt
px-2 pb-7
```

Use a compact Dropdown Menu trigger following `design/forms/dropdown.md`; height is `h-8`, full width, sharp `rounded-sm`, dark neutral surface, and stacked up/down chevron. Do not use a native select for the V2 team switcher.

Collapsed sidebar behavior:

- Hide the select.
- Show a `size-8` square team-initial button centered in the sidebar; wrapper should be `mx-auto w-8` so the trigger stays aligned with collapsed nav icons.
- Button classes:

```txt
flex size-8 cursor-pointer items-center justify-center rounded-sm bg-neutral-100 p-0 text-sm font-semibold text-coollabs transition-colors hover:bg-neutral-200 dark:bg-coolgray-200 dark:text-warning dark:hover:bg-coolgray-300
```

Expanded/collapsed menu popup uses the Dropdown Menu content/item styling from `design/forms/dropdown.md`. Collapsed placement should be anchored to the initial button wrapper, not viewport-fixed: use `absolute left-full top-0 ml-2 mt-0` so the menu always opens beside the centered collapsed team trigger.

Collapsed menu popup:

```txt
absolute left-full top-0 z-[100] ml-2 mt-0 min-w-48 max-h-72 overflow-y-auto rounded-md border border-neutral-300 bg-white py-1 shadow-lg dark:border-coolgray-200 dark:bg-coolgray-100
```

Current team item uses `font-semibold text-coollabs dark:text-warning`.

### Search button

Use Button-like compact chrome:

```txt
inline-flex h-8 items-center gap-1.5 rounded-sm border border-neutral-300 bg-neutral-100 px-2.5 text-sm hover:bg-neutral-200 dark:border-coolgray-200 dark:bg-coolgray-100 dark:hover:bg-coolgray-200
```

Optional shortcut hint uses KBD spec.

### Main nav item

```svelte
<a href="/projects" aria-current="page" class="... bg-neutral-200 text-black dark:bg-coolgray-200 dark:text-warning">
  <Icon class="size-4 shrink-0" />
  <span class="min-w-0 flex-1 truncate">Projects</span>
</a>
```

### Section/page navbar

For resource subnavigation inside a page, use a horizontal navbar:

```txt
flex flex-col gap-4 border-b-2 border-neutral-200 pb-2 text-neutral-700 dark:border-coolgray-200 dark:text-neutral-400 md:flex-row md:items-center sm:justify-between
```

Nested link row:

```txt
flex min-h-10 items-center gap-6 overflow-x-auto whitespace-nowrap pt-2
```

Active subnav link uses `text-black dark:text-white` or `dark:text-warning` when it represents a selected nav item rather than a heading.

## Do's and Don'ts

- Do use semantic `nav` with accessible labels.
- Do keep nav dense: small icons, `text-sm`, `gap-1.5` vertical rhythm.
- Do use yellow for dark-mode active/focus navigation accents.
- Do preserve labels for screen readers when collapsed.
- Do include an internal collapse/expand trigger in the sidebar header.
- Do add tooltip/title text for collapsed icon-only items.
- Do place the optional team switcher above the primary nav list when teams exist.
- Don't use large pills, marketing gradients, or heavy shadows.
- Don't make sidebar items look like primary buttons.
- Don't hide active state in dark mode; active item must remain obvious.
- Don't copy framework-specific implementation details into app-independent docs.

## Implementation Notes

This spec intentionally describes Shadcn-Svelte primitives and semantic HTML composition. App-specific routing, permissions, and server-side state should be supplied by the consuming app.

Collapsed state should be persisted only by the application shell, not by the primitive component itself. Use a controlled prop/store for expanded/collapsed state.

## Review Checklist

- [ ] Sidebar uses Shadcn-Svelte Sidebar or semantic `nav` composition.
- [ ] Sidebar has border separation and no heavy shadow.
- [ ] Nav items are `text-sm`, `rounded-sm`, dense, and icon + label.
- [ ] Active dark item uses yellow text on dark neutral fill.
- [ ] Collapsed mode keeps accessible labels/tooltips.
- [ ] Sidebar has an internal collapse/expand trigger with `aria-expanded`.
- [ ] Page subnav uses horizontal scroll when needed.
- [ ] Optional team switcher is placed below header/search and above nav, with Dropdown Menu trigger expanded and team-initial Dropdown trigger collapsed.
- [ ] Focus rings are visible: purple light/yellow dark.

## Claude Improvement Notes

Future specs can split app sidebar, resource subnav, and mobile sheet navigation if the combined file becomes too broad. For now, keeping them together helps AI agents build coherent dashboard shells.

## Source References

- `DESIGN_V2.md`
- Shadcn-Svelte Sidebar primitive
- Coolify current sidebar/navbar visual pattern: dense rows, active dark yellow, border-separated shell
