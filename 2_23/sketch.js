// *********************************************
//
//   Adaptation of the particles example from 
//   sketch.js by Justin Windle into Processing
//   using p5js. 
//   https://github.com/soulwire/sketch.js
//
// *********************************************


// ----------------------------------------
// Configuration
// ----------------------------------------

// GLOBALS
var MAX_PARTICLES = 170;
var COLORS = [ '#581845', '#900C3F', '#C70039', '#C70039', '#FFC300', '#DAF7A6', '#F9D423'];

//ARRAYS
var particles = [];
var pool = [];

//VARIABLES
var wander1 = 0.5;
var wander2 = 2.0;
var drag1 = .9;
var drag2 = .99;
var force1 = 2;
var force2 = 8;
var theta1 = -0.5;
var theta2 = 0.5;
var size1 = 5;
var size2 = 180;
var sizeScalar = 0.97;


// ----------------------------------------
// Particle Functions
// ----------------------------------------

function Particle(x,y,size) {
    this.alive = true;
    this.size = size || 10;
    this.wander = 0.15;
    this.theta = random( TWO_PI );
    this.drag = 0.92;
    this.color = '#fff';
    this.location = createVector(x || 0.0, y || 0.0);
  this.velocity = createVector(0.0, 0.0);
}
Particle.prototype.move = function() {
    this.location.add(this.velocity);
    this.velocity.mult(this.drag);
    this.theta += random( theta1, theta2 ) * this.wander;
    this.velocity.x += sin( this.theta ) * 0.1;
    this.velocity.y += cos( this.theta ) * 0.1;
    this.size *= sizeScalar;
    this.alive = this.size > 0.5;
}
Particle.prototype.show = function() {
  //arc( this.location.x, this.location.y, this.size, 0, TWO_PI );
  fill( this.color );
  noStroke();
  ellipse(this.location.x,this.location.y, this.size, this.size);
}

function spawn(x,y) {
    var particle, theta, force;
    if ( particles.length >= MAX_PARTICLES ) {
        pool.push( particles.shift() );
    }
    particle = new Particle(random(width), random(height), random(size1,size2));
    particle.wander = random( wander1, wander2 );
    particle.color = random( COLORS );
    particle.drag = random( drag1, drag2 );
    theta = random( TWO_PI );
    force = random( force1, force2 );
    particle.velocity.x = sin( theta ) * force;
    particle.velocity.y = cos( theta ) * force;
    particles.push( particle );
}
function update() {
    var i, particle;
    for ( i = particles.length - 1; i >= 0; i-- ) {
        particle = particles[i];
        if ( particle.alive ) {
          particle.move();
        } else {
          pool.push( particles.splice( i, 1 )[0] );
        }
    }
}
function moved() {
    var particle, max, i;
    max = random( 1, 4 );
    for ( i = 0; i < max; i++ ) {
      spawn(random(width), random(height));
    }
}


// ----------------------------------------
// Runtime
// ----------------------------------------

function setup() {
  createCanvas(600, 600);
}

function draw() {
  update();
    drawingContext.globalCompositeOperation = 'normal';
    background(0);
  drawingContext.globalCompositeOperation = 'lighter';
  for (var i = particles.length - 1; i >= 0; i--) {
      particles[i].show();
    }
  if(second() % 2 == 0)   moved();
  fill(255);
  text("2.23.20", 50, height - 50);
}
