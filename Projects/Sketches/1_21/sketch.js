
let dim;

function setup() {
  createCanvas(600, 600);
  dim = width / 2;
  background(0);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  ellipseMode(RADIUS);
  frameRate(1);
  background(0);
  fill(255);
  text("1.21.2019", 20, height - 20); 
  drawGradient(width/2, height / 2);
}

function draw() {
  background(0);
  drawGradient(width/2, height / 2);
  drawGradient(width/2 - dim/2, height / 2);
  drawGradient(width/2 - dim/2, height / 2 - dim/2);
  drawGradient(width/2, height / 2 - dim/2);
  fill(255);
  text("1.21.2020", 20, height - 20); 
}

function drawGradient(x, y) {
  let radius = dim / 2;
  let h = random(0, 360);
  for (let r = radius; r > 0; --r) {
    fill(h, 90, 90);
    rect(x, y, r, r);
    h = (h + 1) % 360;
  }
}

