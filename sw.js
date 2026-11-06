// ponytail: cache-first, no update prompt. Bump CACHE whenever any file changes, or phones keep the old copy.
const CACHE = 'code-gen-v1';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'JsBarcode.all.min.js', 'qrcode.min.js', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))));

self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
));

self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request))
));
