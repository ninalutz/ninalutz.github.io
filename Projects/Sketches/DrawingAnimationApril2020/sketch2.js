// *********************************************
//
//   Used particles from Adaptation of the particles example from 
//   sketch.js by Justin Windle into Processing
//   using p5js. 
//   https://github.com/soulwire/sketch.js
//
// *********************************************

// GLOBALS
var MAX_PARTICLES = 800;
var COLORS = [ '#B1DDF1', '#449DD1', '#192BC2', '#150578', '#0E0E52'];

//ARRAYS
var particles = [];
var pool = [];
var locs = [];

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
// Runtime
// ----------------------------------------

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0, 10);
    if(mouseIsPressed){
     moved();
      let pos = createVector(mouseX,mouseY)
      let ppos = createVector(pmouseX,pmouseY)
      locs.push(pos);
      locs.push(ppos);
    }

    for(var i = 0; i<locs.length-1; i++){
      stroke(255);
      strokeWeight(1)
      line(locs[i].x,locs[i].y,locs[i+1].x,locs[i+1].y)
    }
 //    drawingContext.globalCompositeOperation = 'normal';
 //  	background(0);
 // 	drawingContext.globalCompositeOperation = 'lighter';
 if(!mouseIsPressed){
   update();
	for (var i = particles.length - 1; i >= 0; i--) {
    	particles[i].show();
    }
  }
}


// ----------------------------------------
// Particle Functions
// ----------------------------------------
function Particle(x,y,size) {
    this.x = x;
    this.y = y;
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
    if(!this.alive){
      this.size = random(50, 100);
      this.location = createVector(this.x, this.y);
      this.alive = true;
    }
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
    particle = new Particle(mouseX, mouseY, random(size1,size2));
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
    var max, i;
    max = random( 1, 4 );
    for ( i = 0; i < max; i++ ) {
      spawn( mouseX, mouseY );
    }
}
