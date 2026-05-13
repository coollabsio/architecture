---
version: alpha
name: Coolify TOTP Challenge
description: Auth-page one-time token challenge for six-digit authenticator codes with recovery-code fallback.
colors:
  surface: "#ffffff"
  base: "#101010"
  appBase: "#101010"
  text: "#000000"
  muted: "#737373"
  neutral-50: "#fafafa"
  neutral-200: "#e5e5e5"
  neutral-300: "#d4d4d4"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
  coollabs: "#6b16ed"
  warning: "#fbbf24"
typography:
  title:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 3rem
    fontWeight: 800
    lineHeight: 1
  body:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  digit-width: 3rem
  digit-height: 3.5rem
components:
  totp-page:
    backgroundColor: "{colors.appBase}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
  totp-digit-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
---

# TOTP / One-Time Token Challenge

## Overview

The TOTP Challenge is the auth-page component used after password login when two-factor authentication is required. It is inspired by Coolify's current 2FA challenge: centered auth page, product title, short instruction panel, six separate digit inputs, recovery-code fallback, primary login button, help divider, and back-to-login link.

Use Shadcn-Svelte primitives as the base where possible:

- `Button` with `variant="highlighted"` and auth submit sizing for Login for submit and navigation-style actions.
- `Input` for recovery-code mode.
- Local composition for the six one-character TOTP digit boxes.

## Colors

- **Page/card:** light uses white/neutral surfaces; dark uses `base` for the auth card so `coolgray-100` inputs remain visible.
- **Instruction panel:** light `neutral-50`; dark `coolgray-100`.
- **Digit inputs:** white in light mode, `coolgray-100` in dark mode.
- **Focus:** purple `coollabs` in light mode, yellow `warning` in dark mode.
- **Borders:** neutral/coolgray only; do not use red/yellow borders unless representing an error/warning state.

## Typography

- Product title: `text-5xl font-extrabold tracking-tight`.
- Page subtitle: `text-lg text-neutral-600 dark:text-neutral-400`.
- Digit inputs: `text-2xl font-bold text-center`.
- Helper/action links: `text-sm`, muted by default, underline on hover.

## Layout

Auth-page anatomy:

```txt
Centered auth card
  Product title
  Two-Factor Authentication subtitle
  Instruction callout
  Six digit inputs
  Recovery-code toggle
  Primary submit button (tall highlighted auth style)
  Optional submitted/error state
  Need help divider
  Back to login link
```

Recommended wrapper:

```txt
mx-auto w-full max-w-md space-y-6 rounded-sm border border-neutral-200 bg-white p-4
 dark:border-coolgray-300 dark:bg-app-base
```

Auth submit button uses the same promoted style as Login/Register:

```txt
h-12 w-full justify-center py-3 text-base font-bold
```

Digit input row:

```txt
flex justify-center gap-2
```

Digit input:

```txt
h-14 w-12 rounded-sm border-2 border-neutral-200 bg-white text-center text-2xl font-bold
focus:border-coollabs dark:border-coolgray-300 dark:bg-coolgray-100 dark:focus:border-warning
```

## Exact Layout Recipe

Use the shared Coolify auth shell exactly for auth pages:

```txt
page: min-h-screen bg-gray-50 px-6 py-8 dark:bg-app-base
outer: mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center
sample-frame: w-full rounded-sm border border-neutral-200 bg-gray-50 p-4 dark:border-coolgray-300 dark:bg-app-base
auth-column: mx-auto w-full max-w-md space-y-8 text-black dark:text-white
brand-wrap: space-y-2 text-center
brand: text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white
subtitle: text-lg text-neutral-600 dark:text-neutral-400
content-stack: space-y-6
form: flex flex-col gap-4
primary-auth-button: h-12 w-full justify-center py-3 text-base font-bold
secondary-link-button: block w-full rounded-sm border border-neutral-300 px-4 py-3 text-center font-medium transition-colors hover:border-coollabs dark:border-coolgray-300 dark:hover:border-warning
divider-wrap: relative my-6
divider-line: w-full border-t border-neutral-300 dark:border-coolgray-300
divider-label: bg-gray-50 px-2 text-sm text-neutral-500 dark:bg-app-base dark:text-neutral-400
```

## Exact Classes

```txt
input-field: use design/forms/input.md exact Input classes
password-field: use design/forms/input.md PasswordInput composition
form-field-gap: flex flex-col gap-4
info-callout: rounded-sm border border-neutral-200 bg-neutral-50 p-4 dark:border-coolgray-300 dark:bg-coolgray-100
warning-callout: rounded-sm border border-warning bg-warning/10 p-4
success-message: rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300
primary-submit: h-12 w-full justify-center py-3 text-base font-bold
```

## Elevation & Depth

Use borders only. Avoid heavy shadows. The TOTP page should feel secure and utilitarian, not modal-like.

## Shapes

Use `rounded-sm` throughout. The current product may use larger radius in places, but the implementation should normalize to the design system shape token.

## Components

- `Button` with `variant="highlighted"` and auth submit sizing for Login
- `Input`
- Local `TotpChallenge` composition
- Optional inline success/error message using alert/toast styling

## Behavior

- Render six one-character numeric inputs for authenticator mode.
- First digit input should be focusable immediately by page logic when appropriate.
- Each typed digit moves focus to the next input.
- Backspace on an empty input moves focus to the previous input.
- Paste accepts any string, strips non-digits, fills up to six digits, and focuses the last pasted digit.
- Use `autocomplete="one-time-code"` on the first digit input and on the recovery-code input where useful.
- Submit is disabled until six digits are present, or until recovery-code mode has a non-empty value.
- Recovery-code mode replaces digit inputs with a normal `Input` and a toggle back to authenticator-code mode.

### Form control surface contrast

When this spec renders `Input`, `PasswordInput`, command/search input, or `Textarea` inside gray/neutral panels, the control surface must be darker/lighter than the container so it does not blend in.

```txt
light gray panel: parent bg-gray-50 or bg-neutral-100 + control bg-white
dark app-base panel: parent dark:bg-app-base + control dark:bg-coolgray-100
dark gray panel: parent dark:bg-coolgray-100 + control dark:bg-app-base
```

Follow the exact context-contrast rule from `design/forms/input.md` and `design/forms/textarea.md`.

## Do's and Don'ts

- Do keep this as a page-level auth composition, not a generic text input variant.
- Do preserve paste support; users often paste codes from password managers.
- Do provide recovery-code fallback.
- Do keep focus states high contrast in both themes.
- Don't use native number inputs; they introduce steppers and inconsistent formatting.
- Don't accept arbitrary non-digit characters in authenticator-code mode.
- Don't copy Laravel, Blade, Livewire, or Alpine implementation details into implementations.

## Implementation Notes

Use Shadcn-Svelte `Button` and `Input` as primitives, with local Svelte state for the digit array, paste handling, focus movement, and recovery-code toggle. In production, wire submit to the app's auth endpoint or action.

## Review Checklist

- [ ] Any input/search/textarea controls on gray or coolgray panels have a visible contrast step; no same-color control-on-panel pairing.
- [ ] Six digit boxes are present and centered.
- [ ] Login submit button is highlighted, `h-12`, `py-3`, and `font-bold`.
- [ ] Typing a digit advances focus.
- [ ] Backspace on an empty digit moves focus backward.
- [ ] Paste fills up to six digits and strips non-digits.
- [ ] Recovery-code fallback is reachable and reversible.
- [ ] Submit is disabled until the current mode is valid.
- [ ] Light focus uses purple; dark focus uses yellow.
- [ ] Dark card/input contrast is visible.
- [ ] Uses Shadcn-Svelte primitives where applicable.

## Claude Improvement Notes

Consider adding a setup variant later for QR code enrollment, secret-key reveal/copy, and recovery-code display. Keep that separate from the login challenge if the file becomes too broad.

## Source References

- Mockup reference: `mockups/shadcn-svelte-sample/src/routes/pages/totp-challenge/+page.svelte`

- `DESIGN.md`
- Coolify current two-factor challenge behavior reviewed for interaction patterns.
