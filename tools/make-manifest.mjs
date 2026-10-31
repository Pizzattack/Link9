// Writes assets.json: the list of every file the offline package contains, with a short hash and the size.
// The game compares it with what is installed to offer "download for offline play" / "update available".
//   node tools/make-manifest.mjs [siteDir]      (default: the repository root; the GitHub workflow runs it on the built site)
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = path.resolve(process.argv[2] || root);
const INCLUDE = ["index.html", "manifest.webmanifest", "favicon.ico", "icons", "ui", "fonts", "abilities", "illustrations", "comics", "sounds"];
const files = {};
function add(rel) {
  const abs = path.join(site, rel), st = fs.statSync(abs);
  if (st.isDirectory()) { for (const n of fs.readdirSync(abs).sort()) if (!n.startsWith(".")) add(rel + "/" + n); return; }
  files[rel] = [crypto.createHash("sha1").update(fs.readFileSync(abs)).digest("hex").slice(0, 10), st.size];
}
for (const i of INCLUDE) if (fs.existsSync(path.join(site, i))) add(i);
const html = fs.existsSync(path.join(site, "index.html")) ? fs.readFileSync(path.join(site, "index.html"), "utf8") : "";
const build = +((/const BUILD_NUMBER = (\d+);/.exec(html) || [])[1] || 0);
const version = crypto.createHash("sha1").update(JSON.stringify(files)).digest("hex").slice(0, 10);
fs.writeFileSync(path.join(site, "assets.json"), JSON.stringify({ version, build, files }));
const total = Object.values(files).reduce((a, f) => a + f[1], 0);
console.log(`assets.json: ${Object.keys(files).length} files, ${(total / 1048576).toFixed(1)} MB, version ${version}, build ${build}`);
