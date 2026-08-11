const CACHE = 'billete-v4';

const ASSETS = [
  './',
  'index.html',
  'programme.html',
  'epreuves.html',
  'litterature.html',
  'civilisation.html',
  'traduction.html',
  'didactique.html',
  'francais.html',
  'oral.html',
  'jury.html',
  'entrainement.html',
  'planning.html',
  'ressources.html',
  'ressources-en-ligne.html',
  'revision-vivre-entre-generations.html',
  'revision-langages.html',
  'progression.html',
  'assets/styles.css',
  'assets/app.js',
  'assets/flashcards.js',
  'assets/quizzes.js',
  'assets/progress.js',
  'assets/icon-192.png',
  'assets/icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys.filter(key => key !== CACHE).map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  const isHtml =
    request.mode === 'navigate' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('/');

  if (isHtml) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then(cached => cached || caches.match('index.html'))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, copy));
        return response;
      });
    })
  );
});
