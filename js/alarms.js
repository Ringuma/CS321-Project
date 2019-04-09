var timer = {
	Daily: function(x){
		chrome.alarms.create("time", {delayInMinutes: 1.0, periodInMinutes:1439.0});
	},
	
	Weekly: function(x){
		chrome.alarms.create("time", {delayInMinutes: 1.0, periodInMinutes:10079.0});
	},
	
	Monthly: function(x){
		chrome.alarms.create("time", {delayInMinutes: 1.0, periodInMinutes:43799.0});
		window.close();	
	},
	Off : function(x){
		chrome.alarms.clear("time");
	},
	setup: function(){
		var t = document.getElementById('daily');
		t.addEventListener('click', timer.Daily);
		var t = document.getElementById('weekly');
		t.addEventListener('click', timer.Weekly);
		var t = document.getElementById('monthly');
		t.addEventListener('click', timer.Monthly);
		var t = document.getElementById('off');
		t.addEventListener('click', timer.Off);
	}
};

document.addEventListener('DOMContenetLoaded', function(){
	timer.setup();
});
