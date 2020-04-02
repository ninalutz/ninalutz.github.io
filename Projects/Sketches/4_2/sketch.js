// By Roni Kaufman

let kMax;
let step;
let n = 20; // number of blobs
let radius = 0; // diameter of the circle
let inter = 1; // difference between the sizes of two blobs
let maxNoise = 800;
let lapse = 0;    // timer
let noiseProg = (x) => (x);
let min =0.5;

var alphaVal = 100;

function setup() {
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
  // blendMode(BLEND);
  background(255, 10);
  // blendMode(ADD);

  let t = frameCount/100;
  for (let i = n; i > 0; i--) {
    let alpha = pow(1 - noiseProg(i / n), 3);
    let size = radius + i * inter;
    let k = kMax * sqrt(i);
    let noisiness = maxNoise * noiseProg(i / n);  
    noFill();
    strokeWeight(0.05);
    stroke(0, alphaVal);
    blob(size, width/2, height/2, k, t - i * step, noisiness);
    blob(size, width/2, height/2, k, t - i * step - 10, noisiness);
    blob(size, width/2, height/2, k, t - i * step - 20, noisiness);
     }
  fill(0)
  noStroke();
  text("4.2.20", 30, height -30);
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
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
    let y1 = yCenter + r5 * sin(theta) + random(3);
    curveVertex(x, y);
    curveVertex(x1, y1);
  }
  endShape();
}
