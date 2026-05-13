---
version: alpha
name: Coolify Confirm Modal
description: Single-step confirmation for reversible or lower-risk actions.
colors:
  overlay: "rgba(0,0,0,0.60)"
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

## Elevation & Depth

Use overlay and subtle shadow only.

## Shapes

Use `rounded-sm`.

## Components

- Shadcn-Svelte `AlertDialog` preferred.
- `Button` default for cancel.
- `Button` highlighted for confirm.

## Do's and Don'ts

- Do use for reversible/low-risk actions.
- Do make confirm label action-specific.
- Don't require typed confirmation here.
- Don't use red/destructive styling unless the action is destructive.

## Implementation Notes

Focus should land on the least destructive safe action by default unless product chooses otherwise.

## Review Checklist

- [ ] Action-specific title and confirm label.
- [ ] Cancel action is present.
- [ ] Confirm action is highlighted, not destructive.

## Claude Improvement Notes

Consider adding loading state support for async confirmations.

## Source References

- `design/forms/button.md`
- `design/overlays/modal.md`
