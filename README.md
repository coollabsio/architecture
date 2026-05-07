# coollabs architecture decisions

Stack-by-stack reference for the libraries, patterns, and gotchas we use
when building self-hostable products at [coollabs](https://coollabs.io).

Each file documents **one stack** end-to-end: library picks with one-line
rationale, the gotchas that actually bit us, hard rules to grep monthly,
and a fresh-project bootstrap checklist.

Designed to be lifted into a new repo as a starter doc — copy the file,
swap the project name, prune what doesn't apply.

## Stacks

| File | When to use |
|---|---|
| [`rust.md`](./rust.md) | Single-binary backend in Rust + embedded SvelteKit + shadcn-svelte SPA. SQLite by default, S3 / Postgres swappable via traits. |

More stacks land here as we ship them (Node, PHP/Laravel, Go, Bun, etc.).
Each gets its own file.

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
