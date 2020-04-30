let size = 600;
let numPetals = 10;
let petalSize;
let minPetalSize;
let outStep;
let outFraction = 0.5;
let phi;
let epsilon = 0.05;

function setup() {
  createCanvas(size, size);
  minPetalSize = floor(size/numPetals);
  outStep = minPetalSize * outFraction;
  phi = sqrt(50)/2;
  frameRate = 60;
}

function draw() {
  theta = millis()/1000;
  petalSize = minPetalSize + mouseY/height * 100;

  background(0, 5);
  translate(width/2, height/2);
  
  stroke(255);
  strokeWeight(0.5)
  //rect(0,0,width,height);

  for (let i=0; i<numPetals; i++) {
    let r = i*outStep;
    let angle = i*theta;
    let prev = (i-1)*theta;
    let x = r*cos(angle);
    let y = r*sin(angle);
    let px = r*cos(prev);
    let py = r*sin(prev);
    let scale = 1 + i/numPetals * 3;
    ellipse(px, py*i, 10, 10);
    line(x, y, 0, 0);
  }
  fill(255);
  noStroke();
  text("4.30.20", 30 - width/2, height-30 - height/2)
}