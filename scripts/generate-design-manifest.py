#!/usr/bin/env python3
"""Generate design/manifest.json from DESIGN.md and mockup registry metadata."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DESIGN = ROOT / "DESIGN.md"
REGISTRY = ROOT / "mockups/shadcn-svelte-sample/src/lib/component-registry.ts"
MANIFEST = ROOT / "design/manifest.json"


def parse_lookup() -> list[dict[str, object]]:
    rows: list[dict[str, object]] = []
    for line in DESIGN.read_text().splitlines():
        if not line.startswith("|") or line.startswith("|---") or line.startswith("| Need"):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) != 4:
            continue
        need, use, base, status = cells
        linked = re.search(r"\[`?([^`\]]+)`?\]\(([^)]+)\)", use)
        if linked:
            label = linked.group(1)
            design_doc = linked.group(2)
        else:
            inline = re.search(r"`([^`]+)`", use)
            label = inline.group(1) if inline else use
            design_doc = label if label.endswith(".md") else None
        if not design_doc:
            continue
        rows.append(
            {
                "key": Path(design_doc).stem.replace("-", "_"),
                "need": need,
                "label": label,
                "designDoc": design_doc,
                "basePrimitive": base.replace("`", ""),
                "status": status,
            }
        )
    return rows


def parse_mock_routes() -> dict[str, dict[str, str]]:
    if not REGISTRY.exists():
        return {}
    text = REGISTRY.read_text()
    blocks = re.findall(
        r'\{\s*label: "([^"]+)",\s*slug: "([^"]+)",\s*href: "([^"]+)",\s*designDoc: "([^"]+)",\s*status: "([^"]+)"\s*\}',
        text,
        re.S,
    )
    return {doc: {"mockRoute": href, "mockSlug": slug} for _label, slug, href, doc, _status in blocks}


def main() -> None:
    routes = parse_mock_routes()
    components = []
    for row in parse_lookup():
        route = routes.get(str(row["designDoc"]), {"mockRoute": None, "mockSlug": None})
        components.append({**row, **route})
    MANIFEST.write_text(
        json.dumps(
            {
                "schemaVersion": 1,
                "source": "DESIGN.md component lookup",
                "generatedBy": "scripts/generate-design-manifest.py",
                "components": components,
            },
            indent=2,
        )
        + "\n"
    )
    print(f"wrote {MANIFEST.relative_to(ROOT)} with {len(components)} components")


if __name__ == "__main__":
    main()
