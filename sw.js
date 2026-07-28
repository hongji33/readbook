const CACHE='jamjari-v1';
self.addEventListener('install', e=>{ self.skipWaiting(); });
self.addEventListener('activate', e=>{ self.clients.claim(); });
self.addEventListener('fetch', e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.open(CACHE).then(async cache=>{
    const cached = await cache.match(e.request);
    const net = fetch(e.request).then(r=>{ if(r && r.status===200) cache.put(e.request, r.clone()); return r; }).catch(()=>cached);
    return cached || net;
  }));
});
