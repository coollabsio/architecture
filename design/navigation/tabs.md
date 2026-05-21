---
version: alpha
name: Coolify Tabs
description: shadcn/ui Tabs primitive for compact section navigation inside pages or cards.
colors:
  primary: "#6b16ed"
  warning: "#fcd452"
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  neutral-200: "#e5e5e5"
  coolgray-100: "#181818"
  coolgray-200: "#202020"
  coolgray-300: "#242424"
  base: "#101010"
typography:
  tab-sm:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  trigger-height: 2rem
  trigger-padding-x: 0.5rem
components:
  tabs-list:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
  tabs-trigger-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.tab-sm}"
    rounded: "{rounded.sm}"
---

# Tabs

## Overview

The Coolify Tabs component is a shadcn/ui `Tabs` primitive for switching between related sections within the same page, card, or settings panel.

## Colors

- Inactive triggers use muted text and transparent/neutral background.
- Active light trigger uses white surface, neutral border, and black text.
- Active dark trigger uses `coolgray-200` or `coolgray-300` with white text.
- Focus ring uses purple in light mode and yellow in dark mode.

## Typography

Triggers use `text-sm font-medium`. Avoid uppercase tab labels.

## Layout

Tabs are compact: list uses `inline-flex gap-1 rounded-sm border p-1`; triggers use `h-8 px-2`. Content has `mt-3` and no implicit card unless explicitly composed with Card.

## Exact Layout Recipe

Use the current mockup Tabs component exactly:

```txt
root: w-full
list: inline-flex gap-1 rounded-sm border border-neutral-200 bg-white p-1 dark:border-coolgray-300 dark:bg-coolgray-100
trigger: inline-flex h-8 cursor-pointer items-center justify-center rounded-sm px-2 text-sm font-medium
active: data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm dark:data-[state=active]:bg-coolgray-200 dark:data-[state=active]:text-white dark:data-[state=active]:shadow-none
```

## Exact Classes

```txt
list: inline-flex gap-1 rounded-sm border border-neutral-200 bg-white p-1 dark:border-coolgray-300 dark:bg-coolgray-100
trigger: inline-flex h-8 cursor-pointer items-center justify-center rounded-sm px-2 text-sm font-medium text-neutral-600 outline-none transition-colors hover:bg-neutral-100 hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm dark:text-neutral-400 dark:hover:bg-coolgray-200 dark:hover:text-white dark:focus-visible:ring-warning dark:data-[state=active]:bg-coolgray-200 dark:data-[state=active]:text-white dark:data-[state=active]:shadow-none
```

## Elevation & Depth

No shadows. Active state is expressed with surface, text contrast, and optional border.

## Shapes

Use `rounded-sm` for list and triggers.

## Components

### Tabs primitive

Start from shadcn/ui `Tabs`:

```bash
bunx shadcn@latest add tabs
```

Trigger classes:

```txt
inline-flex h-8 cursor-pointer items-center justify-center rounded-sm px-2 text-sm font-medium text-neutral-600 outline-none transition-colors hover:bg-neutral-100 hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs data-[state=active]:bg-white data-[state=active]:text-black dark:text-neutral-400 dark:hover:bg-coolgray-200 dark:hover:text-white dark:focus-visible:ring-warning dark:data-[state=active]:bg-coolgray-200 dark:data-[state=active]:text-white
```

## Do's and Don'ts

- Do use tabs for peer sections of one context.
- Do keep labels short.
- Don't use tabs for primary app navigation; use sidebar/nav instead.
- Don't add large rounded pill tabs.

## Implementation Notes

Tabs must support keyboard navigation and expose correct `role="tablist"`, `role="tab"`, and `role="tabpanel"` when using custom markup.

## Review Checklist

- [ ] Triggers are `h-8`, `px-2`, `rounded-sm`.
- [ ] Active tab is clear in light and dark modes.
- [ ] Keyboard/ARIA behavior is preserved.

## Claude Improvement Notes

A separate top-level navigation spec can define sidebar and page nav patterns.

## Source References

- Mockup reference: `mockups/shadcn-react-sample/src/routes/components/tabs.tsx`

- `DESIGN.md`
- shadcn/ui Tabs primitive
