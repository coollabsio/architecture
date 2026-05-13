---
version: alpha
name: Coolify Register Page
description: Auth registration page composition inspired by Coolify's current register screen.
colors:
  surface: "#ffffff"
  page-light: "#f9fafb"
  base: "#101010"
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

# Register Page

## Overview

The Register Page is a page-level auth composition inspired by Coolify's current registration screen: centered auth column, large Coolify title, `Create your account` subtitle, optional root-user warning, name/email/password fields, password rules callout, tall highlighted Create Account button, and already-registered divider/link.

Use Shadcn-Svelte primitives as the base: `Button`, `Input`, `PasswordInput`, and `FormField`.

## Colors

Use `bg-gray-50 dark:bg-base` for the page. Root-user setup uses warning yellow text/border with low-opacity warning background. Password rules use neutral light surface and `coolgray-100` dark surface.

The primary Create Account button uses the highlighted button variant with auth submit overrides: taller height and bolder text.

## Typography

- Brand: `text-5xl font-extrabold tracking-tight`.
- Subtitle: `text-lg text-neutral-600 dark:text-neutral-400`.
- Password rules: `text-xs` muted.
- Auth submit button: `text-base font-bold`.

## Layout

```txt
Full page background
  Centered max-w-md column
    Coolify title
    Create your account subtitle
    Optional root-user warning
    Register form
      Name
      Email
      Password
      Password again
      Password rules callout
      Create Account button
    Divider: Already have an account?
    Login link button
```

Recommended auth submit button classes:

```txt
h-12 w-full justify-center py-3 text-base font-bold
```

## Elevation & Depth

Use flat surfaces and borders only.

## Shapes

Use `rounded-sm` for V2 controls and callouts.

## Components

- `Button` with `variant="highlighted"` for Create Account.
- `Input` for name/email.
- `PasswordInput` for password fields.
- `FormField` for labels, required markers, and password confirmation error.

## Do's and Don'ts

- Do keep the Create Account button tall, highlighted, and bold.
- Do show the root-user warning when the first user is being created.
- Do include password rule guidance near password fields.
- Don't use the compact default button height for the primary auth submit.
- Don't copy Laravel/Blade/Livewire implementation details into V2.

## Implementation Notes

The auth submit button style is shared with Login and TOTP challenge pages. Apply it locally as class overrides on the highlighted Button.

## Review Checklist

- [ ] Centered `max-w-md` auth layout.
- [ ] Large Coolify title and create-account subtitle.
- [ ] Root-user warning variant exists.
- [ ] Password guidance callout is present.
- [ ] Primary Create Account button is highlighted, `h-12`, `py-3`, and `font-bold`.
- [ ] Already-registered secondary action is less prominent.

## Claude Improvement Notes

Consider extracting shared auth dividers and auth secondary links after forgot/reset pages are migrated.

## Source References

- `DESIGN_V2.md`
- Coolify current register page reviewed for layout and interaction hierarchy.
