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
spacing:
  auth-submit-height: 3rem
  auth-submit-padding-x: 1rem
components:
  auth-submit-button:
    backgroundColor: "{colors.coollabs}"
    textColor: "{colors.surface}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    height: "{spacing.auth-submit-height}"
    padding: "0 {spacing.auth-submit-padding-x}"
---

# Register Page

## Overview

The Register Page is a page-level auth composition inspired by Coolify's current registration screen: centered auth column, large Coolify title, `Create your account` subtitle, optional root-user warning, name/email/password fields, password rules callout, highlighted Create Account button, and already-registered divider/link.

Use shadcn/ui primitives as the base: `Button`, `Input`, `PasswordInput`, and `FormField`.

## Colors

Use `bg-gray-50 dark:bg-app-base` for the page. Root-user setup uses warning yellow text/border with low-opacity warning background. Password rules use neutral light surface and `coolgray-100` dark surface.

The primary Create Account button uses the highlighted button variant with auth layout overrides only: full width and centered content.

## Typography

- Brand: `text-5xl font-extrabold tracking-tight`.
- Subtitle: `text-lg text-neutral-600 dark:text-neutral-400`.
- Password rules: `text-xs` muted.
- Auth submit button: `h-12`, normal Button `text-sm font-medium`; use variant, width, and the auth-only height exception—not larger typography—for emphasis.

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
h-12 w-full justify-center px-4
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
primary-auth-button: h-12 w-full justify-center px-4
secondary-link-button: flex min-h-12 w-full items-center justify-center rounded-sm border border-neutral-300 px-4 py-3 text-center font-medium transition-colors hover:border-coollabs dark:border-coolgray-300 dark:hover:border-warning
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
primary-submit: h-12 w-full justify-center px-4
```

## Elevation & Depth

Use flat surfaces and borders only.

## Shapes

Use `rounded-sm` for design controls and callouts.

## Components

- `Button` with `variant="highlighted"` for Create Account.
- `Input` for name/email.
- `PasswordInput` for password fields.
- `FormField` for labels, required markers, and password confirmation error.

### Form control surface contrast

When this spec renders `Input`, `PasswordInput`, command/search input, or `Textarea` inside gray/neutral panels, the control surface must be darker/lighter than the container so it does not blend in.

```txt
light gray panel: parent bg-gray-50 or bg-neutral-100 + control bg-white
dark app-base panel: parent dark:bg-app-base + control dark:bg-coolgray-100
dark gray panel: parent dark:bg-coolgray-100 + control dark:bg-app-base
```

Follow the exact context-contrast rule from `design/forms/input.md` and `design/forms/textarea.md`.

## Do's and Don'ts

- Do keep the Create Account button highlighted, full width, and visually primary without increasing height or font size.
- Do show the root-user warning when the first user is being created.
- Do include password rule guidance near password fields.
- Do use the taller auth-only `h-12` button height for the primary auth submit.
- Don't copy Laravel/Blade/Livewire implementation details into this design system.

## Implementation Notes

The auth submit button style is shared with Login and TOTP challenge pages. Apply the `h-12 w-full justify-center px-4` treatment locally as class overrides on the highlighted Button.

## Review Checklist

- [ ] Any input/search/textarea controls on gray or coolgray panels have a visible contrast step; no same-color control-on-panel pairing.
- [ ] Centered `max-w-md` auth layout.
- [ ] Large Coolify title and create-account subtitle.
- [ ] Root-user warning variant exists.
- [ ] Password guidance callout is present.
- [ ] Primary Create Account button is highlighted and uses taller auth Button height with normal Button typography.
- [ ] Already-registered secondary action is less prominent.

## Claude Improvement Notes

Consider extracting shared auth dividers and auth secondary links after forgot/reset pages are migrated.

## Source References

- Mockup reference: `mockups/shadcn-react-sample/src/routes/pages/register-page.tsx`

- `DESIGN.md`
- Coolify current register page reviewed for layout and interaction hierarchy.
