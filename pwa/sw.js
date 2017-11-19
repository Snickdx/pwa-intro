firebase.initializeApp(config);
let messaging = firebase.messaging();

const eventEndpoint = "https://pwa-snickdx.c9users.io:8081/events";

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