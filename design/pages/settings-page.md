---
version: alpha
name: Application Settings Page
description: Main application settings page for product-level configuration, maintenance, and danger-zone actions.
colors:
  surface: "#ffffff"
  page-light: "#f9fafb"
  base: "#101010"
  text: "#000000"
  muted: "#737373"
  neutral-200: "#e5e5e5"
  neutral-300: "#d4d4d4"
  coolgray-100: "#181818"
  coolgray-200: "#202020"
  coolgray-300: "#242424"
  coollabs: "#6b16ed"
  warning: "#fcd452"
  destructive: "#ef4444"
typography:
  page-title:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 1.875rem
    fontWeight: 700
    lineHeight: 2.25rem
  section-title:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 1rem
    fontWeight: 700
    lineHeight: 1.5rem
  body-sm:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
  caption-xs:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1rem
rounded:
  sm: 0.25rem
spacing:
  page-max-width: 72rem
  page-padding-x: 1.5rem
  page-padding-y: 2.5rem
  section-padding: 1rem
  field-gap: 1rem
components:
  settings-section:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
  settings-section-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
  danger-zone:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.destructive}"
    rounded: "{rounded.sm}"
---

# Application Settings Page

## Overview

The Application Settings Page is the main product-level configuration page for a self-hosted application. Use it for instance identity, public URL, registration policy, telemetry/update toggles, email/system settings, maintenance metadata, and destructive application actions.

This is a page composition built from Shadcn-Svelte primitives: `Button`, `Input`, `FormField`, `NativeSelect`/`Select`, `Switch`, `Badge`, `Callout`, `Tabs`/subnavigation when needed, and destructive confirmation modals for dangerous actions.

## Colors

- **Page background:** `bg-gray-50 dark:bg-base`.
- **Primary settings sections:** `bg-white dark:bg-coolgray-100` with neutral/coolgray border.
- **Nested preview/read-only blocks:** `bg-gray-50 dark:bg-base`.
- **Normal actions:** default Button from `design/forms/button.md`.
- **Primary save action:** highlighted Button from `design/forms/button.md`.
- **Danger zone:** neutral surface with red/destructive text and destructive buttons only for final actions.
- **Dark accent:** yellow warning only for focus/highlight states; do not use purple as the dark-mode active color.

## Typography

- Page title: `text-3xl font-bold tracking-tight`.
- Page description: `text-sm text-neutral-600 dark:text-neutral-400`.
- Section title: `text-base font-bold text-black dark:text-white`.
- Section description: `text-sm text-neutral-600 dark:text-neutral-400`.
- Field labels/descriptions: use `design/forms/form-field.md`.
- Metadata/captions: `text-xs text-neutral-500 dark:text-neutral-400`.

## Layout

Use a dashboard page layout with a constrained content width and stacked settings sections.

```txt
Page shell
  Header
    Title + description
    Save / Reset actions
  Optional info callout
  Settings content grid
    Main column
      General settings section
      Access & registration section
      Notifications/system section
    Side column
      Instance status card
      Maintenance card
      Danger zone card
```

Desktop layout uses a two-column grid: primary form content on the left and operational metadata/actions on the right. Mobile collapses to one column with actions wrapping below the title.

## Exact Layout Recipe

```txt
page: mx-auto min-h-screen max-w-6xl px-6 py-10
header: mb-6 flex flex-col gap-4 border-b border-neutral-200 pb-4 dark:border-coolgray-200 md:flex-row md:items-start md:justify-between
header-title: text-3xl font-bold tracking-tight text-black dark:text-white
header-description: mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400
header-actions: flex flex-wrap gap-2
content-grid: grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]
main-stack: space-y-4
side-stack: space-y-4
section: rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100
section-header: mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200
section-title: text-base font-bold text-black dark:text-white
section-description: mt-1 text-sm text-neutral-600 dark:text-neutral-400
field-grid: grid gap-4 md:grid-cols-2
field-stack: space-y-4
readonly-row: flex items-center justify-between gap-3 rounded-sm bg-gray-50 px-3 py-2 text-sm dark:bg-base
switch-row: flex items-start justify-between gap-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base
danger-section: rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100
danger-title: text-base font-bold text-red-700 dark:text-red-300
danger-description: mt-1 text-sm text-neutral-600 dark:text-neutral-400
```

## Exact Classes

```txt
page-title: text-3xl font-bold tracking-tight text-black dark:text-white
page-description: mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400
section-card: rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100
section-title: text-base font-bold text-black dark:text-white
section-description: mt-1 text-sm text-neutral-600 dark:text-neutral-400
metadata-label: text-xs text-neutral-500 dark:text-neutral-400
metadata-value: text-sm font-medium text-black dark:text-white
save-button: Button variant="highlighted" size="default"
reset-button: Button variant="default" size="default"
danger-button: Button variant="destructive" size="default"
input: use design/forms/input.md exact Input classes
select: use design/forms/select.md exact Select/NativeSelect classes
switch: use design/forms/switch.md exact SwitchRow when possible
callout: use design/overlays/callout.md
badge: use design/status/badge.md
```

## Elevation & Depth

Use borders and neutral surfaces only. Do not add heavy shadows. Side cards and main sections use the same depth so the page feels like a practical operator settings screen, not a marketing page.

## Shapes

Use `rounded-sm` for all cards, inputs, buttons, and status blocks. Do not use pill cards or rounded-xl settings panels.

## Components

### Header

```svelte
<header class="mb-6 flex flex-col gap-4 border-b border-neutral-200 pb-4 dark:border-coolgray-200 md:flex-row md:items-start md:justify-between">
  <div>
    <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Application settings</h1>
    <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">Configure instance identity, access policy, and operational behavior.</p>
  </div>
  <div class="flex flex-wrap gap-2">
    <Button>Reset</Button>
    <Button variant="highlighted">Save changes</Button>
  </div>
</header>
```

### General settings

Use this section for app name, public URL, default region/timezone, and support email. Use `FormField` for all labels and helper text.

### Access & registration

Use switches for immediate boolean policies:

- Allow public registration.
- Require email verification.
- Enable invite-only mode.
- Maintenance mode.

Switch rows should use `design/forms/switch.md`; do not use checkboxes for immediate on/off settings.

### Status side card

Show instance version, update channel, environment, and health state using `Badge`/`StatusIndicator`. Keep metadata compact and read-only.

### Danger zone

Danger zone is visually separated but does not use a red outer border by default. Use neutral border/surface, red title/destructive button, and require a destructive confirmation modal for irreversible actions.

## Do's and Don'ts

- Do use one primary highlighted save button in the page header.
- Do group related settings into bordered `rounded-sm` sections.
- Do use helper text for settings with operational impact.
- Do keep side metadata read-only and compact.
- Do use destructive confirmation for reset/delete/rotate-secret actions.
- Don't make every settings section a separate full page unless the app has enough settings to justify subnavigation.
- Don't use red outer borders for the danger zone; reserve red for text/buttons/destructive confirmation.
- Don't invent controls outside the existing component specs.
- Don't copy Laravel, Blade, Livewire, Alpine, or project-specific implementation details into this page spec.

## Implementation Notes

Persist settings through app-specific forms/actions/API calls. This design only specifies the visual page composition and component contracts. If settings are split into subsections, use `design/navigation/subsidebar.md` or `design/navigation/tabs.md`.

## Review Checklist

- [ ] Page uses `max-w-6xl px-6 py-10` and `bg-gray-50 dark:bg-base` from the surrounding app shell.
- [ ] Header has `text-3xl font-bold tracking-tight` title, `text-sm` description, Reset, and one highlighted Save button.
- [ ] Main content uses `grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]`.
- [ ] Settings sections use `rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100`.
- [ ] Inputs/selects use the exact form component specs.
- [ ] Switch settings use Switch/SwitchRow styling, not ad-hoc toggles.
- [ ] Metadata side cards use compact `text-xs` labels and `text-sm` values.
- [ ] Danger zone has neutral outer border/surface, red title/destructive button, and confirmation for irreversible actions.
- [ ] Mobile layout collapses to one column and header actions wrap without overflow.
- [ ] Focus rings are visible: purple in light mode, yellow in dark mode.

## Claude Improvement Notes

If a project has many settings, split this page into an application settings shell plus sub-pages for General, Access, Email, Backups, and Danger Zone. Keep the same section/card styling.

## Source References

- `DESIGN.md`
- `design/forms/button.md`
- `design/forms/input.md`
- `design/forms/form-field.md`
- `design/forms/select.md`
- `design/forms/switch.md`
- `design/status/badge.md`
- `design/overlays/callout.md`
