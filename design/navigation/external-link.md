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

- Mockup reference: `mockups/shadcn-react-sample/src/routes/components/external-link.tsx`

- `DESIGN.md`
- `design/forms/button.md`
