// Shevality – einfacher Service-Worker.
// Zweck: macht die Web-App "installierbar" (zum Homescreen hinzufügen) und
// sorgt für ein bisschen Offline-Fähigkeit. Bei jedem neuen Deploy die
// Version hochzählen, damit alte Dateien sauber ersetzt werden.
const CACHE = 'shevality-v5';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Fremde Hosts (z. B. Karten-Kacheln, Supabase) nicht anfassen.
  if (url.origin !== self.location.origin) return;

  // Seitenaufrufe: erst Netz (damit Updates ankommen), sonst Cache.
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const net = await fetch(req);
          const cache = await caches.open(CACHE);
          cache.put(req, net.clone());
          return net;
        } catch (err) {
          return (await caches.match(req)) || (await caches.match('/shevality/'));
        }
      })(),
    );
    return;
  }

  // Übrige Dateien (JS, Bilder, Schriften): erst Cache, sonst Netz.
  event.respondWith(
    (async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      try {
        const net = await fetch(req);
        if (net && net.status === 200) {
          const cache = await caches.open(CACHE);
          cache.put(req, net.clone());
        }
        return net;
      } catch (err) {
        return cached;
      }
    })(),
  );
});
