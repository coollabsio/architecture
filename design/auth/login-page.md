---
version: alpha
name: Coolify Login Page
description: Auth login page composition inspired by Coolify's current login screen.
colors:
  surface: "#ffffff"
  page-light: "#f9fafb"
  base: "#101010"
  text: "#000000"
  muted: "#737373"
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

# Login Page

## Overview

The Login Page is a page-level auth composition inspired by Coolify's current login screen: centered `max-w-md` auth column, large Coolify wordmark, email/password fields, forgot-password link, taller highlighted login button, registration divider/link, and optional OAuth buttons.

Use Shadcn-Svelte primitives as the base: `Button`, `Input`, `PasswordInput`, and `FormField`.

## Colors

Use `bg-gray-50 dark:bg-base` for the full auth page. Inputs keep the V2 input surfaces. Links use purple in light mode and yellow in dark mode on hover/focus.

The primary login button uses the highlighted button variant, but auth submit buttons are intentionally taller and bolder than normal operator buttons.

## Typography

- Brand: `text-5xl font-extrabold tracking-tight`.
- Form labels: FormField label styling.
- Links/dividers: `text-sm` muted text.
- Auth submit button: `text-base font-bold`.

## Layout

```txt
Full page background
  Centered max-w-md column
    Coolify title
    Login form
      Email
      Password
      Forgot password link
      Login button
    Divider: Don't have an account?
    Register link button
    Optional OAuth divider/buttons
```

Recommended auth submit button classes:

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

No heavy shadow. Auth pages are simple centered forms on the app auth background.

## Shapes

Use `rounded-sm` for V2 controls and links.

## Components

- `Button` with `variant="highlighted"` for Login.
- `Input` for email.
- `PasswordInput` for password.
- `FormField` for labels and required markers.

## Do's and Don'ts

- Do keep the login button tall, highlighted, and bold.
- Do use password visibility behavior from `PasswordInput`.
- Do keep optional OAuth buttons secondary/default.
- Don't use normal compact `h-8` button height for the primary auth submit.
- Don't copy Laravel/Blade/Livewire implementation details into V2.

## Implementation Notes

The auth submit button style is shared with Register and TOTP challenge pages. Apply it locally as class overrides on the highlighted Button rather than changing all highlighted buttons globally.

## Review Checklist

- [ ] Centered `max-w-md` auth layout.
- [ ] Large Coolify title.
- [ ] Email/password fields use V2 FormField/Input primitives.
- [ ] Primary Login button is highlighted, `h-12`, `py-3`, and `font-bold`.
- [ ] Register and OAuth secondary actions are visually less prominent.
- [ ] Light/dark link hover colors match V2 accents.

## Claude Improvement Notes

Consider a shared `AuthShell` and `AuthSubmitButton` composition if more auth pages are migrated.

## Source References

- `DESIGN_V2.md`
- Coolify current login page reviewed for layout and interaction hierarchy.
