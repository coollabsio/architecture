#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

python3 scripts/generate-design-manifest.py

if command -v bun >/dev/null 2>&1; then
  lint_cmd=(bunx @google/design.md lint)
elif command -v npx >/dev/null 2>&1; then
  echo "warning: README recommends bunx because npx can mis-handle @google/design.md" >&2
  lint_cmd=(npx @google/design.md lint)
else
  echo "error: need bun or npx to run @google/design.md lint" >&2
  exit 1
fi

while IFS= read -r file; do
  echo "design lint: $file"
  "${lint_cmd[@]}" "$file"
done < <(find design -name '*.md' -type f | sort)
