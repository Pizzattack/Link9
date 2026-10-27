// ONE command: takes the game screenshots (English, desktop + phone) and builds the GitHub and itch.io images.
//
//   npm i playwright && npx playwright install chromium     (once)
//   node tools/make-screenshots.mjs                         (from the repository root)
//
// Output (all PNG):
//   docs/screens/<scene>-desktop.png   1920x1080   <scene>-phone.png  390x844 @3x
//   docs/social/github-social.png      1280x640    (Settings > General > Social preview)
//   docs/social/itch-cover.png         630x500     (itch.io cover image)
//   docs/social/itch-banner.png        1600x500    (itch.io page banner, optional)
// Optional:  node tools/make-screenshots.mjs fr   -> another language for the screenshots.
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const lang = process.argv[2] || "en";
const url = (p) => pathToFileURL(path.join(root, p)).href;
const screens = path.join(root, "docs", "screens"), social = path.join(root, "docs", "social");
fs.mkdirSync(screens, { recursive: true }); fs.mkdirSync(social, { recursive: true });

const SCENES = ["home", "combat", "combat-low", "campaign", "merchant", "workshop", "deck", "reward", "rules", "tutorial&step=4", "comic"];
const DEVICES = {
  desktop: { viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 },
  phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};

const browser = await chromium.launch();

// 1 · game screenshots
for (const [dev, opts] of Object.entries(DEVICES)) {
  const ctx = await browser.newContext(opts);
  for (const sc of SCENES) {
    const page = await ctx.newPage();
    await page.goto(url("index.html") + `?scene=${sc}&lang=${lang}`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2500);
    const name = `${sc.split("&")[0]}-${dev}.png`;
    await page.screenshot({ path: path.join(screens, name) });
    console.log("screen ", name);
    await page.close();
  }
  await ctx.close();
}

// 2 · social images (HTML composed, then photographed)
const TAGLINE = "Link programs. Chain combos. Crash the rival.";
const SUB = "Free · Open source · Play in your browser";
const css = `
@font-face{font-family:"Chakra Petch";font-weight:700;src:url(${url("fonts/chakra-petch-latin-700-normal.woff2")}) format("woff2")}
@font-face{font-family:Saira;font-weight:500;src:url(${url("fonts/saira-latin-500-normal.woff2")}) format("woff2")}
*{box-sizing:border-box;margin:0}
body{background:#0b0d10 url(${url("ui/skin/bg.webp")}) center/cover;overflow:hidden;position:relative;font-family:Saira,system-ui,sans-serif;color:#fff}
body::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,10,13,.92) 0%,rgba(8,10,13,.7) 55%,rgba(8,10,13,.35) 100%)}
.t{position:absolute;display:flex;flex-direction:column;justify-content:center;gap:var(--g)}
.logo{height:var(--lh);object-fit:contain;align-self:flex-start}
.fallback{font:700 calc(var(--lh)*.5)/1.1 "Chakra Petch",sans-serif;color:#ff8a1f}
h1{font:700 var(--fs)/1.12 "Chakra Petch",sans-serif;text-shadow:0 2px 14px #000}
p{font-size:var(--ss);color:#ff8a1f;font-weight:500}
.shot{position:absolute;border-radius:var(--r);border:2px solid #ff8a1f;box-shadow:0 0 40px rgba(255,138,31,.35),0 12px 40px #000;background:#111 center/cover}
`;
function page({ w, h, vars, text, shots, logoOnTop }) {
  const sh = shots.map((s) => `<div class="shot" style="left:${s.x}px;top:${s.y}px;width:${s.w}px;height:${s.h}px;background-image:url('${s.src}')"></div>`).join("");
  return `<!doctype html><meta charset=utf-8><style>${css} body{width:${w}px;height:${h}px;${vars}}</style>
<body><div class="t" style="left:${text.x}px;top:${text.y}px;width:${text.w}px;height:${text.h}px">
<img class="logo" src="${url("ui/skin/logo.webp")}" onerror="this.outerHTML='<div class=fallback>LINK//9 — Grid Protocol</div>'">
${text.tag ? `<h1>${TAGLINE}</h1>` : ""}<p>${SUB}</p></div>${sh}</body>`;
}
const desk = url("docs/screens/combat-desktop.png"), phone = url("docs/screens/combat-phone.png"), alt = url("docs/screens/campaign-desktop.png");
const JOBS = [
  { file: "github-social.png", w: 1280, h: 640,
    vars: "--lh:90px;--fs:46px;--ss:22px;--g:20px;--r:12px",
    text: { x: 60, y: 60, w: 520, h: 520, tag: true },
    shots: [{ x: 640, y: 90, w: 580, h: 326, src: desk }, { x: 560, y: 300, w: 560, h: 315, src: alt }, { x: 1090, y: 250, w: 160, h: 346, src: phone }] },
  { file: "itch-cover.png", w: 630, h: 500,
    vars: "--lh:54px;--fs:21px;--ss:14px;--g:10px;--r:8px",
    text: { x: 28, y: 18, w: 574, h: 170, tag: true },
    shots: [{ x: 28, y: 215, w: 420, h: 236, src: desk }, { x: 470, y: 170, w: 140, h: 303, src: phone }] },
  { file: "itch-banner.png", w: 1600, h: 500,
    vars: "--lh:84px;--fs:40px;--ss:22px;--g:18px;--r:10px",
    text: { x: 70, y: 40, w: 640, h: 420, tag: true },
    shots: [{ x: 790, y: 60, w: 560, h: 315, src: desk }, { x: 1010, y: 190, w: 430, h: 242, src: alt }, { x: 1380, y: 70, w: 190, h: 410, src: phone }] },
];
for (const j of JOBS) {
  const pg = await browser.newPage({ viewport: { width: j.w, height: j.h } });
  const f = path.join(social, "_tmp.html");
  fs.writeFileSync(f, page(j));
  await pg.goto(pathToFileURL(f).href);
  await pg.waitForLoadState("networkidle");
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(300);
  await pg.screenshot({ path: path.join(social, j.file) });
  console.log("social ", j.file);
  await pg.close(); fs.unlinkSync(f);
}
await browser.close();
console.log("\nDone: docs/screens/ and docs/social/");
