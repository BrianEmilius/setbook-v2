const CACHE_NAME = "setbook_cache_v2"
var urlsToCache = [
  "/"
]

self.addEventListener("install", function (event) {
  event.waitUntil(
	caches.open(CACHE_NAME)
	  .then(function(cache) {
		console.log("cache opened")
		return cache.addAll(urlsToCache)
	  })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
	caches.match(event.request)
	  .then(function (response) {
		// Cache hit - return response
		if (response) {
		  return response
		}
		return fetch(event.request)
	  }
	  )
  )
})
