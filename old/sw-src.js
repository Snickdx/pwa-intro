importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
importScripts("lib/firebase.js", "key.js");//make your own key.js file and define a config variable containing your firebase config

firebase.initializeApp(config);//config object defined by key.js
firebase.messaging();
const eventEndpoint = "https://snickdx.me:3002/events";

workbox.precaching.precacheAndRoute([]);

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