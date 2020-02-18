// By Roni Kaufman

let kMax;
let step;
let n = 10; // number of blobs
let radius = 0; // diameter of the circle
let inter = 1; // difference between the sizes of two blobs
let maxNoise = 500;

let noiseProg = (x) => (sqrt(x));

function setup() {
  createCanvas(600, 600);
  colorMode(RGB, 1);
  angleMode(DEGREES);
  //noFill();
  //noLoop();
  kMax = 4;
  step = 1;
  strokeWeight(2);
  stroke(0);
  // fill(255, 0, 0);
  // rect(0, 0, width, height);
}

function draw() {
  // background(0);
  let t = frameCount/200;
  noStroke();
  for (let i = n; i >= 1; i--) {
    let alpha = 1 - noiseProg(i / n);
    if (i % 2 === 0) {
      fill(0.99, 1, 1, 0.8);
      noStroke();
    } else {
      fill(0, 1 - alpha);
      //stroke(0.99, 1, 1, 0.8);
    }
    let size = radius*2 + i * inter;
    let k = kMax * sqrt(i/n);
    let noisiness = maxNoise * noiseProg(i / n);
    blob(size, width/2, height/2, k, t + i * step, noisiness);
  }
    // noStroke();
  fill(0);
  text("2.18.20", 50, height - 50);
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