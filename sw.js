/* 看股工具站 · service worker
   殼快取 + HTML network-first（迭代期不卡舊版，離線才回快取）。
   報價是即時 fetch 走 proxy，不經這裡快取。watchlist/主題在 localStorage 不經這裡。 */
const CACHE = 'stocktools-v1';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg', './compare/index.html'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(()=>{}));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const req = e.request;
  // 只接管本站同源 GET；報價 proxy（跨網域）一律放行給網路
  if (new URL(req.url).origin !== location.origin) return;
  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    e.respondWith(
      fetch(req).then(resp => { const copy = resp.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{}); return resp; })
        .catch(() => caches.match(req).then(h => h || caches.match('./index.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(hit =>
      hit || fetch(req).then(resp => { const copy = resp.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{}); return resp; })
        .catch(() => caches.match('./index.html'))
    )
  );
});
