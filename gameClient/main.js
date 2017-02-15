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
	//create the player

	//player div with id of their username from bean
	var playerDiv = document.createElement("div");
	playerDiv.id = data;

	//add playerDiv to parent div of all players
	var players = document.getElementById("players");
	players.append(playerDiv);

	//give the player a name and append to the player div
	var playerTitle = document.createElement("H1");
	playerDiv.appendChild(playerTitle);
	playerTitle.createTextNode(data); 


}

function letsDuel(data){
	// data = "a_b", where a is their userid and b is their duel
	var info = string.split('_');
	var players = document.getElementById(info[0]);
}


function turnOff() {
	ws.send("OFF:");
}

//Once the timer is completed the state
//will be requested from each of the beans
//each user of the bean will be able to make their choice
//until the getState method is called.
function getState(){
	ws.send("GIVE:STATE");
}