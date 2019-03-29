chrome.runtime.onLaunched.addListener(function(){
	chrome.app.window.create('html/popup.html', {
			id: 'main',
			bounds: { width: 500, height: 500 }
		});
});
	chrome.alarms.onAlarm.addListener(function(timer){
		alert("I am recommending something!");
	}
}
