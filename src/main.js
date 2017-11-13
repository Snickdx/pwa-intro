//Just some html for a card, ${this.title}, ${this.date}, ${this.tme} place holder for variables
const CardTemplate = '<div class="mdl-cell mdl-cell--4-col  mdl-cell--12-col-phone md-cell--6-tablet demo-card-event mdl-card mdl-shadow--2dp">\
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

let ajaxPost = (url, data) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(JSON.stringify(data));
  });
}

//*****************************************************************************************

//********* This doesn't really matter either there are libraries which can do this as well 

    //monitors network state
    let monitorNetworkState = (onlineHandler, offlineHandler)=>{
        window.addEventListener('load', function() {
            window.addEventListener('online', event =>{ 
                if(navigator.onLine)
                    onlineHandler(); 
            });
            window.addEventListener('offline', event => {
                if(!navigator.onLine)
                    offlineHandler()
            });
        });
    }
//******************************************************************************************

(async ()=>{
    
    let events = [];
    
    const eventEndpoint = "https://pwa-snickdx.c9users.io:8081/events";
    
    let offlineHandler = () => {
        console.log("App is offline");
        document.getElementById("status").innerHTML = "(Offline)";
        //if we have no data show offline msg otherwise do nothing
        if(events.length === 0) {
            document.getElementById("dynamic").innerHTML = "";
            document.getElementById("dynamic").innerHTML = "<h1>App Is Offline </h1>";
        }
    }
    
    let onlineHandler = async () => {
        
        console.log("App is online");
        document.getElementById("status").innerHTML = "(Online)";
        
        //pull content
        events = JSON.parse(await ajaxGet(eventEndpoint));
        
        document.getElementById("dynamic").innerHTML = "";
        
        //write our content into the app
        events.forEach(event=>{
            document.getElementById("dynamic").innerHTML += makeHTML(event, CardTemplate);
        })    
    }
    
    let queue = [];
    
    try {
        //should work if the app is visited from the browser
        onlineHandler();
         navigator.serviceWorker.ready.then(reg => {
          return reg.sync.register('eventSync').then(res=>{
              console.log("ey?");
          });
        });
    }catch(e){
        //The app is probably opened from homescreen but device is offline
        console.log("Error maybe we offline", e);
    }
    finally{
        monitorNetworkState(onlineHandler, offlineHandler);
    }
    
    var dialog = document.querySelector('dialog');
    var showModalButton = document.querySelector('.show-modal');
    
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    
    showModalButton.addEventListener('click', () => {
        dialog.showModal();
    });
    
    dialog.querySelector('.close').addEventListener('click', () => {
        dialog.close();
    });
    
    dialog.querySelector('.add-event').addEventListener('click', async ()=>{
      
        let newevent = {
            title: document.getElementById("title").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value
        };
        
        if(newevent.title == "" || newevent.date == "" && newevent.time == ""){
            alert("Fields cant be blank!");
        }else{
            try{
                let res = await ajaxPost(eventEndpoint, newevent);
                onlineHandler();
            }catch(e){
                console.log("error prob offline");
                
                queue.push(newevent);
                
                if(queue.length == 1){
                    console.log("first event added to queue, setting up sync")
                   
                }
                
            }finally{
                dialog.close();
            }
        }
        
        
    });
    
    let syncHandler = async ()=>{
            console.log("back online sending out requests");
         
            queue.forEach(async newevent => {
                await ajaxPost(eventEndpoint, newevent);
            })
            
            queue = [];
            
            onlineHandler();
     };
                      
})()