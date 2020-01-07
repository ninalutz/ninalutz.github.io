//Based off the particle system example on p5.js

let system;
let system2;

function setup() {
  createCanvas(720, 400);
  //negative goes up in y 
  system = new ParticleSystem(createVector(width/2, height - 20), 200, -1);
  system2 = new ParticleSystem(createVector(width/2, 20), 10, 1);
  colorMode(HSB);
}

function draw() {
  background(0);
  system.addParticle();
  system.run();
  system2.addParticle();
  system2.run();
  fill(255);
  text("1.7.2020", 10, height - 20);
}

// A simple Particle class
let Particle = function(position, hue, direction) {
  this.acceleration = createVector(random(-0.05, 0.05), .05*direction);
  this.velocity = createVector(random(-0.3, 0.3), -0.3);
  this.position = position.copy();
  this.lifespan = random(300, 1000);
  this.size = 0;
  this.color = color(hue, random(100, 200), random(100, 300), 0.5);
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
  this.size += 0.3;
};

// Method to display
Particle.prototype.display = function() {
  noStroke();
  fill(this.color);
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
