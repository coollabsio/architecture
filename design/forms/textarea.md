---
version: alpha
name: Coolify Textarea
description: Shadcn-Svelte Textarea primitive with Coolify's mono typography, inset shadow border, dirty bar, and optional Tab insertion behavior.
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
  neutral-400: "#a3a3a3"
  neutral-700: "#404040"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
typography:
  textarea-text:
    fontFamily: "'Geist Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  textarea-padding-y: 0.375rem
  textarea-padding-x: 0.75rem
  textarea-min-height: 8rem
  dirty-bar-width: 0.25rem
  border-shadow-width: 0.125rem
components:
  textarea:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.textarea-text}"
    rounded: "{rounded.sm}"
    padding: "{spacing.textarea-padding-y} {spacing.textarea-padding-x}"
    height: "{spacing.textarea-min-height}"
  textarea-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.white}"
    typography: "{typography.textarea-text}"
    rounded: "{rounded.sm}"
    padding: "{spacing.textarea-padding-y} {spacing.textarea-padding-x}"
    height: "{spacing.textarea-min-height}"
  textarea-disabled:
    backgroundColor: "{colors.neutral-200}"
    textColor: "{colors.neutral-700}"
    typography: "{typography.textarea-text}"
    rounded: "{rounded.sm}"
  textarea-disabled-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.neutral-400}"
    typography: "{typography.textarea-text}"
    rounded: "{rounded.sm}"
---

# Textarea

## Overview

The Coolify Textarea is a Shadcn-Svelte `Textarea` primitive styled like Input, but using Geist Mono for code, environment values, logs, and multi-line configuration text.

Textarea shares the Input inset shadow system: no normal border, a 2px simulated inset border, and a 4px left focus/dirty bar.

Start from the local Shadcn-Svelte primitive:

```svelte
<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea/index.js";
</script>
```

If the primitive is missing, add it first:

```bash
bunx shadcn-svelte@latest add textarea
```

## Colors

Textarea colors match Input:

- **Light surface:** white background, black text.
- **Dark surface:** `coolgray-100` background, white text.
- **Resting simulated border:** `neutral-200` in light mode, `coolgray-300` in dark mode.
- **Focus/dirty left bar:** `coollabs` purple in light mode, `warning` yellow in dark mode.
- **Resize handle:** accent-colored in browsers that expose `::-webkit-resizer`: purple in light mode, yellow in dark mode.
- **Placeholder:** `neutral-300` in light mode, `neutral-700` in dark mode.
- **Disabled/readonly:** flat muted background and muted text; no inset shadow.
- **Gray/neutral panel contrast:** textareas must remain visibly separated from gray form panels. In dark mode, do not place default `dark:bg-coolgray-100` textareas directly on a `dark:bg-coolgray-100` panel; either use `dark:bg-base` for the parent card, or use `dark:bg-base` for the textarea in that local gray-panel context.

Do not use a normal `border` utility for the main textarea outline.

## Typography

Textarea content uses Geist Mono at `text-sm`.

Use textarea for multi-line technical content. Do not use Sans textareas for code-like values unless a specific product context requires it.

## Layout

Default textarea layout:

Text must not start directly against the inset shadow/border. Use `px-3` so content has enough breathing room from the 4px dirty bar and simulated border.


- `block`
- `w-full`
- `min-h-32` / about `8rem`
- `resize-y`
- `px-3`
- `py-1.5`
- `text-sm`
- `font-mono`
- `rounded-sm`
- `border-0`
- `focus-visible:outline-none`

Labels and helper icons are handled by the Form Field component.

### Context contrast

Textareas inside gray/neutral sections must not blend into the container. Use these pairings:

```txt
light gray panel: parent bg-gray-50 or bg-neutral-100 + textarea bg-white
dark base form card: parent dark:bg-base + textarea dark:bg-coolgray-100
dark gray panel: parent dark:bg-coolgray-100 + textarea dark:bg-base
```

If the textarea edge disappears on a gray background, darken the textarea surface or the parent surface so there is a clear contrast step.

## Exact Layout Recipe

```txt
textarea: block min-h-32 w-full resize-y rounded-sm border-0 px-3 py-1.5 font-mono text-sm
resize-handle: custom background lines, smaller than browser default visual weight
text-start: px-3 so text never touches the border
gray-panel-contrast: use bg-white on light gray panels; use dark:bg-base when the parent is dark:bg-coolgray-100
```

## Exact Classes

```txt
base: block min-h-32 w-full resize-y rounded-sm border-0 bg-white px-3 py-1.5 font-mono text-sm text-black placeholder:text-neutral-300 focus-visible:outline-none disabled:bg-neutral-200 disabled:text-neutral-700 read-only:bg-neutral-200 read-only:text-neutral-700 dark:bg-coolgray-100 dark:text-white dark:placeholder:text-neutral-700 dark:disabled:bg-coolgray-100/40 dark:disabled:text-neutral-400 dark:read-only:bg-coolgray-100/40 dark:read-only:text-neutral-500
gray-panel-contrast: use bg-white on light gray panels; use dark:bg-base when the parent is dark:bg-coolgray-100
shadow: use Input exact shadow/focus/dirty classes
```

## Elevation & Depth

Textarea uses the same layered inset shadows as Input.

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

## Shapes

Textareas use `rounded-sm` / 4px.

Do not use large editor-like rounded corners unless switching to a dedicated code editor component.

## Components

### Resize handle

Native textarea resize handles are browser-controlled, but WebKit/Blink browsers can tint the corner with `::-webkit-resizer`. Use accent color so the resize affordance is visible on dark surfaces:

```css
textarea::-webkit-resizer {
  background-image: linear-gradient(135deg, transparent 0 66%, var(--color-coollabs) 66% 72%, transparent 72% 78%, var(--color-coollabs) 78% 84%, transparent 84%);
}

.dark textarea::-webkit-resizer {
  background-image: linear-gradient(135deg, transparent 0 66%, var(--color-warning) 66% 72%, transparent 72% 78%, var(--color-warning) 78% 84%, transparent 84%);
}
```

Keep the resize mark subtle and small. Do not depend on this as the only resize affordance because support is browser-specific.

### Base primitive extension

Use Shadcn-Svelte `Textarea` as the base primitive.

Recommended base class:

```txt
block min-h-32 w-full resize-y rounded-sm border-0 bg-white px-3 py-1.5 font-mono text-sm text-black placeholder:text-neutral-300 focus-visible:outline-none disabled:bg-neutral-200 disabled:text-neutral-700 read-only:bg-neutral-200 read-only:text-neutral-700 dark:bg-coolgray-100 dark:text-white dark:placeholder:text-neutral-700 dark:disabled:bg-coolgray-100/40 dark:disabled:text-neutral-400 dark:read-only:bg-coolgray-100/40 dark:read-only:text-neutral-500
```

Recommended shadow class:

```txt
[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_#e5e5e5] dark:[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_#242424]
focus-visible:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_2px_#e5e5e5] dark:focus-visible:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_2px_#242424]
data-[dirty=true]:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_2px_#e5e5e5] dark:data-[dirty=true]:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_2px_#242424]
disabled:[box-shadow:none] read-only:[box-shadow:none]
```

### Dirty-state API

Use either a `dirty` prop or `data-dirty="true"` on the local textarea primitive.

Preferred usage:

```svelte
<Textarea value={envFile} dirty={envFile !== initialEnvFile} />
```

### Tab insertion

Some technical textareas should insert two spaces when the user presses Tab.

Use an explicit prop such as `allowTab`:

```svelte
<Textarea allowTab />
```

Tab behavior:

```ts
if (event.key === "Tab") {
  event.preventDefault();
  textarea.setRangeText("  ", textarea.selectionStart, textarea.selectionEnd, "end");
}
```

Only enable this where two-space insertion is intended. Do not override Tab behavior on ordinary prose fields.

### Password-like multiline secret

If a multi-line secret needs hidden/revealed behavior, compose a separate `SecretTextarea` pattern. Do not add password behavior to every Textarea by default.

## Do's and Don'ts

- Do start from Shadcn-Svelte `Textarea`.
- Do use Geist Mono / `font-mono`.
- Do use the same inset shadow system as Input.
- Do keep `border-0`; do not use normal borders for the main outline.
- Do use `data-dirty="true"` or a `dirty` prop for dirty state.
- Do remove the inset shadow for disabled and readonly states.
- Do enable Tab insertion only with an explicit `allowTab` prop.
- Do tint the native resize handle purple/yellow where `::-webkit-resizer` is supported.
- Do verify textareas remain visible on gray/neutral panel backgrounds.
- Don't override Tab behavior for ordinary prose textareas.
- Don't add password visibility behavior to every Textarea.
- Don't place textareas on a same-color dark panel where `dark:bg-coolgray-100` blends into `dark:bg-coolgray-100`.
- Don't add heavy shadows, large radius, gradients, or editor chrome.
- Don't introduce framework-specific dirty directives.

## Implementation Notes

This section is intentionally outside the core DESIGN.md section list and should be preserved by tools that follow the Google `design.md` consumer behavior for unknown sections.

- Textarea should share form-control shadow constants with Input and Select when those constants are extracted.
- Monaco/code-editor usage should be a separate editor component, not an overloaded Textarea.

## Review Checklist

- [ ] Uses Shadcn-Svelte `Textarea` as the base primitive.
- [ ] Uses `font-mono` / Geist Mono.
- [ ] Uses `border-0` and inset `box-shadow`, not normal borders, for the main outline.
- [ ] Resting state has a transparent 4px left bar and 2px simulated border.
- [ ] Focus state uses a 4px left bar: purple in light mode, yellow in dark mode.
- [ ] Dirty state matches focus state via `dirty` prop or `data-dirty="true"`.
- [ ] Disabled and readonly states remove the inset shadow entirely.
- [ ] Optional Tab insertion is controlled by `allowTab` and inserts two spaces.
- [ ] Resize handle is accent-tinted where browser support allows it.
- [ ] Textareas on gray/neutral panels have a clear contrast step (`bg-white` on light gray, `dark:bg-base` on `dark:bg-coolgray-100`, or `dark:bg-coolgray-100` on `dark:bg-base`).
- [ ] No framework-specific dirty directives, gradients, large radii, or heavy shadows introduced.

## Claude Improvement Notes

Potential cleanup ideas for a later implementation pass:

1. Extract shared form-control shadow classes from Input, Select, and Textarea.
2. Decide whether `allowTab` should also support configurable tab size.
3. Create separate specs for code editor / Monaco and multi-line secret fields if needed.

Do not apply these improvements automatically while migrating. Preserve this component spec first, then change after explicit review.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/textarea/+page.svelte`

- Google DESIGN.md spec: `https://github.com/google-labs-code/design.md`.
- Shadcn-Svelte Textarea docs: `https://www.shadcn-svelte.com/docs/components/textarea`.
