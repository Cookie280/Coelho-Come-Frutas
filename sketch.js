const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,rope2,rope3,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,button2,button3,balloon,mute_btn;
var bunny;
var blink,eat,sad;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  bg_music = loadSound("sound1.mp3");
  rope_cut = loadSound('rope_cut.mp3')
  eating_sound = loadSound('eating_sound.mp3')
  air = loadSound('Cutting Through Foliage.mp3')
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  bg_music.play();

  engine = Engine.create();
  world = engine.world;

  var mobile = /iPhone | iPad | iPod | Android/i.test(navigator.userAgent)
  if(mobile){
    canW = displayWidth
    canH = displayHeight
    createCanvas(displayWidth+80,displayHeight)
  }
  else{
    canW = displayWidth
    canH = displayHeight
    createCanvas(displayWidth,displayHeight)
  }
  
  button = createImg('cut_btn.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(425,100);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(375,350);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  balloon = createImg('blower.png');
  balloon.position(25,275);
  balloon.size(150,75);
  balloon.mouseClicked(vento);

  mute_btn = createImg('mute.png');
  mute_btn.position(25,25)
  mute_btn.size(75,75)
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(7,{x:230,y:30});
  rope2 = new Rope(8,{x:450,y:100});
  rope3 = new Rope(7,{x:400,y:350});
  ground = new Ground(200,canH,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(230,canH-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,windowWidth+80,windowHeight*1.5);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }
   
  if(collide(fruit,ground.body)==true )
  {
     bunny.changeAnimation('crying');
   }

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  rope_cut.play();
}

function drop2()
{
  rope2.break();
  fruit_con2.dettach();
  fruit_con2 = null; 
  rope_cut.play();
}

function drop3()
{
  rope3.break();
  fruit_con3.dettach();
  fruit_con3 = null; 
  rope_cut.play();
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}
function vento()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  air.play();
}
function mute()
{
  if(bg_music.isPlaying()){
    bg_music.stop();
  }
  else{
    bg_music.play()
  }
}