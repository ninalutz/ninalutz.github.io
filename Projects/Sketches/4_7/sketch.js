/*
Based off: 
Waterfall cascades

Simulation of water colliding against rocks, and splitting to smaller drops.

Author:
  Jason Labbe

Site:
  jasonlabbe3d.com
*/

var pMinMass = 2;
var pMaxMass = 8;
var cMinMass = 15;
var cMaxMass = 100;

var waterfallMin;
var waterfallMax;

var particles = [];
var collisions = [];

var fps;

var friction = 0.3;
var splitCount = 1;
var spawnCount = 4;


function do_aabb_collision(ax, ay, Ax, Ay, bx, by, Bx, By) {
  return ! ((Ax < bx) || (Bx < ax) || (Ay < by) || (By < ay));
}


// Set new targets for collision objects to lerp to.
function setNewLayout() {
  for (var i = 0; i < collisions.length; i++) {
    collisions[i].target.x = random(width/2.4, width-width/2.4);
    collisions[i].target.y = random(height/2, height);
    collisions[i].targetMass = random(cMinMass, cMaxMass);
  }
}


function setup() {
  createCanvas(600, 600);
  
  waterfallMin = 50;
  waterfallMax = 500;

  // Create collision objects.
  for (var i = 0; i < 20; i++) {
    var x = random(waterfallMin, waterfallMax);
    var y = random(height/2, height);
    var mass = random(cMinMass, cMaxMass);
    collisions[collisions.length] = new Collision(x, y, mass);
  }
}


function draw() {
  background(255, 15);
  
  
  colorMode(HSB, 360);
  
  collisions[0].pos.set(mouseX, mouseY);
  
  // Spawn new particles.
  for (var num = 0; num < spawnCount; num++) {
    var x = random(waterfallMin, waterfallMax);
    var mass = random(pMinMass, pMaxMass);
    
    if (particles.length % 5 == 0) {
      var displayColor = color(255);
    } else {
      var displayColor = color(random(180, 210), 255, 255);
    }
    
    var newParticle = new Particle(x, 0, mass, displayColor);
    particles[particles.length] = newParticle;
  }
  
  colorMode(RGB, 255);
  
  for (var i = particles.length-1; i > 0; i--) {
    particles[i].move();
    
    var has_collision = particles[i].resolveCollisions();
    
    // particles[i].display();
    var x = particles[i].pos.x;
    var y = particles[i].pos.y;
    var x1 = particles[i-1].pos.x;
    var y1 = particles[i-1].pos.y;
    stroke(0, 10);
    strokeWeight(0.5);
    line(x, y, x1, y1)
    
    if (particles[i].pos.y > height) {
      // Delete if it's out of bounds.
      particles.splice(i, 1);
    } else if (has_collision && particles[i].vel.mag() < 0.1) {
      // Delete if it's stuck on top of a collision object.
      particles.splice(i, 1);
      ellipse(x, y, 1, 1);
    }
  }
  
  
  // Avoid updating frame rate every frame (not as readable).
  if (frameCount % 10 == 0) {
    fps = frameRate().toFixed(2);
  }
  
  // Display all ui items.
  noStroke();
  fill(0);
  textSize(15);
  text("4.7.20", 30, height-30);

}


// Repulses particles from itself.
function Collision(x, y, mass) {
  
  this.pos = new p5.Vector(x, y);
  this.target = new p5.Vector(x, y);
  this.mass = mass;
  this.targetMass = mass;
  
  this.getBoundingBox = function() {
    var radius = this.mass/2;
    
    var ax = this.pos.x-radius;
    var ay = this.pos.y-radius;
    var bx = this.pos.x+radius;
    var by = this.pos.y+radius;
    
    return [ax, ay, bx, by];
  }
  
  this.move = function() {
    this.pos = p5.Vector.lerp(this.pos, this.target, 0.01);
    this.mass = lerp(this.mass, this.targetMass, 0.01);
  }
}


function Particle(x, y, mass, displayColor) {
  
  this.pos = new p5.Vector(x, y);
  this.vel = new p5.Vector(0, 0);
  this.acc = new p5.Vector(0, 0);
  this.mass = mass;
  this.displayColor = displayColor;
  this.fallRate = map(this.mass, pMinMass, pMaxMass, 0.1, 0.05);
  
  this.getBoundingBox = function() {
    var radius = this.mass/2;
    var offset = 2; // Just to expand its bb a bit.
    
    var ax = this.pos.x-radius-offset;
    var ay = this.pos.y-radius-offset;
    var bx = this.pos.x+radius+offset;
    var by = this.pos.y+radius+offset;
    
    return [ax, ay, bx, by];
  }
  
  this.move = function() {
    var gravity = new p5.Vector(0, this.fallRate);
    this.acc.add(gravity);
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  this.resolveCollisions = function() {
    var hit_object = false;
    
    var bb1 = this.getBoundingBox();
    
    for (var c = 0; c < collisions.length; c++) {
      var col = collisions[c];
      
      var bb2 = col.getBoundingBox();
      
      // First check bounding box to optimize checks.
      var is_close_enough = do_aabb_collision(bb1[0], bb1[1], bb1[2], bb1[3], 
                                              bb2[0], bb2[1], bb2[2], bb2[3]);
      
      if (is_close_enough) {
        var distance = dist(this.pos.x, this.pos.y, col.pos.x, col.pos.y);

        if (distance < col.mass/2) {
          // Push out of collision object.
          var offset = this.pos.copy();
          offset.sub(col.pos);
          offset.normalize();
          offset.mult(col.mass/2-distance);
          this.pos.add(offset);

          var dampening = map(this.mass, pMinMass, pMaxMass, 1, 0.8);
          var mag = this.vel.mag();



          // Get its new vector.
          var bounce = this.pos.copy();
          bounce.sub(col.pos);
          bounce.normalize();
          bounce.mult(mag*friction*dampening);
          this.vel = bounce;

          if (this.mass > 2) {
            this.mass = max(1, this.mass-2);


            for (var s = 0; s < splitCount; s++) {
              var mass = max(1, this.mass-1);
              var displayColor = color(255);
              
              var splash = new Particle(this.pos.x, this.pos.y, mass, displayColor);
              
              splash.vel = this.vel.copy();
              splash.vel.rotate(radians(random(-45, 45)));
              splash.vel.mult(random(0.6, 0.9));
              
              particles[particles.length] = splash;
            }
          }
          
          hit_object = true;
          
          break;
        }
      }
    }
    
    return hit_object;
  }
  
  // this.display = function() {
  //   stroke(this.displayColor);
  //   strokeWeight(this.mass);
  //   point(this.pos.x, this.pos.y);
  // }
}