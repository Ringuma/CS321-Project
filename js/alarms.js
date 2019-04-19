var timer = {
	Daily : function(x){ //sets the alrarm to a daily cycle
		chrome.alarms.create("time", {delayInMinutes: 1440.0, periodInMinutes:1440.0});
		alert("Daily Frequency On");
	},
	
	Weekly : function(x){ //sets the alarm to a weekly cycle
		chrome.alarms.create("time", {delayInMinutes: 10080.0, periodInMinutes:10080.0});
		alert("Weekly Frequency On");
	},
	
	Monthly : function(x){ //sets the alarm to a monthly (30 day) cycle
		chrome.alarms.create("time", {delayInMinutes: 438000.0, periodInMinutes:43800.0});
		alert("Monthly Frequency On");
	},
	Tester : function(x){ //tester creates an alarm that goes off every 30 seconds
		chrome.alarms.create("time", {delayInMinutes: 0.3, periodInMinutes:0.3});
		alert("Test Frequency On");
	},
	Off : function(x){ //turns the alarm off
		chrome.alarms.clear("time");
		alert("Recommendation Frequency Off");
	},
	setup: function(){ //setups which function is performed based on the id of the button in options.html
		var t = document.getElementById('daily');
		t.addEventListener('click', timer.Daily); //when a 'click' occurs for the button, the respective function is performed.
		var t = document.getElementById('weekly');
		t.addEventListener('click', timer.Weekly);
		var t = document.getElementById('monthly');
		t.addEventListener('click', timer.Monthly);
		var t = document.getElementById('test'); //adds a event listener to allow for test to timer
		t.addEventListener('click', timer.Tester );
		var t = document.getElementById('off');
		t.addEventListener('click', timer.Off);
	}
};

document.addEventListener('DOMContenetLoaded', function(){ //adds an event listener that always goes to timer.setup function
	timer.setup();
});
