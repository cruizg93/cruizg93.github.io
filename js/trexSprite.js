canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');

//0: stand 1:left 2:right
var trexCount = 0;
var sunCount = 0;
var worldSpeed = 8;
var imgBase;

var trexStand;
var trexLeft;
var trexRight;
var trexDownLeft;
var trexDownRight;
var groundTexture;
var sun;

const TREX_X=10;
const TREX_Y=210;
const TREX_WIDTH=310;
const TREX_HEIGHT=340;        

window.onload = function(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    loadImages();
    __main__();
};

function loadImages(){
    imgBase = new Image();
    imgBase.src = "img/trex/images.png";

    trexStand = {
        sx:893,
        sy:2,
        sw:42,
        sh:46
    };

    trexLeft = {
        sx:981,
        sy:2,
        sw:42,
        sh:46
    };

    trexRight = {
        sx:937,
        sy:2,
        sw:42,
        sh:46
    };

    //not draw yet
    trexDownLeft = {
        sx:1114,
        sy:2,
        sw:54,
        sh:46
    }
    //not draw yet
    trexDownRight = {
        sx:1174,
        sy:2,
        sw:54,
        sh:46
    }

    sun = {
        x:10,
        y:10,
        sx:484,
        sy:2,
        sw:19,
        sh:39
    }

    groundTexture = {
        x:0,
        y:canvas.height*0.9,
        w:1200,
        h:canvas.height*0.1,
        sx:1,
        sy:58,
        sw:800,
        sh:9,
        draw:function(){
            ctx.drawImage(imgBase,this.sx,this.sy,this.sw,this.sh,this.x,this.y,this.w,this.h);
        }
    };
}

function drawTrex(){
    var newTrexSX = 0;
    switch(trexCount){
        case 0:
            newTrexSX = trexStand.sx;
            break;
        case 1:
            newTrexSX = trexLeft.sx;
            break;
        case 2:
            newTrexSX = trexRight.sx;
            break;
    };
    ctx.drawImage(imgBase,newTrexSX,2,42,46,TREX_X,TREX_Y,TREX_WIDTH,TREX_HEIGHT);
    trexCount++;
    if(trexCount>2){
        trexCount=0;
    }
}

function drawSun(){
    const SIZE_CHANGER = 23*3;
    switch(sunCount){
        case (1*worldSpeed):
            sun.sx=484;
            sun.sw=19;
            sun.x =10;
            break;
        case (2*worldSpeed):
            sun.sx=504;
            sun.sw=19;
            sun.x =10;
            break;
        case (3*worldSpeed):
            sun.sx=524;
            sun.sw=19;
            sun.x =10;
            break;
        case (4*worldSpeed):
            sun.sx=544;
            sun.sw=39;
            sun.x =10;
            ctx.drawImage(imgBase,644,2,9,26,(23*6),10,(9*3),(26*4));
            break;
        case (5*worldSpeed):
            sun.sx=584;
            sun.sw=19;
            sun.x =SIZE_CHANGER;
            ctx.drawImage(imgBase,644,2,9,26,(23*6),10,(9*3),(26*4));
            break;
        case (6*worldSpeed):
            sun.sx=604;
            sun.sw=19;
            sun.x =SIZE_CHANGER;
            ctx.drawImage(imgBase,644,2,9,26,(23*6),10,(9*3),(26*4));
            break;
        case (7*worldSpeed):
            sun.sx=624;
            sun.sw=19;
            sun.x =SIZE_CHANGER;
            ctx.drawImage(imgBase,644,2,9,26,(23*6),10,(9*3),(26*4));
            break;
    }
    ctx.drawImage(imgBase,sun.sx,2,sun.sw,39,sun.x,sun.y,(sun.sw*3),(39*3));
        
    sunCount++;
    if(sunCount>(7*worldSpeed)){
        sunCount=0;
        sun.sw=484;
        sun.sw=19;
    }
}

function drawGround(){
    groundTexture.draw();
}

function worldLogic(){
    if(groundTexture.x<-400){
        groundTexture.x=0;
    }else{
        groundTexture.x -= worldSpeed;
    }
}

function clearCanvas(){
    ctx.fillRect(0,0, canvas.width, canvas.height);
};

function __main__(){
    const FPS = 13;
    setInterval(function(){
        clearCanvas();
        drawTrex();
        worldLogic();
        drawGround();
        drawSun();

        if(sunCount % 2 ==0){
            ctx.font = "12px Arial";
        }else{
            ctx.font = "14px Arial";
        }
        
        ctx.strokeText("By Cruizg93",200,220);
    },1000/FPS);
}