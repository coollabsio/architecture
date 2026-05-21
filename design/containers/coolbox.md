---
version: alpha
name: Coolify Coolbox
description: Interactive card/link surface used for dashboard resource boxes and quick navigation.
colors:
  primary: "#6b16ed"
  warning: "#fcd452"
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  neutral-200: "#e5e5e5"
  neutral-300: "#d4d4d4"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
  coolgray-400: "#282828"
  white: "#ffffff"
typography:
  title-sm:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 700
    lineHeight: 1.25rem
  description-xs:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1rem
rounded:
  sm: 0.25rem
spacing:
  min-height: 4rem
  padding: 0.5rem
components:
  coolbox:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.sm}"
  coolbox-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.white}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.sm}"
---

# Coolbox

## Overview

Coolbox is the interactive box/card link used in Coolify-style main views for resources, shortcuts, and selectable entities. It is more interactive than Card: it is usually an anchor/button with hover ring.

## Colors

Light mode uses white surface, neutral border, black title, muted description, and purple hover ring. Dark mode uses `coolgray-100` surface, dark border, white title, muted description, and yellow hover ring.

## Typography

Title uses `text-sm font-bold`. Description uses `text-xs font-bold text-neutral-500`; on hover it may become black/white for readability.

## Layout

Use `relative flex min-h-[4rem] flex-col gap-1 rounded-sm border p-2`. Horizontal layouts may switch to `lg:flex-row` when content needs icon + text + metadata.

## Exact Layout Recipe

Use the current mockup Coolbox typography and spacing:

```txt
coolbox: block rounded-sm border border-neutral-200 bg-white p-3 transition-colors hover:border-coollabs dark:border-coolgray-300 dark:bg-coolgray-100 dark:hover:border-warning
content-stack: space-y-1
title: font-bold text-black dark:text-white
description: text-xs font-bold text-neutral-500 dark:text-neutral-400
optional-status: mt-2
sample-grid: grid gap-4 sm:grid-cols-2 xl:grid-cols-3
```

## Exact Classes

```txt
anchor: block rounded-sm border border-neutral-200 bg-white p-3 transition-colors hover:border-coollabs focus-visible:ring-2 focus-visible:ring-coollabs dark:border-coolgray-300 dark:bg-coolgray-100 dark:hover:border-warning dark:focus-visible:ring-warning
title: font-bold text-black dark:text-white
description: text-xs font-bold text-neutral-500 dark:text-neutral-400
```

## Elevation & Depth

Default box is flat. Hover uses `ring-2`, not heavy shadow.

## Shapes

Use `rounded-sm` only.

## Components

Recommended anchor classes:

```txt
relative flex min-h-[4rem] cursor-pointer flex-col rounded-sm border border-neutral-200 bg-white p-2 text-black transition-all duration-150 hover:ring-2 hover:ring-coollabs hover:no-underline dark:border-coolgray-400 dark:bg-coolgray-100 dark:text-white dark:hover:ring-warning
```

Title:

```txt
font-bold text-black dark:text-white
```

Description:

```txt
text-xs font-bold text-neutral-500 group-hover:text-black dark:group-hover:text-white
```

## Do's and Don'ts

- Do use for clickable resource/shortcut boxes.
- Do keep density compact and minimum height around 4rem.
- Don't use Coolbox for passive content; use Card.
- Don't add gradients, large radius, or heavy shadows.

## Implementation Notes

Render as `<a>` for navigation and `<button>` only for in-place actions. Preserve accessible names.

## Review Checklist

- [ ] Interactive element has anchor/button semantics.
- [ ] Uses `min-h-[4rem]`, `p-2`, `rounded-sm`.
- [ ] Hover ring is purple light/yellow dark.
- [ ] No decorative gradients or large shadows.

## Claude Improvement Notes

A future Box spec can define non-ring variants. Coolbox should stay the ring-hover interactive pattern.

## Source References

- Mockup reference: no dedicated React mock route yet. The Coolbox pattern is currently shown inline inside `mockups/shadcn-react-sample/src/routes/pages/main-view.tsx` (resource grid `Coolbox` helper).

- `DESIGN.md`
- Coolify current `coolbox` utility visual pattern
