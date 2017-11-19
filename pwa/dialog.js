class Dialog{
	
	constructor(showModalSelector, closeDialogCallback) {
		this.dialog = document.querySelector('dialog');
		this.showSelector = showModalSelector;
		if (!this.dialog.showModal) dialogPolyfill.registerDialog(dialog);
		this.callback = closeDialogCallback;
	}
	
	enableListeners(){
		
		document.querySelector(this.showSelector).addEventListener('click', () => this.dialog.showModal());
		
		this.dialog.querySelector('.close').addEventListener('click', () => {
			this.dialog.close();
		});
		
		this.dialog.querySelector('.add-event').addEventListener('click', async ()=>{
			
			let newevent = {
				title: document.getElementById("title").value,
				date: document.getElementById("date").value,
				time: document.getElementById("time").value
			};
			
			if(newevent.title === "" || newevent.date === "" && newevent.time === ""){
				alert("Fields cant be blank!");
			}else{
				try{
					this.callback(newevent);
					document.querySelector('#title').value = "";
					document.querySelector('#date').value = "";
					document.querySelector('#time').value = "";
				}catch(e){
					console.log("error prob offline", e);
				}finally{
					this.dialog.close();
				}
			}
		});
		
	}
	
}







