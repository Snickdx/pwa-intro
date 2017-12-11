// importScripts('workbox-sw.dev.v2.1.2.js');
importScripts('/node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.1.2.js');


const workboxSW = new WorkboxSW();

workboxSW.precache([
  {
    "url": "dialog.js",
    "revision": "a91890c984b1692bd45ec1b56e2b4c2d"
  },
  {
    "url": "index.html",
    "revision": "0bd7ce685d815b07a5315f78307fac29"
  },
  {
    "url": "key.js",
    "revision": "dfe6e50fb2ac581dfba2e74a7277d53d"
  },
  {
    "url": "main.css",
    "revision": "74d0852f21c1fa0b4f216240453e905b"
  },
  {
    "url": "main.js",
    "revision": "631518c1651e848929c51ec18eff6c7a"
  },
  {
    "url": "manifest.json",
    "revision": "e62867a022bdd6be28e928ad144f490c"
  },
  {
    "url": "service-worker.js",
    "revision": "f2d1195e6954547d7464dbbf122b2771"
  },
  {
    "url": "sw-src.js",
    "revision": "561ddeaa5073b8b671e36b98cce6b14c"
  },
  {
    "url": "sw.js",
    "revision": "d71ca84f52a591cc49cd19ec1d700352"
  },
  {
    "url": "wb-sw.js",
    "revision": "221ec3bf8fd0ae596ffa5a76d44ccaf5"
  },
  {
    "url": "workbox-sw.dev.v2.1.2.js",
    "revision": "acb8524aabe8c4222c32aed66f0f012a"
  },
  {
    "url": "workbox-sw.prod.v2.1.0.js",
    "revision": "e5f207838d7fd9c81835d5705a73cfa2"
  },
  {
    "url": "workbox-sw.prod.v2.1.0.js.map",
    "revision": "6fc68cbf40e4e2f38d2889fdaf5bc58a"
  }
]);

// Set up a route to match any requests made for URLs that end in .txt.
// The requests are handled with a network-first strategy.
// const route = new workbox.routing.RegExpRoute({
// 	regExp: /^https:\/\/snickdx\.me:3001\/events/,
// 	handler: new workbox.runtimeCaching.NetworkFirst(),
// });

// const router = new workbox.routing.Router();
// router.registerRoute({route});


workboxSW.router.registerRoute(
	/^https:\/\/snickdx\.me:3001\/events/,
	workboxSW.strategies.networkFirst()
);


workboxSW.router.registerRoute(/\.(?:png|gif|jpg)$/,
	workboxSW.strategies.cacheFirst({
		cacheName: 'images',
		cacheExpiration: {
			maxEntries: 50
		}
	})
);



