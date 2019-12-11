var dataCacheName = 'weatherData-v1';


self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  var dataUrl = 'http://localhost:8010/api/v1/categories/navigation';
  if (e.request.url.indexOf(dataUrl) === 0) {
    // Put data handler code here
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});




self.addEventListener('install', function (event) {
  console.log('SW Installed');
  event.waitUntil(
    caches.open('static')
      .then(function (cache) {
        cache.add('/');
        cache.add('/index.html');
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

self.addEventListener('activate', function () {
  console.log('SW Activated');
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        if (res) {
          return res;
        } else {
          return fetch(event.request);
        }
      })
  );
});