var path,boy,cash,diamonds,jwellery,sword,gameOver;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,gameOverImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var boy_collidedImg;

//Game States
var PLAY=2;
var END=0;
var WIN=3;
var gameState=PLAY;
var LEVEL = 1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  gameOverImg = loadImage("gameOver.png")
  boy_collidedImg = loadImage("Runner-2.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);

  // Moving background
  path=createSprite(width/2,height/2);
  path.addImage(pathImg);
  

  //creating boy running
  boy = createSprite(width/2,height-20,20,20);
  boy.addAnimation("Running",boyImg);
  boy.addAnimation("collided",boy_collidedImg);
  boy.scale=0.07;
  //boy.debug = true;
  boy.setCollider("circle",0,0,500)

  //creatingn Gameover text
  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
    
  //creating the groups
  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
}

function draw() 
{

  background(0);

  if(gameState===PLAY)
  {
    boy.x = World.mouseX;
    if(touches.lenght>0)
    {
      boy.x += 2
      touches = [];
    }

    if(touches.lenght>2)
    {
      boy.x += -2;
      touches = []; 
    }
    
    edges= createEdgeSprites();
    boy.collide(edges);
    
    //code to reset the background
    if(path.y > height )
    {
      path.y = height/4;
    }
    
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) 
    {
      cashG.destroyEach();
      treasureCollection += 30;
    }

    else if (diamondsG.isTouching(boy))
    {
      diamondsG.destroyEach();
      treasureCollection += 40
    }

    else if(jwelleryG.isTouching(boy))
    {
      jwelleryG.destroyEach();  
      treasureCollection += 50    
    }
    
    else
    {
      if(swordGroup.isTouching(boy)) 
      {
        swordGroup.destroyEach();
        gameState = END;
      }
    }

    if(LEVEL === 1)
    {
      path.velocityY = 6;
      cashG.setVelocityYEach(6);
      swordGroup.setVelocityYEach(6);
      jwelleryG.setVelocityYEach(6);
      diamondsG.setVelocityYEach(6);
    }

    if(LEVEL === 2)
    {
      path.velocityY = 8
      cashG.setVelocityYEach(8);
      swordGroup.setVelocityYEach(8);
      jwelleryG.setVelocityYEach(8);
      diamondsG.setVelocityYEach(8);
    }

    if(LEVEL === 3)
    {
      path.velocityY = 10;
      cashG.setVelocityYEach(10);
      swordGroup.setVelocityYEach(10);
      jwelleryG.setVelocityYEach(10);
      diamondsG.setVelocityYEach(10);
    }

    if(LEVEL === 4)
    {
      path.velocityY = 12;
      cashG.setVelocityYEach(12);
      swordGroup.setVelocityYEach(12);
      jwelleryG.setVelocityYEach(12);
      diamondsG.setVelocityYEach(12);
    }

    if(LEVEL === 5)
    {
      path.velocityY = 14;
      cashG.setVelocityYEach(14);
      swordGroup.setVelocityYEach(14);
      jwelleryG.setVelocityYEach(14);
      diamondsG.setVelocityYEach(14);
    }
  }

  if(gameState === END)
  {
    gameOver.visible = true;
    path.velocityY = 0;
    jwelleryG.setVelocityYEach(0);
    jwelleryG.setLifetimeEach(-1);
    cashG.setVelocityYEach(0);
    cashG.setLifetimeEach(-1)
    diamondsG.setVelocityYEach(0);
    diamondsG.setLifetimeEach(-1);
    boy.changeAnimation("collided",boy_collidedImg);
    boy.x = width/2;
  }
  
  if(treasureCollection >= 250)
  {
    LEVEL = 2;
  }

  if(treasureCollection >= 500)
  {
    LEVEL = 3;
  }

  if(treasureCollection >= 750)
  {
    LEVEL = 4;
  }

  if(treasureCollection >= 1000)
  {
    LEVEL = 5;
  }
 

  if(treasureCollection > 1500)
  {
    gameState = WIN;
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection ,10,20);

  if(gameState == WIN)
  {
    path.velocityY = 0;
    jwelleryG.setVelocityYEach(0);
    jwelleryG.setLifetimeEach(-1);
    cashG.setVelocityYEach(0);
    cashG.setLifetimeEach(-1)
    diamondsG.setVelocityYEach(0);
    diamondsG.setLifetimeEach(-1);
    boy.changeAnimation("collided",boy_collidedImg);
    boy.x = 200;
    textSize(40);
    fill("red");
    text("You Win",width/2,height-150);
  }

}

function createCash() 
{
  if (World.frameCount % 200 == 0) 
  {
    var cash = createSprite(Math.round(random(50, width-20)),40, 10, 10);
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.lifetime = 190;
    cashG.add(cash);
    //cash.debug = true;
  }
}

function createDiamonds() 
{
  if (World.frameCount % 320 == 0) 
  {
    var diamonds = createSprite(Math.round(random(50, width-20)),40, 10, 10);
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    
    diamonds.lifetime = 190;
    diamondsG.add(diamonds);
    //diamonds.debug = true;
  }
}

function createJwellery() 
{
  if (World.frameCount % 450 == 0) 
  {
    var jwellery = createSprite(Math.round(random(50, width-20),40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale=0.13;
    jwellery.lifetime = 190;
    jwelleryG.add(jwellery);
    //jwellery.debug = true;
  }
}

function createSword()
{
  if (World.frameCount % 20 == 0) 
  {
    var sword = createSprite(Math.round(random(50, width-20),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale=0.1;
    
    sword.lifetime = height/6;
    swordGroup.add(sword);
    //sword.debug = true;
  }
}