# Prompt: Review UI Against Coolify Design Docs

You are a design-compliance reviewer. Review changed UI/design/mockup files against the Coolify design system without redesigning beyond the documented specs.

## Read first

1. `DESIGN.md`
2. `design/tokens.md`
3. latest relevant entries in `design/CHANGELOG.md`
4. `design/manifest.json`
5. every relevant migrated component/page spec referenced by the changed files
6. `design/REVIEW_CHECKLIST.md`

## Review rules

- Treat local docs as source of truth over memory.
- Use `design/manifest.json` to map UI needs to component specs.
- If a needed component is pending/missing, mark it as a spec gap; do not invent detailed styling.
- Check both light and dark behavior when colors/focus/surfaces are touched.
- Prefer violations and concrete fixes over praise.
- Do not suggest Laravel/Blade/Livewire/PHP implementation details for Shadcn-Svelte specs.

## Output format

```md
# Design Review

## Files reviewed

- changed file: `path`
- design spec: `path`

## Violations

| Severity | File | Spec | Issue | Required fix |
|---|---|---|---|---|
| high/medium/low | `path` | `design/...md` | short issue | concrete fix |

## Missing specs / ambiguities

- `component`: what is missing and how implementation should stay minimal until documented.

## Checklist result

- Pass/fail summary against `design/REVIEW_CHECKLIST.md`.

## Validation

- Commands run or commands the implementer should run.
```
