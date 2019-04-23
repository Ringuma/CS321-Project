chrome.runtime.onInstalled.addListener(function(){ //automatically sets a daily frequency when the extension is first installed.
	// set to next go off at 11:59 pm each day
	var nextFire = moment([moment().year(), moment().month(), moment().date(), 19, 16, 0, 0]);
	var intervalInMinutes = 0.3;

	//alert(moment().year() + " " + moment().month() + " " + moment().day() + " ");
	//alert(moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + " " + nextFire.format("dddd, MMMM Do YYYY, h:mm:ss a"));

	var delay = nextFire.diff(moment(), "minutes", true);

	if (delay < 0) { // adds a day in minutes
		delay += 1440;
	}
	//alert(delay);

	chrome.alarms.create("time", {delayInMinutes: delay, periodInMinutes: intervalInMinutes});
	alert("Thank you for installing or updating Anime Recommendation Extension! The Recommendation Frequency is set to Daily.");
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  alert("You have a new recommendation! Check the pop-up to view it.  If pop-up is already open, please close and reopen it.");
  var nex = "there"; //nex is the message being sent to the recommendation.js to determine if a new recommendation is computed or not
  chrome.runtime.onConnect.addListener(function(port){
  	port.postMessage({check:nex});
  	nex = "wait"; //nex is changed until the next time the timer goes off
   });
});
