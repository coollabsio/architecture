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
  appBase: "#101010"
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
  version-xs:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.625rem
    fontWeight: 400
    lineHeight: 0.875rem
rounded:
  sm: 0.25rem
  full: 9999px
spacing:
  sidebar-width: 16rem
  collapsed-width: 4rem
  item-height: 1.75rem
  collapsed-item-size: 2rem
  item-gap: 0.75rem
  icon-size: 1rem
  collapse-trigger-size: 1.5rem
  collapse-icon-size: 0.875rem
components:
  sidebar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.nav-sm}"
  sidebar-dark:
    backgroundColor: "{colors.appBase}"
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
  brand-name:
    typography: "{typography.brand-lg}"
    textColor: "{colors.text}"
  brand-version:
    typography: "{typography.version-xs}"
    textColor: "{colors.muted}"
  collapse-trigger:
    width: "{spacing.collapse-trigger-size}"
    height: "{spacing.collapse-trigger-size}"
    rounded: "{rounded.full}"
    iconSize: "{spacing.collapse-icon-size}"
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
- Version/build metadata: `text-[10px] leading-[0.875rem]` muted. Use `text-xs` only if the app has a longer environment/build label that would become illegible at `10px`.
- Nav item badges follow `design/status/badge.md`; do not change nav label size to fit badges.

## Layout

Desktop layout:

```txt
[ fixed/relative sidebar ] [ main content ]
```

Recommended shell:

```txt
min-h-screen bg-gray-50 text-black dark:bg-app-base dark:text-neutral-400 lg:grid lg:grid-cols-[16rem_1fr]
```

Sidebar:

```txt
relative flex min-h-screen w-64 flex-col border-r border-neutral-300 bg-white px-2 text-neutral-700 transition-all dark:border-coolgray-200 dark:bg-app-base dark:text-neutral-400
```

The sidebar itself must be `relative` and should not be clipped by an ancestor at the sidebar/main border. If a parent shell uses `overflow-hidden`, verify the collapse trigger remains visible.

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

## Exact Layout Recipe

```txt
shell: min-h-screen bg-gray-50 text-black dark:bg-app-base dark:text-neutral-400 lg:grid lg:grid-cols-[16rem_1fr]
sidebar-expanded: relative flex min-h-screen w-64 flex-col border-r border-neutral-300 bg-white px-2 text-neutral-700 transition-all dark:border-coolgray-200 dark:bg-app-base dark:text-neutral-400
sidebar-collapsed: relative flex min-h-screen w-16 flex-col border-r border-neutral-300 bg-white px-2 text-neutral-700 transition-all dark:border-coolgray-200 dark:bg-app-base dark:text-neutral-400
header-expanded: flex items-start gap-2 px-2 pb-4 pt-6
header-collapsed: flex flex-col items-center gap-2 px-0 pb-4 pt-6
brand-name: block truncate text-2xl font-bold tracking-tight text-black hover:opacity-80 dark:text-white
brand-version: text-[10px] leading-[0.875rem] text-neutral-500 dark:text-neutral-400
brand-collapsed-wrap: flex flex-col items-center gap-0.5
brand-collapsed-initial: grid size-8 place-items-center rounded-sm text-lg font-bold text-black hover:opacity-80 dark:text-white
brand-collapsed-version: max-w-12 truncate text-center text-[10px] leading-[0.875rem] text-neutral-500 dark:text-neutral-400
search-wrap: px-2 pb-4
search-button: inline-flex h-8 w-full items-center justify-between gap-1.5 rounded-sm border border-neutral-300 bg-neutral-100 px-2.5 text-sm hover:bg-neutral-200 dark:border-coolgray-200 dark:bg-coolgray-100 dark:hover:bg-coolgray-200
team-wrap-expanded: px-2 pb-7
team-container-expanded: relative w-full
team-trigger-expanded: flex h-8 w-full items-center justify-between gap-2 rounded-sm border border-neutral-300 bg-white px-2 text-left text-sm text-black outline-none hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-coollabs dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white dark:hover:bg-coolgray-200 dark:focus-visible:ring-warning
team-wrap-collapsed: flex justify-center px-0 pb-4
team-container-collapsed: relative mx-auto w-8
team-trigger-collapsed: flex size-8 cursor-pointer items-center justify-center rounded-sm bg-neutral-100 p-0 text-sm font-semibold text-coollabs transition-colors hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-coollabs dark:bg-coolgray-200 dark:text-warning dark:hover:bg-coolgray-300 dark:focus-visible:ring-warning
team-menu-collapsed: absolute left-full top-0 z-[100] ml-2 mt-0 min-w-48 max-h-72 overflow-y-auto rounded-sm border border-neutral-300 bg-white p-1 shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100
nav-list: flex flex-col gap-1.5
nav-item-expanded: flex min-h-7 w-full min-w-0 items-center gap-3 truncate rounded-sm px-2 py-1 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs dark:text-neutral-400 dark:hover:bg-coolgray-100 dark:hover:text-white dark:focus-visible:ring-warning
nav-item-collapsed: mx-auto flex size-8 min-w-0 items-center justify-center gap-0 truncate rounded-sm px-0 py-0 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs dark:text-neutral-400 dark:hover:bg-coolgray-100 dark:hover:text-white dark:focus-visible:ring-warning
nav-item-active: bg-neutral-200 text-black dark:bg-coolgray-200 dark:text-warning
nav-icon: size-4 shrink-0
footer: border-t border-neutral-200 py-3 dark:border-coolgray-200
footer-stack: space-y-1 border-t border-neutral-200 py-3 dark:border-coolgray-200
focus: focus-visible:ring-2 focus-visible:ring-coollabs dark:focus-visible:ring-warning
```

## Exact Classes

```txt
collapse-trigger: absolute -right-3 top-8 z-10 grid size-6 place-items-center rounded-full border border-neutral-300 bg-white text-black shadow-sm hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-coollabs dark:border-coolgray-200 dark:bg-app-base dark:text-warning dark:hover:bg-coolgray-100 dark:focus-visible:ring-warning
collapse-chevron: size-3.5 transition-transform
collapse-chevron-collapsed: rotate-180
collapse-chevron-svg: viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
collapse-chevron-path: M15 18 9 12l6-6
brand-name: block truncate text-2xl font-bold tracking-tight text-black hover:opacity-80 dark:text-white
brand-version: text-[10px] leading-[0.875rem] text-neutral-500 dark:text-neutral-400
brand-collapsed-wrap: flex flex-col items-center gap-0.5
brand-collapsed-initial: grid size-8 place-items-center rounded-sm text-lg font-bold text-black hover:opacity-80 dark:text-white
brand-collapsed-version: max-w-12 truncate text-center text-[10px] leading-[0.875rem] text-neutral-500 dark:text-neutral-400
team-trigger-expanded: flex h-8 w-full items-center justify-between gap-2 rounded-sm border border-neutral-300 bg-white px-2 text-left text-sm text-black outline-none hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-coollabs dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white dark:hover:bg-coolgray-200 dark:focus-visible:ring-warning
team-trigger-collapsed: flex size-8 cursor-pointer items-center justify-center rounded-sm bg-neutral-100 p-0 text-sm font-semibold text-coollabs transition-colors hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-coollabs dark:bg-coolgray-200 dark:text-warning dark:hover:bg-coolgray-300 dark:focus-visible:ring-warning
team-menu-label: px-1.5 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400; content `Switch team`
team-menu-item-active: font-semibold text-coollabs dark:text-warning
nav-link: flex min-h-7 w-full min-w-0 items-center gap-3 truncate rounded-sm px-2 py-1 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs dark:text-neutral-400 dark:hover:bg-coolgray-100 dark:hover:text-white dark:focus-visible:ring-warning
nav-link-collapsed: mx-auto size-8 justify-center gap-0 px-0 py-0
active-link: bg-neutral-200 text-black dark:bg-coolgray-200 dark:text-warning
nav-icon: size-4 shrink-0
settings-icon-svg: viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
footer-link: flex min-h-7 w-full items-center gap-3 rounded-sm px-2 py-1 text-sm hover:bg-neutral-100 hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs dark:hover:bg-coolgray-100 dark:hover:text-white dark:focus-visible:ring-warning
separator: border-neutral-200 dark:border-coolgray-200
```

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

Expanded brand block:

```svelte
<div class="min-w-0 flex-1">
  <a href="/" class="block truncate text-2xl font-bold tracking-tight text-black hover:opacity-80 dark:text-white">Coolify</a>
  <p class="text-[10px] leading-[0.875rem] text-neutral-500 dark:text-neutral-400">v4.0.0</p>
</div>
```

Collapsed brand block:

```svelte
<div class="flex flex-col items-center gap-0.5">
  <a
    href="/"
    class="grid size-8 place-items-center rounded-sm text-lg font-bold text-black hover:opacity-80 dark:text-white"
    title="Coolify"
    aria-label="Coolify"
  >
    C
  </a>
  <p class="max-w-12 truncate text-center text-[10px] leading-[0.875rem] text-neutral-500 dark:text-neutral-400" title="v4.0.0">v4.0.0</p>
</div>
```

Rules:

- App name uses `text-2xl font-bold tracking-tight`; keep it a single truncated line.
- Version/build metadata sits directly below the app name, uses `text-[10px] leading-[0.875rem]`, and is muted.
- If the app has a logo, place it before the text at `size-8 shrink-0`; do not increase the brand row height above the `pt-6 pb-4` header rhythm.
- Collapsed brand uses a `size-8` square initial/logo centered in the sidebar and still shows the version/build metadata below it. Keep `title` and `aria-label` on the initial/logo, and use `title` on the version when truncated.

### Collapse trigger

Sidebar must include an internal collapse/expand trigger positioned on the border between the sidebar and the main view, matching Coolify's rounded chevron affordance. Do not place the primary collapse control as a normal square button inside the header and do not rely on an external page button.

Recommended trigger classes:

```txt
absolute -right-3 top-8 z-10 grid size-6 place-items-center rounded-full border border-neutral-300 bg-white text-black shadow-sm hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-coollabs dark:border-coolgray-200 dark:bg-app-base dark:text-warning dark:hover:bg-coolgray-100 dark:focus-visible:ring-warning
```

Exact icon:

```svelte
<svg
  class={cn("size-3.5 transition-transform", collapsed && "rotate-180")}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2.2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <path d="M15 18 9 12l6-6" />
</svg>
```

Requirements:

- Use `aria-label="Collapse sidebar"` / `aria-label="Expand sidebar"`.
- Use `aria-expanded` to reflect expanded state.
- Keep it visible in both expanded and collapsed modes.
- Position it halfway over the sidebar/main border with `absolute -right-3`.
- Use a small rounded chevron control (`size-6 rounded-full`), not a square header button.
- Use the exact chevron path above, `size-3.5`, and `stroke-width="2.2"`.
- Rotate the chevron `180deg` when collapsed; do not swap to a different icon.
- Ensure the sidebar container is `relative` and the shell does not clip the trigger.
- Do not use the default Shadcn-Svelte `SidebarTrigger` visual without these classes.

### Optional team switcher

If a team/workspace switcher is required, place it directly below the header/search area and above the primary navigation list, matching Coolify's current placement. It is optional; do not reserve this space for apps without teams.

Use Shadcn-Svelte `Dropdown Menu` for both expanded and collapsed states. Do not use a native select for the team switcher: the team switcher is navigation/context switching, not an ordinary form field.

#### Expanded navbar team switcher

Expanded placement:

```txt
team-wrap-expanded: px-2 pb-7
team-container-expanded: relative w-full
```

Expanded trigger anatomy:

```txt
[ current team/workspace label                         stacked chevron ]
```

Expanded trigger contract:

- Render one full-width trigger for the current team/workspace only.
- Trigger height is `h-8`; it aligns visually with Search and compact nav rows.
- Use `rounded-sm`, a thin neutral border, white light surface, dark neutral surface, and compact `text-sm` typography.
- The label is `min-w-0 truncate`; never wrap team names or increase the row height.
- The chevron is the stacked up/down SVG used by Select/Dropdown triggers, `size-4 shrink-0`, not a single down chevron.
- Trigger opens a Dropdown Menu containing all available teams/workspaces.
- The menu starts with a non-interactive label/title row: `Switch team`.
- The active/current team item uses `font-semibold text-coollabs dark:text-warning`.
- Keep `aria-label`, `aria-haspopup="menu"`, and `aria-expanded` on the trigger.

Expanded trigger classes:

```txt
flex h-8 w-full items-center justify-between gap-2 rounded-sm border border-neutral-300 bg-white px-2 text-left text-sm text-black outline-none hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-coollabs dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white dark:hover:bg-coolgray-200 dark:focus-visible:ring-warning
```

Expanded dropdown placement:

```txt
left-0 right-auto top-full mt-1 w-full min-w-full
```

When using the Shadcn-Svelte `DropdownMenuContent` primitive, the equivalent placement is `side="bottom" align="start"` with a menu width at least matching the trigger.

#### Collapsed navbar team switcher

Collapsed placement:

```txt
team-wrap-collapsed: flex justify-center px-0 pb-4
team-container-collapsed: relative mx-auto w-8
```

Collapsed trigger anatomy:

```txt
[ team initial ]
```

Collapsed trigger contract:

- Hide the expanded full-width trigger entirely at the collapsed desktop breakpoint.
- Show a separate `size-8` square team-initial trigger centered in the `w-16` sidebar.
- The collapsed trigger must align with collapsed nav icons (`mx-auto size-8` rhythm).
- Display only a short initial/monogram, usually the first uppercase character of the current team/workspace.
- Keep the full team name in `title` and `aria-label`, e.g. `aria-label="Switch team. Current team: Coolify"`.
- Do not show the stacked chevron in collapsed mode; the trigger should remain a clean square initial.
- Do not reserve the expanded trigger width or render hidden text that affects layout.

Collapsed trigger classes:

```txt
flex size-8 cursor-pointer items-center justify-center rounded-sm bg-neutral-100 p-0 text-sm font-semibold text-coollabs transition-colors hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-coollabs dark:bg-coolgray-200 dark:text-warning dark:hover:bg-coolgray-300 dark:focus-visible:ring-warning
```

Collapsed dropdown placement must be anchored to the `relative mx-auto w-8` trigger wrapper, not viewport-fixed. Open beside the centered initial button so the menu does not drift when the sidebar width changes.

Collapsed dropdown placement classes:

```txt
absolute left-full top-0 z-[100] ml-2 mt-0 min-w-48 max-h-72 overflow-y-auto rounded-sm border border-neutral-300 bg-white p-1 shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100
```

When using the Shadcn-Svelte `DropdownMenuContent` primitive, the equivalent placement is `side="right" align="start"`.

#### Team switcher menu items

Menu content and items follow `design/forms/dropdown.md`:

```txt
team-menu-content: absolute top-full z-50 mt-1 min-w-max max-w-[calc(100vw-1rem)] max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain rounded-sm border border-neutral-300 bg-white p-1 shadow-sm outline-none dark:border-coolgray-300 dark:bg-coolgray-100
team-menu-label: px-1.5 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400; text content is exactly `Switch team`
team-menu-item: relative flex w-full cursor-pointer select-none items-center justify-start gap-2 rounded-sm py-1 pl-2 pr-4 text-xs text-black outline-none transition-colors hover:bg-neutral-100 focus-visible:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-coollabs dark:focus-visible:bg-coollabs
team-menu-item-active: font-semibold text-coollabs dark:text-warning
```

Do not add avatars, large cards, descriptions, or secondary metadata inside this menu unless a product-specific team picker spec is introduced. Keep the menu dense and action-like.

### Search button

Use Button-like compact chrome:

```txt
inline-flex h-8 items-center gap-1.5 rounded-sm border border-neutral-300 bg-neutral-100 px-2.5 text-sm hover:bg-neutral-200 dark:border-coolgray-200 dark:bg-coolgray-100 dark:hover:bg-coolgray-200
```

Optional shortcut hint uses KBD spec.

### Main nav item

```svelte
<a href="/projects" aria-current="page" class="... bg-neutral-200 text-black dark:bg-coolgray-200 dark:text-warning">
  <Icon class="size-4 shrink-0" aria-hidden="true" />
  <span class="min-w-0 flex-1 truncate">Projects</span>
</a>
```

Expanded item contract:

- Wrapper: `min-h-7`, `px-2 py-1`, `gap-3`, `rounded-sm`, `text-sm`.
- Icon: `size-4 shrink-0`, stroke-based icons should use `stroke-width` around `1.7` unless the icon set requires otherwise.
- Label: `min-w-0 flex-1 truncate`.
- Badge/count: trailing item only, use `design/status/badge.md`.

Collapsed item contract:

- Link/button box becomes `mx-auto size-8 justify-center gap-0 px-0 py-0`.
- Hide visible text and badges in collapsed mode; keep `title`, `aria-label`, or tooltip with the original label.
- Icon remains `size-4`, centered in the `size-8` box.

### Footer item

Use the footer for stable global actions such as Theme and Settings. Keep it visually secondary and use the same dense row geometry as nav items.

```txt
footer-wrapper: space-y-1 border-t border-neutral-200 py-3 dark:border-coolgray-200
footer-link: flex min-h-7 w-full items-center gap-3 rounded-sm px-2 py-1 text-sm hover:bg-neutral-100 hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs dark:hover:bg-coolgray-100 dark:hover:text-white dark:focus-visible:ring-warning
footer-link-collapsed: size-8 justify-center px-0 py-0
footer-icon: size-4 shrink-0
```

Settings footer icon:

- Use the shared mockup `SettingsIcon` component for every Settings icon affordance in mockup pages.
- Keep the icon `size-4 shrink-0`, `currentColor`, `viewBox="0 0 24 24"`, and stroke-based geometry matching the approved gear reference.
- Do not substitute simplified crosshair/plus gear paths for Settings; text-only Settings links can remain text-only.

Theme switcher:

- Place in the footer above Settings when the app exposes a global theme preference.
- Expanded label is `Theme`; collapsed mode shows a compact one-character state (`L`, `S`, `D`) with `title` and `aria-label`.
- Use a compact inline 3-state icon switch with `Light`, `System default`, and `Dark` options; this should feel like the former inline two-state switch with one extra system segment, not a dropdown or large text control.
- Mark the active option with `bg-white text-coollabs shadow-sm dark:bg-app-base dark:text-warning`.
- Collapsed mode may cycle through Light → System default → Dark on click while preserving accessible state text.
- Do not style the theme switcher as a primary/highlighted action.

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
- Do place optional theme switching in the footer as a secondary row.
- Don't use large pills, marketing gradients, or heavy shadows.
- Don't make sidebar items look like primary buttons.
- Don't hide active state in dark mode; active item must remain obvious.
- Don't copy framework-specific implementation details into app-independent docs.

## Implementation Notes

This spec intentionally describes Shadcn-Svelte primitives and semantic HTML composition. App-specific routing, permissions, and server-side state should be supplied by the consuming app.

Collapsed state should be persisted only by the application shell, not by the primitive component itself. Use a controlled prop/store for expanded/collapsed state.

The optional sidebar sub-controls should also be available as direct reusable primitive samples in the mockup chooser:

- `Team Switcher` → `/components/team-switcher`
- `Theme Switcher` → `/components/theme-switcher`

These samples must show expanded and collapsed geometry without changing the placement contracts used inside the full Sidebar Navbar.

## Review Checklist

- [ ] Sidebar uses Shadcn-Svelte Sidebar or semantic `nav` composition.
- [ ] Sidebar container is `relative`, `w-64` expanded / `w-16` collapsed, border-separated, and has no heavy shadow.
- [ ] Parent shell does not clip the border collapse trigger; verify no problematic `overflow-hidden` at the sidebar/main border.
- [ ] Brand block uses `text-2xl font-bold tracking-tight`, truncates to one line, and places version/build metadata directly below at `text-[10px] leading-[0.875rem]`.
- [ ] Collapsed brand uses a centered `size-8` initial/logo with `title` and `aria-label`, plus visible `text-[10px]` version/build metadata below it.
- [ ] Nav items are `text-sm`, `rounded-sm`, dense, `min-h-7`, `px-2 py-1`, `gap-3`, and icon + label.
- [ ] Nav icons are `size-4 shrink-0`; collapsed nav icons remain `size-4` centered in a `size-8` item.
- [ ] Active light item uses neutral fill with black text; active dark item uses `dark:bg-coolgray-200 dark:text-warning`.
- [ ] Collapsed mode hides visible labels/badges but keeps accessible labels/tooltips.
- [ ] Sidebar has an internal collapse/expand trigger with `aria-expanded`, `aria-label`, `absolute -right-3 top-8`, `size-6`, `rounded-full`, and `shadow-sm`.
- [ ] Collapse chevron uses exact path `M15 18 9 12l6-6`, `size-3.5`, `stroke-width="2.2"`, and `rotate-180` when collapsed.
- [ ] Collapse trigger is not the default square/inline Shadcn trigger; it is the rounded border control.
- [ ] Page subnav uses horizontal scroll when needed.
- [ ] Optional team switcher is placed below header/search and above nav, with full-width Dropdown Menu trigger expanded and centered `size-8` team-initial Dropdown trigger collapsed.
- [ ] Search button is `h-8`, full width, `px-2.5`, `text-sm`, and uses KBD spec for shortcuts.
- [ ] Footer/global actions use a top border, `min-h-7` expanded links, `size-8` collapsed links, and `size-4` icons.
- [ ] Settings icon affordances use the shared approved gear icon component, inherit `currentColor`, and keep `size-4 shrink-0`.
- [ ] Optional theme switcher is in the sidebar footer above Settings, uses `aria-label`, and keeps `size-4` icon / `size-8` collapsed row geometry.
- [ ] Focus rings are visible: purple light/yellow dark.

## Claude Improvement Notes

Future specs can split app sidebar, resource subnav, and mobile sheet navigation if the combined file becomes too broad. For now, keeping them together helps AI agents build coherent dashboard shells.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/sidebar-navbar/+page.svelte`

- `DESIGN.md`
- Shadcn-Svelte Sidebar primitive
- Coolify current sidebar/navbar visual pattern: dense rows, active dark yellow, border-separated shell
