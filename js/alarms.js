var timer = {
	Daily: function(x){
		chrome.alarms.create("time", {delayInMinues: 0.1, periodInMinutes:0.2});
		window.close();
	},
	
	Weekly: function(x){
		chrome.alarms.create("time", {delayInMinues: 0.3, periodInMinutes:0.4});
		window.close();
	},
	
	Monthly: function(x){
		chrome.alarms.create("time", {delayInMinues: 0.5, periodInMinutes:0.6});
		window.close();	
	},
	
	setup: function(){
		var t = document.getElementById('Daily');
		t.addEventListener('click', timer.Daily);
		var t = document.getElementById('Weekly');
		t.addEventListener('click', timer.Weekly);
		var t = document.getElementById('Monthly');
		t.addEventListener('click', timer.Monthly);
	}
};

document.addEventListener('DOMContenetLoaded', function(){
	timer.setup();
});
