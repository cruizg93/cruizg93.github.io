document.addEventListener('keydown',function(event){
    if(event.keyCode == 32){//spacebar
        console.log("salta");
        if(!trex.isJumping){jump();}
    }
});

window.onload = function(){inicializa()};


var canvas;
var canvasCtx;
var trex;
var groundLine;
function inicializa(){
    canvas = document.getElementById("canvas");
    canvasCtx = canvas.getContext('2d');
    loadImages();
    groundLine = imgFloor.y-imgRex.sh;
    trex = {
        y: groundLine,
        vy:0, 
        gravity:2, 
        jump:23,
        vymax:6,
        isJumping:false
    };
}

function clearCanvas(){
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}

var imgBase;
var imgRex;
var imgCloud;
var imgCactus;
var imgFloor;
function loadImages(){
    imgBase = new Image();
    imgBase.src = "img/trex/images.png";
    imgRex = {
        sx:850,
        sy:0,
        sw:42,
        sh:50,
        draw:function(x,y){
            canvasCtx.drawImage(imgBase,this.sx,this.sy,this.sw,this.sh,x,y,50,55);
        }
    };

    imgCloud = {
        sx:86,
        sy:0,
        sw:45,
        sh:15,
        draw:function(x,y){
            canvasCtx.drawImage(imgBase,this.sx,this.sy,this.sw,this.sh,x,y,50,15);
        }
    };

    imgCactus = {
        sx:280,
        sy:3,
        sw:14,
        sh:32,
        draw:function(x,y){
            canvasCtx.drawImage(imgBase,this.sx,this.sy,this.sw,this.sh,x,y,50,15);
        },
        draw:function(){
            canvasCtx.drawImage(imgBase,this.sx,this.sy,this.sw,this.sh,200,imgFloor.y-this.sh,15,32);
        }
    };

    imgFloor = {
        x:0,
        y:250,
        sx:0,
        sy:58,
        sw:100,
        sh:15,
        draw_one:function(){
            canvasCtx.drawImage(imgBase,this.sx,this.sy,this.sw,this.sh,this.x,this.y,100,15);
        },
        draw_two:function(){
            canvasCtx.drawImage(imgBase,this.sx+100,this.sy,this.sw,this.sh,this.x+100,this.y,100,15);
        },
        draw_three:function(){
            canvasCtx.drawImage(imgBase,this.sx+200,this.sy,this.sw,this.sh,this.x+200,this.y,100,15);
        }
    };
}

function drawRex(){
    imgRex.draw(50, trex.y);
}
function drawCloud(){
    imgCloud.draw(50, 100);
    imgCloud.draw(150, 100);
    imgCloud.draw(100, 100);
}

function drawCactus(){
    imgCactus.draw();
}

function drawFloor(){
    imgFloor.draw_one();
    imgFloor.draw_two();
    imgFloor.draw_three();
}


//----------------
//BUCLE PRINCIPAL
const FPS = 50;
setInterval(function(){
    main();
},1000/FPS);

function jump(){
    trex.isJumping = true;
    trex.vy = trex.jump;
}

function gravity(){
    if(trex.isJumping){
        if(trex.y - trex.vy - trex.gravity  > groundLine){
            trex.isJumping = false;
            trex.vy = 0;
            trex.y = groundLine;
        }
        else {
            trex.vy -=trex.gravity; 
            trex.y -= trex.vy;
        }
    }
}

function main(){
    clearCanvas();
    loadImages();
    gravity();
    drawCloud();
    drawFloor();
    drawCactus();
    drawRex();
}
