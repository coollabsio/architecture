---
version: alpha
name: Coolify Button
description: Shadcn-Svelte Button primitive styled to match Coolify's dense, sharp, utilitarian action controls.
colors:
  # Brand / accents
  primary: "#6b16ed"
  coollabs: "#6b16ed"
  coollabs-50: "#f5f0ff"
  coollabs-100: "#7317ff"
  coollabs-200: "#5a12c7"
  warning: "#fcd452"
  # Surfaces
  surface: "#ffffff"
  neutral-100: "#f5f5f5"
  neutral-200: "#e5e5e5"
  neutral-300: "#d4d4d4"
  neutral-400: "#a3a3a3"
  neutral-600: "#525252"
  text: "#000000"
  white: "#ffffff"
  coolgray-100: "#181818"
  coolgray-200: "#202020"
  coolgray-300: "#242424"
  # Semantic
  error: "#dc2626"
  red-50: "#fef2f2"
  red-300: "#fca5a5"
  red-800: "#991b1b"
  red-900: "#7f1d1d"
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
  button-padding-x: 0.5rem
  button-gap: 0.5rem
components:
  button-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: "{spacing.button-height}"
    padding: "0 {spacing.button-padding-x}"
  button-default-hover:
    backgroundColor: "{colors.neutral-100}"
    textColor: "{colors.text}"
  button-default-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.white}"
  button-default-dark-hover:
    backgroundColor: "{colors.coolgray-200}"
    textColor: "{colors.white}"
  button-highlighted:
    backgroundColor: "{colors.coollabs-50}"
    textColor: "{colors.coollabs-200}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: "{spacing.button-height}"
    padding: "0 {spacing.button-padding-x}"
  button-highlighted-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
  button-highlighted-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
  button-highlighted-dark-hover:
    backgroundColor: "{colors.coollabs-100}"
    textColor: "{colors.white}"
  button-destructive:
    backgroundColor: "{colors.red-50}"
    textColor: "{colors.red-800}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: "{spacing.button-height}"
    padding: "0 {spacing.button-padding-x}"
  button-destructive-hover:
    backgroundColor: "{colors.error}"
    textColor: "{colors.white}"
  button-destructive-dark:
    backgroundColor: "{colors.red-900}"
    textColor: "{colors.red-300}"
  button-destructive-dark-hover:
    backgroundColor: "{colors.red-800}"
    textColor: "{colors.white}"
  button-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.coollabs}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: "{spacing.button-height}"
    padding: "0"
  button-link-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.warning}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: "{spacing.button-height}"
    padding: "0"
  button-disabled:
    backgroundColor: "{colors.neutral-100}"
    textColor: "{colors.neutral-600}"
  button-disabled-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.neutral-400}"
---

# Button

## Overview

The Coolify Button is a compact Shadcn-Svelte `Button` primitive extended with Coolify's dense, dark-first operator UI. It defines the Coolify button style while using the Shadcn-Svelte implementation model.

Buttons feel flat, sharp, and operational. They are not soft marketing CTAs. The default height is 2rem, the radius is 4px, and state changes use borders, tonal fills, and focus rings instead of shadows or gradients.

Start from the local Shadcn-Svelte primitive:

```svelte
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>
```

If the primitive is missing, add it first:

```bash
pnpm dlx shadcn-svelte@latest add button
```

## Colors

Button colors come from a tight surface/accent palette:

- **Default light:** white surface, black text, neutral border, neutral hover.
- **Default dark:** `coolgray-100` surface, white text, `coolgray-300` border, `coolgray-200` hover.
- **Highlighted:** purple is allowed as a fill/hover exception, including in dark mode, because this variant represents a promoted action.
- **Destructive:** red palette for dangerous actions.
- **Focus:** purple `coollabs` in light mode, yellow `warning` in dark mode.
- **Disabled/loading:** readable muted gray. Disabled and saving buttons must not become nearly invisible in light mode.

Do not use purple as the general dark-mode accent outside documented exceptions such as the highlighted button fill/hover.

## Typography

Button labels use the `label-md` token: Geist Sans, `text-sm`, `font-medium`, `line-height: 1.25rem`.

Do not add extra weights for button emphasis. Use variants, not font-weight changes, to communicate importance.

## Layout

Buttons are compact and dense:

- Height: `h-8` / `2rem`.
- Horizontal padding: `px-2` / `0.5rem`.
- Internal gap: `gap-2` / `0.5rem`.
- Width: `min-w-fit`; do not stretch buttons unless a specific layout requires it.
- Icon-only size: prefer `size-8` for Coolify density.
- Icons: text buttons are text-only by default. Do not add leading/trailing icons to ordinary buttons unless the button is one of the documented special cases below.

For navigation links styled as buttons, keep anchor semantics and apply `buttonVariants(...)` rather than nesting anchors inside buttons.

## Exact Layout Recipe

Buttons are compact by default. Only auth submit buttons opt into taller sizing locally.

```txt
base: inline-flex min-w-fit shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm border-2 border-transparent bg-clip-padding px-2 text-sm font-medium normal-case outline-none transition-colors select-none
height-default: h-8
height-sm: h-8 px-2 text-sm
height-lg: h-10 px-3
height-icon: size-8
focus: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coollabs dark:focus-visible:ring-warning focus-visible:ring-offset-2 dark:focus-visible:ring-offset-base
disabled: disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-100 disabled:border-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-600 dark:disabled:border-coolgray-300 dark:disabled:bg-coolgray-100/60 dark:disabled:text-neutral-400
```

## Exact Classes

```txt
default: border-neutral-200 bg-white text-black hover:bg-neutral-100 hover:text-black dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white dark:hover:bg-coolgray-200 dark:hover:text-white
highlighted: border-coollabs bg-coollabs-50 text-coollabs-200 hover:bg-coollabs hover:text-white dark:border-coollabs-100 dark:bg-coollabs/20 dark:text-white dark:hover:bg-coollabs-100 dark:hover:text-white
destructive: border-red-300 bg-red-50 text-red-800 hover:bg-error hover:text-white dark:border-red-800 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-800 dark:hover:text-white
ghost: border-transparent bg-transparent text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-coolgray-200
link: border-transparent bg-transparent px-0 text-coollabs hover:underline dark:text-warning
auth-submit-extension: h-12 w-full justify-center py-3 text-base font-bold
loading-order: text first, spinner after text
icon-policy: no icons on normal text buttons by default; icons only for icon-only buttons, loading spinners, external-link affordances, or rare domain-specific actions where the icon materially improves recognition
```

## Elevation & Depth

Buttons are flat controls. They do not use shadows for elevation.

Hierarchy is conveyed by:

- surface color,
- border color,
- hover tonal shift,
- focus ring,
- variant semantics.

Do not add gradients, heavy shadows, or glossy effects.

## Shapes

Buttons use the default Coolify radius: `rounded-sm` / `0.25rem` / 4px.

Icon-only buttons remain square with the same 4px radius unless another component doc explicitly says otherwise.

## Components

### Base primitive extension

Use Shadcn-Svelte's `buttonVariants` as the single source for button variants and sizes.

Recommended Coolify base override:

```ts
export const buttonVariants = tv({
  base: "inline-flex min-w-fit shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm border-2 border-transparent bg-clip-padding px-2 text-sm font-medium normal-case outline-none transition-colors select-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-100 disabled:border-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-600 dark:disabled:border-coolgray-300 dark:disabled:bg-coolgray-100/60 dark:disabled:text-neutral-400 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coollabs dark:focus-visible:ring-warning focus-visible:ring-offset-2 dark:focus-visible:ring-offset-base",
  variants: {
    variant: {
      default: "border-neutral-200 bg-white text-black hover:bg-neutral-100 hover:text-black dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white dark:hover:bg-coolgray-200 dark:hover:text-white",
      highlighted: "border-coollabs bg-coollabs-50 text-coollabs-200 hover:bg-coollabs hover:text-white dark:border-coollabs-100 dark:bg-coollabs/20 dark:text-white dark:hover:bg-coollabs-100 dark:hover:text-white",
      destructive: "border-red-300 bg-red-50 text-red-800 hover:bg-error hover:text-white dark:border-red-800 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-800 dark:hover:text-white",
      ghost: "border-transparent bg-transparent text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-coolgray-200",
      link: "border-transparent bg-transparent px-0 text-coollabs hover:underline dark:text-warning",
    },
    size: {
      default: "h-8",
      sm: "h-8 px-2 text-sm",
      lg: "h-10 px-3",
      icon: "size-8",
      "icon-sm": "size-8",
      "icon-lg": "size-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
```

### Default button

Use for normal actions.

```svelte
<Button>Save</Button>
```

Required visual behavior:

```txt
border-neutral-200 bg-white text-black hover:bg-neutral-100 hover:text-black
 dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white dark:hover:bg-coolgray-200 dark:hover:text-white
```

### Highlighted button

Use for the primary/promoted action on a surface.

```svelte
<Button variant="highlighted">Deploy</Button>
```

Required visual behavior:

```txt
border-coollabs bg-coollabs-50 text-coollabs-200 hover:bg-coollabs hover:text-white
 dark:border-coollabs-100 dark:bg-coollabs/20 dark:text-white dark:hover:bg-coollabs-100 dark:hover:text-white
```

### Destructive button

Use for dangerous or irreversible actions.

```svelte
<Button variant="destructive">Delete</Button>
```

Required visual behavior:

```txt
border-red-300 bg-red-50 text-red-800 hover:bg-error hover:text-white
 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-800 dark:hover:text-white
```

### Disabled and loading buttons

Disabled and loading buttons must remain readable in light mode.

Required disabled styling:

```txt
disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-100 disabled:border-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-600 dark:disabled:border-coolgray-300 dark:disabled:bg-coolgray-100/60 dark:disabled:text-neutral-400
```

Use Shadcn-Svelte `Spinner` inside `Button` for loading state: keep the text label first and put the spinner after the text:

```svelte
<Button disabled aria-busy="true">
  Saving
  <Spinner />
</Button>
```

Spinner requirements:

```txt
size-4 animate-spin dark:text-warning
```

The spinner has no light-mode color override; it inherits the button text color in light mode.

### Icon-only button

Icon-only buttons use Shadcn-Svelte icon sizes and must have an accessible name.

```svelte
<Button variant="default" size="icon" aria-label="Refresh">
  <RefreshCwIcon />
</Button>
```

### Icons in text buttons

Ordinary text buttons should not include icons by default.

Allowed special cases:

- **Icon-only action buttons** such as refresh, close, copy, or collapse controls. They must use `size="icon"`/`size-8` and an accessible name.
- **Loading state** where the spinner appears after the text label.
- **External-link or navigation affordance** when the icon clarifies that the action leaves the current context.
- **Rare domain-specific actions** where the icon is a learned product affordance and improves scan speed.

Disallowed by default:

- Decorative leading icons on Save, Cancel, Deploy, Delete, Reset, Submit, Continue, or ordinary default/highlighted/destructive text buttons.
- Icons added only to make a button feel more visually busy.
- Inconsistent icon usage where one button in a group has an icon and equivalent sibling actions do not.

### Link-styled action

Use `buttonVariants(...)` for anchors that need button styling:

```svelte
<a href="/deployments" class={buttonVariants({ variant: "link" })}>View deployments</a>
```

## Do's and Don'ts

- Do start from Shadcn-Svelte `Button` or `buttonVariants(...)`.
- Do keep enabled buttons `cursor-pointer` and disabled buttons `disabled:cursor-not-allowed`.
- Do use `variant="highlighted"` for promoted actions.
- Do use `variant="destructive"` for dangerous actions.
- Do keep disabled/loading buttons readable in light mode: `disabled:bg-neutral-100`, `disabled:text-neutral-600`, `disabled:border-neutral-300`.
- Do keep focus rings purple in light mode and yellow in dark mode.
- Do use `type="button"` unless the button intentionally submits a form.
- Do keep ordinary text buttons icon-free by default.
- Do give icon-only buttons an accessible name with `aria-label` or visible text.
- Do reserve icons for icon-only controls, loading spinners, external-link affordances, or rare domain-specific actions.
- Don't use Laravel, Blade, Livewire, Alpine, PHP, or unrelated project-specific paths in button implementations.
- Don't use raw boolean attributes such as `isHighlighted` or `isError`.
- Don't add decorative icons to normal text buttons such as Save, Cancel, Deploy, Delete, Reset, Submit, or Continue.
- Don't add gradients, heavy shadows, large radii, or decorative marketing effects.
- Don't use purple as the general dark-mode accent outside documented exceptions.
- Don't place the spinner before the text label on loading text buttons.
- Don't reduce disabled/loading opacity so far that labels become unreadable.

## Implementation Notes

This section is intentionally outside the core DESIGN.md section list and should be preserved by tools that follow the Google `design.md` consumer behavior for unknown sections.

- Keep Button variants co-located with the generated local Shadcn-Svelte primitive.
- Keep pending changes as explicit review decisions; do not silently drift from this component spec.

## Review Checklist

- [ ] Uses Shadcn-Svelte `Button` or `buttonVariants(...)` as the base.
- [ ] Base button includes `h-8`, `px-2`, `gap-2`, `text-sm`, `font-medium`, `rounded-sm`, `cursor-pointer`.
- [ ] Base button uses `border-2` with explicit light/dark border colors.
- [ ] Default dark mode uses `dark:bg-coolgray-100`, `dark:text-white`, `dark:hover:bg-coolgray-200`.
- [ ] `variant="highlighted"` applies the documented highlighted styles.
- [ ] `variant="destructive"` applies the documented destructive styles.
- [ ] Focus ring follows `ring-coollabs` light / `dark:ring-warning` dark with `ring-offset-2`.
- [ ] Loading state uses Shadcn-Svelte `Spinner` inside `Button`.
- [ ] Button spinner has no light-mode color override and inherits text color.
- [ ] Normal text buttons are icon-free by default.
- [ ] Icon-only buttons use `size="icon*"` and have an accessible name.
- [ ] Any icon inside a text button is justified by an allowed special case: loading spinner, external-link/navigation affordance, or rare domain-specific action.
- [ ] Disabled/loading state remains readable in light mode.
- [ ] No undocumented radius, gradient, extra shadow, or extra font weight introduced.

## Claude Improvement Notes

Potential cleanup ideas for a later implementation pass:

1. Decide whether the promoted variant should stay `highlighted` or become `primary`.
2. Decide globally whether the design system keeps Coolify's `h-8` density everywhere or accepts Shadcn defaults in less dense apps.
3. Confirm whether default icon button size should always be `size-8`.
4. If adjacent buttons are common, migrate a separate `button-group.md` using Shadcn-Svelte Button Group.

Do not apply these improvements automatically while migrating. Preserve visual intent first, then change after explicit review.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/buttons/+page.svelte`

- Google DESIGN.md spec: `https://github.com/google-labs-code/design.md`.
- Shadcn-Svelte Button docs: `https://www.shadcn-svelte.com/docs/components/button`.
