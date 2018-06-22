importScripts('workbox-sw.prod.v2.1.2.js');
importScripts("key.js","lib/firebase.js","lib/dexie.js","lib/lib.js");

firebase.initializeApp(config);

const messaging = firebase.messaging();
const workboxSW = new WorkboxSW({clientsClaim: true});
const eventEndpoint = "https://pwa-snickdx.c9users.io:8081/events";

workboxSW.precache([]);

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