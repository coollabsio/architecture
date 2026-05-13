---
version: alpha
name: Coolify KBD
description: Compact keyboard hint component for shortcuts and command help.
colors:
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  neutral-200: "#e5e5e5"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
  white: "#ffffff"
typography:
  kbd-xs:
    fontFamily: "'Geist Mono', monospace"
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1rem
rounded:
  sm: 0.25rem
spacing:
  height: 1.25rem
  padding-x: 0.375rem
components:
  kbd:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.kbd-xs}"
    rounded: "{rounded.sm}"
---

# KBD

## Overview

KBD is a compact keyboard hint for shortcuts, command palettes, and inline help.

## Colors

Light mode uses white/neutral surface with neutral border and black text. Dark mode uses `coolgray-100` surface, `coolgray-300` border, and white text.

## Typography

Use Geist Mono, `text-xs font-medium leading-4`.

## Layout

Use `inline-flex h-5 items-center rounded-sm border px-1.5`. For key groups, separate keys with `+` text.

## Exact Layout Recipe

Use the current mockup KBD component exactly:

```txt
kbd: inline-flex h-5 items-center rounded-sm border px-1.5 font-mono text-xs font-medium leading-4
shortcut-row: flex items-center justify-between text-sm text-black dark:text-white
shortcut-combo: flex items-center gap-1
```

## Exact Classes

```txt
kbd: inline-flex h-5 items-center rounded-sm border border-neutral-200 bg-white px-1.5 font-mono text-xs font-medium leading-4 text-black dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white
combo: flex items-center gap-1
```

## Elevation & Depth

No heavy shadows. Optional tiny inset/border is enough.

## Shapes

Use `rounded-sm`, not pill keys.

## Components

Start from Shadcn-Svelte `Kbd` if available, or a semantic `<kbd>` element:

```txt
inline-flex h-5 items-center rounded-sm border border-neutral-200 bg-white px-1.5 font-mono text-xs font-medium text-black dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white
```

## Do's and Don'ts

- Do use `<kbd>` semantics.
- Do keep labels short: `⌘`, `K`, `Esc`.
- Don't use KBD for badges or statuses.

## Implementation Notes

Use platform-aware glyphs where possible: `⌘` for macOS, `Ctrl` elsewhere.

## Review Checklist

- [ ] Uses `<kbd>` element.
- [ ] Height is compact (`h-5`).
- [ ] Mono typography is used.

## Claude Improvement Notes

A future command palette spec can define shortcut alignment in menus.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/kbd/+page.svelte`

- `DESIGN.md`
