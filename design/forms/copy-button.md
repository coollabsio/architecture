---
version: alpha
name: Coolify Copy Button
description: Readonly value field with a secure-context clipboard button and temporary copied check state.
colors:
  primary: "#6b16ed"
  coollabs: "#6b16ed"
  warning: "#fcd452"
  surface: "#ffffff"
  text: "#000000"
  white: "#ffffff"
  neutral-200: "#e5e5e5"
  neutral-400: "#a3a3a3"
  neutral-500: "#737373"
  neutral-700: "#404040"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
  success: "#22C55E"
typography:
  input-text:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  icon-size: 1.25rem
  button-padding: 0.375rem
  button-right: 0.5rem
  input-copy-padding-right: 2.75rem
components:
  copy-field:
    backgroundColor: "{colors.neutral-200}"
    textColor: "{colors.neutral-700}"
    typography: "{typography.input-text}"
    rounded: "{rounded.sm}"
  copy-field-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.neutral-400}"
    typography: "{typography.input-text}"
    rounded: "{rounded.sm}"
  copy-button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.neutral-500}"
    rounded: "{rounded.sm}"
    size: "{spacing.icon-size}"
  copy-button-dark:
    backgroundColor: "{colors.coolgray-100}"
    textColor: "{colors.neutral-400}"
    rounded: "{rounded.sm}"
    size: "{spacing.icon-size}"
---

# Copy Button

## Overview

The Coolify Copy Button is a composed form pattern: a readonly value field with an absolute-positioned clipboard action on the right.

It is used for tokens, URLs, secrets, certificate paths, invitation links, and other values users need to copy without editing.

The copy action only renders when the browser context supports secure clipboard access.

## Colors

- **Readonly field:** same flat muted behavior as readonly Input.
- **Copy icon:** muted neutral by default.
- **Copy hover:** slightly brighter neutral; no large fill change.
- **Copied state:** green `success` check icon for 1 second.
- **Focus:** copy button uses the normal non-input focus ring: purple in light mode, yellow in dark mode.

## Typography

The readonly field uses the same typography as Input unless the copied value is code-like. For code-like values, callers may add `font-mono`.

## Layout

Copy Button composition:

```txt
[ readonly input value                         copy icon ]
```

Required layout:

- Wrapper: `relative`.
- Field: readonly Input with enough right padding for the copy button.
- Copy button: absolute `right-2 top-1/2 -translate-y-1/2`.
- Icon: `size-5` / `1.25rem`.
- Button padding: `p-1.5`.

Input right padding should be at least:

```txt
pr-11
```

so text does not run underneath the icon.

## Exact Layout Recipe

```txt
wrapper: relative
input: Input readonly with pr-11
button: absolute right-2 top-1/2 -translate-y-1/2
button-hit-area: rounded-sm p-1.5
icon: size-5
copied-feedback: swap icon to green check, do not resize field
```

## Exact Classes

```txt
wrapper: relative
input-extension: pr-11
button: absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1.5 text-neutral-500 transition-colors hover:text-neutral-700 focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 dark:text-neutral-400 dark:hover:text-white dark:focus-visible:ring-warning dark:focus-visible:ring-offset-base
copy-icon: size-5
success-icon: size-5 text-green-500
```

## Elevation & Depth

Copy Button does not add elevation. The field uses Input's readonly treatment and the icon button floats inside the field without a visible surface.

Do not add a separate bordered button box inside the input unless a future design explicitly requires it.

## Shapes

The readonly input uses `rounded-sm`.

The copy button has no visible background by default; its hit target can use `rounded-sm` for focus/hover safety.

## Components

### Base composition

```svelte
<CopyButton text={token} />
```

Recommended implementation shape:

```svelte
<div class="relative">
  <Input value={text} readonly class="pr-11" />
  {#if isSecure}
    <button
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1.5 text-neutral-500 transition-colors hover:text-neutral-700 focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 dark:text-neutral-400 dark:hover:text-white dark:focus-visible:ring-warning dark:focus-visible:ring-offset-base"
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
    >
      {#if copied}
        <CheckIcon class="size-5 text-green-500" />
      {:else}
        <CopyIcon class="size-5" />
      {/if}
    </button>
  {/if}
</div>
```

### Clipboard behavior

Only render the copy button if clipboard access is available:

```ts
const isSecure = window.isSecureContext && !!navigator.clipboard;
```

Copy action:

```ts
await navigator.clipboard.writeText(text);
copied = true;
setTimeout(() => (copied = false), 1000);
```

The copied state lasts 1 second.

### Copied state

Use a check icon with:

```txt
size-5 text-green-500
```

Do not replace the whole field or show a large toast for the inline copied state. Larger feedback can be handled separately by the app if needed.

### Form control surface contrast

When this spec renders `Input`, `PasswordInput`, command/search input, or `Textarea` inside gray/neutral panels, the control surface must be darker/lighter than the container so it does not blend in.

```txt
light gray panel: parent bg-gray-50 or bg-neutral-100 + control bg-white
dark base panel: parent dark:bg-base + control dark:bg-coolgray-100
dark gray panel: parent dark:bg-coolgray-100 + control dark:bg-base
```

Follow the exact context-contrast rule from `design/forms/input.md` and `design/forms/textarea.md`.

## Do's and Don'ts

- Do compose Copy Button from readonly Input plus an absolute icon button.
- Do render the copy button only in secure clipboard contexts.
- Do reserve right padding on the input so text does not sit under the icon.
- Do show a green check icon for 1 second after copying.
- Do use `aria-label="Copy to clipboard"` and `title="Copy to clipboard"`.
- Do use normal focus rings on the icon button.
- Don't make the readonly field editable.
- Don't show the copy action if clipboard APIs are unavailable.
- Don't use a large visible button surface inside the input.
- Don't keep the copied state permanently active.
- Don't introduce framework-specific implementation details.

## Implementation Notes

This section is intentionally outside the core DESIGN.md section list and should be preserved by tools that follow the Google `design.md` consumer behavior for unknown sections.

- The local mockup uses `Input` and `navigator.clipboard`; production should handle copy failures gracefully if needed.
- If the value is sensitive, pair Copy Button with the PasswordInput/secret reveal pattern rather than showing secrets by default.

## Review Checklist

- [ ] Any input/search/textarea controls on gray or coolgray panels have a visible contrast step; no same-color control-on-panel pairing.
- [ ] Composes readonly Input with absolute-positioned copy button.
- [ ] Copy button only renders when `window.isSecureContext` and clipboard support are available.
- [ ] Input reserves right padding for the icon (`pr-11` or equivalent).
- [ ] Default icon is copy/duplicate, `size-5`.
- [ ] Copied state uses green check icon (`text-green-500`) for 1 second.
- [ ] Button has `aria-label` and `title`.
- [ ] Icon button has visible focus ring: purple light / yellow dark.
- [ ] No editable field, permanent copied state, or large inner button chrome introduced.

## Claude Improvement Notes

Potential cleanup ideas for a later implementation pass:

1. Decide whether copy failures should show inline error state or app-level toast.
2. Decide whether copied duration should remain 1 second or become a shared timing token.
3. Add a secret-copy variant after secret display patterns are finalized.

Do not apply these improvements automatically while migrating. Preserve this component spec first, then change after explicit review.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/components/copy-button/+page.svelte`

- Google DESIGN.md spec: `https://github.com/google-labs-code/design.md`.
- Shadcn-Svelte Button docs: `https://www.shadcn-svelte.com/docs/components/button`.
- Shadcn-Svelte Input docs: `https://www.shadcn-svelte.com/docs/components/input`.
