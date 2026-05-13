---
version: alpha
name: Coolify Searchable Dropdown
description: Combobox-style dropdown for selecting from longer searchable option lists.
colors:
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  neutral-200: "#e5e5e5"
  neutral-300: "#d4d4d4"
  coolgray-100: "#181818"
  coolgray-200: "#202020"
  coolgray-300: "#242424"
  coollabs: "#6b16ed"
  warning: "#fbbf24"
typography:
  item:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
components:
  searchable-dropdown:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.item}"
    rounded: "{rounded.sm}"
---

# Searchable Dropdown

## Overview

Searchable Dropdown is a combobox-style selector for longer option lists where native select is not enough. Use Shadcn-Svelte `Command` + `Popover`/`Combobox` as the production base, extended with Coolify density and colors.

## Colors

Trigger follows Button styling. Popover surface is white in light mode and the darker toast-aligned `coolgray-100` in dark mode. Active selection uses neutral background in light mode and `coolgray-200` with yellow text in dark mode.

## Typography

Options use compact `text-sm`; descriptions use `text-xs` muted text.

## Layout

Anatomy:

```txt
Trigger button with selected label + stacked chevron
Popover
  Search input (focused automatically when opened)
  Scrollable option list
  Empty state
```

The search input must receive focus automatically when the dropdown opens. The option list must have bounded height and internal scroll.

## Exact Layout Recipe

```txt
root: relative w-full min-w-52 max-w-sm
trigger: Button w-full justify-between
trigger-label: truncate; placeholder text-neutral-500 dark:text-neutral-400
chevron: size-4 shrink-0, stacked up/down paths
popover: absolute left-0 top-full z-50 mt-1 w-full rounded-sm border p-1 shadow-sm
search-wrap: p-1
list: mt-1 max-h-56 overflow-y-auto overscroll-contain
option: group flex w-full items-start gap-2 rounded-sm px-2 py-2 text-left text-sm
option-check: w-4 shrink-0 text-center
option-description: block truncate text-xs font-normal
```

## Exact Classes

```txt
popover: absolute left-0 top-full z-50 mt-1 w-full rounded-sm border border-neutral-300 bg-white p-1 shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100
option: group flex w-full items-start gap-2 rounded-sm px-2 py-2 text-left text-sm text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-coollabs dark:hover:text-white
selected: bg-neutral-100 font-semibold dark:bg-coolgray-200 dark:text-warning
description: block truncate text-xs font-normal text-neutral-500 dark:text-neutral-400 dark:group-hover:text-white
empty: px-2 py-6 text-center text-sm text-neutral-500 dark:text-neutral-400
```

## Elevation & Depth

Use neutral border and subtle shadow on the popover only.

## Shapes

Use `rounded-sm`.

## Components

- Button trigger
- Input search field
- Popover/Command list
- Optional option descriptions

### Form control surface contrast

When this spec renders `Input`, `PasswordInput`, command/search input, or `Textarea` inside gray/neutral panels, the control surface must be darker/lighter than the container so it does not blend in.

```txt
light gray panel: parent bg-gray-50 or bg-neutral-100 + control bg-white
dark app-base panel: parent dark:bg-app-base + control dark:bg-coolgray-100
dark gray panel: parent dark:bg-coolgray-100 + control dark:bg-app-base
```

Follow the exact context-contrast rule from `design/forms/input.md` and `design/forms/textarea.md`.

## Do's and Don'ts

- Do use this for searchable lists with more than a handful of options.
- Do keep the native Select for simple static choices.
- Do include an empty result state.
- Don't use for multi-step actions; use Command Palette or Dialog.

## Implementation Notes

Production should use accessible combobox semantics and keyboard navigation. The mockup focuses on visual behavior and selection state.

## Review Checklist

- [ ] Any input/search/textarea controls on gray or coolgray panels have a visible contrast step; no same-color control-on-panel pairing.
- [ ] Search input is focused by default when opened.
- [ ] Search filters options.
- [ ] Selected item is visible.
- [ ] Dropdown list scrolls internally.
- [ ] Empty result state exists.

## Claude Improvement Notes

Future variant can add async loading and grouped options.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/searchable-dropdown/+page.svelte`

- `design/forms/dropdown.md`
- `design/forms/input.md`
- `design/forms/select.md`
