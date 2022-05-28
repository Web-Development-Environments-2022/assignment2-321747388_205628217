var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
//game keys
var key_pressed=4;
var up_key;
var down_key;
var right_key;
var left_key;
//game balls
var balls_amount;
var amount_5;
var amount_15;
var amount_25;
var color_5;
var color_15;
var color_25;
//setting
var time_left;
var lives_left;

var height;
var width;

var time_interval;
var clock_img = new Image();
//monsters
var monsters_amount;
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
//pizza vars
var moving_score = new Object();
var moving_score_interval;
var moving_score_img = new Image();
//heart vars
var medicine;
var medicine_img = new Image();
var medicine_n;
//cupcake vars
var cupcake = new Object();
var cupcake_img = new Image();
var cupcake_interval;

var game = false;

var music;

var user_name;

//data base
const db = 	[
	{
		userName: "k",
		password: "k"
	}
]

$(document).ready(function() {
	showScreen('welcome');
	context = canvas.getContext("2d");
	monster_1_img.src = 'media/blue_ghost.png';
	monster_2_img.src = 'media/green_ghost.png';
	monster_3_img.src = 'media/pink_ghost.png';
	monster_4_img.src = 'media/purple_ghost.png';
	medicine_img.src = 'media/heart.png';
	moving_score_img.src = 'media/pizza50.png';
	clock_img.src = 'media/clock.png';
	cupcake_img.src = 'media/cupcake.png';
});

function showScreen(x) {
	if (game == true){
		clear_interval();
	}
	document.getElementById("welcome").style.display = "none";
	document.getElementById("signUp").style.display = "none";
	document.getElementById("login").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("game").style.display = "none";

	document.getElementById(x).style.display = "block";
}

//log in
function logIn(){
    var $userInput = $('#logInForm :input');
    var userInputValues = {};
    $userInput.each(function() {
            userInputValues[this.name] = $(this).val();
    });
    // if user exists and password is correct
    var validUser = validateUser(userInputValues["loginUserName"], userInputValues["loginPassword"]);
    if (validUser == true){
        user_name = $userInput.val();
		setSettingsValues();
        showScreen("settings");
    }
    else{
        alert("Incorrect user name or password.")
    }
	
}

function validateUser(userName, password){
    for (let i = 0; i < db.length; i++){
        if (userName === db[i].userName && password === db[i].password){
            return true;            
        }
    }
    return false;
}

function about() {
	document.getElementById("about").showModal();
}

function closeAbout(){
	document.getElementById("about").close();
}

function Start() {
	//set game
	game = true;
	show_settings();
	music = false;
	mute();
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
	lives_left = 5;
	pac_color = "yellow";
	var food_remain_5 = amount_5;
	var food_remain_15 = amount_15;
	var food_remain_25 = amount_25;
	start_time = new Date();
	height = 600 / board.length;
	width = 600 / board[0].length;
	cupcake.b = false;

	//monster
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

	// Moving score
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

	//Food position
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

	//Lives
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 1;
	medicine_n = 1;

	//Clock
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

	//intervals
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
			if (board[i][j] == 2) { //Packman
				DrawPacman(center);
			} else if (board[i][j] == 5) { //ball 5 points
				context.beginPath();
				context.arc(center.x, center.y, width/4, 0, 2 * Math.PI);
				context.fillStyle = color_5;
				context.fill();
			} else if (board[i][j] == 15) { //ball 15 points
				context.beginPath();
				context.arc(center.x, center.y, width/4, 0, 2 * Math.PI);
				context.fillStyle = color_15;
				context.fill();
			} else if (board[i][j] == 25) { //ball 25 points
				context.beginPath();
				context.arc(center.x, center.y, width/4, 0, 2 * Math.PI);
				context.fillStyle = color_25;
				context.fill();
			} else if (board[i][j] == 4) { //wall
				context.beginPath();
				context.rect(i*height, j*width, height, width);
				context.fillStyle = "#85cadd";
				context.fill();
			} else if (board[i][j] == 1) { // lives
				context.drawImage(medicine_img,i*height, j*width, height, width);
			} else if (board[i][j] == 3) { //clock
				context.drawImage(clock_img,i*height, j*width, height, width);
			} else if (board[i][j] == 6) { //cupcake
				context.drawImage(cupcake_img,i*height, j*width, height, width);
			}
			// monsters
			if(monster_board[i][j] == 11){
				context.drawImage(monster_1_img,i*height, j*width, height, width);
			} else if(monster_board[i][j] == 12){
				context.drawImage(monster_2_img,i*height, j*width, height, width);
			} else if(monster_board[i][j] == 13){
				context.drawImage(monster_3_img,i*height, j*width, height, width);
			}  else if(monster_board[i][j] == 14){
				context.drawImage(monster_4_img,i*height, j*width, height, width);
			} else if(monster_board[i][j] == 50){ //pizza
				context.drawImage(moving_score_img,i*height, j*width, height, width);
			}
		}
	}
}

function DrawPacman(center) {
	if (key_pressed==1){ //up
		context.beginPath();
		context.arc(center.x, center.y, width/2, 1.65 * Math.PI, 1.35 * Math.PI);
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color;
		context.fill();
		context.beginPath();
		context.arc(center.x + (width/4), center.y, width/12, 0, 2 * Math.PI);
		context.fillStyle = "black";
		context.fill();
	}else if (key_pressed==2){ //down
		context.beginPath();
		context.arc(center.x, center.y, width/2, 0.65 * Math.PI, 0.35 * Math.PI);
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color;
		context.fill();
		context.beginPath();
		context.arc(center.x + (width/4), center.y - (width/12), width/12, 0, 2 * Math.PI);
		context.fillStyle = "black";
		context.fill();
	}else if (key_pressed==3){ //left
		context.beginPath();
		context.arc(center.x, center.y, width/2, 1.2 * Math.PI, 0.85 * Math.PI);
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color;
		context.fill();
		context.beginPath();
		context.arc(center.x + (width/12), center.y - (width/4), width/12, 0, 2 * Math.PI);
		context.fillStyle = "black";
		context.fill();
	}else if (key_pressed==4){ //right
		context.beginPath();
		context.arc(center.x, center.y, width/2, 0.15 * Math.PI, 1.85 * Math.PI);
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color;
		context.fill();
		context.beginPath();
		context.arc(center.x + (width/12), center.y - (width/4), width/12, 0, 2 * Math.PI);
		context.fillStyle = "black";
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
		medicine_n--;
	}
	if (board[shape.i][shape.j] == 3) {
		time_left += 10;
	}
	if (board[shape.i][shape.j] == 6) {
		score += 30; //cupcake
	}
	if (11 <= monster_board[shape.i][shape.j] && monster_board[shape.i][shape.j] <= 14) {
		score -= 10;
		UpdateLives();
	}
	if (monster_board[shape.i][shape.j] == 50) {
		score += 50; //pizza
		monster_board[shape.i][shape.j] = 0;
		clearInterval(moving_score_interval);
	}
	if (balls_amount == 0){
		game_over();
	}
}

function UpdateTime() {
	if (time_left <= 0){
		game_over();
	}
	time_left = time_left-1; 
}

function UpdateLives() {
	lives_left--;
	if (lives_left == 0){
		game_over();
	} else {
		if(medicine_n < 1){
			var emptyCell = findRandomEmptyCell(board);
			board[emptyCell[0]][emptyCell[1]] = 1;
			medicine_n = 1;
		}
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
	var min_distance = 1000;
	var possible_moves = new Array();
	possible_moves = [1000,1000,1000,1000];
	if (monster.j > 0 && monster_board[monster.i][monster.j - 1] == 0) { //up
		possible_moves[0] = Math.sqrt(Math.pow(shape.i-monster.i,2)+Math.pow(shape.j-(monster.j-1),2));
	}
	if (monster.j < monster_board[0].length && monster_board[monster.i][monster.j + 1] == 0) { // down
		possible_moves[1] = Math.sqrt(Math.pow(shape.i-monster.i,2)+Math.pow(shape.j-(monster.j+1),2));
	}
	if (monster.i > 0 && monster_board[monster.i - 1][monster.j] == 0) { //left
		possible_moves[2] = Math.sqrt(Math.pow(shape.i-(monster.i-1),2)+Math.pow(shape.j-monster.j,2));
	}
	if (monster.i < monster_board.length && monster_board[monster.i + 1][monster.j] == 0) { //right
		possible_moves[3] = Math.sqrt(Math.pow(shape.i-(monster.i+1),2)+Math.pow(shape.j-monster.j,2));
	}
	for (let k = 0; k < possible_moves.length; k++) {
		if (possible_moves[k] < min_distance) {
			min_distance = possible_moves[k];
			x = k+1;
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

function game_over() {
	clear_interval();
	var txt;
	if (lives_left == 0){
		txt = "Loser!\nWould you like to start a new game?"
	} else {
		if (score < 100){
			txt = 'You are better than ' + score + ' points!\nWould you like to start a new game?';
		}else{
			txt = "Winner!!!\nWould you like to start a new game?"
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

	music = true;
	mute();
	game=false;
}
function new_game() {
	if (confirm("Would you like to start a new game?")){
		clear_interval();
		showScreen('settings');
	}
}

function setSettingsValues(){
	document.getElementById('input_up_key').value = "ArrowUp";
	up_key = "38";
	document.getElementById('input_down_key').value = "ArrowDown";
	down_key = "40";
	document.getElementById('input_right_key').value = "ArrowRight";
	right_key = "39";
	document.getElementById('input_left_key').value = "ArrowLeft";
	left_key = "37";
	
	balls_amount = 50;
	document.getElementById('input_balls_amount').value = balls_amount;
	
	color_5 = "#b6a7ea";
	document.getElementById('input_color_5').value = color_5;

	color_15 = "#8d71ea";
	document.getElementById('input_color_15').value = color_15;

	color_25 = "#6139e6";
	document.getElementById('input_color_25').value = color_25;

	time_left = 60;
	document.getElementById('input_time').value = 	time_left;

	monsters_amount = 2;
	document.getElementById('input_monsters').value = monsters_amount;
}

function setUpKey(evevt) {
	up_key = evevt.keyCode;
	document.getElementById('input_up_key').value = evevt.key;
}
function setDownKey(evevt) {
	down_key = evevt.keyCode;
	document.getElementById('input_down_key').value = evevt.key;
}
function setRightKey(evevt) {
	right_key = evevt.keyCode; 
	document.getElementById('input_right_key').value = evevt.key;
}
function setLeftKey(evevt) {
	left_key = evevt.keyCode; 
	document.getElementById('input_left_key').value = evevt.key;
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

		if (up_key == down_key || up_key == left_key || up_key == right_key || down_key == left_key || down_key == right_key || left_key == right_key) {
			alert("Please choose different keys for each command.");
		}
		
		showScreen('game');
		Start();
	})
})

function show_settings() {
	document.getElementById("show_up").value = document.getElementById('input_up_key').value;
	document.getElementById("show_down").value = document.getElementById('input_down_key').value;
	document.getElementById("show_right").value = document.getElementById('input_right_key').value;
	document.getElementById("show_left").value = document.getElementById('input_left_key').value;
	
	document.getElementById("show_balls_amount").value = balls_amount;
	document.getElementById("show_color_5").value = color_5;
	document.getElementById("show_color_15").value = color_15;
	document.getElementById("show_color_25").value = color_25;
	
	document.getElementById("show_monsters").value = monsters_amount;

	document.getElementById("userN").value = user_name;
}

function mute() {
	var x = document.getElementById("myAudio");
	var m = document.getElementById("mute");
	if (music == false) {
		x.play();
		music = true;
		m.textContent = "mute";
	} else {
		x.pause(); 
		music = false;
		m.textContent = "unmute";
	}
}
