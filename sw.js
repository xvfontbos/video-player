const CACHE = 'reproductor-video-v1';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => {
      console.log('Cachejant fitxers...');
      return c.addAll(FILES);
    })
  );
  self.skipWaiting();
});

// IMPORTANT: Afegeix una excepció per als vídeos
self.addEventListener('fetch', e => {
  // Si la petició és un Blob (el teu vídeo local), no la busquis a la cache
  if (e.request.url.startsWith('blob:')) {
    return; 
  }

  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
