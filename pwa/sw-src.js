importScripts('/node_modules/workbox-sw/build/importScripts/workbox-sw.dev.v2.1.2.js');

const workboxSW = new WorkboxSW({clientsClaim: true});


workboxSW.precache([]);

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



