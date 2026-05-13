# Coolify Design System

This file is the entry point for the split design system. Component details live in `design/` as one Markdown file per component.

This design system is framework-forward for upcoming projects: use **Shadcn-Svelte primitives as the implementation base**, then extend them with Coolify visual decisions where needed. Component files should follow the **Google DESIGN.md specification**: YAML frontmatter tokens plus canonical markdown sections (`Overview`, `Colors`, `Typography`, `Layout`, `Elevation & Depth`, `Shapes`, `Components`, `Do's and Don'ts`). Do not copy Laravel, Blade, Livewire, or project-specific implementation details into component specs.

Shared global tokens live in [`design/tokens.md`](design/tokens.md). Component-local frontmatter may repeat the subset needed for lint/export, but it must not contradict the global tokens.

Use this file as a router:

1. Identify the UI need.
2. Read [`design/tokens.md`](design/tokens.md) and the latest entries in [`design/CHANGELOG.md`](design/CHANGELOG.md).
3. Open the matching component/page file from the lookup table or [`design/manifest.json`](design/manifest.json).
4. Start from the Shadcn-Svelte primitive named in that file.
5. Apply the Coolify tokens, variants, states, accessibility notes, and [`design/REVIEW_CHECKLIST.md`](design/REVIEW_CHECKLIST.md).
6. If a component has not been migrated yet, do not infer detailed styling; wait for that component spec or use only the already-migrated design guidance.

## AI Design Compliance Contract

Agents must treat the local files as the source of truth, not model memory or older copied snippets.

Before any UI implementation, design-doc edit, or mockup update:

1. Read this file.
2. Read `design/tokens.md`.
3. Read the latest relevant entries in `design/CHANGELOG.md`.
4. Use `design/manifest.json` to locate relevant migrated component/page specs and mock routes.
5. Read every relevant component/page spec before changing UI code.
6. If a needed spec is pending or missing, keep styling minimal and explicitly say the detailed spec is missing instead of inventing a new component language.

After any UI implementation or design-doc edit:

1. Check the work against `design/REVIEW_CHECKLIST.md`.
2. Regenerate `design/manifest.json` when the lookup table, paths, statuses, or mock routes change.
3. Update `design/CHANGELOG.md` with the design change and the required future agent action.
4. Update or add mockup examples/screenshots when visual behavior changes.
5. In the final response, report which design files were read and which validation/review commands ran.

## Design Update Protocol

When changing an existing component spec, update these together:

- the component file under `design/`,
- this lookup table when status/path/need/base primitive changes,
- `design/CHANGELOG.md`,
- `design/manifest.json` via `scripts/generate-design-manifest.py`,
- matching mockup route(s) under `mockups/shadcn-svelte-sample`,
- relevant prompts under `prompts/` when the workflow changes.

When adding a new component spec:

1. Create one `design/<category>/<component>.md` file using the Google DESIGN.md section order.
2. Add it to the lookup table.
3. Regenerate `design/manifest.json`.
4. Add or update a mockup route.
5. Add a changelog entry that tells future agents exactly how to apply the new spec.

## Component lookup

| Need | Use | Base primitive | Status |
|---|---|---|---|
| Action button, submit button, destructive button, highlighted button | [`design/forms/button.md`](design/forms/button.md) | Shadcn-Svelte `Button` | Migrated |
| Text input | [`design/forms/input.md`](design/forms/input.md) | Shadcn-Svelte `Input` | Migrated |
| Form label, required marker, helper icon, field description/error | [`design/forms/form-field.md`](design/forms/form-field.md) | Shadcn-Svelte `Label` + `Tooltip` composition | Migrated |
| Select | [`design/forms/select.md`](design/forms/select.md) | Shadcn-Svelte `Select` or `Native Select` | Migrated |
| Checkbox | [`design/forms/checkbox.md`](design/forms/checkbox.md) | Shadcn-Svelte `Checkbox` | Migrated |
| Textarea | [`design/forms/textarea.md`](design/forms/textarea.md) | Shadcn-Svelte `Textarea` | Migrated |
| Copy button | [`design/forms/copy-button.md`](design/forms/copy-button.md) | Shadcn-Svelte `Button` + `Input` composition | Migrated |
| Radio group | [`design/forms/radio-group.md`](design/forms/radio-group.md) | Shadcn-Svelte `Radio Group` | Migrated |
| Switch | [`design/forms/switch.md`](design/forms/switch.md) | Shadcn-Svelte `Switch` | Migrated |
| Card, panel, operational surface | [`design/containers/card.md`](design/containers/card.md) | Shadcn-Svelte `Card` | Migrated |
| Box/card link | `design/containers/box.md` | Shadcn-Svelte `Card` or custom wrapper | Pending |
| Coolbox/card with ring hover | [`design/containers/coolbox.md`](design/containers/coolbox.md) | Shadcn-Svelte `Card` or anchor/button wrapper | Migrated |
| Badge | [`design/status/badge.md`](design/status/badge.md) | Shadcn-Svelte `Badge` | Migrated |
| Status indicator | [`design/status/status-indicator.md`](design/status/status-indicator.md) | Badge + text composition | Migrated |
| Deprecated badge | [`design/status/deprecated-badge.md`](design/status/deprecated-badge.md) | Shadcn-Svelte `Badge` | Migrated |
| Tag | [`design/status/tag.md`](design/status/tag.md) | Shadcn-Svelte `Badge` or custom tag | Migrated |
| Alert / inline callout | [`design/overlays/alert.md`](design/overlays/alert.md) | Shadcn-Svelte `Alert` | Migrated |
| Callout | [`design/overlays/callout.md`](design/overlays/callout.md) | Shadcn-Svelte `Alert` | Migrated |
| Modal / dialog | [`design/overlays/modal.md`](design/overlays/modal.md) | Shadcn-Svelte `Dialog` | Migrated |
| Destructive modal confirmation | [`design/overlays/modal-confirmation.md`](design/overlays/modal-confirmation.md) | Shadcn-Svelte `Alert Dialog` or `Dialog` | Migrated |
| Confirm modal | [`design/overlays/confirm-modal.md`](design/overlays/confirm-modal.md) | Shadcn-Svelte `Alert Dialog` | Migrated |
| Popup / popup small | [`design/overlays/popup.md`](design/overlays/popup.md) | Shadcn-Svelte `Popover`/`Dialog` as appropriate | Migrated |
| Slide-over | [`design/overlays/slide-over.md`](design/overlays/slide-over.md) | Shadcn-Svelte `Sheet` | Migrated |
| Toast | [`design/overlays/toast.md`](design/overlays/toast.md) | Shadcn-Svelte `Sonner` | Migrated |
| Helper tooltip | [`design/overlays/helper-tooltip.md`](design/overlays/helper-tooltip.md) | Shadcn-Svelte `Tooltip` or `Hover Card` | Migrated |
| Main view layouts | [`design/layouts/main-view.md`](design/layouts/main-view.md) | Page layout composition | Migrated |
| Application settings page | [`design/pages/settings-page.md`](design/pages/settings-page.md) | Settings page composition with Shadcn-Svelte `Button`, `Input`, `FormField`, `Select`, `Switch`, `Badge`, `Callout` | Migrated |
| Full application page | [`design/pages/full-application-page.md`](design/pages/full-application-page.md) | Full viewport app shell with Sidebar Navbar + main content | Migrated |
| Sidebar / navbar | [`design/navigation/sidebar-navbar.md`](design/navigation/sidebar-navbar.md) | Shadcn-Svelte `Sidebar` + app layout | Migrated |
| Subsidebar | [`design/navigation/subsidebar.md`](design/navigation/subsidebar.md) | Secondary vertical resource navigation | Migrated |
| Tabs | [`design/navigation/tabs.md`](design/navigation/tabs.md) | Shadcn-Svelte `Tabs` | Migrated |
| Breadcrumbs | [`design/navigation/breadcrumbs.md`](design/navigation/breadcrumbs.md) | Shadcn-Svelte `Breadcrumb` | Migrated |
| External link | [`design/navigation/external-link.md`](design/navigation/external-link.md) | Anchor + icon composition | Migrated |
| Internal link | [`design/navigation/internal-link.md`](design/navigation/internal-link.md) | Anchor + icon composition | Migrated |
| Banner | [`design/navigation/banner.md`](design/navigation/banner.md) | Custom banner composition | Migrated |
| Loading spinner | [`design/feedback/loading-spinner.md`](design/feedback/loading-spinner.md) | Shadcn-Svelte `Spinner` | Migrated |
| Loading on button | [`design/feedback/loading-on-button.md`](design/feedback/loading-on-button.md) | Shadcn-Svelte `Spinner` inside `Button` | Migrated |
| Page loading | [`design/feedback/page-loading.md`](design/feedback/page-loading.md) | Custom overlay + `Spinner` | Migrated |
| Highlighted text / required asterisk | [`design/text/highlighted-text.md`](design/text/highlighted-text.md) | Text utility/composition | Migrated |
| Keyboard hint | [`design/text/kbd.md`](design/text/kbd.md) | Shadcn-Svelte `Kbd` | Migrated |
| Scrollbar | [`design/utilities/scrollbar.md`](design/utilities/scrollbar.md) | CSS utility | Migrated |
| Table | [`design/data/table.md`](design/data/table.md) | Shadcn-Svelte `Table` or `Data Table` | Migrated |
| Dropdown | [`design/forms/dropdown.md`](design/forms/dropdown.md) | Shadcn-Svelte `Dropdown Menu` | Migrated |
| Searchable dropdown | [`design/forms/searchable-dropdown.md`](design/forms/searchable-dropdown.md) | Shadcn-Svelte `Command` + `Popover` / Combobox | Migrated |
| Form composition / validation | [`design/forms/form-composition.md`](design/forms/form-composition.md) | FormField + inputs + validation | Migrated |
| TOTP / one-time token challenge | [`design/auth/totp-challenge.md`](design/auth/totp-challenge.md) | Shadcn-Svelte `Button` + `Input` + local OTP composition | Migrated |
| Login page | [`design/auth/login-page.md`](design/auth/login-page.md) | Auth page composition with Shadcn-Svelte `Button`, `Input`, `FormField` | Migrated |
| Register page | [`design/auth/register-page.md`](design/auth/register-page.md) | Auth page composition with Shadcn-Svelte `Button`, `Input`, `FormField` | Migrated |
| Forgot password page | [`design/auth/forgot-password-page.md`](design/auth/forgot-password-page.md) | Auth page composition with Shadcn-Svelte `Button`, `Input`, `FormField` | Migrated |
| Reset password page | [`design/auth/reset-password-page.md`](design/auth/reset-password-page.md) | Auth page composition with Shadcn-Svelte `Button`, `PasswordInput`, `FormField` | Migrated |
| Confirm password page | [`design/auth/confirm-password-page.md`](design/auth/confirm-password-page.md) | Auth page composition with Shadcn-Svelte `Button`, `PasswordInput`, `FormField` | Migrated |
| Email verification page | [`design/auth/email-verification-page.md`](design/auth/email-verification-page.md) | Auth page composition with Shadcn-Svelte `Button` | Migrated |
| Command palette / global search | [`design/search/command-palette.md`](design/search/command-palette.md) | Shadcn-Svelte `Command` + `Dialog` | Migrated |
| Tooltip variants | [`design/overlays/tooltip.md`](design/overlays/tooltip.md) | Shadcn-Svelte `Tooltip` | Migrated |

## Migration rules

- Migrate one component at a time.
- Start from the closest Shadcn-Svelte primitive and document which primitive is extended.
- Prefer Shadcn-Svelte props/variants/composition over global CSS selectors or raw boolean attributes.
- Keep Coolify-specific decisions as tokens/variant overrides on top of the primitive.
- Put improvement ideas in each component file under `Claude improvement notes`.
- Do not treat improvement notes as approved implementation changes.

## Component file template

Each migrated component should follow the Google DESIGN.md format:

```md
---
version: alpha
name: Component Name
description: Short implementation-independent description.
colors:
  primary: "#..."
typography:
  label-md:
    fontFamily: "..."
    fontSize: 0.875rem
rounded:
  sm: 0.25rem
spacing:
  component-height: 2rem
components:
  component-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
---

# Component Name

## Overview
## Colors
## Typography
## Layout
## Elevation & Depth
## Shapes
## Components
## Do's and Don'ts

## Implementation Notes
## Review Checklist
## Claude Improvement Notes
## Source References
```

The first eight `##` sections are the canonical DESIGN.md order. Extra sections after them are allowed for implementation and review notes.
