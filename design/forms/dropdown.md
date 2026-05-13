---
version: alpha
name: Coolify Dropdown Menu
description: Shadcn-Svelte Dropdown Menu primitive styled for compact operator actions, dense menus, and dark-first command surfaces.
colors:
  primary: "#6b16ed"
  coollabs: "#6b16ed"
  warning: "#fcd452"
  surface: "#ffffff"
  text: "#000000"
  white: "#ffffff"
  neutral-100: "#f5f5f5"
  neutral-200: "#e5e5e5"
  neutral-300: "#d4d4d4"
  neutral-500: "#737373"
  coolgray-100: "#181818"
  coolgray-200: "#202020"
  coolgray-300: "#242424"
  error: "#dc2626"
typography:
  menu-item:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1rem
  menu-item-touch:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  content-padding: 0.25rem
  item-padding-y: 0.25rem
  item-padding-left: 0.5rem
  item-padding-right: 1rem
  item-gap: 0.5rem
  touch-min-height: 2.5rem
components:
  dropdown-content:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "{spacing.content-padding}"
  dropdown-content-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "{spacing.content-padding}"
  dropdown-item:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.menu-item}"
    rounded: "{rounded.sm}"
    padding: "{spacing.item-padding-y} {spacing.item-padding-right} {spacing.item-padding-y} {spacing.item-padding-left}"
  dropdown-item-hover:
    backgroundColor: "{colors.neutral-100}"
    textColor: "{colors.text}"
  dropdown-item-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.white}"
    typography: "{typography.menu-item}"
    rounded: "{rounded.sm}"
    padding: "{spacing.item-padding-y} {spacing.item-padding-right} {spacing.item-padding-y} {spacing.item-padding-left}"
  dropdown-item-dark-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
  dropdown-item-touch:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.menu-item-touch}"
    rounded: "{rounded.sm}"
    height: "{spacing.touch-min-height}"
    padding: "0.5rem 0.75rem"
  dropdown-item-danger:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.menu-item}"
    rounded: "{rounded.sm}"
    padding: "{spacing.item-padding-y} {spacing.item-padding-right} {spacing.item-padding-y} {spacing.item-padding-left}"
---

# Dropdown Menu

## Overview

The Coolify Dropdown Menu is a compact Shadcn-Svelte `Dropdown Menu` primitive for contextual actions, overflow menus, settings menus, and command lists.

Dropdowns are utilitarian and dense. The menu surface is flat with a thin border and minimal shadow. Items are short, left-aligned action rows with small text, 4px radius, and clear hover/focus states.

Start from the local Shadcn-Svelte primitive:

```svelte
<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>
```

If the primitive is missing, add it first:

```bash
pnpm dlx shadcn-svelte@latest add dropdown-menu
```

## Colors

Dropdown colors use component surfaces and one strong dark-mode hover exception:

- **Content light:** white surface, neutral border, subtle shadow.
- **Content dark:** `coolgray-100` surface, `coolgray-300` border. This matches the darker toast surface instead of the lighter panel background.
- **Item light:** black text on white, neutral hover/focus background.
- **Item dark:** white text on the transparent `coolgray-100` menu surface, purple hover/focus background.
- **Danger item:** error red text; hover may either keep red text or switch to white text on an error background when the action needs stronger warning.
- **Focus:** item focus should match item hover; trigger focus uses the standard non-input ring: purple in light mode, yellow in dark mode.

The dark item hover uses purple as a documented menu fill exception. Do not use purple as the general dark-mode accent outside this dropdown-item hover/focus behavior.

## Typography

Dropdown items use compact text:

- Default item: `text-xs`, normal weight, Geist Sans.
- Touch item: `text-sm`, normal weight, Geist Sans.
- Labels may use `text-xs font-bold text-neutral-500 dark:text-neutral-400` when needed.

Do not make dropdown items large or marketing-like. Keep the menu readable but dense.

## Layout

Dropdown content:

- `z-50` overlay layer.
- `min-w-max` or a deliberate fixed width such as `w-48`.
- `max-w-[calc(100vw-1rem)]` when content may approach viewport edges.
- `p-1` internal padding.
- Opens close to the trigger with a small offset (`0.25rem`).

Dropdown items:

- `flex relative w-full items-center justify-start gap-2`.
- Default item padding: `py-1 pr-4 pl-2`.
- Touch item padding: `px-3 py-2`.
- Touch item minimum height: `min-h-10`.
- Icons, if present, are leading `size-4` icons and must not change row height.

## Exact Layout Recipe

```txt
trigger: use Button default/highlighted as appropriate; chevron at end
content-position: absolute top-full z-50 mt-1
content-size: min-w-max max-w-[calc(100vw-1rem)] max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain
content-surface: rounded-sm border p-1 shadow-sm
item: relative flex w-full items-center justify-start gap-2 rounded-sm py-1 pl-2 pr-4 text-xs
item-touch-extension: min-h-10 px-3 py-2 text-sm
```

## Exact Classes

```txt
content: absolute top-full z-50 mt-1 min-w-max max-w-[calc(100vw-1rem)] max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain rounded-sm border border-neutral-300 bg-white p-1 shadow-sm outline-none dark:border-coolgray-300 dark:bg-coolgray-100
item: relative flex w-full cursor-pointer select-none items-center justify-start gap-2 rounded-sm py-1 pl-2 pr-4 text-xs text-black outline-none transition-colors [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-neutral-100 focus-visible:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:text-white dark:hover:bg-coollabs dark:focus-visible:bg-coollabs
separator: my-1 h-px bg-neutral-200 dark:bg-coolgray-300
```

## Elevation & Depth

Dropdowns use minimal elevation:

```txt
border border-neutral-300 bg-white p-1 shadow-sm
 dark:border-coolgray-300 dark:bg-coolgray-100
```

Use `shadow-sm` only for the floating menu surface. Do not add heavy shadows or glass effects.

## Shapes

Dropdown content and items use `rounded-sm` / 4px.

Do not use pill-shaped or large-radius dropdown menus. Sharp geometry should match buttons and other operator controls.

## Components

### Base primitive extension

Use Shadcn-Svelte `Dropdown Menu` as the interaction primitive. Extend its local components with these classes.

Recommended content class:

```txt
z-50 min-w-max max-w-[calc(100vw-1rem)] rounded-sm border border-neutral-300 bg-white p-1 shadow-sm outline-none dark:border-coolgray-300 dark:bg-coolgray-100
```

Recommended item class:

```txt
relative flex w-full cursor-pointer select-none items-center justify-start gap-2 rounded-sm py-1 pl-2 pr-4 text-xs text-black outline-none transition-colors [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-neutral-100 focus-visible:bg-neutral-100 data-[highlighted]:bg-neutral-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:text-white dark:hover:bg-coollabs dark:focus-visible:bg-coollabs dark:data-[highlighted]:bg-coollabs
```

Recommended touch item extension:

```txt
min-h-10 px-3 py-2 text-sm
```

Recommended trigger rule:

- Use the Button component for action dropdown triggers when possible.
- Trigger focus must use the same non-input focus ring as Button.
- If the trigger includes a chevron, use the Coolify-style stacked up/down chevron icon, place it at the end, and keep it `size-4`. Do not use a single down chevron for select-like dropdown triggers.

### Standard action menu

```svelte
<DropdownMenu.Root>
  <DropdownMenu.Trigger>Actions</DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Item>Restart</DropdownMenu.Item>
    <DropdownMenu.Item>Redeploy</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item variant="danger">Stop service</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Settings menu

Use for theme, density, account, and product settings. Keep settings menus compact but use touch rows when the menu appears in mobile contexts.

### Disabled item

Disabled items use Shadcn's disabled state and must be visibly disabled without changing layout:

```txt
data-[disabled]:pointer-events-none data-[disabled]:opacity-50
```

### Keyboard and focus behavior

Use the Shadcn-Svelte primitive behavior for:

- Escape to close.
- Outside click to close.
- Arrow-key item navigation.
- Focus management after closing.
- `data-[highlighted]` item state.

Do not reimplement this behavior manually unless the primitive cannot support the required interaction.

## Do's and Don'ts

- Do start from Shadcn-Svelte `Dropdown Menu`.
- Do style `Content`, `Item`, `Separator`, `Label`, and `Trigger` locally instead of using global selectors.
- Do use `Button` for dropdown triggers when the trigger is an action button, with the stacked up/down chevron icon when the trigger indicates a menu/select.
- Do keep content `p-1`, bordered, and `shadow-sm`.
- Do keep default items `text-xs` with `py-1 pr-4 pl-2`.
- Do use `min-h-10 px-3 py-2 text-sm` for touch-oriented menus.
- Do keep dark item hover/focus purple as the documented dropdown exception.
- Do preserve Shadcn-Svelte keyboard/focus behavior.
- Don't use large rounded corners, gradients, large shadows, or glass effects.
- Don't make every dropdown item look like a button.
- Don't use purple as the general dark-mode accent outside the documented item hover/focus behavior.
- Don't introduce Laravel, Blade, Livewire, Alpine, PHP, or unrelated project-specific implementation details.

## Implementation Notes

This section is intentionally outside the core DESIGN.md section list and should be preserved by tools that follow the Google `design.md` consumer behavior for unknown sections.

- Prefer a local `dropdown-menu` primitive that wraps Shadcn-Svelte's generated files.
- Expose item variants only when needed: default, danger, touch.
- Keep item styling on the item primitive so keyboard-highlight and pointer-hover states stay aligned.
- If a menu needs search/filtering, migrate that as a separate combobox/select pattern instead of overloading Dropdown Menu.

## Review Checklist

- [ ] Uses Shadcn-Svelte `Dropdown Menu` as the base primitive.
- [ ] Content uses `border-neutral-300 bg-white p-1 shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100`.
- [ ] Content and items use `rounded-sm`.
- [ ] Default items use `text-xs`, `py-1`, `pl-2`, `pr-4`, `gap-2`, `cursor-pointer`, `select-none`.
- [ ] Item icons are constrained to `size-4` and never resize menu rows.
- [ ] Touch items use `min-h-10 px-3 py-2 text-sm`.
- [ ] Light hover/focus uses `bg-neutral-100`.
- [ ] Dark hover/focus uses `bg-coollabs` and white text.
- [ ] Disabled items use `data-[disabled]:pointer-events-none` and `data-[disabled]:opacity-50`.
- [ ] Trigger chevron uses the stacked up/down Coolify icon, not a single down chevron.
- [ ] Keyboard navigation and close behavior come from the Shadcn-Svelte primitive.
- [ ] No undocumented radius, gradient, heavy shadow, or decorative styling introduced.

## Claude Improvement Notes

Potential cleanup ideas for a later implementation pass:

1. Decide whether danger item hover should stay neutral or switch to error fill for stronger destructive emphasis.
2. Decide whether menu labels and separators should get their own component tokens once more dropdown examples exist.
3. If many menus need responsive collision handling, document the preferred `sideOffset`, `align`, and collision padding values after implementation testing.
4. Consider a separate `command-menu.md` or `combobox.md` for searchable dropdowns.

Do not apply these improvements automatically while migrating. Preserve this component spec first, then change after explicit review.

## Source References

- Google DESIGN.md spec: `https://github.com/google-labs-code/design.md`.
- Shadcn-Svelte Dropdown Menu docs: `https://www.shadcn-svelte.com/docs/components/dropdown-menu`.
