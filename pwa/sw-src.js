// importScripts('workbox-sw.dev.v2.1.2.js');
importScripts('/node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.1.2.js');


const workboxSW = new WorkboxSW();

workboxSW.precache([]);

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



