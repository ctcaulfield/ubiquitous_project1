var ws = new WebSocket('ws://localhost:1234'); 
var weaponChoices = new Object();

ws.onopen = function () {
	console.log("connected!!!");
};

ws.onerror = function (error) {
	console.log("error: "+error);
};

ws.addEventListener("message", function(e) {     
	// The data is simply the message that we're sending back     
	var msg = e.data;      
	console.log("Original message: " + msg);
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
 	addWeapon(message);
	
});



//create the player - this will only be done once for each bean connected
function setPlayer(data){
	//player div with id of their username from bean
	var playerDiv = document.createElement("div");
	playerDiv.id = data;
	playerDiv.innerHTML = "<h3>"+data+"</h3>";

	//add playerDiv to parent div of all players
	var players = document.getElementById("players");
	players.appendChild(playerDiv);

	var weaponDiv = document.createElement("div");
	weaponDiv.className = "weapon";

	document.getElementById(data).appendChild(weaponDiv);
}

//gets the players duel selection and sets it to their "DrawHand"
function addWeapon(message){
	var player = document.getElementById(message[0]);
	player.getElementsByClassName("weapon")[0].innerHTML = "<h2>"+message[1]+"</h2>";
}


//clicker = 2
//magnetSensor = 1  
//touchSensor = 0
//2 beats 0, 0 beats 1, 1 beats 2

function compareResults(){

    var players = document.getElementById("players");
    
    //player 1 info
    var weapon1 = document.getElementsByClassName("weapon")[0];
    var text1 = weapon1.getElementsByTagName("h2")[0].innerHTML;
    console.log("1: "+text1);

    //player 2 info
    var weapon2 = document.getElementsByClassName("weapon")[1];
    var text2 = weapon2.getElementsByTagName("h2")[0].innerHTML;
    console.log("2: "+text2);

    console.log("WORK!?!?!?!??!?!?!");
    console.log("Compare results: " + text1 + " and " + text2);

	// if(choice1 === "4" && choice2 === "4") {
	// 	return "Nobody Wins"
	// }
	// if(choice1 === "4"){
	// 	return "player 2 wins"
	// } 
	// if(choice2 === "4"){
	// 	return "player 1 wins"
	// }        	
	// if (choice1 === choice2) {
	//     return "It's a tie!";
	// }
	// if (choice1 === "rock") {
	//     if (choice2 === "scissors") {
	//         // rock wins
	//         return "You win!";
	//     } else {
	//         // paper wins
	//         return "You lose! Try again.";
	//     }
	// }
	// if (choice1 === "paper") {
	//     if (choice2 === "rock") {
	//         // paper wins
	//         return "You win!";
	//     } else {
	//         // scissors wins
	//         return "You lose! Try again.";
	//     }
	// }
	// if (choice1 === "scissors") {
	//     if (choice2 === "rock") {
	//         // rock wins
	//         return "You lose! Try again.";
	//     } else {
	//         // scissors wins
	//         return "You win!";
	//     }
	// }
        // };

}


$("#countdown").countdown360(
	{
		radius      : 40,
	  	seconds     : 5,
	  	strokeWidth : 5,
	  	fillStyle   : '#0276FD',
	  	strokeStyle : '#003F87',
	  	fontSize    : 30,
	  	fontColor   : '#FFFFFF',
	  	autostart: false,
	  	onComplete  : function () { compareResults(); }
}).start()