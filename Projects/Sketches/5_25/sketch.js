// forked from Roni Kaufman
// Mod Nina Lutz 2020

let kMax;
let step;
let n = 40; // number of blobs
let radius = 5; // diameter of the circle
let inter = 0.5; // difference between the sizes of two blobs
let maxNoise = 500;

let noiseProg = (x) => (x);

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  noFill();
  //noLoop();
  kMax = 1;
  step = 0.01;
  strokeWeight(2);
}

function draw() {
  background(0, 50);
  let t = frameCount/100;
  kMax = noise(t/2);
  
  for (let i = 0; i < n; i++) {
    let alpha = 1 - noiseProg(i / n);
    stroke(100);
    strokeWeight(noise(t + i/n)*2 + 1);
    let size = radius + i * inter;
    let k = kMax * sqrt(i/n);
    let noisiness = maxNoise * noiseProg(i / n);
    blob(size, width/2, height/2, k, t + i * step, noisiness);
  }
  noStroke();
  fill(255);
  text("5.25.20", 30, height-30)
  noFill()
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
  let angleStep = 360 / 500;
  for (let theta = 0; theta < 360; theta += angleStep) {
    let r1, r2;
    /*
    if (theta < PI / 2) {
      r1 = cos(theta);
      r2 = 1;
    } else if (theta < PI) {
      r1 = 0;
      r2 = sin(theta);
    } else if (theta < 3 * PI / 2) {
      r1 = sin(theta);
      r2 = 0;
    } else {
      r1 = 1;
      r2 = cos(theta);
    }
    */
    r1 = cos(theta)+1;
    r2 = sin(theta)+1;
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape(CLOSE);
}