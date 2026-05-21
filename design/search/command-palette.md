---
version: alpha
name: Coolify Command Palette
description: Global search and command launcher overlay.
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
  error: "#ef4444"
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

# Command Palette

## Overview

Use a Dialog/Command primitive. Centered top overlay, search input first, keyboard hints, compact result rows, empty state. Results must be keyboard navigable.

## Colors

Use neutral light surfaces and Coolify coolgray dark surfaces. Purple is the light-mode accent; warning yellow is the dark-mode accent. Errors use red/error.

## Typography

Use compact `text-sm` body text. Labels are medium weight; errors are `text-xs text-error`.

## Layout

Keep spacing compact. Overlays use centered/floating surfaces with neutral borders. Forms use vertical field stacks and a bottom save/action row when needed.

## Exact Layout Recipe

```txt
dialog: fixed inset-0 z-50 flex items-start justify-center px-4 pt-24
surface: w-full max-w-xl rounded-sm border border-neutral-200 bg-white p-2 shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100
input: use design/forms/input.md exact classes
list: mt-2 max-h-80 overflow-y-auto overscroll-contain
item: flex w-full items-center justify-between rounded-sm px-2 py-2 text-left text-sm
kbd-hint: text-xs text-neutral-500
```

## Exact Classes

```txt
item: flex w-full items-center justify-between rounded-sm px-2 py-2 text-left text-sm text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-coolgray-200
backdrop: fixed inset-0 z-40 bg-black/60
```

## Elevation & Depth

Use borders and subtle overlay shadows only. Avoid heavy shadows and gradients.

## Shapes

Use `rounded-sm`.

## Components

Compose existing design primitives: Button, Input, FormField, HelperTooltip, RequiredAsterisk, Dialog, KBD.

### Form control surface contrast

When this spec renders `Input`, `PasswordInput`, command/search input, or `Textarea` inside gray/neutral panels, the control surface must be darker/lighter than the container so it does not blend in.

```txt
light gray panel: parent bg-gray-50 or bg-neutral-100 + control bg-white
dark app-base panel: parent dark:bg-app-base + control dark:bg-coolgray-100
dark gray panel: parent dark:bg-coolgray-100 + control dark:bg-app-base
```

Follow the exact context-contrast rule from `design/forms/input.md` and `design/forms/textarea.md`.

## Do's and Don'ts

- Do support keyboard/focus states.
- Do keep content compact.
- Do preserve light/dark accent rules.
- Don't use legacy patterns or large rounded marketing UI.

## Implementation Notes

Prefer the closest shadcn/ui primitive and extend locally for Coolify density/colors.

## Review Checklist

- [ ] Any input/search/textarea controls on gray or coolgray panels have a visible contrast step; no same-color control-on-panel pairing.
- [ ] Accessible labels and states are present.
- [ ] Works in light and dark mode.
- [ ] Uses existing migrated components where possible.
- [ ] Avoids references to removed/deprecated design docs.

## Claude Improvement Notes

Add async/loading and server-error variants after product usage is clearer.

## Source References

- Mockup reference: `mockups/shadcn-react-sample/src/routes/components/command-palette.tsx`

- `DESIGN.md`
