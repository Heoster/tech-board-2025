// Service Worker for TECH BOARD 2025 MCQ System
// Implements advanced caching strategies and offline functionality

const CACHE_NAME = 'techboard-2025-v1.0.0';
const STATIC_CACHE = 'techboard-static-v1.0.0';
const DYNAMIC_CACHE = 'techboard-dynamic-v1.0.0';
const API_CACHE = 'techboard-api-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/css/critical.css',
    '/js/app.js',
    '/js/critical.js',
    '/images/logo.svg',
    '/images/favicon.ico',
    '/fonts/inter-var.woff2'
];

// API endpoints to cache
const API_ENDPOINTS = [
    '/api/auth/verify',
    '/api/students/profile'
];

// Cache strategies
const CACHE_STRATEGIES = {
    CACHE_FIRST: 'cache-first',
    NETWORK_FIRST: 'network-first',
    STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
    NETWORK_ONLY: 'network-only',
    CACHE_ONLY: 'cache-only'
};

// Route-specific caching strategies
const ROUTE_STRATEGIES = {
    // Static assets - cache first
    '/css/': CACHE_STRATEGIES.CACHE_FIRST,
    '/js/': CACHE_STRATEGIES.CACHE_FIRST,
    '/images/': CACHE_STRATEGIES.CACHE_FIRST,
    '/fonts/': CACHE_STRATEGIES.CACHE_FIRST,
    
    // API endpoints - network first with fallback
    '/api/auth/': CACHE_STRATEGIES.NETWORK_FIRST,
    '/api/students/': CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    '/api/quiz/': CACHE_STRATEGIES.NETWORK_FIRST,
    
    // HTML pages - stale while revalidate
    '/': CACHE_STRATEGIES.STALE_WHILE_REVALIDATE
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache static assets
            caches.open(STATIC_CACHE).then((cache) => {
                console.log('Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            }),
            
            // Cache API endpoints
            caches.open(API_CACHE).then((cache) => {
                console.log('Pre-caching API endpoints...');
                return Promise.all(
                    API_ENDPOINTS.map(endpoint => 
                        fetch(endpoint)
                            .then(response => response.ok ? cache.put(endpoint, response) : null)
                            .catch(() => null) // Ignore failures during install
                    )
                );
            })
        ]).then(() => {
            console.log('Service Worker installed successfully');
            // Skip waiting to activate immediately
            return self.skipWaiting();
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Delete old caches
                    if (cacheName !== STATIC_CACHE && 
                        cacheName !== DYNAMIC_CACHE && 
                        cacheName !== API_CACHE) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker activated');
            // Take control of all clients immediately
            return self.clients.claim();
        })
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    // Determine caching strategy based on URL
    const strategy = getCachingStrategy(url.pathname);
    
    event.respondWith(
        handleRequest(request, strategy)
    );
});

// Get caching strategy for a given path
function getCachingStrategy(pathname) {
    for (const [route, strategy] of Object.entries(ROUTE_STRATEGIES)) {
        if (pathname.startsWith(route)) {
            return strategy;
        }
    }
    
    // Default strategy
    return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
}

// Handle request based on caching strategy
async function handleRequest(request, strategy) {
    const url = new URL(request.url);
    
    switch (strategy) {
        case CACHE_STRATEGIES.CACHE_FIRST:
            return cacheFirst(request);
            
        case CACHE_STRATEGIES.NETWORK_FIRST:
            return networkFirst(request);
            
        case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
            return staleWhileRevalidate(request);
            
        case CACHE_STRATEGIES.NETWORK_ONLY:
            return fetch(request);
            
        case CACHE_STRATEGIES.CACHE_ONLY:
            return caches.match(request);
            
        default:
            return staleWhileRevalidate(request);
    }
}

// Cache First strategy
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(getAppropriateCache(request.url));
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Cache First failed:', error);
        return new Response('Offline', { status: 503 });
    }
}

// Network First strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(getAppropriateCache(request.url));
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Network failed, trying cache:', error);
        
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
            return caches.match('/offline.html') || 
                   new Response('Offline', { status: 503 });
        }
        
        return new Response('Offline', { status: 503 });
    }
}

// Stale While Revalidate strategy
async function staleWhileRevalidate(request) {
    const url = new URL(request.url);
    
    // Skip external resources that might be blocked by CSP
    if (url.hostname !== self.location.hostname && 
        (url.hostname.includes('googleapis.com') || url.hostname.includes('gstatic.com'))) {
        try {
            return await fetch(request);
        } catch (error) {
            console.log('External resource blocked by CSP:', request.url);
            return new Response('', { status: 204 });
        }
    }
    
    const cachedResponse = await caches.match(request);
    
    // Always try to fetch from network in background
    const networkResponsePromise = fetch(request).then(async (networkResponse) => {
        if (networkResponse.ok && url.hostname === self.location.hostname) {
            const cache = await caches.open(getAppropriateCache(request.url));
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(() => null);
    
    // Return cached response immediately if available
    if (cachedResponse) {
        // Update cache in background
        networkResponsePromise;
        return cachedResponse;
    }
    
    // If no cache, wait for network
    try {
        return await networkResponsePromise;
    } catch (error) {
        return new Response('Offline', { status: 503 });
    }
}

// Get appropriate cache name based on URL
function getAppropriateCache(url) {
    if (url.includes('/api/')) {
        return API_CACHE;
    }
    
    if (url.includes('/css/') || 
        url.includes('/js/') || 
        url.includes('/images/') || 
        url.includes('/fonts/')) {
        return STATIC_CACHE;
    }
    
    return DYNAMIC_CACHE;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('Background sync triggered:', event.tag);
    
    if (event.tag === 'quiz-submission') {
        event.waitUntil(syncQuizSubmissions());
    }
    
    if (event.tag === 'performance-metrics') {
        event.waitUntil(syncPerformanceMetrics());
    }
});

// Sync quiz submissions when back online
async function syncQuizSubmissions() {
    try {
        const cache = await caches.open('quiz-submissions');
        const requests = await cache.keys();
        
        for (const request of requests) {
            try {
                const response = await fetch(request);
                if (response.ok) {
                    await cache.delete(request);
                    console.log('Quiz submission synced:', request.url);
                }
            } catch (error) {
                console.error('Failed to sync quiz submission:', error);
            }
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Sync performance metrics when back online
async function syncPerformanceMetrics() {
    try {
        const cache = await caches.open('performance-metrics');
        const requests = await cache.keys();
        
        for (const request of requests) {
            try {
                const response = await fetch(request);
                if (response.ok) {
                    await cache.delete(request);
                    console.log('Performance metrics synced:', request.url);
                }
            } catch (error) {
                console.error('Failed to sync performance metrics:', error);
            }
        }
    } catch (error) {
        console.error('Performance metrics sync failed:', error);
    }
}

// Push notifications for performance alerts
self.addEventListener('push', (event) => {
    if (!event.data) return;
    
    const data = event.data.json();
    
    if (data.type === 'performance-alert') {
        const options = {
            body: data.message,
            icon: '/images/icon-192.png',
            badge: '/images/badge-72.png',
            tag: 'performance-alert',
            requireInteraction: true,
            actions: [
                {
                    action: 'view',
                    title: 'View Details'
                },
                {
                    action: 'dismiss',
                    title: 'Dismiss'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification('Performance Alert', options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/performance-dashboard')
        );
    }
});

// Periodic background sync for cache cleanup
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'cache-cleanup') {
        event.waitUntil(cleanupCaches());
    }
});

// Clean up old cache entries
async function cleanupCaches() {
    const cacheNames = await caches.keys();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    const now = Date.now();
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
                const dateHeader = response.headers.get('date');
                if (dateHeader) {
                    const responseDate = new Date(dateHeader).getTime();
                    if (now - responseDate > maxAge) {
                        await cache.delete(request);
                        console.log('Cleaned up old cache entry:', request.url);
                    }
                }
            }
        }
    }
}

// Message handling for cache management
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_CACHE_SIZE') {
        getCacheSize().then(size => {
            event.ports[0].postMessage({ cacheSize: size });
        });
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        clearAllCaches().then(() => {
            event.ports[0].postMessage({ success: true });
        });
    }
});

// Get total cache size
async function getCacheSize() {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        for (const request of requests) {
            const response = await cache.match(request);
            if (response && response.headers.get('content-length')) {
                totalSize += parseInt(response.headers.get('content-length'));
            }
        }
    }
    
    return totalSize;
}

// Clear all caches
async function clearAllCaches() {
    const cacheNames = await caches.keys();
    
    await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
    
    console.log('All caches cleared');
}

console.log('Service Worker loaded successfully');