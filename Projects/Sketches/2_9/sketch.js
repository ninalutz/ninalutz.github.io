//Based off the particle system example on p5.js

let spin;

let spins = [];

function setup() {
  createCanvas(600, 600);
   colorMode(HSB);
  // Initialize all values
  for (let i = 0; i < 200; i++) {
    var dir = -1;
    if(i%2 == 0){
      dir = 1;
    }
    spin = new Spinner(createVector(width/2, height/2), random(0, 850), dir, 0, random(0.01, 0.1), random(0, 360));
    spins.push(spin);
  }

 frameRate(15);
}

function draw() {
  // Convert polar to cartesian
  for (let i = 0; i < spins.length; i++) {
    spins[i].run();
  }
  fill(255);
  text("2.9.2020", 10, height - 20);
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
    this.color = color(hue, 0.3);
    this.size = random(5, 80);
    this.angle = 0;
  }
  update(){
    this.x= (this.radius * cos(this.theta) + this.center.x);
    this.y = (this.radius * sin(this.theta) + this.center.y);
    this.theta += this.vel;
    // this.size += cos(this.theta)*2;
  }
  display(){
    fill(this.color);
    noStroke();
    var ang = this.angle+ 1;
    rotate(this.direction*ang);
    rect(this.x, this.y, this.size, this.size);
    rotate(this.direction*-ang);
    this.size += 1;
    if(this.size >= 150) this.size = 5;
  }
  run(){
    this.update();
    this.display();
  }
};