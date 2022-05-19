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
var time_left;
var monsters_amount;
var lives_left;

var height;
var width;

var time_interval;
var clock_img = new Image();

var monster_1 = new Object();
var monster_2 = new Object();
var monster_3 = new Object();
var monster_4 = new Object();
var monster_1_img = new Image();
var monster_2_img = new Image();
var monster_3_img = new Image();
var monster_4_img = new Image();
var monster_board;
var monster_list;
var monster_interval;
var monster_move;

var moving_score = new Object();
var moving_score_interval;
var moving_score_img = new Image();

var medicine;
var medicine_img = new Image();

var cupcake = new Object();
var cupcake_img = new Image();
var cupcake_interval;

//data base
const db = 	[
	{
		userName: "k",
		password: "k"
	}
]

$(document).ready(function() {
	context = canvas.getContext("2d");
	monster_1_img.src = 'media/blue_ghost.png';
	monster_2_img.src = 'media/green_ghost.png';
	monster_3_img.src = 'media/pink_ghost.png';
	monster_4_img.src = 'media/purple_ghost.png';
	medicine_img.src = 'media/heart.png';
	moving_score_img.src = 'media/pizza50.png';
	clock_img.src = 'media/clock.png';
	cupcake_img.src = 'media/cupcake.png';
	//Start();
});

function Start() {
	board = new Array();
	board = [[4,4,4,4,4,4,4,4,4,0,4,4,4,4,4,4,4,4,4,4,4],
			[4,0,0,0,0,0,4,4,4,0,4,4,4,0,0,0,4,0,0,0,4],
			[4,0,4,0,4,0,4,4,4,0,4,4,4,0,4,0,0,0,4,0,4],
			[4,0,4,0,4,0,4,4,4,0,4,4,4,0,4,4,4,0,4,0,4],
			[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,4],
			[4,0,4,0,4,4,4,4,4,0,4,4,4,4,4,4,4,4,4,0,4],
			[4,0,4,0,0,0,4,0,0,0,0,0,0,0,4,0,0,0,4,0,4],
			[4,0,4,0,4,0,4,0,4,4,4,0,4,0,4,0,4,0,4,0,4],
			[4,0,0,0,4,0,0,0,4,4,4,0,4,0,0,0,4,0,0,0,4],
			[4,4,4,0,4,4,4,0,4,4,4,0,4,4,4,0,4,4,4,0,4],
			[4,0,0,0,4,0,0,0,4,4,4,0,4,0,0,0,4,0,0,0,4],
			[4,0,4,0,4,0,4,0,4,4,4,0,4,0,4,0,4,0,4,0,4],
			[4,0,4,0,0,0,4,0,0,0,0,0,0,0,4,0,0,0,4,0,4],
			[4,0,4,0,4,4,4,4,4,0,4,4,4,4,4,4,4,4,4,0,4],
			[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,4],
			[4,0,4,0,4,0,4,4,4,0,4,4,4,0,4,4,4,0,4,0,4],
			[4,0,4,0,4,0,4,4,4,0,4,4,4,0,4,0,0,0,4,0,4],
			[4,0,0,0,0,0,4,4,4,0,4,4,4,0,0,0,4,0,0,0,4],
			[4,4,4,4,4,4,4,4,4,0,4,4,4,4,4,4,4,4,4,4,4],];
	score = 0;
	pac_color = "yellow";
	//var cnt = 100;
	//var food_remain = balls_amount;
	var food_remain_5 = amount_5;
	var food_remain_15 = amount_15;
	var food_remain_25 = amount_25;
	//var pacman_remain = 1;
	start_time = new Date();
	height = 600 / board.length;
	width = 600 / board[0].length;
	lives_left = 5;

	cupcake.b = false;
	monster_board = [[4,4,4,4,4,4,4,4,4,0,4,4,4,4,4,4,4,4,4,4,4],
	[4,0,0,0,0,0,4,4,4,0,4,4,4,0,0,0,4,0,0,0,4],
	[4,0,4,0,4,0,4,4,4,0,4,4,4,0,4,0,0,0,4,0,4],
	[4,0,4,0,4,0,4,4,4,0,4,4,4,0,4,4,4,0,4,0,4],
	[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,4],
	[4,0,4,0,4,4,4,4,4,0,4,4,4,4,4,4,4,4,4,0,4],
	[4,0,4,0,0,0,4,0,0,0,0,0,0,0,4,0,0,0,4,0,4],
	[4,0,4,0,4,0,4,0,4,4,4,0,4,0,4,0,4,0,4,0,4],
	[4,0,0,0,4,0,0,0,4,4,4,0,4,0,0,0,4,0,0,0,4],
	[4,4,4,0,4,4,4,0,4,4,4,0,4,4,4,0,4,4,4,0,4],
	[4,0,0,0,4,0,0,0,4,4,4,0,4,0,0,0,4,0,0,0,4],
	[4,0,4,0,4,0,4,0,4,4,4,0,4,0,4,0,4,0,4,0,4],
	[4,0,4,0,0,0,4,0,0,0,0,0,0,0,4,0,0,0,4,0,4],
	[4,0,4,0,4,4,4,4,4,0,4,4,4,4,4,4,4,4,4,0,4],
	[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,4],
	[4,0,4,0,4,0,4,4,4,0,4,4,4,0,4,4,4,0,4,0,4],
	[4,0,4,0,4,0,4,4,4,0,4,4,4,0,4,0,0,0,4,0,4],
	[4,0,0,0,0,0,4,4,4,0,4,4,4,0,0,0,4,0,0,0,4],
	[4,4,4,4,4,4,4,4,4,0,4,4,4,4,4,4,4,4,4,4,4],];
	//monster_board = board;
	monster_list = new Array();
	if (monsters_amount >= 1) {
		monster_board[1][1] = 11;
		monster_1.i = 1;
		monster_1.j = 1;
		monster_list.push(monster_1);
	}
	if (monsters_amount >= 2) {
		monster_board[17][19] = 12;
		monster_2.i = 17;
		monster_2.j = 19;
		monster_list.push(monster_2);
	}
	if (monsters_amount >= 3) {
		monster_board[17][1] = 13;
		monster_3.i = 17;
		monster_3.j = 1;
		monster_list.push(monster_3);
	}
	if (monsters_amount == 4) {
		monster_board[1][19] = 14;
		monster_4.i = 1;
		monster_4.j = 19;
		monster_list.push(monster_4);
	}

	monster_board[9][11] = 50;
	moving_score.i = 9;
	moving_score.j = 11;

	//Pacman Position
	shape.i=1;
	shape.j=1;
	while (monster_board[shape.i][shape.j] != 0){
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
	}
	board[emptyCell[0]][emptyCell[1]] = 2;

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

	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 1;

	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 3;

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
	interval = setInterval(UpdatePosition, 180);
	time_interval = setInterval(UpdateTime, 1000);
	monster_interval = setInterval(UpdateMonsterPosition,750);
	moving_score_interval = setInterval(UpdateMovingScorePosition,500);
	cupcake_interval = setInterval(UpdateCupcake,15000);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * board.length);
	var j = Math.floor(Math.random() * board[0].length);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * board.length);
		j = Math.floor(Math.random() * board[0].length);
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
	lblTime.value = time_left;
	lblLives.value = lives_left;
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var center = new Object();
			center.x = i * height + (height/2);
			center.y = j * width + (width/2);
			if (board[i][j] == 2) {
				DrawPacman(center);
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, width/4, 0, 2 * Math.PI); // circle
				context.fillStyle = color_5; //color
				context.fill();
			} else if (board[i][j] == 15) {
				context.beginPath();
				context.arc(center.x, center.y, width/4, 0, 2 * Math.PI); // circle
				context.fillStyle = color_15; //color
				context.fill();
			} else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, width/4, 0, 2 * Math.PI); // circle
				context.fillStyle = color_25; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(i*height, j*width, height, width);
				context.fillStyle = "grey"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.drawImage(medicine_img,i*height, j*width, height, width);
			} else if (board[i][j] == 3) {
				context.drawImage(clock_img,i*height, j*width, height, width);
			} else if (board[i][j] == 6) {
				context.drawImage(cupcake_img,i*height, j*width, height, width);
			}
			if(monster_board[i][j] == 11){
				context.drawImage(monster_1_img,i*height, j*width, height, width);
			} else if(monster_board[i][j] == 12){
				context.drawImage(monster_2_img,i*height, j*width, height, width);
			} else if(monster_board[i][j] == 13){
				context.drawImage(monster_3_img,i*height, j*width, height, width);
			}  else if(monster_board[i][j] == 14){
				context.drawImage(monster_4_img,i*height, j*width, height, width);
			} else if(monster_board[i][j] == 50){
				context.drawImage(moving_score_img,i*height, j*width, height, width);
			}
		}
	}
}

function DrawPacman(center) {
	if (key_pressed==1){ //up
		context.beginPath();
		context.arc(center.x, center.y, width/2, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		context.beginPath();
		context.arc(center.x + (width/4), center.y, width/12, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}else if (key_pressed==2){ //down
		context.beginPath();
		context.arc(center.x, center.y, width/2, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		context.beginPath();
		context.arc(center.x + (width/4), center.y - (width/12), width/12, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}else if (key_pressed==3){ //left
		context.beginPath();
		context.arc(center.x, center.y, width/2, 1.2 * Math.PI, 0.85 * Math.PI); // half circle
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		context.beginPath();
		context.arc(center.x + (width/12), center.y - (width/4), width/12, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}else if (key_pressed==4){ //right
		context.beginPath();
		context.arc(center.x, center.y, width/2, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		context.beginPath();
		context.arc(center.x + (width/12), center.y - (width/4), width/12, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) { //up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) { //down
		if (shape.j < board[0].length && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) { //left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		} if  (shape.i == 0 && shape.j == 9) {
			shape.i = 18;
		}
	}
	if (x == 4) { //right
		if (shape.i < board.length && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		} if  (shape.i == 18 && shape.j == 9) {
			shape.i = 0;
		}
	}
	UpdateScore();
	board[shape.i][shape.j] = 2;


	Draw();
}

function UpdateScore() {
	if (board[shape.i][shape.j] == 5) {
		score+=5;
		balls_amount--;
	}
	if (board[shape.i][shape.j] == 15) {
		score+=15;
		balls_amount--;
	}
	if (board[shape.i][shape.j] == 25) {
		score+=25;
		balls_amount--;
	}
	if (board[shape.i][shape.j] == 1) {
		lives_left++;
	}
	if (board[shape.i][shape.j] == 3) {
		time_left += 10;
	}
	if (board[shape.i][shape.j] == 6) {
		score += 30;
	}
	if (11 <= monster_board[shape.i][shape.j] && monster_board[shape.i][shape.j] <= 14) {
		score -= 10;
		UpdateLives();
	}
	if (monster_board[shape.i][shape.j] == 50) {
		score += 50;
		monster_board[shape.i][shape.j] = 0;
		clearInterval(moving_score_interval);
	}
	if (balls_amount == 0){
		game_over();
	}
}

function UpdateTime() {
	if (time_left == 0){
		game_over();
	}
	time_left = time_left-1; 
}

function UpdateLives() {
	lives_left--;
	if (lives_left == 0){
		game_over();
	} else {
		RestartGame();
	}
}

function RestartGame() {
	RestartMonster();
	RestartPacmen();
}

function RestartPacmen() {
	board[shape.i][shape.j] = 0;
	shape.i=1;
	shape.j=1;
	while (monster_board[shape.i][shape.j] != 0){
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
	}
	board[emptyCell[0]][emptyCell[1]] = 2;
}

function RestartMonster() {
	for (let k = 0; k < monster_list.length; k++){
		m = monster_list[k];
		monster_board[m.i][m.j] = 0;
	}
	monster_1.i = 1;
	monster_1.j = 1;
	monster_2.i = 17;
	monster_2.j = 19;
	monster_3.i = 17;
	monster_3.j = 1;
	monster_4.i = 1;
	monster_4.j = 19;
	for (let k = 0; k < monster_list.length; k++){
		m = monster_list[k];
		monster_board[m.i][m.j] = 11+k;
	}
}

function UpdateMonsterPosition() {
	for (let k = 0; k < monster_list.length; k++){
		let m = monster_list[k];
		monster_board[m.i][m.j] = 0;
		var x = GetMonsterMove(m);
		if (x==1) { //up
			m.j--;
		} else if (x==2) { //down
			m.j++;
		} else if (x==3){ //left
			m.i--;
		} else if (x==4) { //right
			m.i++;
		}
		monster_board[m.i][m.j] = 11+k;
	}
	Draw();
}

function GetMonsterMove(monster) {
	var x;
	//var distance=100;
	//var min_distance=100;
	if (monster.j > 0 && monster_board[monster.i][monster.j - 1] == 0) {
		//min_distance = Math.sqrt(Math.pow(shape.i-monster.i,2)+Math.pow(shape.j-monster.j-1,2));
		if (shape.j < monster.j){
			x=1;
		}
	}
	if (monster.j < monster_board[0].length && monster_board[monster.i][monster.j + 1] == 0) {
		//distance = Math.sqrt(Math.pow(shape.i-monster.i,2)+Math.pow(shape.j-monster.j+1,2));
		if (shape.j > monster.j){//(distance<min_distance){
			x=2;
			//min_distance=distance;
		}
	}
	if (monster.i > 0 && monster_board[monster.i - 1][monster.j] == 0) {
		//distance = Math.sqrt(Math.pow(shape.i-monster.i-1,2)+Math.pow(shape.j-monster.j,2));
		if (shape.i < monster.i){//(distance<min_distance){
			x=3;
			// min_distance=distance;
		}
	}
	if (monster.i < monster_board.length && monster_board[monster.i + 1][monster.j] == 0) {
		//distance = Math.sqrt(Math.pow(shape.i-monster.i+1,2)+Math.pow(shape.j-monster.j,2));
		if (shape.i > monster.i){//(distance<min_distance){
			x=4;
			// min_distance=distance;
		}
	}
	return x;
}

function UpdateMovingScorePosition() {
	monster_board[moving_score.i][moving_score.j] = 0;
	let possible_moves = new Array();
	if (moving_score.j > 0 && monster_board[moving_score.i][moving_score.j-1] == 0) {
		possible_moves.push(1);
	}
	if (moving_score.j < monster_board[0].length && monster_board[moving_score.i][moving_score.j + 1] == 0) {
		possible_moves.push(2);
	}
	if (moving_score.i > 0 && monster_board[moving_score.i - 1][moving_score.j] == 0) {
		possible_moves.push(3);
	}
	if (moving_score.i < monster_board.length && monster_board[moving_score.i + 1][moving_score.j] == 0) {
		possible_moves.push(4);
	}
	let x = possible_moves[Math.floor(Math.random() * (possible_moves.length - 0) )];
	if (x==1) { //up
		moving_score.j--;
	} else if (x==2) { //down
		moving_score.j++;
	} else if (x==3){ //left
		moving_score.i--;
	} else if (x==4) { //right
		moving_score.i++;
	}
	monster_board[moving_score.i][moving_score.j] = 50;
}

function UpdateCupcake() {
	if (cupcake.b == true) {
		board[cupcake.i][cupcake.j] = 0;
		cupcake.b = false;
	} else {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 6;
		cupcake.i = emptyCell[0];
		cupcake.j = emptyCell[1];
		cupcake.b = true;
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

	time_left = Math.floor(Math.random() * (3600 - 60) ) + 60;
	document.getElementById('input_time').value = 	time_left = Math.floor(Math.random() * (3600 - 60) ) + 60;	;

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
		
		time_left = document.getElementById('input_time').value;
		
		monsters_amount = document.getElementById('input_monsters').value;
		
		//$('#error').html('My Error Message').show();
		//alert('Text-field is empty.');
		//return false;
		showScreen('game');
		Start();
	})
})

function game_over() {
	clear_interval();
	var txt;
	if (lives_left == 0){
		//alert('Loser!');
		txt = "Loser!\nnew game?"
	} else { // if (time_left == 0) {
		if (score < 100){
			//alert('You are better than ' + score + ' points!');
			txt = 'You are better than ' + score + ' points!\nnew game?';
		}else{
			//alert('Winner!!!')
			txt = "Winner!!!\nnew game?"
		}
	}
	if (confirm(txt)){
		showScreen('settings');
	} else {
		showScreen('welcome');
	}
}
function clear_interval() {
	clearInterval(interval);
	clearInterval(time_interval);
	clearInterval(monster_interval);
	clearInterval(moving_score_interval);
	clearInterval(cupcake_interval);
}
function new_game() {
	if (confirm("new game?")){
		clear_interval();
		showScreen('settings');
	}
}
