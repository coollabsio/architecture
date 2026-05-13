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

## Exact Layout Recipe

```txt
inline-status: inline-flex h-5 max-w-full items-center gap-1 rounded-sm border px-1.5 text-xs font-medium leading-4
status-row: inline-flex min-w-0 items-center gap-2 text-sm
status-dot: size-2 shrink-0 rounded-full
metadata-text: truncate text-xs text-neutral-500 dark:text-neutral-400
```

## Exact Classes

```txt
badge-default: border-neutral-200 bg-neutral-100 text-black dark:border-coolgray-300 dark:bg-coolgray-200 dark:text-white
badge-success: border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300
badge-warning: border-yellow-300 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-200
badge-error: border-red-300 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300
tag-removable-button: -mr-0.5 grid size-4 place-items-center rounded-sm hover:bg-neutral-100 dark:hover:bg-coolgray-200
```

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

- `DESIGN.md`
- `design/status/badge.md`
