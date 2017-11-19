//TODO: Web Share
//TODO: Pull events from google cal
//TODO: Add event to calendar
//TODO: Notifications for new events

{
	
	//Just some html for a card, ${this.title}, ${this.date}, ${this.tme} place holder for variables
	const CardTemplate =`
        <div class="mdl-cell mdl-cell--4-col  mdl-cell--12-col-phone md-cell--6-tablet demo-card-event mdl-card mdl-shadow--2dp">\
            <div class="mdl-card__title mdl-card--expand">
            <h4>
              \${this.title}:<br>
              \${this.date}<br>
              \${this.time}
            </h4>
          </div>
        </div>
    `;
	
	let registerSW = async (readyFun) =>{
		if ('serviceWorker' in navigator) {
			window.addEventListener('load',async () => {
				if (navigator.serviceWorker.controller) {
					console.log('Active service worker found, no need to register');
					let reg = await navigator.serviceWorker.getRegistration(".");
					readyFun(reg);
				} else {
					navigator.serviceWorker.register('service-worker.js', {scope: '.'})
						.then(reg=>{
							console.log('Service worker has been registered for scope:'+ reg.scope);
							readyFun(reg);
						})
						.catch(err => {
							console.log(`ServiceWorker registration failed: ${err}`);
						});
				}
			});
		}
	};
	let events = [];
	let fb = firebase.initializeApp(config);
	let messaging = fb.messaging();
	let msgToken = null;
	let db = Lib.initDB('EventQueue', {events: 'title, date, time'});
	
	let network = "online";
	let syncRegistered = false;
	
	//use these local endpoints if the other ones aren't available
	// const eventEndpoint = "http://localhost:8081/events";
	// const eventEndpoint = "http://localhost:8081/tokens";
	const tokenEndpoint = "https://pwa-snickdx.c9users.io:8081/tokens";
	const eventEndpoint = "https://pwa-snickdx.c9users.io:8081/events";
	
	let offlineMode = () => {
		console.log("App is offline");
		network = "offline";
		document.getElementById("status").innerHTML = "(Offline)";
		//if we have no data show offline msg otherwise do nothing
		if(events.length === 0) {
			document.getElementById("dynamic").innerHTML = "";
			document.getElementById("dynamic").innerHTML = "<h1>App Is Offline </h1>";
		}
	};
	
	let onlineMode = ()=>{
		console.log("App is online");
		document.getElementById("status").innerHTML = "(Online)";
		network = "online";
		loadDisplayEvents();
	};
	
	let loadDisplayEvents = async () => {
		
		//pull content
		events = JSON.parse(await Lib.ajaxGet(eventEndpoint));
		
		document.getElementById("dynamic").innerHTML = "";
		
		//write our content into the app
		events.forEach(event=>{
			document.getElementById("dynamic").innerHTML += Lib.makeHTML(event, CardTemplate);
		})
	};
	
	try {
		//should work if the app is visited from the browser
		loadDisplayEvents();
	}catch(e){
		//The app is probably opened from homescreen but device is offline
		console.log("Error maybe we offline", e);
	}finally{
		Lib.monitorNetworkState(onlineMode, offlineMode);
	}
	
	document.querySelector("#notifications").onclick = () => {
		if(!msgToken){
			messaging.requestPermission()
				.then(async function() {
					msgToken = await messaging.getToken();
					Lib.ajaxPost(tokenEndpoint, {"token": msgToken});
					console.log('Notification permission granted', msgToken);
					document.querySelector('#notifications').MaterialSwitch.on();
					
				})
				.catch(function(err) {
					console.log('Unable to get permission to notify.', err);
				});
		}else{
			// console.log("Deleteing token", msgToken);
			// messaging.deleteToken(msgToken);
			// document.querySelector('#notifications').MaterialSwitch.off();
			// msgToken = null;
		}
		
	};
	
	//Enable Dialog
	let eventDialog = new Dialog(".show-modal", async newevent=>{
		if(network === "offline"){
			console.log("app is offline queueing event");
			alert("App is offline, we'll notify you when the event is created");
			let reg = await navigator.serviceWorker.ready;
			db.events.add(newevent);
			reg.sync.register('EventSync');
		}else{
			await Lib.ajaxPost(eventEndpoint, newevent);
			loadDisplayEvents();
		}
	});
	
	eventDialog.enableListeners();
	
	//registers the service worker
	registerSW(async reg=>{
		//all code to be run when service worker is registered goes here
		
		messaging.useServiceWorker(reg);
		
		messaging.onMessage(function(payload) {
			console.log("Message received. ", payload);
		});
		
		msgToken = await messaging.getToken();
		if(msgToken !== null){
			console.log("flipping switch");
			document.querySelector('#notifications').MaterialSwitch.on();
		}
		console.log("notifications enabled: ", msgToken !== null, msgToken);
		
	})
}// keeps everything out of the global scope


