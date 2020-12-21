let diameter;
let angle = 0;

function setup() {
  createCanvas(600, 600);
  diameter = height - 10;
  noStroke();
}

function draw() {
  background(0);

  let d1 = 10 + (sin(angle) * diameter) / 2 + diameter / 2;
  let d2 = 10 + (sin(angle + PI / 2) * diameter) / 2 + diameter / 2;
  let d3 = 10 + (sin(angle + PI) * diameter) / 2 + diameter / 2;

  ellipse(0, 0, d1, d1);
  ellipse(0, height / 2, d2, d2);
  ellipse(width, height / 2, d3, d3);

  angle += 0.02;

  fill(255);
  text("1.16.2020", width-70, height - 20);
}
