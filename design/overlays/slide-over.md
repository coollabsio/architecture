---
version: alpha
name: Coolify Slide-over Sheet
description: Side panel overlay for secondary details and edit flows.
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

# Slide-over Sheet

## Overview

Use Shadcn-Svelte Sheet as base. Right side panel, neutral/coolgray border, title/description, close button, scrollable body, footer actions.

## Colors

Use neutral light-mode surfaces and Coolify dark-mode `coolgray` surfaces. Accent/focus colors follow purple in light mode and yellow in dark mode.

## Typography

Use compact `text-sm` body text. Titles, where present, use bold Coolify heading style.

## Layout

Use Shadcn-Svelte Sheet as base. Right side panel, neutral/coolgray border, title/description, close button, scrollable body, footer actions.

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

Use borders and subtle shadows only where the component is an overlay. Avoid heavy shadows and gradients.

## Shapes

Use `rounded-sm`.

## Components

Compose existing components where needed: Button, Badge, Input, Spinner, and links.

### Form control surface contrast

When this spec renders `Input`, `PasswordInput`, command/search input, or `Textarea` inside gray/neutral panels, the control surface must be darker/lighter than the container so it does not blend in.

```txt
light gray panel: parent bg-gray-50 or bg-neutral-100 + control bg-white
dark app-base panel: parent dark:bg-app-base + control dark:bg-coolgray-100
dark gray panel: parent dark:bg-coolgray-100 + control dark:bg-app-base
```

Follow the exact context-contrast rule from `design/forms/input.md` and `design/forms/textarea.md`.

## Do's and Don'ts

Do use for secondary context. Don't replace destructive confirmation or full-page workflows.

## Implementation Notes

Prefer the closest Shadcn-Svelte primitive and extend locally for Coolify density/colors.

## Review Checklist

- [ ] Any input/search/textarea controls on gray or coolgray panels have a visible contrast step; no same-color control-on-panel pairing.
- [ ] Uses Shadcn-Svelte `Sheet` as the base and opens from the right.
- [ ] Panel uses `fixed inset-y-0 right-0`, `w-screen`, `max-w-xl`, and a left border.
- [ ] Surface is `bg-neutral-50 dark:bg-app-base` or the current mockup-equivalent sheet surface, not a floating card background.
- [ ] Header contains title `text-base font-bold text-black dark:text-white`, optional muted description, and an accessible close button.
- [ ] Body is scrollable independently when content exceeds viewport height; header/footer remain usable.
- [ ] Footer actions use Button variants, align right, and wrap on narrow widths.
- [ ] Backdrop and ESC/outside-click behavior come from the Sheet primitive and do not conflict with modals/toasts.
- [ ] Animation is subtle: short slide-in/out transition, no bounce or large easing flourish.
- [ ] Use Slide-over for secondary details/editing; destructive confirmations still use Confirm Modal / Modal Confirmation.
- [ ] No rounded outer desktop card, centered dialog geometry, gradients, or undocumented heavy elevation are introduced.

## Claude Improvement Notes

Future variants can be added after real product screens expose more states.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/slide-over/+page.svelte`

- `DESIGN.md`
