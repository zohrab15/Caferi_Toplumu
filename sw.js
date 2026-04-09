// Service Worker — Ehli-Beyt Ankara PWA
// Offline cache + Push Notification support

const CACHE_NAME = 'ehlibeyt-v5';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/favicon.svg',
  '/css/variables.css',
  '/css/global.css',
  '/css/prayer.css',
  '/css/community.css',
  '/css/ilim.css',
  '/css/bagis.css',
  '/css/ziyaret.css',
  '/css/responsive.css',
  '/js/app.js',
  '/js/api.js',
  '/js/praytimes.js',
  '/js/prayerdata.js',
  '/js/pages/prayer.js',
  '/js/pages/community.js',
  '/js/pages/ilim.js',
  '/js/pages/bagis.js',
  '/js/pages/ziyaret.js',
  '/js/pages/kvkk.js',
  '/js/pages/auth.js',
  '/js/pages/profile.js',
  '/js/pages/admin.js',
  '/js/components/header.js',
  '/js/components/navbar.js',
  '/js/components/icons.js',
];

// Install — cache all static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets v4');
      return Promise.all(
        STATIC_ASSETS.map(url => 
          fetch(url, { cache: 'no-store' }).then(res => {
            if (!res.ok) throw new Error('Fetch failed ' + url);
            return cache.put(url, res);
          })
        )
      );
    })
  );
  self.skipWaiting();
});

// Activate — cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch — Network-first for JS/HTML, skip API calls entirely
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // NEVER cache API requests — let them go to network directly
  if (request.url.includes('/api/') || request.url.includes('localhost:8000')) {
    return;
  }

  // Network-first for all app resources
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache the fresh response
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => {
        // Offline fallback: serve from cache
        return caches.match(request).then((cached) => {
          return cached || caches.match('/index.html');
        });
      })
  );
});

// Push Notification Handler
self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'Ehli-Beyt Ankara',
      icon: '/assets/favicon.svg',
      badge: '/assets/favicon.svg',
      vibrate: [200, 100, 200, 100, 200],
      data: { url: data.url || '/' }
    };
    event.waitUntil(
      self.registration.showNotification(data.head || 'Yeni Duyuru', options)
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
