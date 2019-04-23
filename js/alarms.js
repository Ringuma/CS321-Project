var timer = {
	Daily : function(x){ //sets the alarm to a daily cycle
		// set to next go off at 11:59 pm each day
		var nextFire = moment([moment().year(), moment().month(), moment().date(), 23, 59, 59, 999]);
		var intervalInMinutes = 1440.0;

		//alert(moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + " " + nextFire.format("dddd, MMMM Do YYYY, h:mm:ss a"));

		var delay = nextFire.diff(moment(), "minutes", true);

		if (delay < 0) { // adds a day in minutes
			delay += 1440;
		}

		//alert(delay);

		chrome.alarms.create("time", {delayInMinutes: delay, periodInMinutes: intervalInMinutes});
		alert("Daily Frequency On");
	},

	Weekly : function(x){ //sets the alarm to a weekly cycle
		var daysUntilSunday = 6 - moment().day(); // day() represents what day of the week, 0-6
		// "days" part of array will overflow into months if next sunday is next month
		var nextFire = moment([moment().year(), moment().month(), moment().date() + daysUntilSunday, 23, 59, 59, 999]);
		var intervalInMinutes = 10080.0;

		//alert(moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + " " + nextFire.format("dddd, MMMM Do YYYY, h:mm:ss a"));

		var delay = nextFire.diff(moment(), "minutes", true);

		if (delay < 0) { // adds a day in minutes
			delay += 10080;
		}

		//alert(delay);

		chrome.alarms.create("time", {delayInMinutes: delay, periodInMinutes: intervalInMinutes});
		alert("Weekly Frequency On");
	},

	Monthly : function(x){ //sets the alarm to a monthly (30 day) cycle
		var nextFire = moment([moment().year(), moment().month() + 1, 1, 0, 0, 0, 0]);
		var intervalInMinutes = 43800.0;

		//alert(moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + " " + nextFire.format("dddd, MMMM Do YYYY, h:mm:ss a"));

		var delay = nextFire.diff(moment(), "minutes", true);

		if (delay < 0) { // adds a day in minutes
			delay += 43800;
		}

		//alert(delay);

		chrome.alarms.create("time", {delayInMinutes: delay, periodInMinutes: intervalInMinutes});
		alert("Monthly Frequency On");
	},
	Tester : function(x){ //tester creates an alarm that goes off every 30 seconds
		// difference between now and next start interval in minutes
		//var now = moment([moment().year(), moment().month(), moment().day(), moment().hour(), moment().minute(), moment().second(), moment().milliseconds()])
		var nextFire = moment([moment().year(), moment().month(), moment().date(), 11, 38, 0, 0]);
		var intervalInMinutes = 0.3;

		//alert(moment().year() + " " + moment().month() + " " + moment().day() + " ");
		//alert(moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + " " + nextFire.format("dddd, MMMM Do YYYY, h:mm:ss a"));

		var delay = nextFire.diff(moment(), "minutes", true);

		if (delay < 0) { // adds a day in minutes
			delay += 1440;
		}

		//alert(delay);

		chrome.alarms.create("time", {delayInMinutes: delay, periodInMinutes:intervalInMinutes});
		alert("Test Frequency On");
	},
	Off : function(x){ //turns the alarm off
		chrome.alarms.clear("time");
		alert("Recommendation Frequency Off");
	},
	setup: function(){ //setups which function is performed based on the id of the button in options.html
		var a = document.getElementById('daily');
		a.addEventListener('click', timer.Daily); //when a 'click' occurs for the button, the respective function is performed.
		var b = document.getElementById('weekly');
		b.addEventListener('click', timer.Weekly);
		var c = document.getElementById('monthly');
		c.addEventListener('click', timer.Monthly);
		var d = document.getElementById('test'); //adds a event listener to allow for test to timer
		d.addEventListener('click', timer.Tester );
		var e = document.getElementById('off');
		e.addEventListener('click', timer.Off);
	}
};

document.addEventListener('DOMContentLoaded', function(){ //adds an event listener that always goes to timer.setup function
	timer.setup();
});
