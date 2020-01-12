//Based off the particle system example on p5.js

let spin;

let spins = [];

function setup() {
  createCanvas(600, 600);
  // Initialize all values
  for (let i = 0; i < 20; i++) {
    var dir = -1;
    if(i%2 == 0){
      dir = 1;
    }
    spin = new Spinner(createVector(width/2, height/2), random(0, 400), dir, 0, random(0.01, 0.1), random(0, 360));
    spins.push(spin);
  }

  colorMode(HSB);
}

function draw() {
  // Convert polar to cartesian
  background(0);
  for (let i = 0; i < spins.length; i++) {
    spins[i].run();
  }
  fill(255);
  text("1.11.2020", 10, height - 20);
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
    this.color = color(hue, 200, 200);
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
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
  run(){
    this.update();
    this.display();
  }
};