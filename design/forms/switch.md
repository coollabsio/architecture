---
version: alpha
name: Coolify Switch
description: Shadcn-Svelte Switch primitive for immediate on/off settings.
colors:
  primary: "#6b16ed"
  warning: "#fcd452"
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  neutral-300: "#d4d4d4"
  neutral-500: "#737373"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
  base: "#101010"
typography:
  label-md:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  full: 9999px
spacing:
  switch-width: 2rem
  switch-height: 1rem
  thumb-size: 0.75rem
components:
  switch-off:
    backgroundColor: "{colors.neutral-300}"
    textColor: "{colors.text}"
    rounded: "{rounded.full}"
  switch-on:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
  switch-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.label-md}"
---

# Switch

## Overview

The Coolify Switch is a compact Shadcn-Svelte `Switch` primitive for immediate boolean settings such as enabling auto-deploy, previews, or maintenance mode.

Use Checkbox for form-submission booleans and Switch for instant preference/state toggles.

## Colors

- Off light: neutral gray track with white thumb.
- On light: purple `coollabs` track with white thumb.
- Off dark: `coolgray-300` track.
- On dark: yellow `warning` track with dark thumb/contrast treatment if needed; this matches the Radio Group dark selected accent.
- Disabled state stays readable with muted opacity and not-allowed cursor.

## Typography

Switch labels use `text-sm`. Descriptions use muted `text-xs`.

## Layout

Switch rows match Checkbox/Radio row density:

```txt
[ label + description grows ] [ switch ]
```

Use `flex items-center gap-4 py-1 pr-2`; keep switch `shrink-0`.

## Exact Layout Recipe

```txt
root-row: flex items-center gap-3
track: inline-flex h-4 w-8 shrink-0 items-center rounded-full p-0.5
thumb: pointer-events-none block size-3 rounded-full transition-transform
unchecked-thumb-position: translate-x-0
checked-thumb-position: translate-x-4
checked-light: purple track
checked-dark: yellow track
padding-balance: thumb must have visually equal left/right padding in both states
```

## Exact Classes

```txt
track: inline-flex h-4 w-8 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-neutral-300 p-0.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 data-[state=checked]:bg-coollabs dark:bg-coolgray-300 dark:focus-visible:ring-warning dark:focus-visible:ring-offset-base dark:data-[state=checked]:bg-warning
thumb: pointer-events-none block size-3 rounded-full bg-white shadow-sm transition-transform data-[state=checked]:translate-x-4 dark:data-[state=checked]:bg-base
label: text-sm text-black dark:text-white
description: text-xs text-neutral-500 dark:text-neutral-400
```

## Elevation & Depth

No shadows. State is indicated through track color and thumb position.

## Shapes

Track and thumb are fully rounded. The track is compact: about `w-8 h-4`; thumb is about `size-3`.

## Components

### Switch primitive

Start from Shadcn-Svelte `Switch`:

```bash
bunx shadcn-svelte@latest add switch
```

Recommended track classes:

```txt
inline-flex h-4 w-8 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-neutral-300 p-0.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 data-[state=checked]:bg-coollabs dark:bg-coolgray-300 dark:focus-visible:ring-warning dark:focus-visible:ring-offset-base dark:data-[state=checked]:bg-warning
```

Thumb classes:

```txt
size-3 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[14px] dark:data-[state=checked]:bg-base
```

Use `14px` travel for a `w-8 h-4 p-0.5 border` track: the border is inside the element box, so `translate-x-4` overshoots and makes the checked right padding visibly smaller than the unchecked left padding.

## Do's and Don'ts

- Do use switches for immediate on/off behavior.
- Do keep them compact and aligned right in rows.
- Don't replace checkbox rows with switches unless behavior is immediate.
- Don't use large mobile-style tracks.

## Implementation Notes

Expose `checked`, `disabled`, and accessible `aria-label`/label association. Keyboard Space should toggle when focused.

## Review Checklist

- [ ] Track is compact (`w-8 h-4`) and fully rounded.
- [ ] Thumb movement is visible in light and dark modes.
- [ ] Checked and unchecked thumb positions have visually equal track padding.
- [ ] Checked track uses purple in light mode and yellow in dark mode.
- [ ] Focus ring uses purple light/yellow dark.
- [ ] Disabled state remains readable.

## Claude Improvement Notes

Future documentation can define a loading switch state for async server toggles.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/switch/+page.svelte`

- `DESIGN.md`
- Shadcn-Svelte Switch primitive
- Existing Checkbox row composition
