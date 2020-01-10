//Based off the particle system example on p5.js

let spin;
let spin2;

function setup() {
  createCanvas(600, 600);
  // Initialize all values
  r = height * 0.4;
  spin = new Spinner(createVector(width/2, height/2), 200, 1, 0, 0.02, 200);
  spin2 = new Spinner(createVector(width/2, height/2), 100, -1, 0, 0.02, 0);
  colorMode(HSB);
}

function draw() {
  // Convert polar to cartesian
  background(0);
  spin.run();
  spin2.run();
  fill(255);
  text("1.10.2020", 10, height - 20);
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
    this.color = color(hue, 100, 100);
    this.size = 5;
  }
  update(){
    this.x= (this.radius * cos(this.theta) + this.center.x);
    this.y = (this.radius * sin(this.theta) + this.center.y);
    if(this.direction < 0) { //go other way 
        this.x = (this.radius * sin(this.theta) + this.center.y);
        this.y = (this.radius * cos(this.theta) + this.center.x);
      }
    this.theta += this.vel;
    this.size += cos(this.theta)*1.5;
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