var ws = new WebSocket('ws://localhost:1234'); 

ws.onopen = function () {
	console.log("connected!!!");
};

ws.onerror = function (error) {
	console.log("error: "+error);
};

ws.addEventListener("message", function(e) {     
	 // The data is simply the message that we're sending back     
	 var msg = e.data;      
	 console.log(msg);
	 //message will come in as "x:data" - where x is the 
	 //type of information and data is the information
	 var message = string.split(':');
	 switch(array[0]){
	 	case "PLAYER":
	 		setPlayer(message[1]);
	 	break;

	 	case "STATE":
	 		setPlayer(message[1]);
	 	break;
	 }
	 // document.getElementById("currentTemp").innerHTML="<p>As of "+new Date()+", Current "+msg+" degrees Celsius</p>";
});


function setPlayer(data){
	//give give that side of the scoreboard their name
}

function letsDuel(data){
	//data will show - id-paper, so we know which one sent them move
	//and where to place the selection under
}



// function outputUpdate(which,val) {
// 	var selector = "Value";
// 	switch (which) {
// 		case 'red': 
// 			selector = "#red"+selector;
// 			break;
// 		case 'green': 
// 			selector = "#green"+selector;
// 			break;
// 		case 'blue': 
// 			selector = "#blue"+selector;
// 			break;
// 	}
	
// 	document.querySelector(selector).value = val;
// 	var message = which.substr(0,1)+":"+val;
// 	ws.send(message); 
// }

function turnOff() {
	ws.send("OFF:");
}

// function getTemp() {
// 	ws.send("TEMP:");
// }

//Once the timer is completed the state
//will be requested from each of the beans
//each user of the bean will be able to make their choice
//until the getState method is called.
function getState(){
	ws.send("GIVE:STATE");
}