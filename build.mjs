import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

let readme = "Empty project.";
try {
  readme = readFileSync(new URL("./README.md", import.meta.url), "utf8");
} catch {}

const escaped = readme.replace(/[<&]/g, (c) => (c === "<" ? "&lt;" : "&amp;"));
mkdirSync(new URL("./dist/", import.meta.url), { recursive: true });
writeFileSync(
  new URL("./dist/index.html", import.meta.url),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Blank project</title><meta name="description" content="A blank starter workspace, ready for a GitHub repository sync."></head><body><pre>${escaped}</pre></body></html>`
);
console.log("Built dist/index.html");
