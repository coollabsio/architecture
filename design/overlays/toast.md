---
version: alpha
name: Coolify Toast
description: shadcn/ui Sonner toast styling for short non-blocking feedback.
colors:
  success: "#16a34a"
  warning: "#fcd452"
  error: "#dc2626"
  surface: "#ffffff"
  text: "#000000"
  muted: "#737373"
  coolgray-100: "#181818"
  coolgray-300: "#242424"
typography:
  body-sm:
    fontFamily: "'Geist Sans', Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  sm: 0.25rem
spacing:
  padding: 0.75rem
  gap: 0.5rem
components:
  toast:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
---

# Toast

## Overview

Toast is a short non-blocking notification using shadcn/ui `Sonner`. Use it for saved, copied, queued, failed, or completed feedback.

## Colors

Default toast uses neutral surface and border. Success/warning/error use semantic icon/accent color; avoid full-fill toasts unless urgency requires it.

## Typography

Title uses `text-sm font-bold`; description uses `text-sm` or `text-xs` muted text.

## Layout

Toast surface is `rounded-sm border p-3`, compact, with `gap-2` and optional `size-4` icon. Actions use Button classes. Triggered toasts render in a fixed viewport such as `fixed bottom-4 right-4 z-20` and auto-dismiss.

Stack multiple notifications with Sonner's collapsed-by-default behavior. Keep `expand={false}` so new toasts sit behind each other until the user hovers, focuses, swipes, or otherwise interacts with the toast viewport. Keep `visibleToasts={3}` for the compact stack and use the default Sonner-like expanded `gap` of `14px`.

## Exact Layout Recipe

Use the current mockup ToastPreview exactly:

```txt
toast: grid max-w-sm grid-cols-[1rem_1fr] gap-2 rounded-sm border p-3 text-sm
icon: mt-0.5 size-4 text-center font-bold
icon-default: text-coollabs dark:text-warning
title: font-bold
description: text-neutral-600 dark:text-neutral-400
viewport-sample: fixed bottom-4 right-4 z-20 w-[min(24rem,calc(100vw-2rem))]
stack-collapsed: newest toast at front; older visible toasts overlap behind it with slight vertical lift and scale reduction
stack-expanded: hover/focus/interact expands visible toasts into a readable vertical stack with 14px gap
close: absolute right-2 top-2 grid size-5 place-items-center rounded-sm text-xs
```

## Exact Classes

```txt
toast: grid max-w-sm grid-cols-[1rem_1fr] gap-2 rounded-sm border border-neutral-200 bg-white p-3 text-sm text-black shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white
icon: mt-0.5 size-4 text-center font-bold
title: font-bold
description: text-neutral-600 dark:text-neutral-400
close: absolute right-2 top-2 grid size-5 place-items-center rounded-sm text-xs text-neutral-500 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-coolgray-200 dark:hover:text-white
```

## Stacked Hover Behavior

Use the Sonner stack model for production notifications:

```tsx
<Toaster
  position="bottom-right"
  closeButton
  duration={4000}
  expand={false}
  visibleToasts={3}
  gap={14}
/>
```

Behavior:

- Newest toast is the front toast at the bottom-right edge of the viewport.
- Up to three visible toasts may appear in the collapsed stack; extra toasts are hidden until older items dismiss.
- When collapsed, older visible toasts sit behind the front toast with a small vertical lift and scale reduction. Their content should not compete with the front toast.
- On hover, focus-within, swipe/drag, or pointer interaction, the stack expands so each visible toast becomes readable.
- Close buttons should be available but visually quiet; Sonner may reveal them on hover while preserving the toast content hierarchy.
- Keep `aria-live="polite"` semantics for normal feedback. Use short copy so screen reader announcements stay understandable.

## Elevation & Depth

Use a small shadow only for overlay separation: `shadow-sm`. Do not use large floating cards.

Stack depth comes from overlap, scale, and z-order only. Do not add heavy shadows, gradients, or decorative depth to separate stacked toasts.

## Shapes

Use `rounded-sm`.

## Components

Start from shadcn/ui Sonner:

```bash
bunx shadcn@latest add sonner
```

Recommended toast class:

```txt
rounded-sm border border-neutral-200 bg-white p-3 text-sm text-black shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white
```

Recommended viewport behavior:

```txt
position: bottom-right
expand: false
visibleToasts: 3
gap: 14
duration: 4000
closeButton: true
```

## Do's and Don'ts

- Do keep messages short.
- Do make trigger buttons actually create a toast in mockups/examples, not only render static previews.
- Do preserve the collapsed stack that expands on hover/focus/interact.
- Do use Alert for persistent inline information.
- Don't render multiple active toasts as a permanently separated list unless `expand` is intentionally enabled for that product context.
- Don't use toast for blocking confirmations.

## Implementation Notes

Toasts should auto-dismiss unless they contain an action. Destructive failures should remain long enough to read.

If using `sonner`, prefer its built-in stack behavior instead of recreating transforms manually in app code. The mockup route may recreate the behavior for static documentation, but production apps should use the shadcn/ui Sonner primitive.

## Review Checklist

- [ ] Toast is compact, bordered, and `rounded-sm`.
- [ ] Trigger examples render a toast and auto-dismiss it.
- [ ] Active toast stack is collapsed by default and expands on hover/focus/interact.
- [ ] Only the documented number of visible toasts compete for attention.
- [ ] Semantic state uses icon/accent and readable text.
- [ ] Actions use Button.

## Claude Improvement Notes

A future spec can define product-specific variants for always-expanded stacks, long-running progress toasts, or action-heavy notification centers.

## Source References

- Mockup reference: `mockups/shadcn-react-sample/src/routes/components/toast.tsx`

- `DESIGN.md`
- shadcn/ui Sonner primitive
