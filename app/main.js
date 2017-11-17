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

(async ()=>{
	

	

	
	let events = [];
	
	// const eventEndpoint = "http://localhost:8081/events";

	

	
	



})()//wrap all js code into an anonymous function and call it, keeps everything out of the global scope

const tokenEndpoint = "https://pwa-snickdx.c9users.io:8081/tokens";
const eventEndpoint = "https://pwa-snickdx.c9users.io:8081/events";

let loadDisplayEvents = async () => {
	
	console.log("App is online");
	document.getElementById("status").innerHTML = "(Online)";
	
	//pull content
	events = JSON.parse(await Lib.ajaxGet(eventEndpoint));
	
	document.getElementById("dynamic").innerHTML = "";
	
	//write our content into the app
	events.forEach(event=>{
		document.getElementById("dynamic").innerHTML += Lib.makeHTML(event, CardTemplate);
	})
};

loadDisplayEvents();