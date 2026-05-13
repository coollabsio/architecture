---
version: alpha
name: Coolify Internal Link
description: Anchor composition for in-app navigation links.
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
  internal-link:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.link-sm}"
    rounded: "{rounded.sm}"
---

# Internal Link

## Overview

Internal Link is an anchor for app-local navigation. It should look like a link, not a button, unless a button-style action is explicitly desired.

## Colors

Purple in light mode and yellow in dark mode for prominent links. Neutral links may use current text with underline/hover accent.

## Typography

Use `text-sm font-medium`, or inherit text for inline prose links.

## Layout

Use `inline-flex items-center gap-1 rounded-sm`. Optional arrow icon is allowed for “go to” links.

## Elevation & Depth

No shadows.

## Shapes

Use `rounded-sm` for focus ring.

## Components

```txt
inline-flex items-center gap-1 rounded-sm text-coollabs hover:underline focus-visible:ring-2 focus-visible:ring-coollabs dark:text-warning dark:focus-visible:ring-warning
```

## Do's and Don'ts

- Do use anchors/route links for navigation.
- Do use `aria-current` for active nav links.
- Don't use external-link icon for internal routes.

## Implementation Notes

In SvelteKit, use normal `<a href="/route">` unless a routing helper is required.

## Review Checklist

- [ ] Uses anchor semantics.
- [ ] Active/current state is clear when needed.
- [ ] Focus ring is visible.

## Claude Improvement Notes

A sidebar link variant can be documented with Sidebar/Navbar.

## Source References

- `DESIGN_V2.md`
