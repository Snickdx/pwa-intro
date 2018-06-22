//TODO: Web Share
//TODO: Pull events from google cal
//TODO: Add event to calendar
//TODO: Notifications for new events

{
	//**************** SOME SETUP STUFF *************************************
	let fb = firebase.initializeApp(config);
	let messaging = fb.messaging();// load firebase messaging library
	let events = [];//app state
	let network = "online";
	let msgToken = null;
	let syncRegistered = false;
	const tokenEndpoint = "https://snickdx.me:3002/tokens";
	const eventEndpoint = "https://snickdx.me:3002/events";
	const swFile = 'sw.js'; //workbox cli service worker : (npm run wb-buld)
	
	
	//*********************** HTML TEMPLATE FOR CONTENT ****************************************************************
	//Just some html for a card, ${this.title}, ${this.date}, ${this.time} place holder for variables
	const CardTemplate =`<div class="mdl-cell mdl-cell--4-col  mdl-cell--12-col-phone md-cell--6-tablet demo-card-event mdl-card mdl-shadow--2dp">\
            <div class="mdl-card__title mdl-card--expand">
            <h4>
              \${this.title}:<br>
              \${this.date}<br>
              \${this.time}
            </h4>
          </div>
			<button value="\${this.title}" class="share-btn mdl-button mdl-js-button mdl-button--primary">
			  Share
			</button>
        </div>`;
	
	//encapsulate different behaviours depending on the network situation
	let offlineMode = () => {
		console.log("App is offline");
		network = "offline";
		document.getElementById("status").innerHTML = "(Offline)";
		
	};
	
	let onlineMode = ()=>{
		console.log("App is online");
		document.getElementById("status").innerHTML = "(Online)";
		network = "online";
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
	
	//****************** REQUEST NOTIFICATION PERMISSION ************************
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
		}else {
			// console.log("Deleteing token", msgToken);
			// messaging.deleteToken(msgToken);
			// document.querySelector('#notifications').MaterialSwitch.off();
			// msgToken = null;
		}
	};
	
	//**************** CODE TO HANDLE OFFLINE BEHAVIOUR *************************
	//basically tells the user that the app is offline and shows cached data
	try {
		//should work if the app is visited from the browser
		loadDisplayEvents();
		navigator.onLine ? onlineMode() : offlineMode();
		
	}
	catch(e){
		//The app is opened offline but there's no data in cache
		console.log("Error maybe we offline", e);
		//if we have no data show offline msg otherwise do nothing
		if(events.length === 0) {
			document.getElementById("dynamic").innerHTML = "";
			document.getElementById("dynamic").innerHTML = "<h1>App Is Offline </h1>";
		}
	}
	finally{
		//choose how the app behaves depending on network status
		Lib.monitorNetworkState(onlineMode, offlineMode);
	}
	
	//******************** ADD EVENT DIALOG *************************************
	let eventDialog = new Dialog(".show-modal", async newevent=>{
		await Lib.ajaxPost(eventEndpoint, newevent);
		if(network === "offline"){
			console.log("app is offline queueing event");
			alert("App is offline, we'll notify you when the event is created");
		}else{
			loadDisplayEvents();
		}
	});
	
	eventDialog.enableListeners();
	
	//********************* REGISTER THE SERVICE WORKER IN BROWSER ************************************
	//do some checks for SW support and pass a reg object to a callback function
	let registerSW = async (readyFun) =>{
		if ('serviceWorker' in navigator) {
			window.addEventListener('load',async () => {
				
				let reg;
				if (navigator.serviceWorker.controller) {//service worker already exists so just pass reg object to callback
					console.log('Active service worker found, no need to register');
					reg = await navigator.serviceWorker.getRegistration(".");
				} else {
					reg = await navigator.serviceWorker.register(swFile, {scope: '.'});//register the service worker
					console.log('Service worker has been registered for scope:'+ reg.scope);
				}
				readyFun(reg);//<--- pass reg object to callback
				
			});
		}
	};
	
	//********************* REGISTER THE SERVICE WORKER *************************
	//all code to be run after registration goes here
	//such as linking firebase messaging to sw and handling notifications
	registerSW(async reg=>{
		loadDisplayEvents();
		messaging.useServiceWorker(reg);
		
		messaging.onMessage(function(payload) {
			console.log("Message received. ", payload);
		});
		
		msgToken = await messaging.getToken();
		if(msgToken !== null){
			console.log("flipping switch");
			document.querySelector('#notifications').MaterialSwitch.on();
		}
		// console.log("notifications enabled: ", msgToken !== null, msgToken);
	})
	
}// keeps everything out of the global scope


