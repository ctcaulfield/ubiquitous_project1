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
	 document.getElementById("players").innerHTML="<p>"+msg+"</p>";
	 //message will come in as "x:data" - where x is the 
	 //type of information and data is the information
//  	 var message = string.split(':');
//  	 switch(array[0]){
//  	 	case "PLAYER":
//  	 		setPlayer(message[1]);
//  	 	break;
//  	 	case "STATE":
//  	 		addWeapon(message[1]);
//  	 	break;
//  	 }
});

//create the player - this will only be done once for each bean connected
function setPlayer(data){

	//player div with id of their username from bean
	var playerDiv = document.createElement("div");
	playerDiv.id = data;

	//add playerDiv to parent div of all players
	var players = document.getElementById("players");
	players.append(playerDiv);

	//give the player a name and append to the player div
	var name = document.createElement("H2");
	playerDiv.appendChild(name);
	name.createTextNode(data);

	//give the player their "draw hand"
	//which will display rock,paper,or sissors
	var drawHand = document.createElement("H4");
	element.classList.add("drawHand");
	playerDiv.appendChild(drawHand);

	//give the player their score!
	var score = document.createElement("H4");
	element.classList.add("score");	
	playerDiv.appendChild(score);

}

//gets the players duel selection and sets it to their "DrawHand"
function addWeapon(data){
	// data = "a_b", where a is their userid and b is their duel move
	var info = string.split('_');
	var player = document.getElementById(info[0]);
	var drawHand = player.getElementByClassName("drawHand")[0];
	drawHand.innerHTML = info[1];

}

//logic will go here of determing who won the round
function letsDuel(){
	//loop through players and get the weapon of each player.

	//Determine which player won based on game rules

	//append a point to the players score based on who won

	//increment the round count once the round is over.

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