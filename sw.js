/* Nihongo Path V6.8.1 — network-first HTML so updated layouts replace old cached pages. */
const CACHE='nihongo-path-v6-8-1';
const FILES=['./','./index.html','./manifest.webmanifest','./huy-mark-192.png','./huy-mark-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('nihongo-path-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 if(request.mode==='navigate'){
   event.respondWith(fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy)).catch(()=>{});}return response;}).catch(()=>caches.match('./index.html')));
 }else{
   event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(resp=>{if(resp.ok){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(request,copy)).catch(()=>{});}return resp;})));
 }
});
