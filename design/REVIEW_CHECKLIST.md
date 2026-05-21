# Design Review Checklist

Use this checklist after every UI/design implementation or design-doc update.

## Read order

- [ ] Read `DESIGN.md` router.
- [ ] Read `design/tokens.md` for shared tokens.
- [ ] Read latest entries in `design/CHANGELOG.md`.
- [ ] Read each relevant migrated component/page spec from `design/manifest.json`.
- [ ] If a needed component is pending/missing, avoid detailed invented styling.

## Implementation checks

- [ ] Starts from the documented shadcn/ui primitive or documented composition.
- [ ] Uses documented variants/states instead of raw one-off booleans/classes.
- [ ] Keeps default controls compact: `h-8`, `px-2`, `gap-2`, `text-sm` unless the spec says otherwise.
- [ ] Keeps default radius at 4px / `rounded-sm` unless the spec says otherwise.
- [ ] Uses Coolify purple for light focus/accent and warning yellow for dark focus/accent.
- [ ] Avoids undocumented gradients, soft shadows, decorative depth, and marketing-style spacing.
- [ ] Inputs/selects/textareas use inset shadow/dirty-bar rules rather than normal borders.
- [ ] Disabled/loading/read-only states remain readable in light and dark mode.
- [ ] Accessibility notes from the component spec are implemented.

## Design-doc update checks

- [ ] Component file follows Google DESIGN.md canonical sections.
- [ ] YAML frontmatter tokens are valid and match `design/tokens.md` where shared.
- [ ] `DESIGN.md` component lookup is updated if paths/statuses changed.
- [ ] `design/manifest.json` regenerated with `bun run design:manifest`.
- [ ] `design/CHANGELOG.md` has an agent-action entry.
- [ ] Mockup route and screenshots are updated when visual behavior changes.
- [ ] Prompts under `prompts/` use `prompts/shared-design-workflow.md` and derive components from the manifest.

## Final response requirement

When an agent changes UI or design docs, summarize:

- design files read,
- checklist result,
- validation commands run or why they were skipped,
- any unresolved design gaps.
