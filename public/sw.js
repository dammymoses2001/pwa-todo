// Service Worker file

// Inject manifest - this comment is required for injection
const manifestFiles = self.__WB_MANIFEST;

// Cache name
const CACHE_NAME = 'todo-pwa-v1';

// Files to cache - combine manifest files with static files
const urlsToCache = [
  '/',
  '/index.html',
  ...manifestFiles.map(file => file.url)
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Activate event to clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});