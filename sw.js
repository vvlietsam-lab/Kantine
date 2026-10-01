/* Kantine service worker — cache-first, alleen eigen cache */
const CACHE = 'kantine-v6';
const ASSETS = ['./', './index.html', './content.js', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  /* Oude Kantine-caches weg, én de oude RONDO-cache die per ongeluk op deze plek stond.
     De RONDO-cache in /rondo/ (rondo-v40 en hoger) blijft met rust. */
  const stale = k => (k.startsWith('kantine-') && k !== CACHE) ||
                     (/^rondo-v\d+$/.test(k) && parseInt(k.slice(7)) < 40);
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(stale).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  /* /rondo/ heeft z'n eigen service worker */
  if (url.pathname.includes('/rondo/')) return;
  e.respondWith(
    caches.open(CACHE).then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok && url.origin === location.origin) c.put(e.request, res.clone());
      return res;
    }).catch(() => c.match('./index.html'))))
  );
});
