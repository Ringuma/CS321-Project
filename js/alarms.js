var timer = {
	Daily: function(x){ //creates the timer for daily periods.
		chrome.alarms.create("time", {delayInMinutes: 1.0, periodInMinutes:1439.0});
	},
	
	Weekly: function(x){ //creates the timer for weekly periods
		chrome.alarms.create("time", {delayInMinutes: 1.0, periodInMinutes:10079.0});
	},
	
	Monthly: function(x){ //creates the timer for the monthly periods
		chrome.alarms.create("time", {delayInMinutes: 1.0, periodInMinutes:43799.0});
		window.close();	
	},
	Off : function(x){ //removes any active timer.
		chrome.alarms.clear("time");
	},
	setup: function(){ //setups which function is performed based on the id of the button in options.html
		var t = document.getElementById('daily');
		t.addEventListener('click', timer.Daily); //when a 'click' occurs for the button, the respective function is performed.
		var t = document.getElementById('weekly');
		t.addEventListener('click', timer.Weekly);
		var t = document.getElementById('monthly');
		t.addEventListener('click', timer.Monthly);
		var t = document.getElementById('off');
		t.addEventListener('click', timer.Off);
	}
};

document.addEventListener('DOMContenetLoaded', function(){ //adds an event listener that always goes to timer.setup function
	timer.setup();
});
