(async ()=>{
	
let cardTemplate  = (event)=>{
	return `
        <div class="mdl-cell mdl-cell--4-col  mdl-cell--12-col-phone md-cell--6-tablet demo-card-event mdl-card mdl-shadow--2dp">\
            <div class="mdl-card__title mdl-card--expand">
            <h4>
              ${event.title}:<br>
              ${event.date}<br>
              ${event.time}
            </h4>
          </div>
        </div>
    `;
}
	

	
let events = [];

// const server = "https://jcal-snickdx.c9users.io:8081";
const server = "http://localhost:8081";


let loadDisplayEvents = async () => {
	
	console.log("App is online");
	document.getElementById("status").innerHTML = "(Online)";
	
	//pull content
	events = JSON.parse(await Lib.ajaxGet(server+"/events"));
	
	document.getElementById("dynamic").innerHTML = "";
	
	//write our content into the app
	events.forEach(event=>{
		document.getElementById("dynamic").innerHTML += cardTemplate(event);
	})
};

loadDisplayEvents();

})()//wrap all js code into an anonymous function and call it, keeps everything out of the global scope




