(function(){
var al = 'Pop-Up'; //a placeholder variable that appears at the toggled interval
var time = 0; //a variable that holds the current toggle state

function createAlarm(time){ //the generation of the various alarms that result in 
	//Have an if-else if statement for the different types to create? Track using a time variable
	//daily
	if(time = 0){
		chrome.alarms.create(al, {periodInMinutes: 1440});
		time = 1;
	}
	//weekly
	else if(time = 1){
		chrome.alarms.create(al, {periodInMinutes: 10080});
		time = 2;
	}
	// monthly
	else if(time = 2){?
		chrome.alarms.create(al, {periodInMinutes: 43200});
		time = 3;
	}
}

function shutOff(time){ //turns the recommender off.
	chrome.alarms.clear(al);
	time = 0;
}

function check(callback){
	chrome.alarms.getAll(function(alarms){ //checks the current state of the toggle and provides text.
		var alarmOn = alarms.some(function(n){ return n.name == al;});
		if(alarmOn && time = 3;){
			document.getElementById('toogleAlarm').innerText = "Recommendations set to monthly. Turn Recommender Off?";
		} else if(time = 0){
			document.getElementById('toogleAlarm').innerText = "Recommender off. Turn Recommender on to Daily?";
		}else if(alarmOn && time = 1){
			document.getElementById('toogleAlarm').innerText = "Recommendations set to daily. Turn Recommender on to Weekly?";
		} else if(alarmOn && time = 2){
			document.getElementById('toogleAlarm').innerText = "Recommendations set to weekly. Turn Recommender on to Monthly";
		}
		if(callback) callback(alarmOn);
	})
}

function toogle(){ //the toggle of the recommender
	check(function(alarmOn){
		if(alarmOn && time = 3){
			shutOff();
		}else if(time = 0){
			createAlarm(time);
			document.getElementById(
		}
		else if(alarmOn && time = 1){
			createAlarm(time);
		}else if(alarmOn && time = 2){
			createAlarm(time);
		}
		checkAlarm();
	});		
}

$$('#toogleAlarm').addEventListener('click', toggle);
checkAlarm();

})();
