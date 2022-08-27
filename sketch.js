
var trex ,trex_running;
var ground ,groundImg
var groundclone
var cloud_ing
var ob1,ob2,ob3,ob4,ob4,ob5,ob6
var gamestate = 0
var cloudGroup, cactusGroup
var score = 0
var trex_collided
var checkpoint
var die 
var jump
var gameOver, gameOver_img
var reset, reset_img



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  trex_collided = loadAnimation("trex_collided.png")
  groundImg = loadImage("ground2.png")
  cloud_ing = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  checkpoint = loadSound("checkpoint.mp3")
  die = loadSound("die.mp3")
  jump = loadSound("jump.mp3")
  gameOver_img = loadImage("gameOver.png")
  reset_img = loadImage("restart.png")

}

function setup(){
  createCanvas(600,200)
  
  trex = createSprite(100,180,20,20)
  trex.addAnimation("run",trex_running)
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5
  gameOver = createSprite(300,100,40,20)
  reset = createSprite(300,150,40,20)
  gameOver.addImage(gameOver_img)
  reset.addImage(reset_img)
  reset.scale = 0.5
  gameOver.scale = 0.75

  // trex.debug = true
  
  trex.setCollider("circle",0,0,40)
  //trex.setCollider("rectangle",0,0,300,trex.height)
  // first 0 = x offset
  // second 0 = y offset

  ground = createSprite(300,180,600,15)
  ground.addImage(groundImg)
  // ground.velocityX = -8

  groundclone = createSprite(300,184,600,5)
  groundclone.visible = false
  // console.log(10/2)
  // console.log(10%2)
  // console.log(10%3)
 
  cloudGroup = createGroup ()
  cactusGroup = new Group()
}

function draw(){
  background("white")
  drawSprites()
  text("Score: " + score, 510,30)

  //console.log(frameCount)
  //console.log(trex.y) 
  //console.log(Math.round(random(10,80)))

  

  if(gamestate === 0){
    ground.velocityX = -(6 + score / 100)
    trex.velocityY = trex.velocityY + 1
    trex.collide(groundclone)
    gameOver.visible = false
    reset.visible = false
    if(keyDown("SPACE") && trex.y > 157){
      trex.velocityY = -12
      jump.play()
    }
    if(ground.x < 0){
      ground.x = 300
  
    }
    createCloud()
    createCactus()
    score = score + Math.round(getFrameRate()/60)

    if(trex.isTouching(cactusGroup)){
      gamestate = gamestate + 1
      die.play()
      //trex.velocityY = -10
      //jump.play()


    }

    if(score % 100 === 0 && score > 0){
      checkpoint.play()

    }

    
  }

  else{
    ground.velocityX = 0
    trex.velocityY = 0
    cloudGroup.setVelocityXEach(0)
    cloudGroup.setLifetimeEach(-1)
    cactusGroup.setVelocityXEach(0)
    cactusGroup.setLifetimeEach(-1)
    trex.changeAnimation("collided")
    gameOver.visible = true
    reset.visible = true
    if(mousePressedOver(reset)){
      restart()

    }
    
    
  }
}

function createCloud(){
  if(frameCount % 75 === 0){
    var cloud = createSprite(580,20,20,20)
    cloud.velocityX = -2
    cloud.y = Math.round(random(20,100))
    cloud.addImage(cloud_ing)
    trex.depth = cloud.depth + 1
    cloud.lifetime = 290
    //console.log(trex.depth)
    //console.log(cloud.depth)

    cloudGroup.add(cloud)
  }
  


}

function createCactus(){
  if(frameCount % 85 === 0){

    var cactus =  createSprite(580,170,20,20)
    cactus.velocityX = -(6 + score / 100)
    var choice = Math.round(random(1,6))

    cactusGroup.add(cactus)
  
    switch(choice){
      case 1: cactus.addImage(ob1); break
      case 2: cactus.addImage(ob2); break
      case 3: cactus.addImage(ob3); break
      case 4: cactus.addImage(ob4); break
      case 5: cactus.addImage(ob5); break
      case 6: cactus.addImage(ob6); break
    }
    cactus.lifetime = 300
    cactus.scale = 0.625

    
  }

  
}

function restart(){
  gamestate = 0
  cactusGroup.destroyEach()
  cloudGroup.destroyEach()
  trex.changeAnimation("run")
  score = 0


}

