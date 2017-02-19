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

 // 	console.log("0:" + message[0]);
 // 	console.log("1:"+ message[1]);
 // 	//add element to hashmap

 // 	//if(weaponChoices.length >= 1){
 // 	// if(weaponChoices.hashOwnProperty(message[0])) {

 // 	// } else {
 // 		weaponChoices[message[0]] = message[1];
 // 	// }
 // 	console.log("Size of Hash: " + weaponChoices.length);
 // 	$.each(weaponChoices, function(index,value){
	// 	console.log("Index = " + index + " value = " + value); 
	// })

 // 	if(weaponChoices.length == 1){
 // 		console.log("weaponChoice's called");
 // 		compareResults(weaponChoices);
 // 	}		
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
	weaponDiv.id = data+"_weapon";
	playerDiv.appendChild(weaponDiv);


	var scoreDiv = document.createElement("div");
	scoreDiv.id = data+"_score";
	playerDiv.appendChild(scoreDiv);
}

//gets the players duel selection and sets it to their "DrawHand"
function addWeapon(message){
	var player = document.getElementById(message[0]+"_weapon");
	player.innerHTML = "<h2>"+message[1]+"</h2>";
}

//logic will go here of determing who won the round
function letsDuel(){
	console.log("determing who won");
	compareResults();
	// ws.send("DUEL");
}



//clicker = 2
//magnetSensor = 1  
//touchSensor = 0
//2 beats 0, 0 beats 1, 1 beats 2

function compareResults(){
	//"MaryRoseBean:1"
	//"CCSONIC:2"
        // Compare user choice vs computer choice

    var choice1 = document.getElementById("players").children[0];

    var choice2 = document.getElementById("players").children[1];
    console.log("WORK!?!?!?!??!?!?!")
    console.log("Compare results: " + choice1 + " " + choice2);

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
	  	seconds     : 20,
	  	strokeWidth : 5,
	  	fillStyle   : '#0276FD',
	  	strokeStyle : '#003F87',
	  	fontSize    : 30,
	  	fontColor   : '#FFFFFF',
	  	autostart: true,
	  	//onComplete  : function () { letsDuel(); }
}).start()