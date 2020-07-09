var monkey,banana, obstacle,obGroup,background1,score,fudGroup
var monkeyImage, bananaImage,obstacleImage,backImage
var gameState,PLAY,END,START


function preload(){
  backImage=loadImage("jungle.jpg")
  
  bananaImage=loadImage("Banana.png")
  
  obstacleImage=loadImage("stone.png")
  
  monkeyImage=
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")

}


function setup() {
  createCanvas(600,300);
  
  START=0
  PLAY=1
  END=2
  gameState= START
  
  monkey= createSprite(50,200,20,20)
  monkey.addAnimation("player",monkeyImage)
  monkey.scale=0.1
  
  background1=createSprite(400,0,400,400)
  background1.addImage("scene",backImage)
  background1.velocityX=-2
  background1.depth=1000
  background1.visible=false
  
  monkey.depth=background1.depth
  monkey.depth=monkey.depth+1
  monkey.visible=false
  
  fudGroup=new Group()
  obGroup=new Group()
  score=0
  
}


function draw(){
  background(255); 
  
  if(gameState===START){
    background(80)
  background1.visible=false
    monkey.visible=false
    textSize=60
    fill("white")
    text("1.In this game, you have to press arrow keys to move monkey to feed it bananas and avoid obstacles",30,50)
    text("2.For each banana eaten, the score will increase by two points.",30,85)
    text("3.Once the score reaches a multiple of 10, the size of the monkey will increase.",30,120)
    text("4.Hitting the obstacle once will decrease size will hitting it twice will end game.",30,155)
    text("6.Press s to start. GOOD LUCK.",30,225)
    text("5.Press space key to stop moving",30,190)

    if(keyDown("s")){
      gameState=PLAY
    }
  
  }
  // gameState START end
  
  if(gameState===PLAY){
    ban()
    ob()
    background1.visible=true
    monkey.visible=true
  
  if(keyDown("RIGHT_ARROW")){
     monkey.velocityX=3
     }
  if(keyDown("LEFT_ARROW")){
     monkey.velocityX=-3
     }
  if(keyDown("UP_ARROW")){
     monkey.velocityY=-3
     }
   if(keyDown("DOWN_ARROW")){
     monkey.velocityY=3
     }
   if(keyDown("space")){
     monkey.velocityY=0
     monkey.velocityX=0
     }
  
  if(fudGroup.isTouching(monkey)){
      score=score+2
      fudGroup.destroyEach()
      
    switch(score){
      case 10: monkey.scale=0.12
              break;
      case 20: monkey.scale=0.14
              break;
      case 30: monkey.scale=0.16
              break;
      case 40: monkey.scale=0.18
              break;
      default: break;
    }
    
  }
  
  if(obGroup.isTouching(monkey)){
    monkey.scale=0.08
    score=score-1
    obGroup.destroyEach()
  }
  
  if(score<0){
    gameState=END
  }
    
  if(background1.x<0){
    background1.x= background1.width/2}
 
  }
  // GameState PLAY end
   
  drawSprites();
  
   if(gameState===PLAY){
     textSize=25     
     fill("white")
     text("score:"+score, 500,50)
   }
  if(gameState===END){
    background1.velocityX=0
    monkey.visible=false
    monkey.velocityX=0
    monkey.velocityY=0
    obGroup.setVelocityXEach(0)
    fudGroup.setVelocityXEach(0)
    obGroup.setLifetimeEach(-1)
    fudGroup.setLifetimeEach(-1)
    banana.visible=false
    textSize=400
    fill("white")
    text("GAME OVER :( ", 250,150)
  
  
  }
}


function ban () {
  if(frameCount%80===0){
    banana=createSprite(300,250,20,20)
    banana.addImage("food",bananaImage)
    banana.scale=0.06
    banana.x=random(50,550)
    banana.y=random(100,250)
    fudGroup.add(banana)
    banana.lifetime=100
  }

}

function ob(){
   if(frameCount%100===0){
    obstacle=createSprite(300,250,20,20)
    obstacle.addImage("stone",obstacleImage)
    obstacle.scale=0.2
    obstacle.x=random(50,550)
    obstacle.y=random(100,250)
    obGroup.add(obstacle)
    obstacle.lifetime=100
   }

}


