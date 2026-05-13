---
version: alpha
name: Coolify Callout
description: Informational callout block built from Alert styling for help, docs, and contextual guidance.
colors:
  primary: "#6b16ed"
  warning: "#fcd452"
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  neutral-200: "#e5e5e5"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
typography:
  body-sm:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  padding: 0.75rem
  icon-size: 1rem
components:
  callout:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
---

# Callout

## Overview

Callout is a non-urgent informational block for hints, docs links, and contextual guidance. Use Alert for state/feedback; use Callout for explanatory content.

## Colors

Neutral surface with neutral border. Use purple icon/accent in light mode and yellow icon/accent in dark mode. Do not use red/green unless it is an Alert.

## Typography

Title uses `text-sm font-bold`; body uses `text-sm`; links follow design link styles.

## Layout

Use `grid grid-cols-[1rem_1fr] gap-2 rounded-sm border p-3`. Optional actions sit below the body with `mt-2 flex gap-2`.

## Exact Layout Recipe

```txt
overlay-surface: rounded-sm border border-neutral-200 bg-white p-4 shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100
overlay-title: text-base font-bold text-black dark:text-white
overlay-description: text-sm text-neutral-600 dark:text-neutral-400
overlay-body: text-sm text-neutral-700 dark:text-neutral-300
overlay-actions: flex flex-wrap justify-end gap-2
close-button: grid size-8 place-items-center rounded-sm
```

## Exact Classes

```txt
surface: rounded-sm border border-neutral-200 bg-white p-4 text-black shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white
header: flex items-start justify-between gap-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200
footer: flex flex-wrap justify-end gap-2 border-t border-neutral-200 pt-3 dark:border-coolgray-200
backdrop: fixed inset-0 z-40 bg-black/60
content: fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2
```

## Elevation & Depth

No heavy shadows. Callouts are inline content.

## Shapes

Use `rounded-sm`.

## Components

Start from Shadcn-Svelte `Alert` or local Alert styles, but keep semantics non-urgent.

```txt
grid grid-cols-[1rem_1fr] gap-2 rounded-sm border border-neutral-200 bg-white p-3 text-sm dark:border-coolgray-300 dark:bg-coolgray-100
```

## Do's and Don'ts

- Do use for guidance/help.
- Do keep content concise.
- Don't use `role="alert"` for ordinary callouts.
- Don't use callouts as cards.

## Implementation Notes

If the callout includes a docs link, use the External Link spec.

## Review Checklist

- [ ] Non-urgent; no alert role.
- [ ] Compact bordered `rounded-sm` surface.
- [ ] Accent is purple light/yellow dark.

## Claude Improvement Notes

Future variants can define docs, tip, and note callouts separately.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/callout/+page.svelte`

- `DESIGN.md`
- `design/overlays/alert.md`
