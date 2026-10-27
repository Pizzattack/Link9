/* LINK//9 service worker: lets the game load offline once it has been opened online.
   - index.html and the manifest: network first (you always get the newest build when online), cache as fallback.
   - everything else (images, fonts, sounds, comics): cache first, filled as you play, so what you have seen works offline.
   Bump CACHE when you replace assets with the same file names. */
const CACHE = "link9-v1";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./favicon.ico", "./icons/apple-touch-icon.png", "./icons/icon-192.png", "./icons/icon-512.png",
  "./ui/skin/logo.webp", "./ui/skin/bg.webp", "./ui/skin/tile.webp"];
["chakra-petch", "saira"].forEach((f) => [400, 500, 600, 700].forEach((w) => ["latin", "latin-ext"].forEach((s) => CORE.push(`./fonts/${f}-${s}-${w}-normal.woff2`))));

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

// Safari requests audio with a Range header: answer it from the cached full file.
function slice(req, res) {
  return res.arrayBuffer().then((buf) => {
    const m = /bytes=(\d+)-(\d*)/.exec(req.headers.get("range")) || [0, 0, ""];
    const start = +m[1], end = m[2] ? Math.min(+m[2], buf.byteLength - 1) : buf.byteLength - 1;
    return new Response(buf.slice(start, end + 1), { status: 206, statusText: "Partial Content", headers: {
      "Content-Type": res.headers.get("Content-Type") || "audio/mpeg", "Content-Range": `bytes ${start}-${end}/${buf.byteLength}`, "Content-Length": String(end - start + 1) } });
  });
}
self.addEventListener("fetch", (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  const isPage = req.mode === "navigate" || /\/(index\.html|manifest\.webmanifest)?$/.test(url.pathname);
  if (isPage) {
    e.respondWith(fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("./index.html"))));
    return;
  }
  e.respondWith(caches.open(CACHE).then(async (c) => {
    const key = url.pathname;
    let res = await c.match(key);
    if (!res) {
      const net = await fetch(url.href);                       // full file, never a partial range
      if (net.ok) c.put(key, net.clone());
      res = net;
    }
    return req.headers.get("range") && res.ok ? slice(req, res) : res;
  }));
});
