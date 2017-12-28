importScripts('/node_modules/workbox-sw/build/importScripts/workbox-sw.dev.v2.1.2.js');

const workboxSW = new WorkboxSW({clientsClaim: true});


workboxSW.precache([
  {
    "url": "dialog.js",
    "revision": "a91890c984b1692bd45ec1b56e2b4c2d"
  },
  {
    "url": "images/512-logo.png",
    "revision": "337e1d8c670bc32bba08b8fdbdac6a85"
  },
  {
    "url": "images/android-desktop.png",
    "revision": "60aa56f0b069c8446c3a2857978a2724"
  },
  {
    "url": "images/cal.png",
    "revision": "0c48872cf9b9504e726f98d000d03063"
  },
  {
    "url": "images/favicon.png",
    "revision": "680eaca6af54de743d08b413ebb4c4b9"
  },
  {
    "url": "images/ios-desktop.png",
    "revision": "a2cdce82ff3e7af9a0abcd242d3f2ec7"
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
    "url": "lib/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2",
    "revision": "028d9900edc4539c71febbba998c9a8c"
  },
  {
    "url": "lib/dexie.js",
    "revision": "81f6b0173faaab2868cfedbc951b1a22"
  },
  {
    "url": "lib/firebase.js",
    "revision": "bc4d476bb821aea3ae43771a36e00dc6"
  },
  {
    "url": "lib/fonts.css",
    "revision": "b9ffd1470ae3a31ff0600c57a274a56f"
  },
  {
    "url": "lib/lib.js",
    "revision": "cf1c60a9f7da6e020fbc65ff31e9c228"
  },
  {
    "url": "lib/material.cyan-light_blue.min.css",
    "revision": "921f0b910d1f2e21eecf424f072613ca"
  },
  {
    "url": "lib/material.min.js",
    "revision": "e00d1a118138a17cbdbdf58c869f9730"
  },
  {
    "url": "main.css",
    "revision": "74d0852f21c1fa0b4f216240453e905b"
  },
  {
    "url": "main.js",
    "revision": "8db588e3d8a889252bfc71b4746facd6"
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
    "revision": "908e69cd96b057fd038636d7c723a3b6"
  },
  {
    "url": "sw.js",
    "revision": "d71ca84f52a591cc49cd19ec1d700352"
  },
  {
    "url": "wb-sw.js",
    "revision": "0fbf14656883826a4f8111cdef06a4db"
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
  },
  {
    "url": "workbox-sw.prod.v2.1.2.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
  },
  {
    "url": "workbox-sw.prod.v2.1.2.js.map",
    "revision": "8e170beaf8b748367396e6039c808c74"
  }
]);

//caches an api request made by app
workboxSW.router.registerRoute(
	'https://snickdx.me:3001/events',
	workboxSW.strategies.cacheFirst({
		cacheName:"eventsCache"
	})
);

//caches any images that is loaded by the app
workboxSW.router.registerRoute(/\.(?:png|gif|jpg)$/,
	workboxSW.strategies.cacheFirst({
		cacheName: 'images',
		cacheExpiration: {
			maxEntries: 50
		}
	})
);



