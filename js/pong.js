var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score =0;
var player2Score =0;
const WINNING_SCORE =3;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 200;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

function calculateMouseTouchPos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	if (evt.type == 'touchmove') {
        var touchX = evt.targetTouches[0].pageX;
		var touchY = evt.targetTouches[0].pageY;
		return {
			x:touchX,
			y:touchY
		}
    } else if(evt.type == 'mousemove'){
        var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;
		return {
			x:mouseX,
			y:mouseY
		}
    }
	
	
	
};

function handleMouseTouchClick(evt){
	if(showingWinScreen){
		player1Score =0;
		player2Score =0;
		showingWinScreen = false;
	}
}

window.onload = function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	
	var framesPerSecond =30;
	setInterval(function(){
		moveEverything();
		drawEverything();
	},1000/framesPerSecond);
	
	canvas.addEventListener('mousedown',handleMouseTouchClick);
	canvas.addEventListener('touchstart',handleMouseTouchClick);
	
	canvas.addEventListener('scroll',function(evt){
		window.scrollTo(0, 0);
		evt.preventDefault();
		evt.stopPropagation();
	});
	canvas.addEventListener('mousemove',
		function(evt){
			var mousePos = calculateMouseTouchPos(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
			window.scrollTo(0, 0);
			evt.preventDefault();
			evt.stopPropagation();
			//paddle2Y = mousePos.y - (PADDLE_HEIGHT/2);
	});

	canvas.addEventListener('touchmove',function(evt){
		var touchPos = calculateMouseTouchPos(evt);
		paddle1Y = touchPos.y - (PADDLE_HEIGHT/2);
	});
};

function ballReset(){
	if( player1Score >= WINNING_SCORE
		|| player2Score >= WINNING_SCORE){
			showingWinScreen = true;
	}

	reverBallSpeedX();
	ballX = canvas.width/2;
	ballY =  Math.floor(Math.random() * Math.floor(canvas.height));;
	ballSpeedY = 4;
}

function reverBallSpeedX(objPaddle){
	ballSpeedX = -ballSpeedX;
	var deltaY = ballY - (objPaddle+(PADDLE_HEIGHT/2));
	ballSpeedY = deltaY * 0.25;
}
function computerMovement(){
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if( paddle2YCenter < ballY-35){
		paddle2Y += 6;
	}else if( paddle2YCenter > ballY+35){
		paddle2Y -=6;
	}
}


function moveEverything(){
	if(showingWinScreen){
		return;
	}
	computerMovement();
	ballX += ballSpeedX;
	ballY += ballSpeedY;
	
	if(ballX < 0){
		if(ballY > paddle1Y 
				&& ballY < (paddle1Y + PADDLE_HEIGHT)){
			reverBallSpeedX(paddle1Y);
		}else{
			player2Score++;
			ballReset();
		}
	}
	if(ballX > canvas.width){
		if(ballY > paddle2Y 
				&& ballY < (paddle2Y + PADDLE_HEIGHT)){
			reverBallSpeedX(paddle2Y);
		}else{
			player1Score++;
			ballReset();
		}
	}
	
	if(ballY < 0){
		ballSpeedY = -ballSpeedY;
	}
	if(ballY > canvas.height){
		ballSpeedY = -ballSpeedY;
	}
}

function drawNet(){
	for(var i=0; i<canvas.height; i+=40){
		colorRect(canvas.width/2-1,i,2,20,'white');
	}
}

function drawEverything(){
	
	colorRect(0,0,canvas.width, canvas.height,'black');
	
	colorRect(0,paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT,'white');
	colorRect( (canvas.width-PADDLE_WIDTH),paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT,'white');
	
	canvasContext.fillText(player1Score,100,100);
	canvasContext.fillText(player2Score,canvas.width-100,100);
	if(showingWinScreen){
		canvasContext.fillStyle = 'white';
		canvasContext.font = "30px Arial"
		var continueStr = 'Click to Continue';
		var continueLength = (canvas.width/2)-(canvasContext.measureText(continueStr).width/2);
		var wonStr;
		var wonLength;

		if(player1Score >= WINNING_SCORE){
			wonStr = "YOU WIN!!!";
			canvasContext.measureText(wonStr).width
		}else if(player2Score >= WINNING_SCORE){
			wonStr = 'Computer WON!!!';
			canvasContext.measureText(wonStr).width
		}
		wonLength =(canvas.width/2)-(canvasContext.measureText(wonStr).width/2);;
		canvasContext.fillText(continueStr,continueLength,canvas.height*0.5);
		canvasContext.fillText(wonStr,wonLength,canvas.height*0.60);
		return;
	}
	drawNet();
	colorCircle(ballX,ballY,10,'white');	
}

function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2,true);
	canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}
