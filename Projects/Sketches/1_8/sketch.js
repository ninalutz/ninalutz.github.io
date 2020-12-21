//Based off the particle system example on p5.js
let system;
let r;
// Angle and angular velocity, accleration
let  theta = 0;
let  theta_vel = 0.02;
let x = 0;
let y = 0;

function setup() {
  createCanvas(600, 600);
  // Initialize all values
  r = height * 0.4;
  system = new ParticleSystem(createVector(x, y), 200, -1);
  colorMode(HSB);

}

function draw() {
  // Convert polar to cartesian
  background(0);
  system.addParticle();
  system.run();
  fill(255);
  text("1.8.2020", 10, height - 20);
  theta += theta_vel;
}

// A simple Particle class
let Particle = function(position, hue, direction) {
  this.position = position.copy();
  this.lifespan = random(100, 400);
  this.size = 0;
  this.color = color(hue, random(100, 200), random(100, 300), 0.2);
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.position = createVector(r * cos(theta) + width/2, r * sin(theta) + height/2);
  this.lifespan -= 2;
  this.size += 0.3;
};

// Method to display
Particle.prototype.display = function() {
  noStroke();
  fill(sin(theta)*100, 100, 100, 0.5);
  ellipse(this.position.x, this.position.y, this.size, this.size);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position, hue, direction) {
  this.origin = position.copy();
  this.hue = hue;
  this.direction = direction;
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin, this.hue, this.direction));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1); //gets rid of dead particles 
    }
  }
};
