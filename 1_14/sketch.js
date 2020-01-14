function setup() {
  createCanvas(600, 600);
  noStroke();
  noLoop();
  colorMode(HSB);
}

function draw() {
  background(0);
  drawCircle(width / 2, 250, 7);
  fill(255);
  text("1.14.2020", 10, height - 20);
}

function drawCircle(x, radius, level) {
  const tt = color((126 * level) / 4.0, 100, 100, 0.5);
  fill(tt);
  ellipse(x, height / 2, radius * 2, radius * 2);
  if (level > 1) {
    level = level - 1;
    drawCircle(x - radius / 2, radius / 2, level);
    drawCircle(x + radius / 2, radius / 2, level);
  }
}