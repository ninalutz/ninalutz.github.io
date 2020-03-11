let V = [];
let num = 100;

function setup() {
  createCanvas(600, 600);
  background(255);
  
  for (let i = 0; i < num; i++) { //crea 100 classi dall'array
    V[i] = new Virus(width / 2, height / 2, random(1, 5));
  }
}

function draw() {
  //background(100);
  for (let i = 0; i < num; i++) {
    V[i].create();
    V[i].move();
  }
  fill(0);
  text("3.11.20", 30, height-30);
}


class Virus {
  constructor(_x, _y, _size) {
    this.x = _x;
    this.y = _y;
    this.size = _size;
  }

  create() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(0,random(100,255),50);
    ellipse(0, 0, this.size);
    pop();
  }

  move() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }
}