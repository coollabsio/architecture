---
version: alpha
name: Coolify Confirm Modal
description: Single-step confirmation for reversible or lower-risk actions.
colors:
  overlay: "#000000"
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
  coollabs: "#6b16ed"
  warning: "#fbbf24"
typography:
  title:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.75rem
rounded:
  sm: 0.25rem
components:
  confirm-modal:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
---

# Confirm Modal

## Overview

Confirm Modal is a one-step `AlertDialog` for actions that need confirmation but are not permanently destructive, such as redeploy, restart, or apply changes.

## Colors

Use the standard dialog overlay and surface. Primary confirm action uses highlighted button styling.

## Typography

Title uses `text-xl font-bold`; body uses `text-sm` muted text.

## Layout

```txt
Title
Description
[ Cancel ] [ Confirm ]
```

Panel uses `max-w-md`, `rounded-sm`, border, and compact padding.

## Exact Layout Recipe

```txt
overlay-surface: rounded-sm border border-neutral-200 bg-white p-4 shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100
overlay-title: text-base font-bold text-black dark:text-white
overlay-description: text-sm text-neutral-600 dark:text-neutral-400
overlay-body: text-sm text-neutral-700 dark:text-neutral-300
overlay-actions: flex flex-wrap justify-end gap-2
close-button: follow design/overlays/modal.md "Modal close button"; use Button variant="ghost" size="icon" type="button" aria-label="Close confirmation"
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

Use overlay and subtle shadow only.

## Shapes

Use `rounded-sm`.

## Components

- shadcn/ui `AlertDialog` preferred.
- `Button` default for cancel.
- `Button` highlighted for confirm.
- Optional header X close button follows `design/overlays/modal.md` → "Modal close button".
- If present, use `aria-label="Close confirmation"` on the X close button.
- The X close button is not a replacement for the visible Cancel action; keep Cancel in the action row.

## Do's and Don'ts

- Do use for reversible/low-risk actions.
- Do make confirm label action-specific.
- Do keep the visible Cancel action even when a header X close button is present.
- Don't require typed confirmation here.
- Don't use red/destructive styling unless the action is destructive.

## Implementation Notes

Focus should land on the least destructive safe action by default unless product chooses otherwise.

## Review Checklist

- [ ] Action-specific title and confirm label.
- [ ] Cancel action is present.
- [ ] Optional header X close button follows the modal close-button contract and uses `aria-label="Close confirmation"`.
- [ ] Confirm action is highlighted, not destructive.

## Claude Improvement Notes

Consider adding loading state support for async confirmations.

## Source References

- Mockup reference: `mockups/shadcn-react-sample/src/routes/components/confirm-modal.tsx`

- `design/forms/button.md`
- `design/overlays/modal.md`
