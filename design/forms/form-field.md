---
version: alpha
name: Coolify Form Field
description: Label, required marker, helper icon, description, error text, and input-control composition for Shadcn-Svelte forms.
colors:
  primary: "#6b16ed"
  coollabs: "#6b16ed"
  warning: "#fcd452"
  text: "#000000"
  white: "#ffffff"
  neutral-400: "#a3a3a3"
  neutral-500: "#737373"
  neutral-600: "#525252"
  coolgray-100: "#181818"
  coolgray-200: "#202020"
  coolgray-300: "#242424"
  coolgray-400: "#282828"
  error: "#dc2626"
typography:
  label-md:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.25rem
  helper-text:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1rem
rounded:
  sm: 0.25rem
spacing:
  label-gap: 0.25rem
  label-margin-bottom: 0.25rem
  helper-icon-size: 1rem
  tooltip-padding-y: 0.375rem
  tooltip-padding-x: 0.5rem
components:
  field-label:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text}"
    typography: "{typography.label-md}"
  field-label-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.white}"
    typography: "{typography.label-md}"
  field-helper-icon:
    backgroundColor: "{colors.white}"
    textColor: "{colors.primary}"
    size: "{spacing.helper-icon-size}"
  field-helper-icon-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.warning}"
    size: "{spacing.helper-icon-size}"
  field-description:
    backgroundColor: "{colors.white}"
    textColor: "{colors.neutral-600}"
    typography: "{typography.helper-text}"
  field-description-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.neutral-400}"
    typography: "{typography.helper-text}"
  field-error:
    backgroundColor: "{colors.white}"
    textColor: "{colors.error}"
    typography: "{typography.helper-text}"
  field-tooltip:
    backgroundColor: "{colors.coolgray-400}"
    textColor: "{colors.white}"
    typography: "{typography.helper-text}"
    rounded: "{rounded.sm}"
    padding: "{spacing.tooltip-padding-y} {spacing.tooltip-padding-x}"
---

# Form Field

## Overview

The Coolify Form Field is the composition around a form control: label, required marker, helper/info icon, optional description, optional error text, and the input/select/textarea control itself.

This pattern should not be baked into the raw `Input` primitive. Keep `Input` focused on field chrome and state. Compose labels and helper behavior around controls using Shadcn-Svelte primitives.

Recommended Shadcn-Svelte primitives:

- `Label` for accessible label text.
- `Tooltip` for short helper content.
- `Hover Card` only for richer helper content that needs links or structured text.
- `Form` primitives if the application uses a Shadcn/formsnap-style form abstraction.

## Colors

- **Label light:** black text.
- **Label dark:** white text.
- **Required marker:** purple `coollabs` in light mode, yellow `warning` in dark mode.
- **Helper icon:** purple `coollabs` in light mode, yellow `warning` in dark mode.
- **Description:** neutral muted text.
- **Error:** `error` red.
- **Tooltip:** dark compact surface with white text.

The helper/info icon is an accent element. In dark mode it should use yellow, not purple.

## Typography

Labels use `text-sm font-medium`.

Description and error text use `text-xs`. They should be concise and utilitarian, not paragraph-length documentation.

## Layout

Default field stack:

```txt
Label row
Input/control
Description or error text
```

Label row anatomy:

```txt
[ label text ] [ required marker? ] [ helper icon? ]
```

Required layout rules:

- Label row: `mb-1 flex items-center gap-1`.
- Label text: `text-sm font-medium text-black dark:text-white`.
- Required marker: `font-bold text-coollabs dark:text-warning`.
- Helper icon trigger: inline-flex, `size-4`, accent color.
- Description/error: `mt-1 text-xs`.

Do not add large vertical spacing between label and control.

## Exact Layout Recipe

```txt
field: space-y-1
label-row: mb-1 flex items-center gap-1
label: text-sm font-medium text-black dark:text-white
required: font-bold text-coollabs dark:text-warning
helper-trigger: inline-flex size-4 items-center justify-center rounded-full
helper-icon: text-[10px] font-bold leading-none
description: mt-1 text-xs text-neutral-500 dark:text-neutral-400
error: mt-1 text-xs text-error
```

## Exact Classes

```txt
label: text-sm font-medium text-black dark:text-white
required-marker: font-bold text-coollabs dark:text-warning
helper-trigger: inline-flex size-4 items-center justify-center rounded-full bg-coollabs text-[10px] font-bold leading-none text-white outline-none focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 dark:bg-warning dark:text-base dark:focus-visible:ring-warning dark:focus-visible:ring-offset-base
tooltip-content: z-50 w-max max-w-[min(20rem,calc(100vw-2rem))] rounded-sm bg-coolgray-400 px-2 py-1.5 text-xs leading-4 text-white shadow-sm
description: mt-1 text-xs text-neutral-500 dark:text-neutral-400
error: mt-1 text-xs text-error
```

## Elevation & Depth

The field wrapper itself has no elevation.

Helper tooltip uses a floating tonal layer:

```txt
rounded-sm bg-coolgray-400 px-2 py-1.5 text-xs text-white shadow-sm
```

Use only a small shadow if needed by the tooltip primitive. Do not add card-like wrappers around ordinary field labels.

## Shapes

Helper icons and tooltip surfaces remain sharp and compact:

- Helper icon hit target can be slightly larger than the icon but should not create visible pill chrome.
- Tooltip uses `rounded-sm`.
- Do not use large rounded tooltip bubbles.

## Components

### Base composition

```svelte
<div class="space-y-1">
  <div class="mb-1 flex items-center gap-1">
    <Label for="direction" class="text-sm font-medium text-black dark:text-white">Direction</Label>
    <span class="font-bold text-coollabs dark:text-warning">*</span>
    <Tooltip.Root>
      <Tooltip.Trigger class="inline-flex size-4 items-center justify-center text-coollabs dark:text-warning">
        <InfoIcon class="size-4" />
      </Tooltip.Trigger>
      <Tooltip.Content class="rounded-sm bg-coolgray-400 px-2 py-1.5 text-xs text-white shadow-sm">
        Choose how incoming domains are normalized.
      </Tooltip.Content>
    </Tooltip.Root>
  </div>

  <Input id="direction" />
</div>
```

### Required marker

Use a literal `*` directly after the label text.

Required marker class:

```txt
font-bold text-coollabs dark:text-warning
```

### Helper icon

Use an information icon, not an eye icon. Recommended icon shape is a filled accent circle with a high-contrast `i` glyph, or an equivalent icon that keeps the glyph clearly visible at 16px.

Trigger class:

```txt
inline-flex size-4 items-center justify-center rounded-full bg-coollabs text-white outline-none hover:bg-coollabs-200 focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 dark:bg-warning dark:text-base dark:hover:bg-warning dark:focus-visible:ring-warning dark:focus-visible:ring-offset-base
```

Icon class:

```txt
size-4
```

### Tooltip content

Use Tooltip for short helper text.

Tooltip content class:

```txt
z-50 min-w-max max-w-[min(20rem,calc(100vw-2rem))] whitespace-normal rounded-sm bg-coolgray-400 px-2 py-1.5 text-xs leading-4 text-white shadow-sm
```

If content includes multiple paragraphs, links, or actions, use a Hover Card spec instead of this helper tooltip pattern.

### Description text

```svelte
<p class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Used as the public service name.</p>
```

Description text explains the field but does not replace helper tooltip content.

### Error text

```svelte
<p class="mt-1 text-xs text-error">Application name is required.</p>
```

Error text appears below the control and should be visible without opening a tooltip.

### Disabled field

When the control is disabled, keep the label readable. The helper icon may remain visible if the explanation is still useful, but it should not imply the field is editable.

## Do's and Don'ts

- Do keep Form Field separate from raw Input.
- Do compose `Label`, helper icon, Tooltip, and Input together.
- Do use `text-sm font-medium` labels.
- Do use a literal required `*` with purple/yellow accent.
- Do use a clearly visible information icon for helper content: filled accent circle with contrast `i` at 16px.
- Do keep helper icon `size-4`.
- Do keep label-to-control spacing tight with `mb-1`.
- Do use Tooltip only for short helper text.
- Don't use an eye icon for helper information; reserve eye icons for password visibility.
- Don't put long documentation inside a tooltip.
- Don't add visible background pills or boxes around label helper icons.
- Don't bake helper icon behavior into every Input primitive.
- Don't introduce Laravel, Blade, Livewire, Alpine, PHP, or unrelated project-specific implementation details.

## Implementation Notes

This section is intentionally outside the core DESIGN.md section list and should be preserved by tools that follow the Google `design.md` consumer behavior for unknown sections.

- If the app uses Shadcn-Svelte Form primitives, wrap this pattern in the local form-field component.
- If no form abstraction exists, a simple local `Field`, `FieldLabel`, `FieldDescription`, and `FieldError` composition is acceptable.
- The Tooltip primitive should own accessibility behavior: trigger/focus/escape/positioning.

## Review Checklist

- [ ] Label row uses `mb-1 flex items-center gap-1`.
- [ ] Label text uses `text-sm font-medium text-black dark:text-white`.
- [ ] Required marker uses `font-bold text-coollabs dark:text-warning`.
- [ ] Helper icon is a clearly visible info icon, not an eye icon.
- [ ] Helper icon is `size-4`, uses filled purple/yellow accent circle, and keeps the `i` glyph high-contrast.
- [ ] Tooltip content is compact and wraps inside its surface: `min-w-max`, `max-w-[min(20rem,calc(100vw-2rem))]`, `whitespace-normal`, `rounded-sm`, `text-xs`, dark surface, white text.
- [ ] Description uses muted `text-xs` below the control.
- [ ] Error uses `text-xs text-error` below the control.
- [ ] Raw Input primitive remains separate from label/helper composition.
- [ ] No large spacing, pill backgrounds, gradients, or decorative label chrome introduced.

## Claude Improvement Notes

Potential cleanup ideas for a later implementation pass:

1. Decide whether the canonical component name should be `FormField`, `Field`, or `FieldLabel`.
2. Decide whether helper tooltip should use Tooltip always or Hover Card for desktop hover-only behavior.
3. Add examples for Select and Textarea after those components are migrated.
4. Consider documenting error/description precedence once validation UX is migrated.

Do not apply these improvements automatically while migrating. Preserve this V2 spec first, then change after explicit review.

## Source References

- Google DESIGN.md spec: `https://github.com/google-labs-code/design.md`.
- Shadcn-Svelte Label docs: `https://www.shadcn-svelte.com/docs/components/label`.
- Shadcn-Svelte Tooltip docs: `https://www.shadcn-svelte.com/docs/components/tooltip`.
- Shadcn-Svelte Form docs: `https://www.shadcn-svelte.com/docs/components/form`.
