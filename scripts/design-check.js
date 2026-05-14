#!/usr/bin/env bun

import { readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = resolve(import.meta.dir, "..");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: "inherit",
    ...options,
  });

  if (result.error?.code === "ENOENT") {
    return { missing: true, status: 127 };
  }

  return { missing: false, status: result.status ?? 1 };
}

function commandExists(command) {
  const result = spawnSync("command", ["-v", command], {
    shell: true,
    stdio: "ignore",
  });
  return result.status === 0;
}

function findMarkdownFiles(dir) {
  const files = [];

  for (const entry of readdirSync(dir)) {
    const path = resolve(dir, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      files.push(...findMarkdownFiles(path));
    } else if (stats.isFile() && path.endsWith(".md")) {
      files.push(path);
    }
  }

  return files;
}

let result = run("bun", ["scripts/generate-design-manifest.js"]);
if (result.status !== 0) {
  process.exit(result.status);
}

let lintCommand;
let lintArgs;

if (commandExists("bunx")) {
  lintCommand = "bunx";
  lintArgs = ["@google/design.md", "lint"];
} else if (commandExists("npx")) {
  console.error(
    "warning: README recommends bunx because npx can mis-handle @google/design.md",
  );
  lintCommand = "npx";
  lintArgs = ["@google/design.md", "lint"];
} else {
  console.error("error: need bunx or npx to run @google/design.md lint");
  process.exit(1);
}

const designDir = resolve(ROOT, "design");
const files = findMarkdownFiles(designDir)
  .map((file) => file.replace(`${ROOT}/`, ""))
  .sort();

for (const file of files) {
  console.log(`design lint: ${file}`);
  result = run(lintCommand, [...lintArgs, file]);

  if (result.status !== 0) {
    process.exit(result.status);
  }
}
