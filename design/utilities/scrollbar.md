---
version: alpha
name: Coolify Scrollbar
description: Compact scrollbar treatment for scroll containers.
colors:
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  neutral-200: "#e5e5e5"
  coolgray-100: "#181818"
  coolgray-200: "#202020"
  coolgray-300: "#242424"
  coollabs: "#6b16ed"
  warning: "#fbbf24"
typography:
  body:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
components:
  component:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
---

# Scrollbar

## Overview

Use native scrollbar styling/utility where possible. Scroll containers should be explicit, compact, and not hide important controls.

## Colors

Use neutral light-mode surfaces and Coolify dark-mode `coolgray` surfaces. Accent/focus colors follow purple in light mode and yellow in dark mode.

## Typography

Use compact `text-sm` body text. Titles, where present, use bold Coolify heading style.

## Layout

Use native scrollbar styling/utility where possible. Scroll containers should be explicit, compact, and not hide important controls.

## Exact Layout Recipe

```txt
scroll-container: max-h-* overflow-y-auto overscroll-contain
scrollbar-width: thin
track: transparent
thumb-light: neutral-300
thumb-dark: coolgray-300
```

## Exact Classes

```txt
scrollbar: scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent dark:scrollbar-thumb-coolgray-300
example-container: scrollbar max-h-48 overflow-y-auto rounded-sm border border-neutral-200 bg-white p-3 text-sm dark:border-coolgray-300 dark:bg-coolgray-100
```

## Elevation & Depth

Use borders and subtle shadows only where the component is an overlay. Avoid heavy shadows and gradients.

## Shapes

Use `rounded-sm`.

## Components

Compose existing components where needed: Button, Badge, Input, Spinner, and links.

## Do's and Don'ts

Do use on logs, menus, tables. Don't depend on scrollbar color for meaning.

## Implementation Notes

Prefer the closest Shadcn-Svelte primitive and extend locally for Coolify density/colors.

## Review Checklist

- [ ] Scroll containers explicitly set overflow (`overflow-y-auto`, `overflow-x-auto`, or both) and do not rely on accidental page overflow.
- [ ] Scrollbars are thin/subtle: `scrollbar-thin` or native equivalent.
- [ ] Thumb color is neutral in light mode and coolgray in dark mode; scrollbar color is never used to communicate status.
- [ ] Track stays transparent or low-contrast so it does not create extra visual borders.
- [ ] Menus/dropdowns with many items set a max height and remain scrollable inside the viewport.
- [ ] Tables use horizontal overflow wrappers instead of shrinking text until unreadable.
- [ ] Log/code areas use Scrollbar together with mono typography and preserve keyboard/text selection behavior.
- [ ] Scroll containers preserve focus visibility for keyboard users and do not trap wheel/trackpad scrolling unexpectedly.
- [ ] Touch devices can scroll naturally; avoid hiding scrollbars when discoverability matters.
- [ ] No custom JavaScript scrollbar replacement, gradient track, thick decorative thumb, or layout-shifting overlay is introduced.

## Claude Improvement Notes

Future variants can be added after real product screens expose more states.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/scrollbar/+page.svelte`

- `DESIGN.md`
