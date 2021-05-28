/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
const urlsToCache = [
  '/',
]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open('my-first-cache-v3').then((cache) => cache.addAll(urlsToCache)))
})

self.addEventListener('activate', (a) => {
  console.log('activate from service worker', a)
})

self.addEventListener('message', (a) => {
  console.log('message from service worker', a)
})

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => {
    if (response) return response
    return fetch(event.request)
  }))
})
