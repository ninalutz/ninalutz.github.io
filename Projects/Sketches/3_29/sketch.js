// By Roni Kaufman

let kMax;
let step;
let n = 20; // number of blobs
let radius = 0; // diameter of the circle
let inter = 2; // difference between the sizes of two blobs
let maxNoise = 600;
let lapse = 0;    // timer
let noiseProg = (x) => (x);
let min =0.5;
var notSwitched = true;

var c1,c2,c3,c4,c5,c6,c7,c8,c9;

function setup() {
  makeRandom();
  min = minute();
  createCanvas(600, 600);
  angleMode(DEGREES);
  noFill();
  //noLoop();
  kMax = random(0.6, 1.0);
  step = 0.01;
  // noStroke();
}

function draw() {
  blendMode(BLEND);
  background(0);
  blendMode(ADD);

  let t = frameCount/100;
  for (let i = n; i > 0; i--) {
    let alpha = pow(1 - noiseProg(i / n), 3);
    let size = radius + i * inter;
    let k = kMax * sqrt(i/n);
    let noisiness = maxNoise * noiseProg(i / n);  
    stroke(c1, c2, c3, alpha*255);
    strokeWeight(2)
    blob(size, width/2, height/2, k, t - i * step, noisiness);
    fill(c1 + 20, c2 + 20, c3 + 20, alpha*255);
    blob(size, width/2, height/2, k, t - i * step - 20, noisiness);
    fill(c1 + 40, c2 + 40, c3 + 40, alpha*255);
    blob(size, width/2, height/2, k, t - i * step - 10, noisiness);
  }
  fill(255)
  noStroke();
  text("3.29.20", 30, height -30);
  if(second() % 10 == 0 && notSwitched){
    makeRandom();
    notSwitched = false;
  }
  else notSwitched = true;
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  // beginShape();
  let angleStep = 360 / 12;
  for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
    let r1, r2;
    r1 = cos(theta)+1;
    r2 = sin(theta)+1;
    r3 = cos(theta)+2;
    r4 = sin(theta)+2;
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let r5 = size + noise(k * r3,  k * r4, t) * noisiness;
    let x = xCenter + r * cos(theta) + random(1);
    let y = yCenter + r * sin(theta) + random(3);;
    let x1 = xCenter + r5 * cos(theta) + random(1);
    let y1 = yCenter + r5 * sin(theta) + random(3);;
    // vertex(x, y);
    line(x, y, x1, y1);
  }
  // endShape();
}

function makeRandom(){
  c1 = random(255);
  c2 = random(255);
  c3 = random(255);
  c4 = random(255);
  c5 = random(255);
  c6 = random(255);
  c7 =  random(255);
  c8 = random(255);
  c9 = random(255);
}
