function(){
var al = 'timer'; //the name of the timer
var time = 1; //a variable that holds the current toggle state

function createAlarm(time){ //the generation of the various alarms that result in 
	//Have an if-else if statement for the different types to create? Track using a time variable
	//daily
	if(time = 3){
		chrome.alarms.create(al, {delayInMinutes: 1440, periodInMinutes: 1440});
		time = 1;
	}
	//weekly
	else if(time = 1){
		chrome.alarms.create(al, {delayInMinutes: 10080, periodInMinutes: 10080});
		time = 2;
	}
	// monthly
	else if(time = 2){?
		chrome.alarms.create(al, {delayInMinutes: 43800, periodInMinutes: 43800});
		time = 3;
	}
}

function shutOff(time){ //turns the recommender off.
	chrome.alarms.clear(al);
}

function check(callback){
	chrome.alarms.getAll(function(alarms){ //checks the current state of the toggle and provides text.
		var alarmOn = alarms.some(function(n){ return n.name == al;});
		if(alarmOn && time = 3;){
			document.getElementById('toogleAlarm').innerText = "Recommendations set to monthly. Turn Recommender on to Daily?";
		}else if(alarmOn && time = 1){
			document.getElementById('toogleAlarm').innerText = "Recommendations set to daily. Turn Recommender on to Weekly?";
		} else if(alarmOn && time = 2){
			document.getElementById('toogleAlarm').innerText = "Recommendations set to weekly. Turn Recommender on to Monthly";
		}
		if(callback) callback(alarmOn);
	})
}

function toggle(){ //the toggle of the recommender
	check(function(alarmOn){
		if(alarmOn && time = 3){
			shutOff(time);
			createAlarm(time);
		}else if(alarmOn && time = 1){
			shutOff(time);
			createAlarm(time);
		}else if(alarmOn && time = 2){
			shutoff(time);
			createAlarm(time);
		}
		check();
	});		
}

$$('#toggleAlarm').addEventListener('click', toggle);
check();

}();
