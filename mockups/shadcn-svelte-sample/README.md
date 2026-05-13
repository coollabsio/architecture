# Coolify Shadcn-Svelte component samples

Component sample sandbox generated from `DESIGN.md` and migrated component docs under `design/`.

## Design update workflow

This mockup is a visual verification target, not the source of truth. If a design doc and a mockup disagree, fix the mockup or the doc explicitly; do not let agents infer a third style.

When design behavior changes:

1. Read root `DESIGN.md`, `design/tokens.md`, `design/CHANGELOG.md`, and `design/manifest.json`.
2. Update the matching route listed in `design/manifest.json`.
3. Keep `src/lib/component-registry.ts` aligned with `DESIGN.md` and regenerate `design/manifest.json` from the repo root with:

   ```bash
   scripts/generate-design-manifest.py
   ```

4. Capture/review light and dark screenshots for affected routes.
5. Add a `design/CHANGELOG.md` entry with the future agent action.

Do not maintain separate hard-coded component status lists in prompts. Use `design/manifest.json` as the agent-readable registry.

Run:

```bash
bun install
bun dev
```

Build static files:

```bash
bun run build
```

Deploy the generated `build/` directory to any static host.

If Bun cannot write to its global cache/temp directory in a sandboxed environment, keep using Bun and pass a local cache directory:

```bash
bun install --cache-dir .bun-cache
```

If you see an error that mentions `node_modules/.pnpm` or a missing SvelteKit virtual module like `$app/environment`, the install tree is stale or came from another package manager. Reset it with Bun only:

```bash
bun run reinstall
bun dev
```

Use the top-right component selector to switch between component pages.

Implemented pages:

- `/components/buttons` — default, highlighted, destructive, loading, icon-only, link-styled, and disabled button states.
- `/components/dropdown` — compact Shadcn-style dropdown content, default/touch/disabled/danger items, and dark hover behavior.
- `/components/searchable-dropdown` — combobox-style searchable dropdown for longer option lists.
- `/components/input` — inset shadow border, focus/dirty left bar, disabled/readonly, password spacing, sticky variant, and form label helper icon composition.

- `/components/select` — native select wrapper with inset shadow, dirty state, disabled state, and stacked up/down chevron.
- `/components/textarea` — mono textarea with inset shadow, dirty state, disabled/readonly, and optional Tab insertion.
- `/components/checkbox` — checkbox primitive and right-aligned row composition with wrapping labels and focus rings.
- `/components/copy-button` — readonly input plus secure-context clipboard action and temporary copied state.
- `/components/radio-group` — compact single-choice rows with circular controls and inner-dot selected state.
- `/components/switch` — compact immediate on/off settings with small track/thumb.
- `/components/badge` — compact semantic labels and metadata badges.
- `/components/alert` — compact inline operational notices and errors.
- `/components/tabs` — dense section navigation with active/focus states.
- `/components/card` — compact operational surfaces with sharp borders.

- `/components/status-indicator` — dot plus text status composition with semantic colors.
- `/components/tag` — compact metadata/removable tags.
- `/components/deprecated-badge` — dedicated lifecycle badge variant.
- `/components/dialog` — general modal dialog.
- `/components/confirm-modal` — single-step confirmation modal.
- `/components/destructive-confirmation` — typed destructive confirmation modal.
- `/components/toast` — compact Sonner-style toast previews.
- `/components/loading-spinner` — standalone compact spinner states.
- `/components/loading-on-button` — Button plus Spinner loading composition.

- `/components/callout` — non-urgent contextual guidance blocks.
- `/components/helper-tooltip` — reusable info icon tooltip with fit-to-content width.
- `/components/breadcrumbs` — compact hierarchy navigation.
- `/components/external-link` — external anchor with icon and new-tab attrs.
- `/components/internal-link` — in-app anchor link styling.
- `/components/kbd` — compact keyboard shortcut hints.

- `/components/sidebar-navbar` — dense app shell sidebar, collapsed mode, search, and page subnav.
- `/components/subsidebar` — secondary vertical resource navigation.

- `/components/table` — dense resource table with row hover, badges, and actions.
- `/components/slide-over` — side sheet overlay.
- `/components/popover` — compact anchored popup.
- `/components/page-loading` — skeleton and page loading states.
- `/components/banner` — page-level notice banners.
- `/components/scrollbar` — compact scroll container treatment.
- `/components/highlighted-text` — inline highlight and required asterisk.
- `/components/command-palette` — global search and command overlay.
- `/components/tooltip` — action and helper tooltip variants.
- `/components/form-composition` — validation, required markers, dirty state, save action.
- `/components/main-view` — Coolify resource grid and split master-detail page layouts.
