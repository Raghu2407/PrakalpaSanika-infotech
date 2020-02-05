var CACHE_NAME = 'website 1.0';
var urlsToCache = [
    '.',
    'index.html',
    'css/materialize.min.css',
    'css/raghu.css'
];
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});