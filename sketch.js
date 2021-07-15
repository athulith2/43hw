var Monkey, monkey_image;
var Ground, Ground_image;
var realGround
var Rock, Rock_image, RockGroup;
var Banana, Banana_image, BananaGroup;
var GameMode = "Play";
Score = 0;


function preload() {
  monkey_image = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png", "sprite_9.png", "sprite_10.png", "sprite_11.png", "sprite_12.png", "sprite_13.png", "sprite_14.png", "sprite_15.png", "sprite_16.png", "sprite_17.png", "sprite_18.png", "sprite_19.png")
  Ground_image = loadImage("line.png")
  Rock_image = loadImage("obstacle.png")
  Building1_image = loadImage("building 1.png")
  Building1_image = loadImage("building 2.png")
  Building1_image = loadImage("building 3.png")
  Building1_image = loadImage("building 4.png")
  Building1_image = loadImage("building 5.png")
  Building1_image = loadImage("building 6.png")
  Banana_image = loadImage("banana.png")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  //THAT IS LAND 
  Ground = createSprite(2300, height / 2, 800, 200)
  Ground.addImage(Ground_image)
  Ground.scale = 0.47

  //THAT IS YOU FAVOUTATE MONKEY!!!!!!!!!!!!!!!!!!!!!
  Monkey = createSprite(180, height / 2 - 210, 10, 10);
  Monkey.addAnimation("RUN", monkey_image)
  Monkey.scale = 0.15;

 

  realGround = createSprite(1110,640,2300,10)

  Score = 0

  RockGroup = new Group()
  BananaGroup = new Group()


}

function draw() {
  background(320)
  realGround.visible=false
  //that is a private code better don't mess with it
  text(mouseX + "," + mouseY, mouseX, mouseY)

  Monkey.collide(realGround)
  text("Score:" + Score, width / 2 + 300, 20)

  Monkey.setCollider("circle", 0, 0, 220)
  Ground.setCollider("rectangle", 0, 0, 1000, 5)

  if (GameMode == "Play") {
    Score = Score + Math.round(frameRate() / 60)
    if ((keyWentDown("space") || touches.length > 0) && Monkey.y >= height / 2 + 20) {
      Monkey.velocityY = -40;
      touches = []
    }
    if (Ground.x <= -840) {
      Ground.x = 2300
    }
    
    if (Monkey.isTouching(BananaGroup)){
      Score=Score+2
      switch(Score){
      case 10: Monkey.scale = 0.19
        break;
      case 20: Monkey.scale = 0.21
        break;
      case 30: Monkey.scale = 0.23
        break;
      case 40: Monkey.scale = 0.25
        break;
      case 50: Monkey.scale = 0.27
      default: break;
      }
    }
    
    if (Monkey.isTouching(RockGroup)){
      Monkey.scale=0.17
    }

    Ground.velocityX = -(10 + Score / 100)
    RockBuild();
    Bananas();
    Monkey.velocityY = Monkey.velocityY + 3;
    if (RockGroup.isTouching(Monkey)&&Monkey.scale==0.17) {
      GameMode = "END"
    }
  }



  if (GameMode == "END") {
    Ground.velocityX = 0
    RockGroup.setVelocityXEach(0)
    BananaGroup.setVelocityXEach(0)
    RockGroup.setLifetimeEach(-1)
    BananaGroup.setLifetimeEach(-1)
    Monkey.velocityY = Monkey.velocityY + 3;
    text("Game Over Press 'R' to Restart", width / 2, height / 2)
    if (keyDown("R") || touches.length > 0) {
      GameMode = "Play"
      RockGroup.destroyEach()
      RockGroup.setVelocityXEach(10)
      BananaGroup.destroyEach()
      BananaGroup.setVelocityXEach(10)
      Score = 0
      touches = []
    }
  }


  drawSprites();

  fill("black")
  textSize(20)
  text("score:"+Score,1400,90)

}


function RockBuild() {
  if (frameCount % 160 == 0) {
    Rock = createSprite(width, height / 2 + 250, 10, 10)
    Rock.addImage(Rock_image)
    Rock.scale = 0.2
    Rock.velocityX = -(10 + Score / 200)
    Rock.lifetime = 210
    RockGroup.add(Rock)
    Rock.depth = Monkey.depth
    Rock.depth = Monkey.depth + 1
  }
}

function Bananas() {
  if (frameCount % 200 == 0) {
    Banana = createSprite(width, height / 2 +200, 10, 10)
    Banana.addImage(Banana_image)
    Banana.scale = 0.09
    Banana.velocityX = -(10 + Score / 200)
    Banana.lifetime = 210
    BananaGroup.add(Banana)
  }
}