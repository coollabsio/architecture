#!/usr/bin/env bun

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = resolve(dirname(__filename), "..");
const DESIGN = resolve(ROOT, "DESIGN.md");
const REGISTRY = resolve(
  ROOT,
  "mockups/shadcn-react-sample/src/lib/component-registry.ts",
);
const MANIFEST = resolve(ROOT, "design/manifest.json");

function fileStem(path) {
  return path.split("/").pop().replace(/\.md$/, "");
}

function parseLookup() {
  const rows = [];
  const lines = readFileSync(DESIGN, "utf8").split(/\r?\n/);

  for (const line of lines) {
    if (!line.startsWith("|") || line.startsWith("|---") || line.startsWith("| Need")) {
      continue;
    }

    const cells = line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

    if (cells.length !== 4) {
      continue;
    }

    const [need, use, base, status] = cells;
    const linked = use.match(/\[`?([^`\]]+)`?\]\(([^)]+)\)/);
    let label;
    let designDoc;

    if (linked) {
      label = linked[1];
      designDoc = linked[2];
    } else {
      const inline = use.match(/`([^`]+)`/);
      label = inline ? inline[1] : use;
      designDoc = label.endsWith(".md") ? label : null;
    }

    if (!designDoc) {
      continue;
    }

    rows.push({
      key: fileStem(designDoc).replaceAll("-", "_"),
      need,
      label,
      designDoc,
      basePrimitive: base.replaceAll("`", ""),
      status,
    });
  }

  return rows;
}

function parseMockRoutes() {
  if (!existsSync(REGISTRY)) {
    return {};
  }

  const text = readFileSync(REGISTRY, "utf8");
  const blocks = text.matchAll(
    /\{\s*label: "([^"]+)",\s*slug: "([^"]+)",\s*href: "([^"]+)",\s*designDoc: "([^"]+)",\s*status: "([^"]+)"\s*\}/gs,
  );
  const routes = {};

  for (const block of blocks) {
    const [, , slug, href, doc] = block;
    routes[doc] = { mockRoute: href, mockSlug: slug };
  }

  return routes;
}

function main() {
  const routes = parseMockRoutes();
  const components = parseLookup().map((row) => ({
    ...row,
    ...(routes[row.designDoc] ?? { mockRoute: null, mockSlug: null }),
  }));

  writeFileSync(
    MANIFEST,
    `${JSON.stringify(
      {
        schemaVersion: 1,
        source: "DESIGN.md component lookup",
        generatedBy: "scripts/generate-design-manifest.js",
        components,
      },
      null,
      2,
    )}\n`,
  );

  console.log(`wrote ${relative(ROOT, MANIFEST)} with ${components.length} components`);
}

main();
