var inv
var trex, treximg
var ground, groundimg
var duckImage
var birdImage
var birdGroup
var obImage1, obImage2, obImage3, obImage4, obImage5, obImage6
var obstaclesGroup
var cloudGroup
var cloudImage
var PLAY = 1
var END = 0
var trexdead
var gameState = PLAY
var gameover
var gameoverImage
var restart
var restartImage
var score = 0
var text
var jumpSound
var dieSound
var checkpointSound
function preload() {
treximg = loadAnimation("trex1.png","trex3.png","trex4.png");
groundimg  = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");
obImage1 = loadImage("obstacle1.png");
obImage2 = loadImage("obstacle2.png");
obImage3 = loadImage("obstacle3.png");
obImage4 = loadImage("obstacle4.png");
obImage5 = loadImage("obstacle5.png");
obImage6 = loadImage("obstacle6.png");
birdImage = loadImage("Bird.png")
duckImage = loadImage("Dino 1.png_1.png")
trexdead = loadAnimation("trex_collided.png")
gameoverImage = loadImage("gameOver.png")
restartImage = loadImage("restart.png")
jumpSound = loadSound("dino-3.mp4");
dieSound = loadSound("die.mp4");
checkpointSound = loadSound("checkpoint.mp4");
}
function setup() {
createCanvas(600, 200); 
trex = createSprite(70,150,10,10)
trex.addAnimation("run",treximg)
trex.addAnimation("duck",duckImage)
trex.addAnimation("dead",trexdead)
trex.scale = 0.5
ground = createSprite(200,173,400,10)
ground.addImage("ground", groundimg)
ground.velocityX = -4.5;
ground.x = ground.width/2;
inv = createSprite(200,178,400,10)
inv.visible = false;
cloudGroup = new Group() 
obstaclesGroup = new Group()
birdGroup = new Group()
gameover = createSprite(300,100,10,10);
gameover.visible = false;
gameover.addImage("gameover",gameoverImage);
restart  = createSprite(300,140,10,10);
restart.addImage("restart",restartImage);
restart.scale = 0.5;
restart.visible = false;
}

function draw() {
background("white");
 if (gameState === PLAY)  {
score = score+Math.round(getFrameRate()/30);


if (keyDown("down")&&trex.y > 149) {
trex.changeAnimation("duck", duckImage)
trex.scale = 0.15
}

if (keyWentUp("down")) {
trex.changeAnimation("run", treximg)
trex.scale = 0.5
}

if (keyDown("space")&&trex.y > 149) {
trex.velocityY = -12
jumpSound.play()
 }

trex.velocityY = trex.velocityY + 0.9;

//ground
if (ground.x < 0) {
  ground.x  = ground.width/2;
 }
ground.velocityX = -(5.5+score/100);

if (score % 100 === 0&&score > 99) {
checkpointSound.play()
}


spawnClouds();
spawnObstacles();
spawnBird();
if (trex.isTouching(obstaclesGroup)||(trex.isTouching(birdGroup))) {
gameState = END;
dieSound.play()
}
} else
if (gameState === END) {
ground.velocityX = 0;
trex.velocityY = 0;
obstaclesGroup.setLifetimeEach(-1)
birdGroup.setLifetimeEach(-1);
cloudGroup.setLifetimeEach(-1);
obstaclesGroup.setVelocityXEach(0);
birdGroup.setVelocityXEach(0);
cloudGroup.setVelocityXEach(0);
trex.changeAnimation("dead",trexdead)
gameover.visible = true;
restart.visible = true;
trex.scale = 0.5;
if (mousePressedOver(restart)) {
reset();
}
}
textSize(17)
text("score:"+score,475,75)
trex.collide(inv);
drawSprites();
}
function spawnClouds() {
if (frameCount % 80 === 0) {
var clouds = createSprite(600,80,10,10)
clouds.velocityX = -4.5;
clouds.addImage("cloud", cloudImage)
clouds.scale = 0.5
clouds.lifetime =  220;
clouds.y = random(50,110);
clouds.depth = trex.depth
trex.depth = trex.depth+1
cloudGroup.add(clouds)
}
 
}


function spawnObstacles() {
if (frameCount % 80 == 0) {
var ob = createSprite(600,160,10,10)
ob.velocityX = -(5.5+score/100);
var rand = Math.round( random(1,6));
switch(rand) {
  case 1: ob.addImage("obstacles", obImage1);
                    break;  
  case 2: ob.addImage("obstacles2", obImage2)
                    break;
  case 3: ob.addImage("obstacle3", obImage3)
                    break;
  case 4: ob.addImage("obstacles4", obImage4)
                    break;
 case 5: ob.addImage("obstacles5", obImage5)
                    break;
 case 6:  ob.addImage("obstacles6", obImage6)
                    break;
       default: break;
}
ob.scale = 0.5;
ob.lifetime = 210;
obstaclesGroup.add(ob);

 }
}

function spawnBird() {
if (frameCount % 370 === 0) {
var bird = createSprite(600,random(100,140),10,10)
bird.addImage("bird", birdImage)
bird.velocityX = -(6.5+score/100);
bird.scale = 0.2;
bird.lifetime = 210;
birdGroup.add(bird);
 }
}

function reset() {
trex.changeAnimation("run",treximg);
gameState = PLAY;
obstaclesGroup.destroyEach();
birdGroup.destroyEach();
cloudGroup.destroyEach();
gameover.visible = false;
restart.visible = false;
score = 0;
}