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

## Elevation & Depth

Use neutral border and subtle shadow on the popover only.

## Shapes

Use `rounded-sm`.

## Components

- Button trigger
- Input search field
- Popover/Command list
- Optional option descriptions

## Do's and Don'ts

- Do use this for searchable lists with more than a handful of options.
- Do keep the native Select for simple static choices.
- Do include an empty result state.
- Don't use for multi-step actions; use Command Palette or Dialog.

## Implementation Notes

Production should use accessible combobox semantics and keyboard navigation. The mockup focuses on visual behavior and selection state.

## Review Checklist

- [ ] Search input is focused by default when opened.
- [ ] Search filters options.
- [ ] Selected item is visible.
- [ ] Dropdown list scrolls internally.
- [ ] Empty result state exists.

## Claude Improvement Notes

Future variant can add async loading and grouped options.

## Source References

- `design/forms/dropdown.md`
- `design/forms/input.md`
- `design/forms/select.md`
