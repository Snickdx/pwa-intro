 class Lib{
    
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
    
 }