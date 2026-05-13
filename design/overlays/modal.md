---
version: alpha
name: Coolify Dialog Modal
description: General purpose modal dialog for focused tasks, forms, and details.
colors:
  overlay: "rgba(0,0,0,0.60)"
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  neutral-200: "#e5e5e5"
  coolgray-100: "#181818"
  coolgray-200: "#202020"
  coolgray-300: "#242424"
typography:
  title:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.75rem
  body:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
components:
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
---

# Dialog Modal

## Overview

Dialog Modal is the general overlay for focused tasks: create/edit forms, details, and short workflows. Use Shadcn-Svelte `Dialog` as the implementation base where available; local wrappers should preserve this visual spec.

## Colors

Use a dark translucent overlay. Modal surface is white in light mode and `coolgray-100` in dark mode. Borders use neutral/coolgray colors.

## Typography

Title uses `text-xl font-bold`. Description/body uses `text-sm` muted text.

## Layout

Panel:

```txt
fixed inset-0 z-50 flex items-center justify-center p-4
w-full max-w-lg rounded-sm border bg-white p-4 dark:bg-coolgray-100
```

Anatomy:

```txt
Header: title, optional description, close button
Body: focused content
Footer: right-aligned actions
```

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

Use overlay and a subtle shadow. Do not use heavy 3D effects.

## Shapes

Use `rounded-sm`.

## Components

- Shadcn-Svelte `Dialog` primitive.
- Existing `Button`, `Input`, `FormField`, etc. inside content.

## Do's and Don'ts

- Do keep dialogs focused and short.
- Do include a visible close/cancel path.
- Don't use dialogs for destructive confirmation; use the destructive confirmation spec.
- Don't use large rounded corners or custom gradients.

## Implementation Notes

Trap focus and close on Escape when using the Shadcn primitive. The mockup uses a lightweight local implementation only for visual testing.

## Review Checklist

- [ ] Has title.
- [ ] Has accessible dialog semantics.
- [ ] Footer actions are right-aligned.
- [ ] Light and dark surfaces match Coolify style.

## Claude Improvement Notes

Add form-specific variants after modal input is finalized.

## Source References

- `design/forms/button.md`
- `design/forms/input.md`
