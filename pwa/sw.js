importScripts('/node_modules/workbox-sw/build/importScripts/workbox-sw.dev.v2.1.2.js');
importScripts("key.js","lib/firebase.js","lib/dexie.js","lib/lib.js");

firebase.initializeApp(config);

const messaging = firebase.messaging();
const workboxSW = new WorkboxSW({clientsClaim: true});
const eventEndpoint = "https://pwa-snickdx.c9users.io:8081/events";

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
    "revision": "1fcc53af4817d1d407503cceb186b356"
  },
  {
    "url": "manifest.json",
    "revision": "e62867a022bdd6be28e928ad144f490c"
  },
  {
    "url": "sw-src.js",
    "revision": "a598344c4b8dca10f8a62a79a772f792"
  },
  {
    "url": "sw.js",
    "revision": "3443a3a7ba942bc02fbdedcd6acf83e9"
  },
  {
    "url": "wb-sw.js",
    "revision": "fef38cfbfd610fde568cb8ed9f5668fc"
  },
  {
    "url": "workbox-sw.dev.v2.1.2.js",
    "revision": "acb8524aabe8c4222c32aed66f0f012a"
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
	eventEndpoint,
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

self.addEventListener('sync', function(event) {
	event.waitUntil(new Promise(async (resolve, reject)=>{
		try{
			let db = Lib.initDB('EventQueue', {events: 'title, date, time'});
			
			await db.events
				.each (async function (event) {
					Lib.fetchPost(eventEndpoint, event);
				}).then(()=>{
					console.log("Queued Events Sent!");
					resolve(db.events.clear());
					self.registration.showNotification("Event Success", {
						body: "Your event was sent successfully in the background!",
						icon: "images/android-desktop.png",
						badge: "images/cal.png"
					});
				});
		}catch(e){
			reject(e)
		}
	}));
	
});

self.addEventListener('push', function(event) {
	var title = 'Yay a message.';
	var body = 'We have received a push message.';
	var icon = 'images/android-desktop.png';
	var tag = 'simple-push-example-tag';
	event.waitUntil(
		self.registration.showNotification(title, {
			body: body,
			icon: icon,
			tag: tag
		})
	);
});