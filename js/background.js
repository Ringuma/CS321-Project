chrome.alarms.onAlarm.addListener(function(alarm) {
  alert("You have a new recommendation! Check the pop-up to view it.");
  chrome.runtime.onMessage.addListener( //responds to a message from recommendation.js
	function(request, sender, sendResponse){
			if(request.check == "here")
				sendResponse({call: "there"});
	});
});
