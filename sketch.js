var alien,alien_img;
var alien_group;
var sword,sword_img;
var fruit;
var fruit_group;

var bg,bg_img;

var fruit_img1,fruit_img2;
var fruit_img3,fruit_img4;

var gameOver_img;

var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  alien_img = loadAnimation("alien1.png","alien2.png");
  sword_img = loadImage("sword.png");
  fruit_img1 = loadImage("fruit1.png");
  fruit_img2 = loadImage("fruit2.png");
  fruit_img3 = loadImage("fruit3.png");
  fruit_img4 = loadImage("fruit4.png");
  
  gameOver_img = loadImage("gameover.png");
  
  bg_img = loadImage("background.webp");
}

function setup(){
  createCanvas(400,400);
  
  sword = createSprite(210,150,10,10);
  sword.addImage("sword_img",sword_img);
  sword.addImage("gameOver_img",gameOver_img);
  sword.scale = 0.5;
  
  bg = createSprite(200,200,10,10);
  bg.addImage("bg",bg_img);
  bg.scale = 0.69;
  sword.depth = bg.depth;
  sword.depth = sword.depth+1;
  
  alien_group = new Group();
  fruit_group = new Group();
}

function draw(){
  background("pink");
  
  console.log(frameCount);
  
for(var i = 0 ; i < fruit_group.length ; i++){
  if(sword.isTouching(fruit_group[i])){
  fruit_group[i].destroy();
  score = score+2;
 }
}
  
if(gameState === PLAY){
  
  drawFruits();
  drawAliens();
  
  sword.x = mouseX;
  sword.y = mouseY;
}
  
if(sword.isTouching(alien_group)){
  gameState = END;
}
  
if(gameState === END){
  sword.x = 210;
  sword.y = 190;
  sword.changeImage("gameOver_img",gameOver_img);
  sword.scale = 1.3;
  
  alien_group.destroyEach();
  fruit_group.destroyEach();
} 
 
  drawSprites();
  
  fill("white");
  textSize(20);
  text("score:"+score,180,40);
}

function drawAliens(){
if(frameCount%50 === 0){
  alien = createSprite(405,10,10,10);
  alien.y = Math.round(random(20,380));
  alien.addAnimation("alien_img",alien_img);
  alien_group.add(alien);
  alien_group.setVelocityXEach(-5);
  alien_group.setLifetimeEach(100);
 }
}

function drawFruits(){
if(frameCount%50 === 0){
  fruit = createSprite(405,10,10,10);
  fruit.y = Math.round(random(20,380));
  fruit_group.add(fruit);
  fruit_group.setVelocityXEach(-5);
  fruit_group.setLifetimeEach(100);
  fruit_group.setScaleEach(0.2);
  
  var rand = Math.round(random(1,4));
  
  switch(rand){
    case 1: fruit.addImage("fruit1",fruit_img1);
      break;
    case 2: fruit.addImage("fruit2",fruit_img2);
      break;
    case 3: fruit.addImage("fruit3",fruit_img3);
      break;
    case 4: fruit.addImage("fruit4",fruit_img4);
      fruit.scale = 0.15;
  }
 }
}