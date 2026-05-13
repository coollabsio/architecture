---
version: alpha
name: Coolify Highlighted Text and Required Asterisk
description: Inline emphasis and required field marker.
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

# Highlighted Text / Required Asterisk

## Overview

Highlighted text uses purple in light and yellow in dark. Required asterisk is semantic, visually compact, with sr-only required text.

## Colors

Use neutral light-mode surfaces and Coolify dark-mode `coolgray` surfaces. Accent/focus colors follow purple in light mode and yellow in dark mode.

## Typography

Use compact `text-sm` body text. Titles, where present, use bold Coolify heading style.

## Layout

Highlighted text uses purple in light and yellow in dark. Required asterisk is semantic, visually compact, with sr-only required text.

## Exact Layout Recipe

Use the current mockup inline text utilities exactly:

```txt
highlighted: rounded-sm px-1 py-0.5 font-medium text-coollabs-200 dark:text-warning
required-asterisk: font-bold text-coollabs dark:text-warning
label-with-required: block text-sm font-medium text-black dark:text-white
paragraph-context: text-sm text-neutral-700 dark:text-neutral-300
```

## Exact Classes

```txt
highlighted-text: rounded-sm px-1 py-0.5 font-medium text-coollabs-200 dark:text-warning
required-asterisk: font-bold text-coollabs dark:text-warning
label: block text-sm font-medium text-black dark:text-white
```

## Elevation & Depth

Use borders and subtle shadows only where the component is an overlay. Avoid heavy shadows and gradients.

## Shapes

Use `rounded-sm`.

## Components

Compose existing components where needed: Button, Badge, Input, Spinner, and links.

## Do's and Don'ts

Do use sparingly. Don't highlight full paragraphs or use asterisk without accessible required text.

## Implementation Notes

Prefer the closest Shadcn-Svelte primitive and extend locally for Coolify density/colors.

## Review Checklist

- [ ] Highlighted text uses `text-coollabs-200` or `text-coollabs` in light mode and `dark:text-warning` in dark mode.
- [ ] Required asterisk uses `font-bold text-coollabs dark:text-warning`.
- [ ] Required fields also expose semantic required state (`required`, `aria-required`, or equivalent form metadata), not only a visual asterisk.
- [ ] Asterisk appears directly next to the label with the Form Field label spacing (`gap-1`), not floating elsewhere.
- [ ] Highlighted inline snippets stay short; do not highlight full sentences or paragraphs.
- [ ] Inline highlight preserves surrounding line height and does not create pill/badge semantics unless explicitly intended.
- [ ] Links inside helper/highlight text remain underlined or otherwise clearly interactive.
- [ ] Text remains readable on white, neutral, `base`, and `coolgray-100` surfaces.
- [ ] Do not use purple as the dark-mode accent for helper/highlight/required text.
- [ ] No background gradients, large padding, oversized font weight, or badge-like replacement for normal emphasized text is introduced.

## Claude Improvement Notes

Future variants can be added after real product screens expose more states.

## Source References

- `DESIGN.md`
