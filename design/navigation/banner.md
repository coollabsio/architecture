---
version: alpha
name: Coolify Banner
description: Page-level notice banner for info, warning, and success messages.
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

# Banner

## Overview

Custom compact notice surface. Border + tinted background. Place above page content or section content.

## Colors

Use neutral light-mode surfaces and Coolify dark-mode `coolgray` surfaces. Accent/focus colors follow purple in light mode and yellow in dark mode.

## Typography

Use compact `text-sm` body text. Titles, where present, use bold Coolify heading style.

## Layout

Custom compact notice surface. Border + tinted background. Place above page content or section content.

## Exact Layout Recipe

```txt
nav-text: text-sm font-medium
nav-muted: text-neutral-600 dark:text-neutral-400
nav-active: text-black dark:text-white
nav-focus: focus-visible:ring-2 focus-visible:ring-coollabs dark:focus-visible:ring-warning
nav-item-radius: rounded-sm
nav-item-padding: px-2 py-1 for dense nav; px-3 py-2 for larger horizontal regions
```

## Exact Classes

```txt
nav-link: rounded-sm text-sm font-medium text-neutral-600 hover:text-coollabs focus-visible:ring-2 focus-visible:ring-coollabs dark:text-neutral-400 dark:hover:text-warning dark:focus-visible:ring-warning
active-link: text-black dark:text-white
separator: text-neutral-400
tab-trigger: inline-flex h-8 cursor-pointer items-center justify-center rounded-sm px-2 text-sm font-medium transition-colors
```

## Elevation & Depth

Use borders and subtle shadows only where the component is an overlay. Avoid heavy shadows and gradients.

## Shapes

Use `rounded-sm`.

## Components

Compose existing components where needed: Button, Badge, Input, Spinner, and links.

## Do's and Don'ts

Do use concise messages. Don't stack many banners or use modal-level language.

## Implementation Notes

Prefer the closest shadcn/ui primitive and extend locally for Coolify density/colors.

## Review Checklist

- [ ] Banner is a page-level or section-level notice, not a replacement for Alert/Callout inside forms.
- [ ] Message is concise and uses `text-sm`; optional title uses `font-bold` and explicit dark text contrast.
- [ ] Surface uses a neutral/tinted background with explicit border colors that work in light and dark mode.
- [ ] Layout is compact: `flex items-center justify-between gap-3` with `px-3/px-4` and `py-2`.
- [ ] Dismiss button, when present, is `size-6`, `rounded-full`, has an accessible label, and has visible hover/focus states.
- [ ] Action link/button uses the Button/Internal Link/External Link specs and does not invent a new CTA style.
- [ ] Banner does not stack repeatedly; multiple notices should collapse into one clear message or a dedicated page section.
- [ ] Sticky/fixed usage sets an intentional `z-index` and does not cover nav, dropdowns, modals, or toasts.
- [ ] Enter/exit animation, if used, is subtle and around 100–150ms.
- [ ] No gradients, large radii, heavy shadows, or modal-level/destructive language are introduced.

## Claude Improvement Notes

Future variants can be added after real product screens expose more states.

## Source References

- Mockup reference: `mockups/shadcn-react-sample/src/routes/components/banner.tsx`

- `DESIGN.md`
