# Coolify Design System V2

This file is the entry point for the split design system. Component details live in `design/` as one Markdown file per component.

V2 is framework-forward for upcoming projects: use **Shadcn-Svelte primitives as the implementation base**, then extend them with Coolify visual decisions where needed. Component files should follow the **Google DESIGN.md specification**: YAML frontmatter tokens plus canonical markdown sections (`Overview`, `Colors`, `Typography`, `Layout`, `Elevation & Depth`, `Shapes`, `Components`, `Do's and Don'ts`). Do not copy Laravel, Blade, Livewire, or project-specific implementation details into V2 component specs.

Use this file as a router:

1. Identify the UI need.
2. Open the matching component file.
3. Start from the Shadcn-Svelte primitive named in that file.
4. Apply the Coolify tokens, variants, states, accessibility notes, and review checklist.
5. If a component has not been migrated yet, do not infer detailed styling; wait for that component spec or use only the already-migrated V2 guidance.

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
| Scrollbar | [`design/chrome/scrollbar.md`](design/chrome/scrollbar.md) | CSS utility | Migrated |
| Table | [`design/data/table.md`](design/data/table.md) | Shadcn-Svelte `Table` or `Data Table` | Migrated |
| Dropdown | [`design/forms/dropdown.md`](design/forms/dropdown.md) | Shadcn-Svelte `Dropdown Menu` | Migrated |

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
