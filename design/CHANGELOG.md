# Design Changelog

Latest first. Every design-system change that should influence future AI implementation belongs here.

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
