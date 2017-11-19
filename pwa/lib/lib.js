 class Lib{
    
    //template binding, templating a template so we can reuse it
    static makeHTML(data, template){ 
        return new Function(`return \`${template}\`;`).call(data);
    }
    
    //ajax wrapped in a promise
    static ajaxGet(url){
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
      });
    }
    
    static ajaxPost(url, data){
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(JSON.stringify(data));
      });
    }
	 
    static fetchPost(url, data){
	    return fetch(url, {
		    "method": "POST",
		    headers: new Headers({
			    "Content-Type": "application/json",
			    "Accept":"application/json"
		    }),
		    mode : 'cors',
		    "body": JSON.stringify(data)
	    })
    }
    
    static monitorNetworkState(onlineHandler, offlineHandler){
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
    
    static initDB(name, schema){
		 let db = new Dexie(name);
		
		 // Define a schema
		 db.version(1).stores(schema);
	  
		 // Open the database
		 db.open().catch(function(error) {
			 alert('DB error: ' + error);
		 });
		
		 return db;
	 };
	 
    
 }