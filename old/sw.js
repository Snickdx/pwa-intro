importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
importScripts("lib/firebase.js", "key.js");//make your own key.js file and define a config variable containing your firebase config

firebase.initializeApp(config);//config object defined by key.js
firebase.messaging();
const eventEndpoint = "https://snickdx.me:3002/events";

workbox.precaching.precacheAndRoute([
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
    "revision": "55d5a08a8525bf7d48110f9e562e1d48"
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
    "revision": "40ded513d2edf3214266c47d5d3a129e"
  },
  {
    "url": "manifest.json",
    "revision": "eb294c245c4d41cf28c584c92aae3a4e"
  },
  {
    "url": "sw-src.js",
    "revision": "07ee45382b5e0acb31fdf964c829b7bd"
  }
]);

workbox.routing.registerRoute(
	new RegExp(eventEndpoint),
	workbox.strategies.staleWhileRevalidate({
		cacheName:"events-cache",
		plugins: [
			new workbox.expiration.Plugin({
				maxAgeSeconds: 7 * 24 * 60 * 60,
				maxEntries: 10,
				cacheableResponse: {statuses: [0, 200]}
			})
		]
	})
);