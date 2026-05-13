---
version: alpha
name: Coolify Card
description: Shadcn-Svelte Card primitive for compact operational surfaces and settings panels.
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
  title-md:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 1rem
    fontWeight: 700
    lineHeight: 1.5rem
  body-sm:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  padding: 1rem
  gap: 0.75rem
components:
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
  card-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
---

# Card

## Overview

The Coolify Card is a Shadcn-Svelte `Card` primitive for grouping operational content, settings, metrics, and action rows. It should remain dense, sharp, and functional.

## Colors

- Light: white surface, neutral border, black headings, muted body text.
- Dark: `coolgray-100` or `base` surface, `coolgray-300` border, white headings, neutral body text.
- Accent is reserved for links, badges, focus, or specific highlighted content inside the card.

## Typography

Card title uses `text-base font-bold`. Body uses `text-sm`. Metadata uses `text-xs` muted.

## Layout

Base card: `rounded-sm border p-4`. Header and content should use `space-y-1` / `space-y-3`, not large whitespace. Footer action rows use `flex flex-wrap gap-2`.

## Exact Layout Recipe

Use the current mockup Card component classes exactly:

```txt
card: rounded-sm border border-neutral-200 bg-white p-4 text-black dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white
card-header: mb-3 space-y-1 border-b border-neutral-200 pb-3 dark:border-coolgray-200
card-title: text-base font-bold text-black dark:text-white
card-description: text-sm text-neutral-600 dark:text-neutral-400
card-body: text-sm text-black dark:text-white unless content-specific text is needed
sample-page-shell: mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10
sample-section: w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100
sample-title: text-3xl font-bold tracking-tight text-black dark:text-white
sample-description: mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400
```

## Exact Classes

```txt
card: rounded-sm border border-neutral-200 bg-white p-4 text-black dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white
card-header: mb-3 space-y-1 border-b border-neutral-200 pb-3 dark:border-coolgray-200
card-title: text-base font-bold text-black dark:text-white
card-description: text-sm text-neutral-600 dark:text-neutral-400
metric-value: font-mono text-black dark:text-white
```

## Elevation & Depth

Cards do not use heavy shadows. Optional hover cards may use a subtle border/ring change, not a floating shadow.

## Shapes

Use `rounded-sm` consistently. Do not use large rounded dashboard cards.

## Components

### Card primitive

Start from Shadcn-Svelte `Card`:

```bash
bunx shadcn-svelte@latest add card
```

Base classes:

```txt
rounded-sm border border-neutral-200 bg-white p-4 text-sm text-neutral-600 dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-neutral-400
```

Subparts:

- `CardHeader`: `mb-3 space-y-1 border-b border-neutral-200 pb-3 dark:border-coolgray-200` when separation is needed.
- `CardTitle`: `text-base font-bold text-black dark:text-white`.
- `CardDescription`: `text-sm text-neutral-600 dark:text-neutral-400`.
- `CardFooter`: `mt-3 flex flex-wrap items-center gap-2`.

## Do's and Don'ts

- Do use cards to group related controls or status.
- Do keep card density compact.
- Don't wrap every tiny element in a card.
- Don't add gradients, large shadows, or large radius.

## Implementation Notes

Cards are layout primitives. They should not own business logic or fetch state.

## Review Checklist

- [ ] Card uses `rounded-sm border p-4`.
- [ ] Light/dark surfaces match V2 tokens.
- [ ] No heavy shadow or decorative gradient.

## Claude Improvement Notes

A later `coolbox.md` can document interactive hover/ring card links separately.

## Source References

- `DESIGN_V2.md`
- Shadcn-Svelte Card primitive
