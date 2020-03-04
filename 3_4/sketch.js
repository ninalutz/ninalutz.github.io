let num = 500;
let pos = [];
let vel = [];

function setup() {
  createCanvas(600, 600);
  background(0);

  for (let i = 0; i < num; i++) {
    pos[i] = createVector(width / 2, height / 2);
    vel[i] = createVector(0, 0);
  }
}

function draw() {
  for (let i = 0; i < pos.length; i++) {
    pos[i].add(vel[i]);

    let rotation = random(TWO_PI);
    vel[i].x += cos(rotation) * 0.2;
    vel[i].y += sin(rotation) * 0.2;

    if (pos[i].x < 0 || pos[i].x > width || pos[i].y < 0 || pos[i].y > height) {
      vel[i].mult(0);
    }
    strokeWeight(3);
    stroke(255, 15);
    line(pos[i].x, pos[i].y, pos[i].x + vel[i].x * 2, pos[i].y + vel[i].y * 2);
  }

    noStroke();
  fill(0, 0, 0, 10);
  rect(0, 0, width, height);
  fill(255);
  text("3.4.20", 30, height-30);

  if(second() % 10 == 0){
    for (let i = 0; i < num; i++) {
        pos[i] = createVector(width / 2, height / 2);
        vel[i] = createVector(0, 0);
    }
  }
}
