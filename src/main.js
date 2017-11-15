(async ()=>{
    
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
          <div class="mdl-card__actions mdl-card--border">
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Add to Calendar
            </a>
            <div class="mdl-layout-spacer"></div>
            <i class="material-icons">event</i>
          </div>
        </div>
    `;
    
    let registerSW = (readyFun) =>{
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                if (navigator.serviceWorker.controller) {
                  console.log('Active service worker found, no need to register')
                } else {
                  navigator.serviceWorker.register(
                    'sw.js',
                    {scope: '.'}
                  ).then(reg=>{
                    console.log('Service worker has been registered for scope:'+ reg.scope);
                    readyFun(reg);
                  })
                  .catch(err => {
                    console.log(`ServiceWorker registration failed: ${err}`);
                  });
                }
            });
        }
    }
    
    let events = [];
    
    const eventEndpoint = "https://pwa-snickdx.c9users.io:8081/events";
    
    let offlineMode = () => {
        console.log("App is offline");
        document.getElementById("status").innerHTML = "(Offline)";
        //if we have no data show offline msg otherwise do nothing
        if(events.length === 0) {
            document.getElementById("dynamic").innerHTML = "";
            document.getElementById("dynamic").innerHTML = "<h1>App Is Offline </h1>";
        }
    }
    
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
    }
    
    try {
        //should work if the app is visited from the browser
        loadDisplayEvents();
    }catch(e){
        //The app is probably opened from homescreen but device is offline
        console.log("Error maybe we offline", e);
    }finally{
        Lib.monitorNetworkState(loadDisplayEvents, offlineMode);
    }
    
    //registers the service worker
    registerSW(reg=>{
        //all code to be run when service worker is registered goes here
        
        
    })
    
})()//wrap all js code into an anonymous function and call it, keeps everything out of the global scope

