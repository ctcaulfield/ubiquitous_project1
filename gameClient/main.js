var ws = new WebSocket('ws://localhost:1234'); 
var weaponChoices = new Object();

var countdown = $("#countdown").countdown360({
		radius      : 40,
	  	seconds     : 15,
	  	strokeWidth : 5,
	  	fillStyle   : '#0276FD',
	  	strokeStyle : '#003F87',
	  	fontSize    : 30,
	  	fontColor   : '#FFFFFF',
	  	autostart: false,
	  	onComplete  : function () { 
			document.getElementsByClassName('weapon')[0].style.visibility='visible';
			document.getElementsByClassName('weapon')[1].style.visibility='visible';
	  		compareResults(); 
	  	}
});

function letsPlay() {
    countdown.start();
  	//hide the players selection
	document.getElementsByClassName('weapon')[0].style.visibility='hidden';
	document.getElementsByClassName('weapon')[1].style.visibility='hidden';
}

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

	var scoreDiv = document.createElement("div");
	scoreDiv.className = "score";
	scoreDiv.innerHTML = "<h2>score</h2><h3>0</h3>"

	document.getElementById(data).appendChild(scoreDiv);

}

//gets the players duel selection and sets it to their "DrawHand"
function addWeapon(message){
	var player = document.getElementById(message[0]);
	player.getElementsByClassName("weapon")[0].innerHTML = "<h2>"+message[1]+"</h2>";
}

//touchSensor = 2 -> sissors
//clicker = 1 -> paper
//magnetSensor = 0 -> rock

function compareResults(){

    var players = document.getElementById("players");
    
    //player 1 info
    var weapon1 = document.getElementsByClassName("weapon")[0];
    var player1 = weapon1.getElementsByTagName("h2")[0].innerHTML;
    console.log("player1 choice: "+player1);

    //player 2 info
    var weapon2 = document.getElementsByClassName("weapon")[1];
    var player2 = weapon2.getElementsByTagName("h2")[0].innerHTML;
    console.log("player2 choice: "+player2);

    var player1score = document.getElementsByClassName("score")[0].getElementsByTagName("h3")[0];
    var player2score = document.getElementsByClassName("score")[1].getElementsByTagName("h3")[0];
    var player1number = player1score.innerHTML;
    var player2number = player2score.innerHTML;

    console.log("Comparing: player1 - " + player1 + " and player2 - " + player2);

	if(player1 === "4" && player2 === "4") {
		console.log("Nobody Wins");
	}
	else if(player1 === "4"){
		console.log("player 2 wins");
		player2number++;
		player2score.innerHTML = player2number;
	}
	else if(player2 === "4"){
		console.log("player 1 wins");
		player1number++;
		player1score.innerHTML = player1number;

	}        	
	else if (player1 === player2) {
	    console.log("It's a tie!");
	}
	else{
		if (player1 === "0") {
		    if (player2 === "2") {
		        // rock wins
		        console.log("Player 1 wins!");
		        player1number++;
		        player1score.innerHTML = player1number;
		    } else {
		        // paper wins
		        console.log("Player 2 wins");
		        player2number++;
		        player2score.innerHTML = player2number;
		    }
		}
		if (player1 === "1") {
		    if (player2 === "0") {
		        // paper wins
		        console.log("Player 1 wins!");
		        player1number++;
		        player1score.innerHTML = player1number;
		    } else {
		        // scissors wins
		        console.log("Player 2 wins!");
		        player2number++;
		        player2score.innerHTML = player2number;
		    }
		}
		if (player1 === "2") {
		    if (player2 === "0") {
		        // rock wins
		        console.log("Player 2 wins!");
		        player2number++;
		        player2score.innerHTML = player2number;
		    } else {
		        // scissors wins
		        console.log("Player 1 wins!");
		        player1number++;
		        player1score.innerHTML = player1number;
		    }
		}
	}
};


