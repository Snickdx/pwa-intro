//Just some html for a card, ${this.title}, ${this.date}, ${this.tme} place holder for variables
const CardTemplate = '<div class="mdl-cell mdl-cell--1-col demo-card-event mdl-card mdl-shadow--2dp">\
                        <div class="mdl-card__title mdl-card--expand">\
                        <h4>\
                          ${this.title}:<br>\
                          ${this.date}<br>\
                          ${this.time}\
                        </h4>\
                      </div>\
                      <div class="mdl-card__actions mdl-card--border">\
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">\
                          Add to Calendar\
                        </a>\
                        <div class="mdl-layout-spacer"></div>\
                        <i class="material-icons">event</i>\
                      </div>\
                    </div>';
                    

//** these don't really matter, whatever UI library you use would do this differently ***

//template binding, templating a template so we can reuse it
let makeHTML = (data, template) => new Function(`return \`${template}\`;`).call(data);

//ajax wrapped in a promise
let ajaxGet = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

//*****************************************************************************************

//********* This doesn't really matter either there are libraries which can do this as well 

    //monitors network state
    let monitorNetworkState = (onlineHandler, offlineHandler)=>{
        window.addEventListener('load', function() {
            window.addEventListener('online', event => onlineHandler());
            window.addEventListener('offline', event => offlineHandler());
        });
    }
//******************************************************************************************

(async ()=>{
    
    let events = [];
    
    let offlineHandler = () => {
        console.log("we offline");
        document.getElementById("status").innerHTML = "(Offline)";
        //if we have no data show offline msg otherwise do nothing
        if(events.length === 0) {
            document.getElementById("dynamic").innerHTML = "";
            document.getElementById("dynamic").innerHTML = "<h1>App Is Offline </h1>";
        }
    }
    
    let onlineHandler = async () => {
        
        if(navigator.offline)throw "App is offline";
        
        console.log("we online hoss");
        document.getElementById("status").innerHTML = "(Online)";
        
        //pull content
        events = JSON.parse(await ajaxGet("https://pwa-snickdx.c9users.io/api/events.json"));
        
        document.getElementById("dynamic").innerHTML = "";
        
        //write our content into the app
        events.forEach(event=>{
            document.getElementById("dynamic").innerHTML += makeHTML(event, CardTemplate);
        })    
    }
    
    try {
        //should work if the app is visited from the browser
        onlineHandler();
    }catch(e){
        //The app is probably opened from homescreen but device is offline
        console.log("Error maybe we offline", e);
    }
    finally{
        monitorNetworkState(onlineHandler, offlineHandler);
    }
    
    
})()