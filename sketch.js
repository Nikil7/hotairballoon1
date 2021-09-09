var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg, bgImg;
var bottomGround;
var topGround;
var balloon, balloonImg;
var obstacle1Img,obstacle2Img,obstacle3Img,obstacle4Img,obstacle5Img;
var gameOverImg,restartImg,dieSound,jumpSound,blastImg;
var gameOver, restart;
var coinImg,coin;
var score = 0;
var lifeImg3,lifeImg2,lifeImg1,heart = 3, life;
var dieSound,coinSound,bgSound;

function preload(){
bgImg = loadImage("assets/bg.png")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
obstacle1Img = loadImage("assets/obsBottom1.png");
obstacle2Img = loadImage("assets/obsBottom2.png");
obstacle3Img = loadImage("assets/obsBottom3.png");
obstacle4Img = loadImage("assets/obsTop1.png");
obstacle5Img = loadImage("assets/obsTop2.png");
blastImg = loadAnimation("assets/blast.png");
gameOverImg = loadImage("assets/gameOver.png");
restartImg = loadImage("assets/restart.png");
coinImg = loadImage("assets/goldCoin.png");
lifeImg3 = loadAnimation("assets/3 hearts.png")
lifeImg2 = loadAnimation("assets/2 heartsbg.png")
lifeImg1 = loadAnimation("assets/1 heartbg.png")
dieSound = loadSound("./assets/die.mp3");
coinSound = loadSound("./assets/coin.mp3");
bgSound = loadSound("./assets/sound1.mp3");
}

function setup(){
createCanvas(1200,500);

//background image
bg = createSprite(165,485,1000,400);
bg.addImage(bgImg);
bg.scale = 2;

//creating top and bottom grounds
bottomGround = createSprite(200,490,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.addAnimation("blast",blastImg);
balloon.scale = 0.2;

bottomObstaclesGroup = new Group();
topObstaclesGroup = new Group();
coinsGroup = new Group();

gameOver = createSprite(550,200);
gameOver.addImage(gameOverImg);
gameOver.visible = false;

restart = createSprite(570,250);
restart.addImage(restartImg);
restart.visible = false;

life = createSprite(1100,50,50,50);
life.addAnimation("3hearts",lifeImg3)
life.addAnimation("2hearts",lifeImg2)
life.addAnimation("1heart",lifeImg1)
life.scale = 0.3;

}

function draw() {

  background("black");
        
  //bgSound.play();


  if(gameState === PLAY){

    

    //making the hot air balloon jump
    if(keyDown("space")) {
      balloon.velocityY = -10 ;
      
    }

    //adding gravity
     balloon.velocityY = balloon.velocityY + 2;
     balloon.collide(bottomGround);
     balloon.collide(topGround);

    if(balloon.isTouching(bottomObstaclesGroup) || balloon.isTouching(topObstaclesGroup)){
        heart = heart - 1;
        bottomObstaclesGroup.destroyEach(0);
        topObstaclesGroup.destroyEach(0);


        if(heart === 2){
          life.changeAnimation("2hearts",lifeImg2);
        }

        if(heart === 1){
          life.changeAnimation("1heart",lifeImg1);
        }

        if(heart === 0){
          balloon.changeAnimation("blast",blastImg);
          dieSound.play();
          gameState = END;
        }
    }

    if(balloon.isTouching(coinsGroup)){
      coinsGroup.destroyEach();
      coinSound.play();
      score = score+1;
    }
 

  bottomObstacle();
  topObstacle();
  spawnCoins();

  }else if(gameState === END){
      balloon.velocityY = 0;
      //bottomObstaclesGroup.setVelocityEach(0);
      //topObstaclesGroup.setVelocityEach(0);
      //bottomObstaclesGroup.setLifetimeEach(-1);
      //topObstaclesGroup.setLifetimeEach(-1);
      bottomObstaclesGroup.destroyEach();
      topObstaclesGroup.destroyEach();
      coinsGroup.destroyEach();

      gameOver.visible = true;
      restart.visible = true;

      if(mousePressedOver(restart)){
        reset();
      }
    }




          
        drawSprites();
    textSize(20);
    fill("blue");
    text("Score: "+score,50,50);
  
}

function bottomObstacle(){
  if(frameCount % 170 === 0){
    var obstacle = createSprite(1150,405,50,50);
    obstacle.velocityX = -(3 + 10*score/10);
    
    var rand = Math.round(random(1,3))
    switch(rand){
      case 1: obstacle.addImage(obstacle1Img);
      break;
      case 2: obstacle.addImage(obstacle2Img);
      break;
      case 3: obstacle.addImage(obstacle3Img);
      break;
      default: break;
    }
    obstacle.lifetime = 400;
    obstacle.scale = 0.1;

    bottomObstaclesGroup.add(obstacle);
  }
}

function topObstacle(){
  if(frameCount % 150 === 0){
    var obstacle = createSprite(1150,100,50,50);
    obstacle.velocityX = -5;
    obstacle.y = Math.round(random(50,200))
    var rand = Math.round(random(1,2))
    switch(rand){
      case 1: obstacle.addImage(obstacle4Img);
      break;
      case 2: obstacle.addImage(obstacle5Img);
      break;
      default: break;
    }
    
    obstacle.lifetime = 400;
    obstacle.scale = 0.1;

    topObstaclesGroup.add(obstacle);
  }
}

function spawnCoins(){
  if(frameCount % 130 === 0){
    var coin = createSprite(1150,100,50,50);
    coin.velocityX = -7;
    coin.y = Math.round(random(50,450))
    coin.addImage("coin",coinImg);
    coin.lifetime = 400;
    coin.scale = 0.1;

    coinsGroup.add(coin);
  }
}

function reset(){
  gameState = PLAY;
  balloon.changeAnimation("balloon",balloonImg);
  bottomObstaclesGroup.destroyEach();
  topObstaclesGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  life.changeAnimation("3hearts",lifeImg3); 
  heart = 3;

}

