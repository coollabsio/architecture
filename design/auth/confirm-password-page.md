---
version: alpha
name: Coolify Confirm Password Page
description: Secure-area password confirmation auth page.
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

# Confirm Password Page

## Overview

This page-level auth composition is inspired by Coolify's current auth screens. It uses the shared centered `max-w-md` auth column, large Coolify title, compact form/content stack, muted dividers, and a primary auth submit button.

Secure-area instruction callout, password field, and tall highlighted Confirm password button.

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

## Exact Layout Recipe

Use the shared Coolify auth shell exactly for auth pages:

```txt
page: min-h-screen bg-gray-50 px-6 py-8 dark:bg-base
outer: mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center
sample-frame: w-full rounded-sm border border-neutral-200 bg-gray-50 p-4 dark:border-coolgray-300 dark:bg-base
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
divider-label: bg-gray-50 px-2 text-sm text-neutral-500 dark:bg-base dark:text-neutral-400
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

Use flat surfaces and borders only. Avoid heavy auth-card shadows.

## Shapes

Use `rounded-sm` for design controls, callouts, and secondary link buttons.

## Components

- `Button` with `variant="highlighted"` for the primary auth action.
- `Input` / `PasswordInput` as applicable.
- `FormField` for labeled fields.

## Do's and Don'ts

- Do keep primary auth actions tall, highlighted, and bold.
- Do keep secondary navigation as bordered link buttons or muted text links.
- Do preserve Coolify-inspired centered auth hierarchy.
- Don't use compact `h-8` operator buttons for primary auth submits.
- Don't copy Laravel/Blade/Livewire implementation details into this design system.

## Implementation Notes

Apply auth submit sizing locally as class overrides on the highlighted Button. This should not globally change ordinary highlighted buttons.

## Review Checklist

- [ ] Centered `max-w-md` auth layout.
- [ ] Large Coolify title.
- [ ] Primary auth button is highlighted, `h-12`, `py-3`, and `font-bold`.
- [ ] Secondary actions are visually less prominent.
- [ ] Light/dark contrast matches design tokens.

## Claude Improvement Notes

Consider extracting shared `AuthShell`, `AuthSubmitButton`, and auth divider components after all auth pages stabilize.

## Source References

- `DESIGN.md`
- Coolify current auth views reviewed for layout and interaction hierarchy.
