var bg,bgImg;
var player,playerImg;
var bullet;
var enemy,enemyImg,enemyShip;
var bulletGroup,enemyShipGroup;
var gameState="rest";
var edge1,edge2,edge3,edge4;
var score=0;
var pellet,pelletGroup;
var heart1Img,heart2Img,heart3Img;
var life=3;

function preload(){
  bgImg=loadImage("background.jpg");
  playerImg=loadImage("ship-removebg-preview.png");
  enemyImg=loadImage("enemy.png");
  heart1Img=loadImage("heart_1.png");
  heart2Img=loadImage("heart_2.png");
  heart3Img=loadImage("heart_3.png");
}

function setup() {
  createCanvas(1000,800);
  bg=createSprite(600,400,1200,1000);
  bg.addImage(bgImg);
  bg.scale=1.5
  player=createSprite(350,750,5,5);
  player.addImage(playerImg);
   player.scale=0.5;
   player.debug=true;
  //bullet=createSprite(600,750,5,5);
  //bullet.addImage(bulletImg);

  //edge1=createSprite(1000,400,20,1060);

  //edge2=createSprite(5,400,20,1060);

  //edge3=createSprite(500,5,1060,20);
  
  //edge4=createSprite(500,795,1060,20);
  heart1 = createSprite(880,90,20,20);
   heart1.visible = false;
    heart1.addImage("heart1",heart1Img);
    heart1.scale = 0.2;

    heart2 = createSprite(880,90,20,20);
    heart2.visible = false;
    heart2.addImage("heart2",heart2Img);
    heart2.scale = 0.2;

    heart3 = createSprite(880,90,20,20);
    heart3.addImage("heart3",heart3Img);
    heart3.scale = 0.2;


  bulletGroup=new Group();
  pelletGroup=new Group();
  enemyShipGroup= new Group();

}

function draw() {
  background("grey");

  if(keyWentDown("R")){
    gameState="play"
  }
  
  if(gameState=== "play"){
    player.visible=true;

    if(life===3){ 
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
      } 
    if(life===2){ 
      heart2.visible = true 
      heart1.visible = false 
      heart3.visible = false 
    }
    if(life===1){ 
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false 
      }

  if(keyDown("LEFT_ARROW")){
    player.x=player.x-10
  }

  if(keyDown("RIGHT_ARROW")){
    player.x=player.x+10
  }

  if(keyWentDown("space")){
    bullet=createSprite(player.x,player.y-48,5,5);
    bullet.velocityY=-30;
  
    bulletGroup.add(bullet);
  }
  if(bulletGroup.isTouching(enemyShipGroup)){
   bulletGroup.destroyEach();
   enemyShipGroup.destroyEach();
   score=score+100;
  }
  if(pelletGroup.isTouching(player)){
    //gameState="end"
    pelletGroup.destroyEach();
    life=life-1;
  }

  if(life===0){
    gameState="end"
  }

  enemy();
}

  drawSprites();
  textSize(20);
  fill("gold")
  text("Score="+score,850,50);
  //createEdgeSprites();
  if(gameState=== "rest"){
    textSize(40);
    fill("gold")
    text("Press 'R' to Start",300,400);
    player.visible=false;
  }
  if(gameState==="end"){
    pelletGroup.destroyEach();
    player.destroy();
    enemyShipGroup.destroyEach();
    textSize(60);
    fill("gold")
    text("Game Over",300,400)
    if(life===0){ 
      heart1.visible = false
      heart3.visible = false
      heart2.visible = false 
      }
  }
}

function enemy(){ 
  if(frameCount%60===0){
    enemyShip=createSprite(50,50,30,30);
    enemyShip.x=Math.round(random(0,600));
    enemyShip.y=Math.round(random(50,150));
    enemyShip.addImage(enemyImg);
    enemyShip.scale=0.3;
    enemyShip.velocityX=+5;
    enemyShip.debug=true;
    //enemyShip.setCollider("rectangle",0,0,40,40);
    //enemyShip.collide(edge1);
    //enemyShip.collide(edge2);
    //enemyShip.collide(edge3);
    //enemyShip.collide(edge4);
    //if(enemyShip.isTouching(edge1)){
    //enemyShip.velocityX=-10
    //}
    enemyShipGroup.add(enemyShip);
  
  }
  if(frameCount%60===0){
   pellet=createSprite(50,50,5,5)
   pellet.x=enemyShip.x;
   pellet.y=enemyShip.y;
   pellet.velocityY=+30

   pelletGroup.add(pellet);
  }

}