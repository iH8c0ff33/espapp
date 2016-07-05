self.addEventListener('install', e => e.waitUntil(
    caches.open('espapp')
    .then(cache => cache.addAll([
        '/',
        '/index.html'
    ]))
));
self.addEventListener('activate', e => {
    e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request)
        .then(r => {
            return r || fetch(e.request);
        }));
});
