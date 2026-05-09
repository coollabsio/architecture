# coollabs architecture decisions

Stack-by-stack reference for the libraries, patterns, and gotchas we use
when building self-hostable products at [coollabs](https://coollabs.io).

> Before relying on this repository, fetch/pull the latest changes from GitHub locally so you are always working from up-to-date data.

Each file documents **one stack** end-to-end: library picks with one-line
rationale, the gotchas that actually bit us, hard rules to grep monthly,
and a fresh-project bootstrap checklist.

Designed to be lifted into a new repo as a starter doc — copy the file,
swap the project name, prune what doesn't apply.

## Stacks

| File | When to use |
|---|---|
| [`RUST_WEB_APP_SERVICES.md`](./RUST_WEB_APP_SERVICES.md) | Rust web app services: single-binary Rust backend + embedded SvelteKit + shadcn-svelte SPA. SQLite by default, S3 / Postgres swappable via traits. |

More stacks land here as we ship them (Node, PHP/Laravel, Go, Bun, etc.).
Each gets its own file.

## Design

| File | Scope |
|---|---|
| [`DESIGN.md`](./DESIGN.md) | Coolify design system. Tokens, components, AI review checklist. Tailwind v4 / Laravel + Livewire. |

Signature traits worth knowing before reading:

- **Purple/yellow accent swap** — `coollabs #6b16ed` (light) / `warning #fcd452` (dark). Never purple in dark.
- **Inset box-shadow inputs** with 4px left "dirty bar" wired via `wire:dirty.class` — focus + modified state in one indicator.
- **Sharp 4px radii** everywhere except callouts (8px) and pills (full). No mixed radii per view.

### Validating DESIGN.md

`DESIGN.md` follows the [google-labs-code/design.md](https://github.com/google-labs-code/design.md) spec — YAML frontmatter for machine-readable tokens, Markdown body for rationale. Lint and export with the spec's CLI ([`@google/design.md`](https://www.npmjs.com/package/@google/design.md), exposes `design.md` / `designmd`):

```bash
bunx @google/design.md lint DESIGN.md
bunx @google/design.md export DESIGN.md --format tailwind > theme.json
bunx @google/design.md export DESIGN.md --format dtcg     > tokens.json
```

Use `bunx` — `npx` chokes on the `.md` suffix in the package name. Spec is alpha; confirm flags via `bunx @google/design.md --help` before wiring into CI.

## Conventions for new entries

- One file per stack. Cross-stack patterns live in their own doc, not
  duplicated.
- Lead with the **picks table** (library + one-line why), then **gotchas**,
  then **hard rules**, then a **bootstrap checklist**.
- Cite versions when behavior is version-dependent (e.g. SQLite < 3.35
  cannot `DROP COLUMN`).
- Update when reality drifts. Stale advice is worse than no advice.

## License

The text in this repo is licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Copy, adapt, redistribute — attribution to coollabs appreciated.
