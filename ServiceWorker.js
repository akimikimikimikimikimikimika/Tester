let ael=(t,f)=>self.addEventListener(t,f);let cacheInfo={name:"Tester-build2019.10.9",list:["./Tester.html","./Style.css","./Script.js","./ServiceWorker.js","./manifest.json","./Mask.svg","./Icon.png","./Favicon.ico","./apple-touch-icon.png","./tileImage.png"]};ael("install",e=>{e.waitUntil(caches.open(cacheInfo.name).then(c=>{return c.addAll(cacheInfo.list);}));});ael("activate",e=>{e.waitUntil(()=>{caches.keys().then(l=>{return Promise.all(l.map(n=>{if (n!=cacheInfo.name) return caches.delete(n);}));});});});ael("fetch",e=>{e.respondWith(caches.match(e.request).then(r=>{if (r) return r;let fr = e.request.clone();return fetch(fr).then(r=>{if (!r) return r;else if (r.status!=200) return r;let rc=r.clone();caches.open(cacheInfo.name).then(c=>{c.put(e.request,rc);});return r;});}))});