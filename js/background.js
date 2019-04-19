chrome.runtime.onInstalled.addListener(function(){ //automatically sets a daily frequency when the extension is first installed.
		chrome.alarms.create("time", {delayInMinutes: 1440.0, periodInMinutes:1440.0});
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  alert("You have a new recommendation! Check the pop-up to view it.");
  var nex = "there"; //nex is the message being sent to the recommendation.js to determine if a new recommendation is computed or not
  chrome.runtime.onConnect.addListener(function(port){
  	port.postMessage({check:nex});
  	nex = "wait"; //nex is changed until the next time the timer goes off
   });
});
