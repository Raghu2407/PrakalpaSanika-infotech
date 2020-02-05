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




self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('website').then(function (cache) {
            return cache.addAll([
                '.',
                'index.html',
                'css/materialize.min.css',
                'css/raghu.css'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetchAndCache(event.request);
            })
    );
});


function fetchAndCache(url) {
    return fetch(url)
        .then(function (response) {
            // Check if we received a valid response
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return caches.open(CACHE_NAME)
                .then(function (cache) {
                    cache.put(url, response.clone());
                    return response;
                });
        })
        .catch(function (error) {
            console.log('Request failed:', error);
            // You could return a custom offline 404 page here
        });
}