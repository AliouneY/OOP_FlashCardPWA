//new plan: we make the pwa such that if the user adds to the home screen, it lets them see the homepage
const cacheName = 'v1';
const cacheAssets = [
						'/public_html/index.php'
						
					];

self.addEventListener('install', function(e)
								 {
									 console.log("Service Worker Installed!");
									e.waitUntil(caches.open(cacheName).then(cache => {
																						console.log("Caching Files...");
																						cache.addAll(cacheAssets);
																					  }).then(() => self.skipWaiting()));
								 });
								 
self.addEventListener('activate', function(e)
                                  {
									  console.log("Service Worker Activated!");
									  //self.clients.claim();
									  
									  e.waitUntil(caches.keys().then(cacheNames => {return Promise.all(cacheNames.map(cache => {
																																   if(cache !== cacheName)
																																   {
																																	 console.log("Clearing Old Cache");
																																	 return caches.delete(cache);
																																   }
																															   }))
																					}));
								  });
								  
self.addEventListener('fetch', function(e)
							   {
								   console.log("The Fetch Works!");
								   
								   e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
							   });
							   