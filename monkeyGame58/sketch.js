var PLAY=1;
var OVER=0
var gameState=PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var orange , orangeImage, apple,appleImage;
var FoodGroup, obstacleGroup;
var ground, groundImage;
var rate;
rate=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  orangeImage = 
    loadImage("animated orange.jpg");
  appleImage=
    loadImage("pngtree-big-red-apple-png-image_4726419.jpg");
  obstacleImage = loadImage("obstacle.png");
  
  groundImage=loadImage("gg.jpg");
}



function setup()
{
  createCanvas(600,400);
  monkey = createSprite(50,350);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.14;
  
  
  ground = createSprite(300,395,600,15);
  ground.addImage(groundImage);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}
score=0;

function draw()
{
  background("white");
  
 text("SurvivalTime: "+ score, 120,50);
 score = score + Math.round(getFrameRate()/60); 
  
  if(gameState===PLAY)
  {
  rate = rate + Math.round(getFrameRate()/60);
  ground.velocityX=-7;
  if (ground.x < 300)
  {
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")&&monkey.y>=317)
  {
    monkey.velocityY=-13;
  }
  
  if(obstacleGroup.isTouching(monkey))
  {
    text("Press the right arrow key to restart.", 250, 200);
    ground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);   
    if(keyDown("right_arrow"))
    {
      gameState=OVER;
    }
  }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
  food();
    food2();
    food3();
  obstacles();
  }
  
  if(gameState===OVER)
  {
    reset();
  }
  drawSprites();
}


function food()
{
  if(frameCount%80===0)
  {
    banana = createSprite(400);
    banana.y = Math.round(random(200,260));
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.velocityX=-7;
    banana.lifetime=200;
    FoodGroup.add(banana);
  }
}

function food2()
{
   if(frameCount%100===0)

 {
    orange = createSprite(400);
     orange.y = Math.round(random(180,260));
     orange.addImage(orangeImage);
     orange.scale=0.1
     orange.velocityX=-7;
     orange.lifetime=200;              
    FoodGroup.add( orange);
  }

}
function food3()
{
   if(frameCount%140===0)

 {
   apple = createSprite(400);
     apple.y = Math.round(random(180,260));
     apple.addImage(appleImage);
     apple.scale=0.08;
     apple.velocityX=-7;
     apple.lifetime=200;              
    FoodGroup.add( apple);
  }

}















function obstacles()
{ 
  if(frameCount%300===0)
  {
    obstacle = createSprite(400,322);             
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-7;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;  
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  rate = 0;
}

