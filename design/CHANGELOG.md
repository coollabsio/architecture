# Design Changelog

Latest first. Every design-system change that should influence future AI implementation belongs here.

## 2026-05-18 — Stacked hover-expanded toast notifications

Affected specs/files:

- `design/overlays/toast.md`
- `mockups/shadcn-svelte-sample/src/lib/components/ui/toast/toast-preview.svelte`
- `mockups/shadcn-svelte-sample/src/routes/components/toast/+page.svelte`

Agent action:

- Use Shadcn-Svelte/Sonner toasts as a collapsed bottom-right stack by default: newest toast in front, up to three visible toasts behind it, `expand={false}`, `visibleToasts={3}`, and `gap={14}`.
- Preserve hover/focus/interact expansion so older visible toasts become readable without making the default notification area noisy.
- Keep stacked depth subtle: overlap, scale, and z-order only; do not add heavy shadows, gradients, or a permanently expanded list unless a product context explicitly opts into `expand`.

## 2026-05-18 — Ideas comment upvote controls

Affected specs/files:

- `design/forms/button.md`
- `design/containers/card.md`
- `/Users/heyandras/devel/ideas/frontend/src/lib/components/CommentSection.svelte`
- `/Users/heyandras/devel/ideas/frontend/src/app.css`

Agent action:

- Keep comment upvotes as compact inline action controls inside each comment card, reusing the idea upvote arrow language at smaller button density.
- Preserve existing comment card layout; comment upvote styling is app-specific and should not add a manifest entry unless promoted to a reusable discussion component.

## 2026-05-18 — Ideas comment section implementation

Affected specs/files:

- `design/forms/button.md`
- `design/forms/textarea.md`
- `design/overlays/modal.md`
- `design/containers/card.md`
- `/Users/heyandras/devel/ideas/frontend/src/lib/components/CommentSection.svelte`
- `/Users/heyandras/devel/ideas/frontend/src/app.css`

Agent action:

- For idea-detail discussions, keep comments inside the existing dialog with compact card rows, inset-shadow textareas, sharp 4px radii, and existing button variants.
- Comments are app-specific composition, not a new shared design component; do not add a manifest entry unless extracting a reusable comment/thread spec later.

## 2026-05-14 — Simplify prompt workflow docs

Affected specs/files:

- `prompts/shared-design-workflow.md`
- `prompts/generate-sample-layout.md`
- `prompts/migrate-ui-to-design-docs.md`
- `prompts/review-ui-against-design.md`
- `design/REVIEW_CHECKLIST.md`

Agent action:

- Use `prompts/shared-design-workflow.md` as the shared source-of-truth workflow for prompt-driven UI generation, migration, and review.
- Keep individual prompts scenario- or role-specific; do not duplicate hard-coded migrated component lists or repeated final-response/validation blocks.
- Derive component requirements from `design/manifest.json` and the relevant migrated specs.

## 2026-05-14 — Make auth page buttons taller

Affected specs/files:

- `design/forms/button.md`
- `design/forms/form-composition.md`
- `design/auth/login-page.md`
- `design/auth/register-page.md`
- `design/auth/forgot-password-page.md`
- `design/auth/reset-password-page.md`
- `design/auth/confirm-password-page.md`
- `design/auth/email-verification-page.md`
- `design/auth/totp-challenge.md`
- `mockups/shadcn-svelte-sample/src/lib/components/ui/auth-pages/auth-primary-button.svelte`
- Auth page mockup components and TOTP challenge mockup

Agent action:

- Use `h-12 w-full justify-center px-4` for primary auth submit buttons to match the taller Coolify login-page feel.
- Use the same taller local treatment for similar full-width auth navigation/OAuth actions on auth pages.
- Keep global Button defaults compact (`h-8`, `text-sm font-medium`); do not increase typography, radius, or global highlighted button size.

## 2026-05-14 — Migrate design tooling to Bun scripts

Affected specs/files:

- `package.json`
- `scripts/generate-design-manifest.js`
- `scripts/design-check.js`
- `design/manifest.json`
- Design workflow documentation references

Agent action:

- Use `bun run design:manifest` to regenerate `design/manifest.json`.
- Use `bun run design:check` to regenerate the manifest and lint `design/**/*.md` with `@google/design.md`.
- Do not call the removed Python/Bash entrypoints; the design tooling source of truth is now Bun/JavaScript.

## 2026-05-14 — Add ghost Input and Textarea variants

Affected specs/files:

- `design/forms/input.md`
- `design/forms/textarea.md`
- `mockups/shadcn-svelte-sample/src/lib/components/ui/input/index.ts`
- `mockups/shadcn-svelte-sample/src/lib/components/ui/input/input.svelte`
- `mockups/shadcn-svelte-sample/src/lib/components/ui/textarea/index.ts`
- `mockups/shadcn-svelte-sample/src/lib/components/ui/textarea/textarea.svelte`
- `mockups/shadcn-svelte-sample/src/routes/components/input/+page.svelte`
- `mockups/shadcn-svelte-sample/src/routes/components/textarea/+page.svelte`

Agent action:

- Use `ghost` only where a surrounding row, toolbar, panel, or editor shell already supplies the visual boundary.
- Keep ghost controls transparent with no inset shadow, border chrome, or Textarea resize affordance in light and dark mode.
- Preserve compact padding, typography, radius, placeholder colors, disabled/read-only text treatment, and accessible accent focus outlines.
- Do not use `dirty` to draw the 4px accent bar on ghost controls; ghost stays chrome-free except for focus outline.
- Do not replace default form-field Input/Textarea styling with ghost unless the relevant page/component spec explicitly calls for it.

## 2026-05-14 — Standardize mockup Settings gear icon

Affected specs/files:

- `design/navigation/sidebar-navbar.md`
- `mockups/shadcn-svelte-sample/src/lib/components/ui/icons/settings-icon.svelte`
- `mockups/shadcn-svelte-sample/src/lib/components/ui/icons/index.ts`
- `mockups/shadcn-svelte-sample/src/lib/components/ui/sidebar-navbar/sidebar-navbar.svelte`

Agent action:

- Use the shared `SettingsIcon` component for every Settings icon affordance in mockup pages.
- Keep Settings icons at `size-4 shrink-0`, stroke-based, `currentColor`, and aligned with the approved gear reference.
- Preserve existing footer link geometry, collapsed labels/tooltips, and light/dark hover/focus colors when swapping Settings icons.
- Text-only Settings links may remain text-only; do not add icons where the relevant page spec does not require them.

## 2026-05-14 — Document submitted form success and error layouts

Affected specs/files:

- `design/forms/form-composition.md`
- `design/pages/settings-page.md`
- `mockups/shadcn-svelte-sample/src/lib/components/ui/form-composition/form-composition.svelte`

Agent action:

- Use inline Alert-based submitted feedback for forms: success after saved changes, destructive/error for failed submit or server validation.
- Place form-level feedback directly below the form or section header and above fields; keep field-specific errors below controls.
- Do not rely on toast-only save confirmation when the form needs persistent accessible feedback.
- In mockups, show success/saved and error/failed submit layouts as separate visible examples, not only as hidden interactive states.
- Add form success/error submitted states as direct reusable primitive chooser entries in the sample toolbar.
- Omit the default Alert icon from submitted form success/error states; title and color are sufficient.

## 2026-05-14 — Extract sidebar team and theme switchers

Affected specs/files:

- `mockups/shadcn-svelte-sample/src/lib/components/ui/sidebar-navbar/sidebar-navbar.svelte`
- `mockups/shadcn-svelte-sample/src/lib/components/ui/sidebar-navbar/team-switcher.svelte`
- `mockups/shadcn-svelte-sample/src/lib/components/ui/sidebar-navbar/theme-switcher.svelte`
- `mockups/shadcn-svelte-sample/src/lib/components/ui/sidebar-navbar/index.ts`
- `mockups/shadcn-svelte-sample/src/routes/components/team-switcher/+page.svelte`
- `mockups/shadcn-svelte-sample/src/routes/components/theme-switcher/+page.svelte`
- `mockups/shadcn-svelte-sample/src/lib/component-registry.ts`
- `design/navigation/sidebar-navbar.md`

Agent action:

- Keep the sidebar team switcher and theme switcher as separate reusable components when updating the Sidebar Navbar mockup.
- Preserve `design/navigation/sidebar-navbar.md` placement, density, focus-ring, icon-size, and aria contracts for both extracted controls.
- Keep Team Switcher and Theme Switcher selectable as direct reusable primitive chooser entries, each showing expanded and collapsed geometry.
- Keep standalone Team Switcher and Theme Switcher examples inside their preview cards; wrappers should use `max-w-64`/centered collapsed widths so controls do not overlap card borders.
- Add top padding around the standalone Theme Switcher preview shell so the footer divider does not visually merge with the preview-card border.
- Theme Switcher must be a compact inline 3-state icon switch with Light, System default, and Dark, matching the previous inline two-state feel with one added system segment; do not use a dropdown or large text segmented control.

## 2026-05-14 — Add UI-to-design migration prompt

Affected specs/files:

- `prompts/migrate-ui-to-design-docs.md`

Agent action:

- Use `prompts/migrate-ui-to-design-docs.md` when aligning existing application UI with the design docs and mockups.
- Treat `DESIGN.md`, `design/tokens.md`, `design/CHANGELOG.md`, `design/manifest.json`, and relevant component specs as source of truth before checking mockups for visual nuance.
- Preserve behavior while fixing small visual drift: density, spacing, radius, typography, state styling, focus colors, and dark-mode behavior.

## 2026-05-13 — Normalize auth submit buttons to compact button typography

Affected specs/files:

- `design/forms/button.md`
- `design/auth/login-page.md`
- `design/auth/register-page.md`
- `design/auth/forgot-password-page.md`
- `design/auth/reset-password-page.md`
- `design/auth/confirm-password-page.md`
- `design/auth/email-verification-page.md`
- `design/auth/totp-challenge.md`
- `mockups/shadcn-svelte-sample/src/lib/components/ui/auth-pages/auth-primary-button.svelte`

Agent action:

- Use `variant="highlighted"` plus layout-only classes such as `w-full justify-center` for primary auth submit buttons.
- Do not add auth-specific `text-base`, `font-bold`, `h-12`, or `py-3` overrides unless a future spec explicitly reintroduces them.
- Keep auth primary submit typography aligned with the standard Button spec: compact `text-sm font-medium`.

## 2026-05-13 — Add AI design compliance workflow

Affected specs/files:

- `DESIGN.md`
- `design/tokens.md`
- `design/REVIEW_CHECKLIST.md`
- `design/manifest.json`
- `prompts/review-ui-against-design.md`
- `prompts/generate-sample-layout.md`
- `mockups/shadcn-svelte-sample/README.md`
- `AGENTS.md`
- `CLAUDE.md`

Agent action:

- Read `DESIGN.md`, `design/tokens.md`, this changelog, and relevant component specs before UI work.
- Use `design/manifest.json` to find component docs and mock routes.
- Run or report the design review checklist after UI changes.
- Do not rely on memory of older Coolify design rules when these docs differ.

## 2026-05-13 — Normalize modal overlay color tokens for DESIGN.md lint

Affected specs/files:

- `design/overlays/modal.md`
- `design/overlays/confirm-modal.md`
- `design/overlays/modal-confirmation.md`

Agent action:

- Treat modal overlays as black backdrop tokens with opacity applied in implementation/prose, because Google DESIGN.md color tokens require hex colors.

## Entry template

```md
## YYYY-MM-DD — Short design change title

Affected specs/files:

- `design/path/example.md`

Agent action:

- Concrete instruction future agents must apply.
```
