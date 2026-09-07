const CACHE = "lsaircon-v8-svg-logo";
const CORE = ["/", "/about.html", "/services.html", "/gallery.html", "/contact.html", "/manifest.webmanifest", "/images/eta-web-logo.svg", "/images/eta-app-icon.svg", "/assets/style.css", "/assets/redesign.css", "/assets/identity.css"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then(r => r || caches.match("/"))));
});
