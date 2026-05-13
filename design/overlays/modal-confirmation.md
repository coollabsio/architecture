---
version: alpha
name: Coolify Destructive Confirmation Modal
description: Typed confirmation modal for permanent destructive actions.
colors:
  overlay: "rgba(0,0,0,0.60)"
  surface: "#ffffff"
  error: "#ef4444"
  red-50: "#fef2f2"
  red-800: "#991b1b"
  red-900: "#7f1d1d"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
typography:
  title:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.75rem
rounded:
  sm: 0.25rem
components:
  destructive-confirmation:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
---

# Destructive Confirmation Modal

## Overview

Destructive Confirmation Modal is for irreversible actions: delete environment, delete server, wipe data, or remove production resources. Use Shadcn-Svelte `AlertDialog` or `Dialog` as the base and require typed confirmation for high-risk actions.

## Colors

Use standard overlay. Panel border uses the standard neutral/coolgray modal border. Only the inner warning area and destructive action use red/error colors. Dark mode keeps red text readable on dark red/coolgray surfaces.

## Typography

Title uses `text-xl font-bold`; body uses `text-sm`. Confirmation text uses mono/bold styling.

## Layout

```txt
Red warning block: title + consequences
Typed confirmation input
[ Cancel ] [ Destructive action ]
```

The destructive action stays disabled until the typed confirmation matches exactly.

## Elevation & Depth

Use overlay and subtle shadow. The red warning block communicates risk; do not add extra decoration.

## Shapes

Use `rounded-sm`.

## Components

- Shadcn-Svelte `AlertDialog` or `Dialog`.
- `Input` for typed confirmation.
- `Button` destructive variant for final action.

## Do's and Don'ts

- Do list irreversible consequences.
- Do require typed confirmation for dangerous actions.
- Do disable the destructive button until confirmed.
- Don't use highlighted/primary styling for destructive actions.
- Don't hide the cancel action.

## Implementation Notes

For the final implementation, support async loading on the destructive button and prevent accidental close while submitting.

## Review Checklist

- [ ] Consequences are explicit.
- [ ] Typed confirmation is required.
- [ ] Destructive action is disabled until valid.
- [ ] Outer modal border is neutral/coolgray, not red.
- [ ] Uses destructive button styling.

## Claude Improvement Notes

Future variant can support checkbox-confirmation for medium-risk actions.

## Source References

- `design/forms/button.md`
- `design/forms/input.md`
- `design/overlays/modal.md`
