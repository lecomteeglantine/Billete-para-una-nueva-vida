const CACHE='billete-v2';
const ASSETS=['./','index.html','programme.html','epreuves.html','litterature.html','civilisation.html','traduction.html','didactique.html','francais.html','oral.html','jury.html','entrainement.html','planning.html','ressources.html','ressources-en-ligne.html','progression.html','assets/styles.css','assets/app.js','assets/flashcards.js','assets/quizzes.js','assets/progress.js','assets/icon-192.png','assets/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp;}).catch(()=>caches.match('index.html')))));
