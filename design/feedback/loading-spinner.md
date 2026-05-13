---
version: alpha
name: Coolify Loading Spinner
description: Compact spinner for loading states inside buttons, pages, and inline operations.
colors:
  primary: "#6b16ed"
  warning: "#fcd452"
  text: "#000000"
  muted: "#737373"
  white: "#ffffff"
typography:
  label-sm:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.25rem
rounded:
  full: 9999px
spacing:
  spinner-size: 1rem
components:
  spinner:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text}"
    rounded: "{rounded.full}"
    size: "{spacing.spinner-size}"
---

# Loading Spinner

## Overview

Loading Spinner is a compact SVG spinner used for inline loading, button loading, and small async states.

## Colors

Spinner should inherit current text color in light mode. In dark mode, `dark:text-warning` is preferred when the spinner appears on dark neutral surfaces.

## Typography

When paired with text, use `text-sm font-medium`.

## Layout

Default spinner is `size-4 animate-spin`. Inline loading uses `inline-flex items-center gap-2`.

## Elevation & Depth

No shadows.

## Shapes

Spinner is circular SVG geometry.

## Components

Recommended SVG wrapper:

```txt
size-4 animate-spin dark:text-warning
```

## Do's and Don'ts

- Do use `aria-hidden="true"` for decorative spinner plus visible text.
- Do add `aria-busy="true"` on the loading control/region.
- Don't use large decorative loaders for inline actions.

## Implementation Notes

For full-page loading, use a separate Page Loading spec. Spinner alone does not communicate enough without text for longer operations.

## Review Checklist

- [ ] Spinner is `size-4` by default.
- [ ] Loading region/control exposes `aria-busy`.
- [ ] Dark mode spinner is visible.

## Claude Improvement Notes

Page-level loading can define placement, overlay, and skeleton strategy separately.

## Source References

- `DESIGN_V2.md`
- Existing mockup `Spinner`
