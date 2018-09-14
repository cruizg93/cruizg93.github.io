document.addEventListener('keydown',function(event){
    if(event.keyCode == 32){//spacebar
        if(!trex.isJumping){jump();}
    }
});

window.onload = function(){
    inicializa();
};

var imgBase;
var imgRex;
var imgCloud;
var imgCactus;
var imgFloor;

var canvas;
var canvasCtx;
var trex;
var cactus;
var cloud;
var ground;
var groundLine;
var world;
function inicializa(){
    


    canvas = document.getElementById("canvas");
    canvasCtx = canvas.getContext('2d');
    loadImages();
    groundLine = imgFloor.y;
    trex = {
        x:50,
        y: groundLine-48,
        vy:0, 
        gravity:2, 
        jump:23,
        vymax:6,
        isJumping:false
    };

    world = {
        speed: 9,
        score: 0
    };
    
    cactus = {
        x:canvas.width+100,
        y:groundLine-43
    };
    
    cloud ={
        x:canvas.width,
        y:100
    }

    ground = {
        x:0,
        y:250 
    }
}
//----------------
    //BUCLE PRINCIPAL
    const FPS = 30;
    setInterval(function(){
        main();
    },1000/FPS);

function clearCanvas(){
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height,'red');
}

function loadImages(){
    imgBase = new Image();
    imgBase.src = "img/trex/images.png";
    imgRex = {
        sx:850,
        sy:0,
        sw:42,
        sh:50,
        draw:function(x,y){
            canvasCtx.drawImage(imgBase,this.sx,this.sy,this.sw,this.sh,x,y,this.sw,this.sh);
        }
    };

    imgCloud = {
        sx:86,
        sy:0,
        sw:45,
        sh:15,
        draw:function(){
            canvasCtx.drawImage(imgBase,this.sx,this.sy,this.sw,this.sh,cloud.x,cloud.y,50,15);
        }
    };

    imgCactus = {
        sx:333,
        sy:3,
        sw:22,
        sh:47,
        draw:function(){
            canvasCtx.drawImage(imgBase,this.sx,this.sy,this.sw,this.sh,cactus.x,cactus.y,22,47);
        }
    };

    imgFloor = {
        x:0,
        y:250,
        sx:0,
        sy:58,
        sw:700,
        sh:17,
        draw: function(){
            canvasCtx.drawImage(imgBase,ground.x,this.sy,this.sw,this.sh,ground.x*-1,ground.y,1200,50);
        }
    };
}

function drawRex(){
    imgRex.draw(trex.x, trex.y);
    if(cactus.y < (trex.y+imgRex.sh)){
        if( cactus.x >= trex.x && (cactus.x) <= (trex.x + imgRex.sw)){
            world.over = true;
        }
    }else{
        world.over = false;
    }
}
function drawCloud(){
    imgCloud.draw(50, 100);
    imgCloud.draw(150, 100);
    imgCloud.draw(100, 100);
}

function drawCactus(){
    imgCactus.draw();

}

function drawGround(){
    imgFloor.draw();
}

function drawScore(){
    if(world.over){
        canvasCtx.font = "90px impact";
        var centerMessageX = (canvas.width/2)-(canvasCtx.measureText("GAME OVER!!!").width/2);
        var centerMessageY = canvas.height * 0.55;
        canvasCtx.fillText("GAME OVER!!!",centerMessageX,centerMessageY);
        canvasCtx.font = "30px impact";
        canvasCtx.fillText((world.score),500,50);
    }else{
        canvasCtx.font = "30px impact";
        canvasCtx.fillText((++world.score),500,50);
    }
}

function cactusLogic(){
    if(cactus.x < -100){
        cactus.x = canvas.width +100;
    }else{
        cactus.x -= world.speed;
    }
}

function cloudLogic(){
    if(cloud.x < -50){
        cloud.x = canvas.width +50;
    }else{
        cloud.x -= 2
    }
}

function groundLogic(){
    if(ground.x > 100){
        ground.x = 0;
    }else{
        ground.x += world.speed;
    }
}

function jump(){
    if(world.over){
        inicializa();
    }
    trex.isJumping = true;
    trex.vy = trex.jump;
}

function gravity(){
    if(trex.isJumping){
        if(trex.y - trex.vy - trex.gravity  > (groundLine-48)){
            trex.isJumping = false;
            trex.vy = 0;
            trex.y = groundLine-48;
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
    cloudLogic();
    drawCloud();
    groundLogic();
    drawGround();
    cactusLogic();
    drawCactus();
    drawRex();
    drawScore();
    if(world.over){
        world.speed = 0;
        return;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
