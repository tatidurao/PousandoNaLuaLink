let ground;
let lander;
var lander_img;
var bg_img;


var vx = 0;
var g = 0.05;
var vy = 0;

var combustivel = 100;

function preload()
{
 base_img=loadImage("lz.png")
obstaculo_img = loadImage("obstacle.png")
lander_img=loadImage("normal.png")
bg_img=loadImage("bg.png")
fogo_ant=loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png")
fumaçaD_ant=loadAnimation("right_thruster_1.png","right_thruster_2.png")
fumaçaE_ant=loadAnimation("left_thruster_1.png","left_thruster_2.png")
pousando_ant=loadAnimation("landing1.png","landing2.png", "landing_3.png")
quebrando_ant=loadAnimation("crash1.png","crash2.png","crash3.png")
normal_ant= loadAnimation("normal.png")
fumaçaD_ant.looping=false
fumaçaE_ant.looping=false
quebrando_ant.looping=false

}

function setup() {
  createCanvas(1000,700);
 adjustOrientation()
  frameRate(80);
  ground = createSprite(500,690,1000,20)

  lander=createSprite(100,50,30,30)
  lander.addImage(lander_img)
  lander.scale = 0.1
  lander.addAnimation("fogo_ant", fogo_ant)
  lander.addAnimation("fumaçaD_ant", fumaçaD_ant)
  lander.addAnimation("fumaçaE_ant", fumaçaE_ant)
  lander.addAnimation("pousando_ant",pousando_ant)
  lander.addAnimation("quebrando_ant",quebrando_ant)
  lander.addAnimation("normal_ant", normal_ant)

  quebrando_ant.frameDelay = 10

  obstaculo = createSprite(400,450,50,100)
  obstaculo.addImage("obstaculo_img",obstaculo_img)
  obstaculo.scale = 0.9
  obstaculo.setCollider("rectangle",-60,150,150,250)
  lander.setCollider("rectangle",0,0,500,500)


  base = createSprite(880,610,50,30)
  base.addImage("base_img",base_img)
  base.setCollider("rectangle",0,170,500,70)
  base.scale = 0.3


  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Velocidade Horizontal: "+ round (vx), 800, 100)
  text("Velocidade Vertical: "+ round(vy),800,75)
  text("Combustivel: "+ combustivel, 800 , 125)
  pop()

  lander.depth = base.depth 
  lander.depth +=1

  if (lander.x > 1000 || lander.x<0 || lander.y <0 ){
    setTimeout(() => {
      gameOver()}, 700);
    combustivel = 0
    lander.changeAnimation("quebrando_ant")
   }
  vy = vy + g
  lander.position.y = lander.position.y + vy
  lander.position.x = lander.position.x + vx

  if(lander.collide(ground) == true){
    vx = 0
    vy = 0
    g = 0
    lander.changeAnimation("quebrando_ant")
    setTimeout(() => {
      gameOver()}, 700);
    
  }

  if(lander.collide(obstaculo) == true){
    vx = 0
    vy = 0
    g = 0
    lander.changeAnimation("quebrando_ant")
    setTimeout(() => {
      gameOver()}, 700);
  }

  if(lander.collide(base) == true){
    vx = 0
    vy = 0
    g = 0
    lander.changeAnimation("pousando_ant")
    setTimeout(() => {
      ganhar()}, 700);
  
  }
  drawSprites();
}


function keyPressed(){
  if (keyCode == LEFT_ARROW && combustivel > 0){
    lander.changeAnimation("fumaçaD_ant")
    left()
    combustivel -= 1;
  }
  
  if (keyCode == RIGHT_ARROW && combustivel> 0){
    lander.changeAnimation("fumaçaE_ant")
    right()
    combustivel -= 1;
  }

  if (keyCode == UP_ARROW && combustivel >0){
    lander.changeAnimation("fogo_ant")
    up()
    combustivel -= 1;
  }  

}

function keyReleased(){
  if (keyCode == LEFT_ARROW){
    lander.changeAnimation("normal_ant")
  }

  if (keyCode == RIGHT_ARROW){
    lander.changeAnimation("normal_ant")
  }

  if (keyCode == UP_ARROW){
    lander.changeAnimation("normal_ant")
  }

}

function up(){
  vy= vy - 2
}

function right(){
  vx = vx + 1
}

function left(){
  vx = vx - 1
}

function gameOver(){
  swal({
    title: "Fim de Jogo",
    text: "Oops você perdeu!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Obrigado por jogar"
  
  },
  function(isConfirm){
    if (isConfirm) {
      location.reload();
    }
  }

  );


}

function ganhar(){
  swal({
    title: "parabéns você ganhou!",
    text: "Muito bem!",
    imageUrl:
      "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
    imageSize: "100x100",
    confirmButtonText: "jogar novamente"
  
  },
  function(isConfirm){
    if (isConfirm) {
      location.reload();
    }
  }

  );


}

function adjustOrientation() {
    if (window.innerHeight > window.innerWidth) {
        alert('Por favor, gire seu dispositivo para o modo paisagem');
    }
}

window.addEventListener('resize', adjustOrientation);
window.addEventListener('orientationchange', adjustOrientation);
