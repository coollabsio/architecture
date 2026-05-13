---
version: alpha
name: Coolify Email Verification Page
description: Email verification sent page with resend action.
colors:
  page-light: "#f9fafb"
  base: "#101010"
  surface: "#ffffff"
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
  brand:
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
components:
  auth-submit-button:
    backgroundColor: "{colors.coollabs}"
    textColor: "{colors.surface}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
---

# Email Verification Page

## Overview

This page-level auth composition is inspired by Coolify's current auth screens. It uses the shared centered `max-w-md` auth column, large Coolify title, compact form/content stack, muted dividers, and a primary auth submit button.

Verification email sent message, instruction callout, tall highlighted resend button, and Back to Login link.

Use Shadcn-Svelte primitives as the base: `Button`, `Input`/`PasswordInput` where needed, and `FormField` where labels are required.

## Colors

Use `bg-gray-50 dark:bg-base` for the full auth page. Inputs and callouts use neutral surfaces with visible dark contrast. Links use purple in light mode and yellow in dark mode on hover/focus.

## Typography

Brand uses `text-5xl font-extrabold tracking-tight`. Subtitles use `text-lg text-neutral-600 dark:text-neutral-400`. Helper copy is `text-sm`; password rules are `text-xs`.

## Layout

Use a centered full-page auth shell:

```txt
min-h-screen bg-gray-50 px-6 py-8 dark:bg-base
mx-auto w-full max-w-md space-y-8
```

Primary auth submit buttons must use:

```txt
h-12 w-full justify-center py-3 text-base font-bold
```

## Elevation & Depth

Use flat surfaces and borders only. Avoid heavy auth-card shadows.

## Shapes

Use `rounded-sm` for V2 controls, callouts, and secondary link buttons.

## Components

- `Button` with `variant="highlighted"` for the primary auth action.
- `Input` / `PasswordInput` as applicable.
- `FormField` for labeled fields.

## Do's and Don'ts

- Do keep primary auth actions tall, highlighted, and bold.
- Do keep secondary navigation as bordered link buttons or muted text links.
- Do preserve Coolify-inspired centered auth hierarchy.
- Don't use compact `h-8` operator buttons for primary auth submits.
- Don't copy Laravel/Blade/Livewire implementation details into V2.

## Implementation Notes

Apply auth submit sizing locally as class overrides on the highlighted Button. This should not globally change ordinary highlighted buttons.

## Review Checklist

- [ ] Centered `max-w-md` auth layout.
- [ ] Large Coolify title.
- [ ] Primary auth button is highlighted, `h-12`, `py-3`, and `font-bold`.
- [ ] Secondary actions are visually less prominent.
- [ ] Light/dark contrast matches V2 tokens.

## Claude Improvement Notes

Consider extracting shared `AuthShell`, `AuthSubmitButton`, and auth divider components after all auth pages stabilize.

## Source References

- `DESIGN_V2.md`
- Coolify current auth views reviewed for layout and interaction hierarchy.
