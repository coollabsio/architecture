---
version: alpha
name: Coolify Toast
description: Shadcn-Svelte Sonner toast styling for short non-blocking feedback.
colors:
  success: "#16a34a"
  warning: "#fcd452"
  error: "#dc2626"
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
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
  gap: 0.5rem
components:
  toast:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
---

# Toast

## Overview

Toast is a short non-blocking notification using Shadcn-Svelte `Sonner`. Use it for saved, copied, queued, failed, or completed feedback.

## Colors

Default toast uses neutral surface and border. Success/warning/error use semantic icon/accent color; avoid full-fill toasts unless urgency requires it.

## Typography

Title uses `text-sm font-bold`; description uses `text-sm` or `text-xs` muted text.

## Layout

Toast surface is `rounded-sm border p-3`, compact, with `gap-2` and optional `size-4` icon. Actions use Button classes. Triggered toasts render in a fixed viewport such as `fixed bottom-4 right-4 z-20` and auto-dismiss.

## Exact Layout Recipe

Use the current mockup ToastPreview exactly:

```txt
toast: grid max-w-sm grid-cols-[1rem_1fr] gap-2 rounded-sm border p-3 text-sm
icon: mt-0.5 size-4 text-center font-bold
icon-default: text-coollabs dark:text-warning
title: font-bold
description: text-neutral-600 dark:text-neutral-400
viewport-sample: fixed bottom-4 right-4 z-20 w-[min(24rem,calc(100vw-2rem))] space-y-2
close: absolute right-2 top-2 grid size-5 place-items-center rounded-sm text-xs
```

## Exact Classes

```txt
toast: grid max-w-sm grid-cols-[1rem_1fr] gap-2 rounded-sm border border-neutral-200 bg-white p-3 text-sm text-black shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white
icon: mt-0.5 size-4 text-center font-bold
title: font-bold
description: text-neutral-600 dark:text-neutral-400
close: absolute right-2 top-2 grid size-5 place-items-center rounded-sm text-xs text-neutral-500 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-coolgray-200 dark:hover:text-white
```

## Elevation & Depth

Use a small shadow only for overlay separation: `shadow-sm`. Do not use large floating cards.

## Shapes

Use `rounded-sm`.

## Components

Start from Shadcn-Svelte Sonner:

```bash
bunx shadcn-svelte@latest add sonner
```

Recommended toast class:

```txt
rounded-sm border border-neutral-200 bg-white p-3 text-sm text-black shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white
```

## Do's and Don'ts

- Do keep messages short.
- Do make trigger buttons actually create a toast in mockups/examples, not only render static previews.
- Do use Alert for persistent inline information.
- Don't use toast for blocking confirmations.

## Implementation Notes

Toasts should auto-dismiss unless they contain an action. Destructive failures should remain long enough to read.

## Review Checklist

- [ ] Toast is compact, bordered, and `rounded-sm`.
- [ ] Trigger examples render a toast and auto-dismiss it.
- [ ] Semantic state uses icon/accent and readable text.
- [ ] Actions use Button.

## Claude Improvement Notes

A future spec can define exact Sonner viewport placement and max stack count.

## Source References

- `DESIGN.md`
- Shadcn-Svelte Sonner primitive
