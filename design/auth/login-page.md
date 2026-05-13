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
