var dataCacheName = "weatherData-v1";

self.addEventListener("fetch", function(e) {
  var url = new URL(e.request.url);
  url.hash = "";
  var urlString = url.toString();
  if (urlString.includes("/B2B_Redirection")) {
    return false;
  }
});

self.addEventListener("install", function(event) {
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
});
