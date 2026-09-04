import { createServer } from "node:http";
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const portIndex = args.indexOf("--port");
const port = Number(portIndex !== -1 ? args[portIndex + 1] : 8080);

let readme = "";
try {
  readme = readFileSync(new URL("./README.md", import.meta.url), "utf8");
} catch {
  readme = "Empty project.";
}

createServer((_req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Blank project</title></head><body><pre>${readme.replace(/[<&]/g, (c) => (c === "<" ? "&lt;" : "&amp;"))}</pre></body></html>`
  );
}).listen(port, "0.0.0.0", () => {
  console.log(`Listening on http://localhost:${port}`);
});
