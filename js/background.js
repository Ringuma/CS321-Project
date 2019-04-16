chrome.runtime.onInstalled.addListener(function(){ //automatically sets a daily frequency when the extension is first installed.
		chrome.alarms.create("time", {delayInMinutes: 1440.0, periodInMinutes:1440.0});
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  alert("You have a new recommendation! Check the pop-up to view it.");
  chrome.runtime.onMessage.addListener( //responds to a message from recommendation.js
	function(request, sender, sendResponse){
			if(request.check == "here")
				sendResponse({call: "there"});
	});
});
