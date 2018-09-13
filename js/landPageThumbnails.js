$(document).ready(function(){
    drawPongGame();
    drawTrexGame();
});

function drawPongGame(){
    var canvas = document.getElementById("pongGame");
    var canvasContext = canvas.getContext('2d');
    const PADDLE_WIDTH = 5;
    const PADDLE_HEIGHT = 30;
    colorRect(0,0,canvas.width, canvas.height,'black');
	colorRect(0,canvas.height*0.75, 5, PADDLE_HEIGHT,'white');
	colorRect( (canvas.width-PADDLE_WIDTH),canvas.height*0.15, PADDLE_WIDTH, PADDLE_HEIGHT,'white');
    canvasContext.fillText("1",100,10);
    canvasContext.fillText("3",canvas.width-100,10);
    for(var i=0; i<canvas.height; i+=10){
		colorRect(canvas.width/2-1,i,2,5,'white');
    }
    
    canvasContext.fillStyle = 'white';
    canvasContext.beginPath();
    canvasContext.arc(canvas.width*0.25, canvas.height*0.75,5, 0,Math.PI*2,true);
    canvasContext.fill();
    
    
    function colorRect(leftX, topY, width, height, drawColor){
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);
    }
}

function drawTrexGame(){

}