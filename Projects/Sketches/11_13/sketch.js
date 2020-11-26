let lapse = 0;    // mouse timer

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 255)
  background(255);
  angleMode(DEGREES);
  strokeWeight(1);
  x=width/2 
  y=height/2
}

var x=100
var y=100
var speed=0
var r=0

function draw() { 
  push();
  translate(x,y);
  rotate(r);
  r+=5;
  // speed=(mouseX+mouseY)/100
  speed+=0.05;
  stroke(r%255, 200, 255);
  line(0,0,-1400,0)
  y+=speed*sin(r)
  x+=speed*cos(r)
  pop()

  fill(0);
  text("11.13.20", 30, height-30)
}



function mousePressed(){
// prevents mouse press from registering twice
  if (millis() - lapse > 500){
    save('pix.jpg');
    lapse = millis();
  } 
} 