// For convience. 
// 

var cacheName = 'app-v1';
var appShellFiles = [
 "./index.html",
 "./loading.gif"
];


// Self is the  service worker  object. 

self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
});

// we are looking for a match for a match in the cache.
// Hey go find this page in the cache.. Otherwise I am going to find match.

// If you find a similar thing then match otherwise go get it from the web aand store a copy in the future.
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+ e.request.url);
      
      return r || fetch(e.request).then(function(response) {
          return caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
        });
      });
    })
  );
});