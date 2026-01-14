const CACHE_NAME = "workout-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./about-us.html",
  "./contact.html",
  "./privacy-policy.html",
  "./styles.css",
  "./script.js",
  "./dumbbell.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
