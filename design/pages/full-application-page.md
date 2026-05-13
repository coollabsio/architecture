---
version: alpha
name: Full Application Page
description: Full viewport application shell using the Coolify sidebar navbar and main content region.
colors:
  page-light: "#f9fafb"
  base: "#101010"
  appBase: "#101010"
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  neutral-200: "#e5e5e5"
  neutral-300: "#d4d4d4"
  coolgray-100: "#181818"
  coolgray-200: "#202020"
  coolgray-300: "#242424"
  coollabs: "#6b16ed"
  warning: "#fcd452"
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
  sidebar-width: 16rem
  collapsed-width: 4rem
  content-padding: 1.5rem
  main-padding-with-breadcrumbs: 2rem
  main-padding-without-breadcrumbs: 1.25rem
components:
  app-shell:
    backgroundColor: "{colors.page-light}"
    textColor: "{colors.text}"
  app-shell-dark:
    backgroundColor: "{colors.appBase}"
    textColor: "{colors.muted}"
---

# Full Application Page

## Overview

The Full Application Page is the production-style application shell: persistent sidebar navbar on the left and a full-height main content region on the right. Use this when showing a complete app screen instead of a small component demo card.

Base composition: `design/navigation/sidebar-navbar.md` for the sidebar, `design/layouts/main-view.md` for main content structure, and Shadcn-Svelte `Button`, `Badge`, `Card`, `Breadcrumb`, and form primitives inside the content region.

## Colors

- Shell background: `bg-gray-50 dark:bg-app-base`.
- Sidebar follows `design/navigation/sidebar-navbar.md` exactly.
- Main content cards use `bg-white dark:bg-coolgray-100` with neutral/coolgray borders.
- Active states in dark mode use yellow, not purple.

## Typography

- Page title: `text-3xl font-bold tracking-tight`.
- Page description: `text-sm text-neutral-600 dark:text-neutral-400`.
- Subnav/content labels: `text-sm`.
- Metadata: `text-xs text-neutral-500 dark:text-neutral-400`.

## Layout

```txt
Full viewport shell
  SidebarNavbar
  Main region
    Optional breadcrumb
    Header/subnav
    Page content grid/cards/forms
```

Use the sidebar as part of the page, not inside a centered sample card.

If the main view does not render breadcrumbs, reduce the main region's top padding so the title does not sit too low. Breadcrumbs occupy the first visual row; without them, the page title should move closer to the top of the content region.

## Exact Layout Recipe

```txt
page-shell: min-h-screen bg-gray-50 text-black dark:bg-app-base dark:text-neutral-400 lg:grid lg:grid-cols-[auto_1fr]
main-region-with-breadcrumbs: min-w-0 px-6 py-8
main-region-without-breadcrumbs: min-w-0 px-6 pb-8 pt-5
main-inner: mx-auto max-w-6xl
header: mb-6 flex flex-col gap-4 border-b-2 border-neutral-200 pb-4 dark:border-coolgray-200 md:flex-row md:items-end md:justify-between
header-with-breadcrumbs: mb-6 flex flex-col gap-4 border-b-2 border-neutral-200 pb-4 dark:border-coolgray-200 md:flex-row md:items-end md:justify-between
header-without-breadcrumbs: mb-6 flex flex-col gap-3 border-b-2 border-neutral-200 pb-4 dark:border-coolgray-200 md:flex-row md:items-end md:justify-between
breadcrumb-row: mb-3
page-title: text-3xl font-bold tracking-tight text-black dark:text-white
page-description: mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400
subnav-row: flex min-h-10 items-center gap-6 overflow-x-auto whitespace-nowrap pt-2 text-sm
content-grid: grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]
content-card: rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100
```

## Exact Classes

```txt
shell: min-h-screen bg-gray-50 text-black dark:bg-app-base dark:text-neutral-400 lg:grid lg:grid-cols-[auto_1fr]
main-with-breadcrumbs: min-w-0 px-6 py-8
main-without-breadcrumbs: min-w-0 px-6 pb-8 pt-5
inner: mx-auto max-w-6xl
header-border: border-b-2 border-neutral-200 dark:border-coolgray-200
card: rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100
```

## Elevation & Depth

Use border separation only. Do not wrap the whole app in a demo card. Do not add heavy shadows.

## Shapes

Use `rounded-sm` for cards and controls. The app shell itself is square/full viewport.

## Components

- Sidebar: `design/navigation/sidebar-navbar.md`.
- Breadcrumbs: `design/navigation/breadcrumbs.md`.
- Cards: `design/containers/card.md`.
- Buttons: `design/forms/button.md`.
- Badges/status: `design/status/badge.md` and `design/status/status-indicator.md`.
- Optional settings content: `design/pages/settings-page.md`.

### Form control surface contrast

When this spec renders `Input`, `PasswordInput`, command/search input, or `Textarea` inside gray/neutral panels, the control surface must be darker/lighter than the container so it does not blend in.

```txt
light gray panel: parent bg-gray-50 or bg-neutral-100 + control bg-white
dark app-base panel: parent dark:bg-app-base + control dark:bg-coolgray-100
dark gray panel: parent dark:bg-coolgray-100 + control dark:bg-app-base
```

Follow the exact context-contrast rule from `design/forms/input.md` and `design/forms/textarea.md`.

## Do's and Don'ts

- Do make the sidebar and main content fill the available viewport.
- Do reduce main top padding to `pt-5` when no breadcrumbs are rendered.
- Do keep the global top sample selector outside/above the app shell in the mockup app only.
- Do preserve sidebar collapse behavior and footer theme switcher.
- Do use full-width page content, not a small centered sample box.
- Don't wrap the entire app shell in a bordered demo panel.
- Don't replace the sidebar trigger with a normal square Shadcn trigger.

## Implementation Notes

In the mockup app, the shared top selector remains visible above every page. Real products should not include that selector; they should render only the full application shell.

## Review Checklist

- [ ] Any input/search/textarea controls on gray or coolgray panels have a visible contrast step; no same-color control-on-panel pairing.
- [ ] Page route renders a full app shell, not a small component sample card.
- [ ] Sidebar uses `design/navigation/sidebar-navbar.md` and includes collapse + theme footer controls.
- [ ] Main region is `min-w-0 px-6 py-8` when breadcrumbs are present, or `min-w-0 px-6 pb-8 pt-5` when breadcrumbs are absent.
- [ ] Header uses optional breadcrumb, title, status, actions, and subnav with exact text sizes.
- [ ] Pages without breadcrumbs do not leave an empty breadcrumb-height gap above the title.
- [ ] Content cards use neutral borders and `rounded-sm`.
- [ ] Mobile layout stacks without horizontal overflow.
- [ ] Dark mode uses `dark:bg-app-base`, `dark:bg-coolgray-100`, and yellow active/focus accents.

## Claude Improvement Notes

If the app requires a mobile drawer, reuse the same sidebar navbar visual contract inside a Shadcn-Svelte Sheet.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/pages/full-application-page/+page.svelte`

- `DESIGN.md`
- `design/navigation/sidebar-navbar.md`
- `design/layouts/main-view.md`
- `design/pages/settings-page.md`
