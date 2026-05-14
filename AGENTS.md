Lets use https://github.com/google-labs-code/design.md for all components specification.
On every change, we should check if we align with the spec.

## UI / Design workflow

Before any UI implementation, design-doc edit, or mockup update:

1. Read `DESIGN.md`.
2. Read `design/tokens.md`.
3. Read the latest relevant entries in `design/CHANGELOG.md`.
4. Use `design/manifest.json` to locate the relevant component/page specs and mock routes.
5. Read every relevant migrated spec before changing UI code.
6. If a needed spec is pending or missing, do not invent detailed styling; keep markup minimal and call out the missing spec.

After any UI/design change:

1. Check the work against `design/REVIEW_CHECKLIST.md`.
2. Regenerate `design/manifest.json` with `bun run design:manifest` if the lookup table, paths, statuses, or mock routes changed.
3. Update `design/CHANGELOG.md` with the design change and future agent action.
4. Update matching mockups/screenshots when visual behavior changes.
5. Report the design files read and validation commands run in the final response.
