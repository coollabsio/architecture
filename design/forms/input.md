---
version: alpha
name: Coolify Input
description: Shadcn-Svelte Input primitive with Coolify's inset shadow border and 4px dirty/focus indicator.
colors:
  primary: "#6b16ed"
  coollabs: "#6b16ed"
  warning: "#fcd452"
  surface: "#ffffff"
  text: "#000000"
  white: "#ffffff"
  neutral-200: "#e5e5e5"
  neutral-300: "#d4d4d4"
  neutral-500: "#737373"
  neutral-700: "#404040"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
typography:
  input-text:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
  label-md:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  input-padding-y: 0.375rem
  input-padding-x: 0.5rem
  dirty-bar-width: 0.25rem
  border-shadow-width: 0.125rem
  sticky-border-shadow-width: 0.0625rem
  password-padding-right: 2.4rem
components:
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.input-text}"
    rounded: "{rounded.sm}"
    padding: "{spacing.input-padding-y} {spacing.input-padding-x}"
  input-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.white}"
    typography: "{typography.input-text}"
    rounded: "{rounded.sm}"
    padding: "{spacing.input-padding-y} {spacing.input-padding-x}"
  input-disabled:
    backgroundColor: "{colors.neutral-200}"
    textColor: "{colors.neutral-700}"
    typography: "{typography.input-text}"
    rounded: "{rounded.sm}"
    padding: "{spacing.input-padding-y} {spacing.input-padding-x}"
  input-readonly:
    backgroundColor: "{colors.neutral-200}"
    textColor: "{colors.neutral-700}"
    typography: "{typography.input-text}"
    rounded: "{rounded.sm}"
    padding: "{spacing.input-padding-y} {spacing.input-padding-x}"
---

# Input

## Overview

The Coolify Input is a compact Shadcn-Svelte `Input` primitive extended with a distinctive inset `box-shadow` border and a 4px left-side dirty/focus bar.

Inputs do not use CSS borders for their main outline. Instead, the resting outline and focus/dirty indicator are both drawn with layered inset shadows. This keeps form controls sharp, dense, and visually consistent with the operator UI.

Start from the local Shadcn-Svelte primitive:

```svelte
<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
</script>
```

If the primitive is missing, add it first:

```bash
bunx shadcn-svelte@latest add input
```

## Colors

Input colors are intentionally restrained:

- **Light surface:** white background, black text.
- **Dark surface:** `coolgray-100` background, white text.
- **Resting simulated border:** `neutral-200` in light mode, `coolgray-300` in dark mode.
- **Focus/dirty left bar:** `coollabs` purple in light mode, `warning` yellow in dark mode.
- **Placeholder:** `neutral-300` in light mode, `neutral-700` in dark mode.
- **Disabled/readonly:** flat muted background and muted text; no inset shadow.

Do not use a normal `border` utility for the main input outline.

## Typography

Input text uses Geist Sans at `text-sm` with regular weight.

Labels, when composed with inputs, use `text-sm font-medium`. Required markers should use the V2 highlighted text pattern when that component exists.

## Layout

Default input layout:

- `block`
- `w-full`
- `py-1.5`
- `px-2`
- `text-sm`
- `rounded-sm`
- `border-0`
- `focus-visible:outline-none`

Password inputs reserve right padding for the visibility toggle:

```txt
pr-[2.4rem]
```

The visibility toggle icon, if present, is an absolutely positioned trailing button and must not change input height.

## Elevation & Depth

Inputs use layered inset shadows instead of borders.

Resting state:

```css
box-shadow: inset 4px 0 0 transparent, inset 0 0 0 2px #e5e5e5;
```

Resting dark state:

```css
box-shadow: inset 4px 0 0 transparent, inset 0 0 0 2px #242424;
```

Focus/dirty light state:

```css
box-shadow: inset 4px 0 0 #6b16ed, inset 0 0 0 2px #e5e5e5;
```

Focus/dirty dark state:

```css
box-shadow: inset 4px 0 0 #fcd452, inset 0 0 0 2px #242424;
```

Disabled and readonly states remove the inset shadow entirely:

```css
box-shadow: none;
```

Sticky inputs use the same 4px bar but a thinner 1px simulated border.

## Shapes

Inputs use `rounded-sm` / 4px.

Do not mix input radius with larger form-control radii in the same view.

## Components

### Base primitive extension

Use Shadcn-Svelte `Input` as the base primitive. Extend the local primitive with Coolify input variants and a `dirty` state.

Recommended base class:

```txt
block w-full rounded-sm border-0 bg-white px-2 py-1.5 text-sm text-black placeholder:text-neutral-300 focus-visible:outline-none disabled:bg-neutral-200 disabled:text-neutral-700 read-only:bg-neutral-200 read-only:text-neutral-700 dark:bg-coolgray-100 dark:text-white dark:placeholder:text-neutral-700 dark:disabled:bg-coolgray-100/40 dark:read-only:bg-coolgray-100/40 dark:read-only:text-neutral-500
```

Recommended resting shadow class:

```txt
[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_#e5e5e5] dark:[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_#242424]
```

Recommended focus class:

```txt
focus-visible:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_2px_#e5e5e5] dark:focus-visible:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_2px_#242424]
```

Recommended dirty class:

```txt
data-[dirty=true]:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_2px_#e5e5e5] dark:data-[dirty=true]:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_2px_#242424]
```

Recommended disabled/readonly shadow reset:

```txt
disabled:[box-shadow:none] read-only:[box-shadow:none]
```

### V2 dirty-state API

Use either a `dirty` prop or `data-dirty="true"` on the local input primitive.

Preferred usage:

```svelte
<Input value={name} dirty={name !== initialName} />
```

Rendered state:

```html
<input data-dirty="true" />
```

Do not use framework-specific dirty directives in V2 docs or implementations.

### Default input

```svelte
<Input placeholder="Application name" />
```

### Dirty input

```svelte
<Input value="api-production" dirty />
```

### Disabled input

```svelte
<Input value="Disabled value" disabled />
```

Disabled inputs are flat, muted, and have no inset shadow.

### Readonly input

```svelte
<Input value="Readonly value" readonly />
```

Readonly inputs are flat, muted, and have no inset shadow.

### Password input

Password fields hide the value by default and expose a trailing visibility toggle. The raw `Input` stays generic; use a `PasswordInput` composition for behavior.

```svelte
<PasswordInput value={secret} />
```

Composition requirements:

```svelte
<script lang="ts">
  let visible = false;
</script>

<div class="relative">
  <Input type={visible ? "text" : "password"} class="pr-[2.4rem]" />
  <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-2" aria-label={visible ? "Hide password" : "Show password"}>
    {#if visible}
      <EyeOffIcon class="size-6" />
    {:else}
      <EyeIcon class="size-6" />
    {/if}
  </button>
</div>
```

The toggle uses an eye/eye-off icon. Do not use the helper info icon for password visibility. Password fields must hide the value by default and let the user toggle between hidden and visible text.

### Sticky input

Use a `variant="sticky"` or `sticky` prop only where sticky toolbar/search contexts need thinner outline presence.

Sticky resting shadow:

```css
box-shadow: inset 4px 0 0 transparent, inset 0 0 0 1px #e5e5e5;
```

Sticky focus/dirty uses the same 4px accent bar with a 1px simulated border.

## Do's and Don'ts

- Do start from Shadcn-Svelte `Input`.
- Do use inset `box-shadow` for the input outline and left indicator.
- Do keep `border-0`; do not use normal border utilities for the main outline.
- Do use `data-dirty="true"` or a `dirty` prop for dirty state.
- Do keep focus and dirty shadows identical.
- Do remove the inset shadow for disabled and readonly states.
- Do reserve `pr-[2.4rem]` for password visibility toggles.
- Do hide password values by default and provide an eye/eye-off toggle to show/hide the actual value.
- Do keep inputs `rounded-sm`, compact, and `text-sm`.
- Don't introduce framework-specific dirty directives.
- Don't use Shadcn default ring/border styling for the primary input outline.
- Don't add heavy shadows, gradients, large radius, or decorative field chrome.

## Implementation Notes

This section is intentionally outside the core DESIGN.md section list and should be preserved by tools that follow the Google `design.md` consumer behavior for unknown sections.

- Keep the local Shadcn-Svelte input primitive small: props, class merging, `data-dirty`, and `data-sticky` are enough.
- Keep password visibility as a composed pattern around Input, not baked into every Input.
- Select and Textarea should get separate V2 component specs even though they share the same shadow system.

## Review Checklist

- [ ] Uses Shadcn-Svelte `Input` as the base primitive.
- [ ] Uses `border-0` and inset `box-shadow`, not normal borders, for the main outline.
- [ ] Resting state has a transparent 4px left bar and 2px simulated border.
- [ ] Focus state uses a 4px left bar: purple in light mode, yellow in dark mode.
- [ ] Dirty state matches focus state via `dirty` prop or `data-dirty="true"`.
- [ ] Disabled and readonly states remove the inset shadow entirely.
- [ ] Disabled and readonly states use muted background/text colors.
- [ ] Password inputs reserve `pr-[2.4rem]` when a visibility toggle exists.
- [ ] Password fields hide values by default and provide show/hide behavior with eye/eye-off icons.
- [ ] Sticky variant uses a 1px simulated border.
- [ ] No framework-specific dirty directives, gradients, large radii, or heavy shadows introduced.

## Claude Improvement Notes

Potential cleanup ideas for a later implementation pass:

1. Decide whether `dirty` should be a first-class prop on Input or only expressed as `data-dirty` by callers.
2. Password visibility should be handled by a `PasswordInput` composition unless a project has a stronger reason to keep it inline.
3. Decide if sticky inputs are common enough to keep in the base primitive or should live in a separate composition.
4. Create shared shadow tokens once Select and Textarea are migrated.

Do not apply these improvements automatically while migrating. Preserve this V2 spec first, then change after explicit review.

## Source References

- Google DESIGN.md spec: `https://github.com/google-labs-code/design.md`.
- Shadcn-Svelte Input docs: `https://www.shadcn-svelte.com/docs/components/input`.
