/* LINK//9 service worker.
   Once the game has been downloaded for offline play (see "Offline play" in the game, it writes the marker "__installed"),
   EVERYTHING is served from the cache: the game starts instantly, offline or not, and never changes version by surprise.
   Updates are downloaded by the game itself after the player confirms (assets.json lists every file with a hash).
   Before the offline package is installed: network first, with what you have already seen kept as a fallback. */
const APP = "link9-app", STAGE = "link9-stage";
const SCOPE = self.registration.scope, META = new URL("__installed", SCOPE).href, INDEX = new URL("index.html", SCOPE).href;

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== APP && k !== STAGE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

// Safari requests audio with a Range header: answer it from the cached full file.
function slice(req, res) {
  const rg = req.headers.get("range");
  if (!rg || !res.ok) return res;
  return res.arrayBuffer().then((buf) => {
    const m = /bytes=(\d+)-(\d*)/.exec(rg) || [0, 0, ""];
    const start = +m[1], end = m[2] ? Math.min(+m[2], buf.byteLength - 1) : buf.byteLength - 1;
    return new Response(buf.slice(start, end + 1), { status: 206, statusText: "Partial Content", headers: {
      "Content-Type": res.headers.get("Content-Type") || "audio/mpeg", "Content-Range": `bytes ${start}-${end}/${buf.byteLength}`, "Content-Length": String(end - start + 1) } });
  });
}
self.addEventListener("fetch", (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (url.searchParams.has("__dl") || url.pathname.endsWith("/assets.json") || url.pathname.endsWith("/sw.js")) return;   // downloads and version check always hit the network
  e.respondWith((async () => {
    const c = await caches.open(APP), nav = req.mode === "navigate", key = nav ? INDEX : url.origin + url.pathname;
    if (await c.match(META)) {                                   // offline package installed: cache first
      const hit = await c.match(key);
      if (hit) return slice(req, hit);
      try { return await fetch(nav ? req : url.href); } catch (err) { return Response.error(); }
    }
    try {                                                        // not installed: network first, cache as fallback
      const net = await fetch(nav ? req : url.href);
      if (net.ok) c.put(key, net.clone());
      return slice(req, net);
    } catch (err) {
      const hit = await c.match(key);
      return hit ? slice(req, hit) : Response.error();
    }
  })());
});
