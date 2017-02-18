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
	//document.getElementById("players").innerHTML="<p>"+msg+"</p>";
	//message will come in as "x:data" - where x is the 
	//user id and data is their chioce of weapon.
 	var message = msg.split(':');

 	//check if the player exists 
 	//each player has its own div within the parent div - "players"
 	if(!document.getElementById(message[0])){
 	 	//set the player
 	 	setPlayer(message[0]);
 	}
});



//create the player - this will only be done once for each bean connected
function setPlayer(data){

	//player div with id of their username from bean
	var playerDiv = document.createElement("div");
	playerDiv.id = data;
	playerDiv.innerHTML = "<h2>"+data+"</h2>";

	//add playerDiv to parent div of all players
	var players = document.getElementById("players");
	players.appendChild(playerDiv);
	
	var weaponDiv = document.createElement("div");
	weaponDiv.id = "weapon";
	playerDiv.appendChild(weaponDiv);


	var scoreDiv = document.createElement("div");
	scoreDiv.id = "score";
	playerDiv.appendChild(scoreDiv);
}

//gets the players duel selection and sets it to their "DrawHand"
function addWeapon(data){
	var player = document.getElementById(info[0]);
	var drawHand = player.getElementByClassName("drawHand")[0];
	drawHand.innerHTML = info[1];

}

//logic will go here of determing who won the round
function letsDuel(){
	console.log("determing who won");
	ws.send("DUEL:");
}


$("#countdown").countdown360(
	{
		radius      : 40,
	  	seconds     : 2,
	  	strokeWidth : 5,
	  	fillStyle   : '#0276FD',
	  	strokeStyle : '#003F87',
	  	fontSize    : 30,
	  	fontColor   : '#FFFFFF',
	  	autostart: true,
	  	onComplete  : function () { letsDuel(); }
}).start()