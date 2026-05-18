---
version: alpha
name: Coolify Dialog Modal
description: General purpose modal dialog for focused tasks, forms, and details.
colors:
  overlay: "#000000"
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

### Modal close button

Use the shared Coolify `Button` primitive for the header X close control. Do not create a raw custom close button unless the `Button` primitive is unavailable.

Canonical implementation:

```svelte
<Button
  type="button"
  variant="ghost"
  size="icon"
  aria-label="Close dialog"
  onclick={close}
>
  ×
</Button>
```

Required behavior:

```txt
primitive: Button
variant: ghost
size: icon / size-8
type: button
shape: rounded-sm
placement: top-right of modal header
alignment: aligned to the title row with items-start
accessible-name: context-specific aria-label
glyph: × by default, or a size-4 X icon if the implementation already uses an icon set
```

Required header layout:

```txt
header: flex items-start justify-between gap-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200
title-group: min-w-0
close-button: shrink-0
```

The close button inherits all visual states from `design/forms/button.md`:

```txt
ghost: border-transparent bg-transparent text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-coolgray-200
focus: focus-visible:ring-2 focus-visible:ring-coollabs dark:focus-visible:ring-warning
size: size-8
radius: rounded-sm
```

Accessibility requirements:

- Always provide an `aria-label`.
- Use a context-specific label:
  - General dialog: `aria-label="Close dialog"`
  - Confirmation dialog: `aria-label="Close confirmation"`
  - Destructive confirmation: `aria-label="Close destructive confirmation"`
- The close button must be keyboard focusable.
- Escape close behavior should match the same close action when supported by the `Dialog` primitive.
- Do not rely on the visible `×` as the accessible name.

Interaction requirements:

- Clicking X closes the modal without submitting forms.
- Set `type="button"` so the close control never submits modal forms.
- During async submit, disable or ignore X close only when accidental dismissal would corrupt state or hide required progress.
- If close is disabled while submitting, keep Cancel, backdrop, and Escape behavior consistent with the same rule.

Do:

- Do use `Button variant="ghost" size="icon"`.
- Do keep the control `size-8`, square, and `rounded-sm`.
- Do place it in the header's top-right corner.
- Do keep a separate Cancel action when the modal needs explicit cancellation.

Don't:

- Don't use a raw `button` with one-off hover/focus classes.
- Don't use a large circular close button.
- Don't use absolute positioning unless the modal header layout cannot contain the button.
- Don't remove the footer Cancel action from confirmation/destructive modals just because an X is present.

### Form control surface contrast

When this spec renders `Input`, `PasswordInput`, command/search input, or `Textarea` inside gray/neutral panels, the control surface must be darker/lighter than the container so it does not blend in.

```txt
light gray panel: parent bg-gray-50 or bg-neutral-100 + control bg-white
dark app-base panel: parent dark:bg-app-base + control dark:bg-coolgray-100
dark gray panel: parent dark:bg-coolgray-100 + control dark:bg-app-base
```

Follow the exact context-contrast rule from `design/forms/input.md` and `design/forms/textarea.md`.

## Do's and Don'ts

- Do keep dialogs focused and short.
- Do include a visible close/cancel path.
- Do use the documented modal close button contract for header X controls.
- Don't use dialogs for destructive confirmation; use the destructive confirmation spec.
- Don't use large rounded corners or custom gradients.

## Implementation Notes

Trap focus and close on Escape when using the Shadcn primitive. The mockup uses a lightweight local implementation only for visual testing.

## Review Checklist

- [ ] Any input/search/textarea controls on gray or coolgray panels have a visible contrast step; no same-color control-on-panel pairing.
- [ ] Has title.
- [ ] Has accessible dialog semantics.
- [ ] Header X close button, when present, uses `Button variant="ghost" size="icon" type="button"` with a context-specific `aria-label`.
- [ ] Footer actions are right-aligned.
- [ ] Light and dark surfaces match Coolify style.

## Claude Improvement Notes

Add form-specific variants after modal input is finalized.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/dialog/+page.svelte`

- `design/forms/button.md`
- `design/forms/input.md`
