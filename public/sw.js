// Service Worker file

// Inject manifest - this comment is required for injection
const manifestFiles = self.__WB_MANIFEST;

// Cache names
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';
const DATA_CACHE = 'data-cache-v1';

// Static assets to cache on install
const staticAssets = [
  '/',
  '/index.html',
  '/manifest.json',
  ...manifestFiles.map(file => file.url)
];

// Create offline fallback page
const createOfflineFallbackResponse = () => {
  const offlineHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Offline - Todo PWA</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            padding: 20px;
            text-align: center;
            background-color: #f9fafb;
          }
          .offline-message {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
          }
          h1 { color: #374151; margin-bottom: 1rem; }
          p { color: #6b7280; margin-bottom: 1.5rem; }
          button {
            background-color: #3b82f6;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
          }
          button:hover { background-color: #2563eb; }
        </style>
      </head>
      <body>
        <div class="offline-message">
          <h1>You're Offline</h1>
          <p>Please check your internet connection and try again.</p>
          <button onclick="window.location.reload()">Retry</button>
        </div>
      </body>
    </html>
  `;
  return new Response(offlineHtml, {
    headers: { 'Content-Type': 'text/html' }
  });
};

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(staticAssets))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE, DATA_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper function to determine if a request is for an API endpoint
const isApiRequest = (url) => {
  return url.includes('/api/') || url.includes('localhost:') || url.pathname === '/todos';
};

// Helper function to determine if a request is for a static asset
const isStaticAsset = (url) => {
  return (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.json') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg')
  );
};

// Helper function to determine if a request is for the main page
const isMainPageRequest = (url) => {
  return url.pathname === '/' || url.pathname === '/index.html';
};

// Fetch event handler with different strategies for different types of requests
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Strategy for main page: Cache First with Custom Offline Fallback
  if (isMainPageRequest(url)) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          return cachedResponse || fetch(event.request)
            .then(response => {
              const responseClone = response.clone();
              caches.open(STATIC_CACHE).then(cache => {
                cache.put(event.request, responseClone);
              });
              return response;
            })
            .catch(() => createOfflineFallbackResponse());
        })
    );
    return;
  }

  // Strategy for API requests: Network First with Offline Fallback
  if (isApiRequest(url)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clonedResponse = response.clone();
          caches.open(DATA_CACHE).then(cache => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              return new Response(JSON.stringify({ todos: [] }), {
                headers: { 'Content-Type': 'application/json' }
              });
            });
        })
    );
    return;
  }

  // Strategy for static assets: Cache First with Network Fallback
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request).then(response => {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(event.request, responseClone);
            });
            return response;
          });
        })
    );
    return;
  }

  // Default strategy: Network First with Cache Fallback
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open(DYNAMIC_CACHE).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return createOfflineFallbackResponse();
          });
      })
  );
});

// Handle sync events for offline data
self.addEventListener('sync', event => {
  if (event.tag === 'sync-todos') {
    event.waitUntil(
      // Implement sync logic here when online
      Promise.resolve()
    );
  }
});