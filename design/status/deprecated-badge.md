---
version: alpha
name: Coolify Deprecated Badge
description: Specific Badge variant for deprecated, legacy, or soon-to-be-removed features.
colors:
  warning: "#fcd452"
  text: "#000000"
  surface: "#ffffff"
  neutral-300: "#d4d4d4"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
typography:
  badge-xs:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1rem
rounded:
  sm: 0.25rem
spacing:
  height: 1.25rem
  padding-x: 0.375rem
components:
  deprecated-badge:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.text}"
    typography: "{typography.badge-xs}"
    rounded: "{rounded.sm}"
---

# Deprecated Badge

## Overview

Deprecated Badge is a dedicated Badge variant for features or options that are legacy, deprecated, or scheduled for removal.

## Colors

Use yellow warning background with black text in both modes when strong attention is needed. For less critical contexts, use an outline neutral badge with warning text/icon.

## Typography

Use `text-xs font-bold leading-4`. Label should be `Deprecated` or `Legacy`.

## Layout

Same as Badge: `inline-flex h-5 items-center rounded-sm border px-1.5`.

## Elevation & Depth

No shadows.

## Shapes

Use `rounded-sm`, not pills.

## Components

Build from Shadcn-Svelte `Badge` / local `Badge`:

```svelte
<Badge variant="warning">Deprecated</Badge>
```

## Do's and Don'ts

- Do pair with explanatory text when removal has user impact.
- Do keep the badge label short.
- Don't use deprecated badge for normal warnings.

## Implementation Notes

When a deprecated option is interactive, keep the badge separate from the action label so screen readers do not lose context.

## Review Checklist

- [ ] Uses Badge styling and `rounded-sm`.
- [ ] Clearly says Deprecated or Legacy.
- [ ] Has enough contrast in light and dark modes.

## Claude Improvement Notes

A future lifecycle badge set may include `Beta`, `Preview`, and `Experimental`.

## Source References

- `DESIGN_V2.md`
- `design/status/badge.md`
