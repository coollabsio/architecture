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

Use overlay and subtle shadow. The red warning block communicates risk; do not add extra decoration.

## Shapes

Use `rounded-sm`.

## Components

- Shadcn-Svelte `AlertDialog` or `Dialog`.
- `Input` for typed confirmation.
- `Button` destructive variant for final action.

### Form control surface contrast

When this spec renders `Input`, `PasswordInput`, command/search input, or `Textarea` inside gray/neutral panels, the control surface must be darker/lighter than the container so it does not blend in.

```txt
light gray panel: parent bg-gray-50 or bg-neutral-100 + control bg-white
dark base panel: parent dark:bg-base + control dark:bg-coolgray-100
dark gray panel: parent dark:bg-coolgray-100 + control dark:bg-base
```

Follow the exact context-contrast rule from `design/forms/input.md` and `design/forms/textarea.md`.

## Do's and Don'ts

- Do list irreversible consequences.
- Do require typed confirmation for dangerous actions.
- Do disable the destructive button until confirmed.
- Don't use highlighted/primary styling for destructive actions.
- Don't hide the cancel action.

## Implementation Notes

For the final implementation, support async loading on the destructive button and prevent accidental close while submitting.

## Review Checklist

- [ ] Any input/search/textarea controls on gray or coolgray panels have a visible contrast step; no same-color control-on-panel pairing.
- [ ] Consequences are explicit.
- [ ] Typed confirmation is required.
- [ ] Destructive action is disabled until valid.
- [ ] Outer modal border is neutral/coolgray, not red.
- [ ] Uses destructive button styling.

## Claude Improvement Notes

Future variant can support checkbox-confirmation for medium-risk actions.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/destructive-confirmation/+page.svelte`

- `design/forms/button.md`
- `design/forms/input.md`
- `design/overlays/modal.md`
