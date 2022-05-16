var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

var key_pressed=4;
var up_key;
var down_key;
var right_key;
var left_key;
var balls_amount;
var amount_5;
var amount_15;
var amount_25;
var color_5;
var color_15;
var color_25;
var game_time;
var monsters_amount;
//data base
const db = 	[
	{
		userName: "k",
		password: "k"
	}
]



$(document).ready(function() {
	context = canvas.getContext("2d");
	//Start();
});

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = balls_amount;
	var food_remain_5 = amount_5;
	var food_remain_15 = amount_15;
	var food_remain_25 = amount_25;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				//if (randomNum <= (1.0 * food_remain) / cnt) {
				//	food_remain--;
				//	board[i][j] = 1;
				if (randomNum < (1.0 * pacman_remain) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	// while (food_remain > 0) {
	// 	var emptyCell = findRandomEmptyCell(board);
	// 	board[emptyCell[0]][emptyCell[1]] = 1;
	// 	food_remain--;
	// }
	while (food_remain_5 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
		food_remain_5--;
	}
	while (food_remain_15 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 15;
		food_remain_15--;
	}
	while (food_remain_25 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 25;
		food_remain_25--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 10);
	var j = Math.floor(Math.random() * 10);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 10);
		j = Math.floor(Math.random() * 10);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[up_key]) {
		key_pressed = 1;
		return 1;
	}
	if (keysDown[down_key]) {
		key_pressed = 2
		return 2;
	}
	if (keysDown[left_key]) {
		key_pressed = 3;
		return 3;
	}
	if (keysDown[right_key]) {
		key_pressed = 4;
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				// context.beginPath();
				// context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				// context.lineTo(center.x, center.y);
				// context.fillStyle = pac_color; //color
				// context.fill();
				// context.beginPath();
				// context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				// context.fillStyle = "black"; //color
				// context.fill();
				DrawPacman(center);
			// } else if (board[i][j] == 1) {
			// 	context.beginPath();
			// 	context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
			// 	context.fillStyle = "black"; //color
			// 	context.fill();
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color_5; //color
				context.fill();
			} else if (board[i][j] == 15) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color_15; //color
				context.fill();
			} else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color_25; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function DrawPacman(center) {
	if (key_pressed==1){ //up
		context.beginPath();
		context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		context.beginPath();
		context.arc(center.x + 15, center.y, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}else if (key_pressed==2){ //down
		context.beginPath();
		context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		context.beginPath();
		context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}else if (key_pressed==3){ //left
		context.beginPath();
		context.arc(center.x, center.y, 30, 1.2 * Math.PI, 0.85 * Math.PI); // half circle
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		context.beginPath();
		context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}else if (key_pressed==4){ //right
		context.beginPath();
		context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		context.beginPath();
		context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}
	// else{
	// 	context.beginPath();
	// 	context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
	// 	context.lineTo(center.x, center.y);
	// 	context.fillStyle = pac_color; //color
	// 	context.fill();
	// 	context.beginPath();
	// 	context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
	// 	context.fillStyle = "black"; //color
	// 	context.fill();
	// }
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	// if (board[shape.i][shape.j] == 1) {
	// 	score++;
	// }
	if (board[shape.i][shape.j] == 5) {
		score+=5;
	}
	if (board[shape.i][shape.j] == 15) {
		score+=15;
	}
	if (board[shape.i][shape.j] == 25) {
		score+=25;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function showScreen(x) {
	document.getElementById("welcome").style.display = "none";
	document.getElementById("signUp").style.display = "none";
	document.getElementById("login").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("game").style.display = "none";

	document.getElementById(x).style.display = "block";
}

function about() {
	document.getElementById("about").showModal();
}

function setUpKey(evevt) {
	up_key = evevt.keyCode;
}
function setDownKey(evevt) {
	down_key = evevt.keyCode; 
}
function setRightKey(evevt) {
	right_key = evevt.keyCode; 
}
function setLeftKey(evevt) {
	left_key = evevt.keyCode; 
}
function randomSettings(){
	document.getElementById('input_up_key').value = "up arrow";
	up_key = "38";
	document.getElementById('input_down_key').value = "down arrow";
	down_key = "40";
	document.getElementById('input_right_key').value = "right arrow";
	right_key = "39";
	document.getElementById('input_left_key').value = "left arrow";
	left_key = "37";
	
	balls_amount = Math.floor(Math.random() * (90 - 50) ) + 50;
	document.getElementById('input_balls_amount').value = balls_amount;
	
	color_5 = Math.floor(Math.random()*16777215).toString(16);
	document.getElementById('input_color_5').value = "#" + color_5.toString(16);

	color_15 = Math.floor(Math.random()*16777215).toString(16);
	document.getElementById('input_color_15').value = "#" + color_15.toString(16);

	color_25 = Math.floor(Math.random()*16777215).toString(16);
	document.getElementById('input_color_25').value = "#" + color_25.toString(16);

	game_time = Math.floor(Math.random() * (3600 - 60) ) + 60;
	document.getElementById('input_time').value = game_time;

	monsters_amount = Math.floor(Math.random() * (4 - 1) ) + 1;
	document.getElementById('input_monsters').value = monsters_amount;
}

$(document).ready(function() {
	$('#settingsForm').submit(function() {

		balls_amount = document.getElementById('input_balls_amount').value;
		amount_25 = Math.round(balls_amount * 0.1);
		amount_15 = Math.round(balls_amount * 0.3);
		amount_5 = balls_amount - amount_25 - amount_15;

		color_5 = document.getElementById('input_color_5').value;
		color_15 = document.getElementById('input_color_15').value;
		color_25 = document.getElementById('input_color_25').value;
		
		game_time = document.getElementById('input_time').value;
		
		monsters_amount = document.getElementById('input_monsters').value;
		
		//$('#error').html('My Error Message').show();
		//alert('Text-field is empty.');
		//return false;
		showScreen('game');
		Start();
	})
})
