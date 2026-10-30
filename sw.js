/* Nihongo Path V7 demo – scoped offline worker, network-first for HTML. */
const APP_SCOPE = self.registration.scope;
const CACHE = 'np-v7-journey-20261030-' + encodeURIComponent(new URL(APP_SCOPE).pathname);
const ASSETS = ['./index.html','./manifest.webmanifest','./huy-mark-192.png','./huy-mark-512.png'];
self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())
));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k!==CACHE && (k.startsWith('np-v7-journey-20261030-'+encodeURIComponent(new URL(APP_SCOPE).pathname)) ||
     (new URL(APP_SCOPE).pathname === '/JLPT/' && k.startsWith('nihongo-path-')))).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  const req=event.request; const url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(APP_SCOPE)) return;
  if(req.mode==='navigate') {
    event.respondWith(fetch(req).then(resp=>{
      if(resp.ok){const clone=resp.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put('./index.html',clone)));}
      return resp;
    }).catch(()=>caches.match('./index.html')));
  } else {
    event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(resp=>{
      if(resp.ok){const clone=resp.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(req,clone)));}
      return resp;
    })));
  }
});
