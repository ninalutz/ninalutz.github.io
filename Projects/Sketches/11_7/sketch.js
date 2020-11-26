let objs = [];
let objsNum = 300;
let MIN;
let SIZE;
let palette = ["#d60270", "#9b4f96", "#0038a8"];

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  MIN = min(width, height);
  SIZE = MIN * 0.024;
  noStroke();

  for (let i = 0; i < objsNum; i++) {
    objs.push(new Obj());
  }

  background(0);
}

function draw() {
  // blendMode(BLEND);
  background(0, 10);

  // blendMode(SCREEN);
  for (let i = 0; i < objs.length; i++) {
    objs[i].move();
    objs[i].display();
  }
  fill(255);
  noStroke();
  text("11.8.20", 30, height-30)
}

class Obj {
  constructor() {
    this.r = 0;
    this.t = random(360);

    this.d = 0;
    this.dMax = random(10, 30);
    this.dt = random(360);
    this.n = random(100);
    this.nn = random(100);

    this.c = random(palette);
    this.tStep = map(this.dMax, 10, 30, 1.0, 0.25);
    this.nnStep = map(this.dMax, 10, 30, 0.0125, 0.01);
  }

  move() {
    this.r = map(noise(this.n, this.nn), 0, 1, -10, 10) + SIZE;
    this.t += this.tStep;
    this.nn += this.nnStep;

    this.d = this.dMax * abs(sin(this.dt));

    this.dt += this.tStep;
  }

  display() {
    let pos = calcPos(this.r, this.t);
    fill(this.c);
    stroke(this.c)
    ellipse(pos.x, pos.y, this.d, this.d);
  }
}

function calcPos(r, t) {
  let x = r * (16 * sin(t) * sin(t) * sin(t)) + width / 2;
  let y = (-1) * r * (13 * cos(t) - 5 * cos(2 * t) -
    2 * cos(3 * t) - cos(4 * t)) + height * 0.425;

  return createVector(x, y);
}