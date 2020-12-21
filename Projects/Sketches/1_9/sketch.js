//Based off the particle system example on p5.js

let spin;

function setup() {
  createCanvas(600, 600);
  // Initialize all values
  r = height * 0.4;
  spin = new Spinner(createVector(width/2, height/2), 200, 1, 0, 0.02, 200);
  colorMode(HSB);
}

function draw() {
  // Convert polar to cartesian
  background(0);
  spin.run();
  fill(255);
  text("1.9.2020", 10, height - 20);
}

class Spinner{
 constructor(center, radius, direction, theta, vel, hue) {
    this.x = 0;
    this.y = 0; 
    this.center = center;
    this.radius = radius;
    this.direction = direction;
    this.theta = theta;
    this.vel = vel;
    this.hue = hue;
    this.color = color(hue, random(100, 200), random(100, 200));
    this.size = 10;
  }
  update(){
    this.x = this.radius * cos(this.theta) + this.center.x;
    this.y = this.radius * sin(this.theta) + this.center.y;
    this.position = createVector(this.x, this.y);
    this.theta += this.vel;
    this.size += cos(this.theta)*2;
  }
  display(){
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
  run(){
    this.update();
    this.display();
  }
};