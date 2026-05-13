---
version: alpha
name: Coolify External Link
description: Anchor composition for links leaving the app, with external icon and accessible labeling.
colors:
  primary: "#6b16ed"
  warning: "#fcd452"
  text: "#000000"
  muted: "#737373"
  white: "#ffffff"
typography:
  link-sm:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  gap: 0.25rem
components:
  external-link:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.link-sm}"
    rounded: "{rounded.sm}"
---

# External Link

## Overview

External Link is an anchor for destinations outside the current app/project. It includes a small external-arrow icon and preserves anchor semantics.

## Colors

Purple in light mode; yellow in dark mode. Muted inline links may inherit text and underline on hover.

## Typography

Use `text-sm font-medium` for prominent links, or inherit surrounding text for inline docs links.

## Layout

Use `inline-flex items-center gap-1 rounded-sm`. Icon is `size-3.5` or `size-4`.

## Elevation & Depth

No shadows or button chrome unless using Button spec intentionally.

## Shapes

Use `rounded-sm` for focus ring.

## Components

```txt
inline-flex items-center gap-1 rounded-sm text-coollabs hover:underline focus-visible:ring-2 focus-visible:ring-coollabs dark:text-warning dark:focus-visible:ring-warning
```

## Do's and Don'ts

- Do include `target="_blank" rel="noreferrer"` for new tabs.
- Do provide visible or screen-reader indication that it is external.
- Don't nest anchors in buttons.

## Implementation Notes

If styled as a button, use `buttonVariants(...)` on the anchor.

## Review Checklist

- [ ] Has proper `href` and anchor semantics.
- [ ] External icon is present.
- [ ] Focus ring is visible.

## Claude Improvement Notes

Future docs may define external-link confirmation for dangerous admin destinations.

## Source References

- `DESIGN_V2.md`
- `design/forms/button.md`
