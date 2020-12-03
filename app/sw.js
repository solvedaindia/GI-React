var dataCacheName = "weatherData-v1";

self.addEventListener("fetch", function(e) {
  var url = new URL(e.request.url);
  url.hash = "";
  var urlString = url.toString();

  console.log("[ServiceWorker] Fetch", urlString);
  if (urlString.includes("/B2B_Redirection")) {
    console.log("unregistering service worker for Business route");
    return false;
  }

});

self.addEventListener("install", function(event) {
  console.log("SW Installed");
  event.waitUntil(
    caches.open("static").then(function(cache) {
      cache.add("/");
      cache.add("/index.html");
      // cache.add('/src/js/app.js');
      // cache.addAll([
      //   '/',
      //   '/index.html',
      //   '/src/js/app.js',
      //   '/src/css/app.css',
      //   '/src/images/pwa.jpg',
      //   'https://fonts.googleapis.com/css?family=Raleway:400,700'
      // ]);
    })
  );
});

self.addEventListener("activate", function() {
  console.log("SW Activated");
});
