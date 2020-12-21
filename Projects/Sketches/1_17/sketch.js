let diameter;
let angle = 0;

function setup() {
  createCanvas(600, 600);
  diameter = height - 10;
  noStroke();
  colorMode(HSB);
}

function draw() {
  background(0);

  let d1 = 10 + (sin(angle) * diameter) / 2 + diameter / 2;
  let d2 = 10 + (sin(angle + PI / 2) * diameter) / 2 + diameter / 2;
  let d3 = 10 + (sin(angle + PI) * diameter) / 2 + diameter / 2;
  let d4 = 10 + (sin(angle + PI) * diameter) / 2 - diameter / 2;

  fill(0, 200, 200, 0.5);
  ellipse(0, 0, d1, d1);
  fill(20, 200, 200, 0.5);
  ellipse(0, height / 2, d2, d2);
  fill(40, 200, 200, 0.5);
  ellipse(width, height / 2, d3, d3);
  fill(60, 200, 200, 0.5);
  ellipse(100, height/3, d3, d3);
  fill(80, 200, 200, 0.5);
  ellipse(0, height / 2, d2, d2);
  fill(100, 200, 200, 0.5);
  ellipse(200, height + 20, d4, d4);
  fill(120, 200, 200, 0.5);
  ellipse(width, 20, d2, d2);
  fill(140, 200, 200, 0.5);
  ellipse(width/2, 0, d3, d3);
  fill(160, 200, 200, 0.5);
  ellipse(200, height + 20, d2, d2);
  fill(180, 200, 200, 0.5);
  ellipse(0, height, d4, d4);
  fill(200, 200, 200, 0.5);
  ellipse(width/2, height/2, d4, d4);
  angle += 0.02;

  fill(255);
  text("1.17.2020", 20, height - 20);
}
