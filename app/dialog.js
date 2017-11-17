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
			await Lib.ajaxPost(eventEndpoint, newevent);
			loadDisplayEvents();
		}catch(e){
			console.log("error prob offline", e);
		}finally{
			dialog.close();
		}
	}
	
	
});