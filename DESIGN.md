# Coolify Design System

This file is the entry point for the split design system. Component details
live in `design/` as one Markdown file per component. The specs are
**framework-agnostic** — the same `design/<category>/<component>.md` drives
both the Svelte and React mockups; only the base primitive column changes.

This design system is framework-forward for upcoming projects:

- **Svelte stack** → use **shadcn-svelte primitives as the implementation
  base**, then extend with Coolify visual decisions.
- **React stack** → use **shadcn/ui (Radix + `tailwind-variants`) as the
  implementation base**, then extend with the same Coolify visual decisions.

Component files follow the **Google DESIGN.md specification**: YAML
frontmatter tokens plus canonical markdown sections (`Overview`, `Colors`,
`Typography`, `Layout`, `Elevation & Depth`, `Shapes`, `Components`, `Do's
and Don'ts`). Do not copy Laravel, Blade, Livewire, or project-specific
implementation details into component specs.

Shared global tokens live in [`design/tokens.md`](design/tokens.md).
Component-local frontmatter may repeat the subset needed for lint/export,
but it must not contradict the global tokens.

Use this file as a router:

1. Identify the UI need.
2. Read [`design/tokens.md`](design/tokens.md) and the latest entries in
   [`design/CHANGELOG.md`](design/CHANGELOG.md).
3. Open the matching component/page file from the lookup table or
   [`design/manifest.json`](design/manifest.json).
4. Start from the **shadcn-svelte** (Svelte stack) or **shadcn/ui** (React
   stack) primitive named in that file.
5. Apply the Coolify tokens, variants, states, accessibility notes, and
   [`design/REVIEW_CHECKLIST.md`](design/REVIEW_CHECKLIST.md).
6. If a component has not been migrated yet, do not infer detailed styling;
   wait for that component spec or use only the already-migrated design
   guidance.

## AI Design Compliance Contract

Agents must treat the local files as the source of truth, not model memory
or older copied snippets.

Before any UI implementation, design-doc edit, or mockup update:

1. Read this file.
2. Read `design/tokens.md`.
3. Read the latest relevant entries in `design/CHANGELOG.md`.
4. Use `design/manifest.json` to locate relevant migrated component/page
   specs and mock routes.
5. Read every relevant component/page spec before changing UI code.
6. If a needed spec is pending or missing, keep styling minimal and
   explicitly say the detailed spec is missing instead of inventing a new
   component language.

After any UI implementation or design-doc edit:

1. Check the work against `design/REVIEW_CHECKLIST.md`.
2. Regenerate `design/manifest.json` when the lookup table, paths,
   statuses, or mock routes change.
3. Update `design/CHANGELOG.md` with the design change and the required
   future agent action.
4. Update or add mockup examples/screenshots when visual behavior changes.
5. In the final response, report which design files were read and which
   validation/review commands ran.

## Token mapping (shadcn → Coolify)

Both stacks map shadcn semantic tokens onto the Coolify palette in their
respective `src/app.css`. Component specs reference Coolify tokens by name
(e.g. `bg-coollabs`, `text-warning`); primitives implement them via the
semantic token alias layer so `bg-primary`, `text-foreground`, `ring-ring`,
etc. compose correctly.

| Coolify intent | shadcn token | Coolify palette source |
|---|---|---|
| App page background | `--background` / `bg-background` | `gray-50` light, `app-base` dark |
| App foreground text | `--foreground` / `text-foreground` | `black` light, `white` dark |
| Card / panel surface | `--card` / `bg-card` | `white` light, `coolgray-100` dark |
| Floating overlay surface | `--popover` / `bg-popover` | `white` light, `coolgray-100` dark |
| Accent (focus rings, link text, dirty bar) | `--ring` / `ring-ring`, `--primary` / `text-primary` | `coollabs` light, `warning` dark (swap encoded by `.dark`) |
| Brand action background (e.g. `highlighted` button) | raw `coollabs` palette | `coollabs` in **both** modes; do not use `--primary` |
| Muted surface (hovers, dividers) | `--muted` / `bg-muted` | `neutral-100` light, `coolgray-200` dark |
| Input ring color | `--input` / via inset shadow `var(--input)` | `neutral-200` light, `coolgray-300` dark |
| Border | `--border` / `border-border` | `neutral-200` light, `coolgray-200` dark |
| Destructive | `--destructive` / `bg-destructive`, `text-destructive` | `error` (red-600) both modes |
| Sharp 4px radius | `--radius: 0.25rem` → `rounded-sm` | Coolify spec mandates 4px |

Semantic palette (success green, warning yellow, destructive red) stays
**raw** when it signals real status (alerts, banners, status indicators,
warning info boxes). Tokenizing those to `--primary` would lose the status
meaning.

## Design Update Protocol

When changing an existing component spec, update these together:

- the component file under `design/`,
- this lookup table when status/path/need/base primitive changes,
- `design/CHANGELOG.md`,
- `design/manifest.json` via `bun run design:manifest`,
- matching mockup route(s) under **both** `mockups/shadcn-svelte-sample/`
  and `mockups/shadcn-react-sample/` when the change is visual,
- relevant prompts under `prompts/` when the workflow changes.

When adding a new component spec:

1. Create one `design/<category>/<component>.md` file using the Google
   DESIGN.md section order.
2. Add it to the lookup table.
3. Regenerate `design/manifest.json`.
4. Add or update a mockup route in **both** stacks (or document in the
   changelog why only one).
5. Add a changelog entry that tells future agents exactly how to apply the
   new spec.

## Component lookup

The base primitive columns name the registry slug each stack uses. Svelte:
`bunx shadcn-svelte@latest add <slug>`. React: `bunx shadcn@latest add
<slug>`. For Coolify-bespoke composites the base primitive is a composition
of the listed primitives layered with the Coolify spec.

| Need | Use | Svelte base (shadcn-svelte) | React base (shadcn/ui) | Status |
|---|---|---|---|---|
| Action button, submit button, destructive button, highlighted button | [`design/forms/button.md`](design/forms/button.md) | `button` | `button` | Migrated |
| Text input | [`design/forms/input.md`](design/forms/input.md) | `input` | `input` | Migrated |
| Form label, required marker, helper icon, field description/error | [`design/forms/form-field.md`](design/forms/form-field.md) | `label` + `tooltip` composition | `label` + Radix `Tooltip` composition | Migrated |
| Select | [`design/forms/select.md`](design/forms/select.md) | `select` or native `<select>` wrapper | `select` or native `<select>` wrapper | Migrated |
| Checkbox | [`design/forms/checkbox.md`](design/forms/checkbox.md) | `checkbox` | `checkbox` (Radix) | Migrated |
| Textarea | [`design/forms/textarea.md`](design/forms/textarea.md) | `textarea` | `textarea` | Migrated |
| Copy button | [`design/forms/copy-button.md`](design/forms/copy-button.md) | `button` + `input` composition | `button` + `input` composition | Migrated |
| Radio group | [`design/forms/radio-group.md`](design/forms/radio-group.md) | `radio-group` | `radio-group` (Radix) | Migrated |
| Switch | [`design/forms/switch.md`](design/forms/switch.md) | `switch` | `switch` (Radix) | Migrated |
| Card, panel, operational surface | [`design/containers/card.md`](design/containers/card.md) | `card` | `card` | Migrated |
| Box/card link | `design/containers/box.md` | `card` or custom wrapper | `card` or custom anchor wrapper | Pending |
| Coolbox/card with ring hover | [`design/containers/coolbox.md`](design/containers/coolbox.md) | `card` or anchor/button wrapper | `card` or anchor/button wrapper | Migrated |
| Badge | [`design/status/badge.md`](design/status/badge.md) | `badge` | `badge` | Migrated |
| Status indicator | [`design/status/status-indicator.md`](design/status/status-indicator.md) | Dot + text composition | Dot + text composition | Migrated |
| Deprecated badge | [`design/status/deprecated-badge.md`](design/status/deprecated-badge.md) | `badge` variant | `badge` variant | Migrated |
| Tag | [`design/status/tag.md`](design/status/tag.md) | `badge` or custom tag | `badge` or custom tag | Migrated |
| Alert / inline callout | [`design/overlays/alert.md`](design/overlays/alert.md) | `alert` | `alert` | Migrated |
| Callout | [`design/overlays/callout.md`](design/overlays/callout.md) | `alert` variant | `alert` variant | Migrated |
| Modal / dialog | [`design/overlays/modal.md`](design/overlays/modal.md) | `dialog` | `dialog` (Radix) | Migrated |
| Destructive modal confirmation | [`design/overlays/modal-confirmation.md`](design/overlays/modal-confirmation.md) | `alert-dialog` or `dialog` | `alert-dialog` or `dialog` | Migrated |
| Confirm modal | [`design/overlays/confirm-modal.md`](design/overlays/confirm-modal.md) | `alert-dialog` | `alert-dialog` | Migrated |
| Popup / popup small | [`design/overlays/popup.md`](design/overlays/popup.md) | `popover` / `dialog` | `popover` / `dialog` | Migrated |
| Slide-over | [`design/overlays/slide-over.md`](design/overlays/slide-over.md) | `sheet` | `sheet` (Radix Dialog w/ side anim) | Migrated |
| Toast | [`design/overlays/toast.md`](design/overlays/toast.md) | `sonner` | `sonner` | Migrated |
| Helper tooltip | [`design/overlays/helper-tooltip.md`](design/overlays/helper-tooltip.md) | `tooltip` or `hover-card` | `tooltip` (Radix) | Migrated |
| Main view layouts | [`design/layouts/main-view.md`](design/layouts/main-view.md) | Page layout composition | Page layout composition | Migrated |
| Application settings page | [`design/pages/settings-page.md`](design/pages/settings-page.md) | Settings composition with `button`, `input`, FormField, `select`, `switch`, `badge`, callout | Same composition (React primitives) | Migrated |
| Full application page | [`design/pages/full-application-page.md`](design/pages/full-application-page.md) | Full viewport app shell with Sidebar Navbar + main content | Same shell (React primitives) | Migrated |
| Sidebar / navbar | [`design/navigation/sidebar-navbar.md`](design/navigation/sidebar-navbar.md) | `sidebar` + app layout | Custom composition (uses `useSidebar`/`useCommandPalette`/`useAppearance` hooks) | Migrated |
| Subsidebar | [`design/navigation/subsidebar.md`](design/navigation/subsidebar.md) | Secondary vertical resource navigation | Secondary vertical resource navigation | Migrated |
| Tabs | [`design/navigation/tabs.md`](design/navigation/tabs.md) | `tabs` | `tabs` (Radix) | Migrated |
| Breadcrumbs | [`design/navigation/breadcrumbs.md`](design/navigation/breadcrumbs.md) | `breadcrumb` | `breadcrumb` | Migrated |
| External link | [`design/navigation/external-link.md`](design/navigation/external-link.md) | Anchor + icon composition | Anchor + lucide icon composition | Migrated |
| Internal link | [`design/navigation/internal-link.md`](design/navigation/internal-link.md) | SvelteKit `<a>` + Coolify accent | TanStack Router `<Link>` + Coolify accent | Migrated |
| Banner | [`design/navigation/banner.md`](design/navigation/banner.md) | Custom banner composition | Custom banner composition | Migrated |
| Loading spinner | [`design/feedback/loading-spinner.md`](design/feedback/loading-spinner.md) | `spinner` | Lucide `Loader2` + animate-spin | Migrated |
| Loading on button | [`design/feedback/loading-on-button.md`](design/feedback/loading-on-button.md) | `spinner` inside `button` | Spinner inside `button` | Migrated |
| Page loading | [`design/feedback/page-loading.md`](design/feedback/page-loading.md) | Custom overlay + `spinner` | Spinner + `skeleton` | Migrated |
| Highlighted text / required asterisk | [`design/text/highlighted-text.md`](design/text/highlighted-text.md) | Text utility/composition | Text utility/composition | Migrated |
| Keyboard hint | [`design/text/kbd.md`](design/text/kbd.md) | `kbd` | `<kbd>` + Tailwind utilities | Migrated |
| Scrollbar | [`design/utilities/scrollbar.md`](design/utilities/scrollbar.md) | CSS utility | CSS utility (`::-webkit-scrollbar-*`) | Migrated |
| Table | [`design/data/table.md`](design/data/table.md) | `table` or data-table | `table` | Migrated |
| Dropdown | [`design/forms/dropdown.md`](design/forms/dropdown.md) | `dropdown-menu` | `dropdown-menu` (Radix) | Migrated |
| Searchable dropdown | [`design/forms/searchable-dropdown.md`](design/forms/searchable-dropdown.md) | `command` + `popover` / combobox | `command` + `popover` (cmdk combobox) | Migrated |
| Form composition / validation | [`design/forms/form-composition.md`](design/forms/form-composition.md) | FormField + inputs + validation | FormField + inputs + validation (optional `react-hook-form` + `zod`) | Migrated |
| TOTP / one-time token challenge | [`design/auth/totp-challenge.md`](design/auth/totp-challenge.md) | `button` + `input` + local OTP composition | Local OTP composition using `input` ring pattern | Migrated |
| Login page | [`design/auth/login-page.md`](design/auth/login-page.md) | Auth composition with `button`, `input`, FormField | Auth composition with `button`, `input`, FormField, AuthShell | Migrated |
| Register page | [`design/auth/register-page.md`](design/auth/register-page.md) | Auth composition with `button`, `input`, FormField | Same (React primitives) | Migrated |
| Forgot password page | [`design/auth/forgot-password-page.md`](design/auth/forgot-password-page.md) | Auth composition with `button`, `input`, FormField | Same (React primitives) | Migrated |
| Reset password page | [`design/auth/reset-password-page.md`](design/auth/reset-password-page.md) | Auth composition with `button`, `PasswordInput`, FormField | Same (React primitives) | Migrated |
| Confirm password page | [`design/auth/confirm-password-page.md`](design/auth/confirm-password-page.md) | Auth composition with `button`, `PasswordInput`, FormField | Same (React primitives) | Migrated |
| Email verification page | [`design/auth/email-verification-page.md`](design/auth/email-verification-page.md) | Auth composition with `button` | Same (React primitives) | Migrated |
| Command palette / global search | [`design/search/command-palette.md`](design/search/command-palette.md) | `command` + `dialog` | `command` + `dialog` (cmdk) | Migrated |
| Tooltip variants | [`design/overlays/tooltip.md`](design/overlays/tooltip.md) | `tooltip` | `tooltip` (Radix) | Migrated |

## Migration rules

- Migrate one component at a time, per stack.
- Start from the closest shadcn primitive (`bunx shadcn-svelte@latest add
  <slug>` or `bunx shadcn@latest add <slug>`) and document which primitive
  is extended.
- Prefer shadcn props/variants/composition over global CSS selectors or raw
  boolean attributes. Both stacks use `tailwind-variants` (`tv`) for
  variant maps.
- Keep Coolify-specific decisions as tokens/variant overrides on top of the
  primitive. Examples: inset-shadow ring on inputs (use `var(--input)` for
  ring color + `var(--ring)` for dirty/focus bar), sharp 4px radii
  (`rounded-sm`), brand accent swap (`text-primary` auto-swaps, but the
  brand action button background stays raw `coollabs` purple in both modes).
- Put `data-slot="<name>"` on every primitive root — shadcn convention.
- Light/dark `dark:` siblings come off once a semantic token encodes the
  swap. Keep `dark:` only where the swap is asymmetric.
- Put improvement ideas in each component file under `Claude improvement
  notes`. Improvement notes are not approved implementation changes.
- When fixing a visual bug, fix it in both stacks unless the changelog
  records an intentional divergence.

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

The first eight `##` sections are the canonical DESIGN.md order. Extra
sections after them are allowed for implementation and review notes.
