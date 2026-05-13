---
version: alpha
name: Coolify Loading On Button
description: Button loading composition using V2 Button plus Loading Spinner.
colors:
  primary: "#6b16ed"
  warning: "#fcd452"
  neutral-100: "#f5f5f5"
  neutral-600: "#525252"
  coolgray-100: "#181818"
  white: "#ffffff"
typography:
  label-md:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  button-height: 2rem
  gap: 0.5rem
components:
  loading-button:
    backgroundColor: "{colors.neutral-100}"
    textColor: "{colors.neutral-600}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: "{spacing.button-height}"
---

# Loading On Button

## Overview

Loading On Button is a composition already partially covered by Button, but documented separately so agents consistently pair V2 Button with the Loading Spinner and correct accessibility.

## Colors

Use Button disabled/loading colors: readable neutral in light mode, muted but visible dark surface in dark mode. Spinner inherits current text in light mode and uses yellow in dark mode when needed.

## Typography

Same as Button: `text-sm font-medium`.

## Layout

Use V2 Button layout: `h-8 px-2 gap-2 rounded-sm`. Place the loading label first and the spinner after the label, e.g. `Saving <Spinner />`.

## Elevation & Depth

No shadows.

## Shapes

Same as Button: `rounded-sm`.

## Components

```svelte
<Button disabled aria-busy="true">
  Saving
  <Spinner />
</Button>
```

## Do's and Don'ts

- Do keep the label visible before the spinner: `Saving <Spinner />`, `Deploying <Spinner />`, `Restarting <Spinner />`.
- Do disable repeated activation while loading.
- Do bind the disabled, aria-busy, spinner visibility, and loading label to the same loading state.
- Don't place the spinner before the label for text buttons.
- Don't replace the label with only a spinner unless the icon button has an accessible name.

## Implementation Notes

This spec references `design/forms/button.md` and `design/feedback/loading-spinner.md`; it does not create a separate primitive.

## Review Checklist

- [ ] Uses V2 Button plus Spinner.
- [ ] Has `disabled` and `aria-busy="true"` only while loading.
- [ ] When the loading flag becomes false, spinner disappears and the normal label/action returns.
- [ ] Loading label remains readable in light mode.

## Claude Improvement Notes

Future async button patterns can distinguish optimistic vs blocking loading.

## Source References

- `DESIGN_V2.md`
- `design/forms/button.md`
- `design/feedback/loading-spinner.md`
