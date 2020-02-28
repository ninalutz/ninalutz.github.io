//populate half
var distances = [];

var particles = [];

// Gravitational constant
// var G = 0.000005;
var G = 0.00005;

// DISTANCE CONSTANT
var D = 200.0;

// small number
var EPSILON = 0.0001;

var LIMIT = 500;

var bg = true;


function setup() {
    createCanvas(600, 600);
    background(0,0,0);
}

function draw() {

    if(mouseIsPressed){
        addParticle(mouseX, mouseY);

    }
       if(bg) background(0, 20);

        let pcount = particles.length;
        var newParticles = [];
        distances = new Array(pcount);

        for(var i=0; i < pcount ; ++i){
           
            distances[i] = new Array(pcount);
            particles[i].update(i, particles);
            if(!particles[i].drawAndDestroy()){
                newParticles.push(particles[i]);
            }
        }
        particles = newParticles;
    if(particles.length > 200) particles = [];

    fill(255);
    noStroke();
    text("2.27.20", 50, height-50);
}



class Particle {
    constructor(x, y, vx, vy, mass){
        this.x = x;
        this.y = y;
        this.px = x;
        this.py = y;
        this.vx = (vx !== undefined) ? vx : 0;
        this.vy = (vy !== undefined) ? vy : 0;
        this.mass = (mass !== undefined) ? mass : 0;
        this.color = color(255);
        this.toDestroy = false;

        point(x, y);
    }

    update(id, particles){
        var fx = 0;
        var fy = 0;
        for(var i=0; i < particles.length; ++i){
            var inverseDistance = findInverseDistance(particles, id, i)

            fx += particles[i].mass * inverseDistance * dx(particles[i].x, this.x);
            fy += particles[i].mass * inverseDistance * dy(particles[i].y,this.y);
        }

        this.vx += fx * G;
        this.vy += fy * G;
        this.px =  this.x;
        this.py =  this.y;
        this.x  += this.vx;
        this.y  += this.vy;

    if(this.x < 0){ this.x = width + this.x; this.px = this.x; }
        else if(this.x > width){ this.x -= width; this.px = this.x;}
        if(this.y < 0){ this.y = height + this.y; this.py = this.y}
        else if(this.y > height){ this.y -= height; this.py = this.y}
        this.toDestroy = false;
    }

    drawAndDestroy(){
        stroke(this.color);
        strokeWeight(this.mass / 4 + 1);
        line(this.px, this.py, this.x, this.y);
        return this.toDestroy;
    }

}

function findInverseDistance(particles, index1, index2){
    if(index1 == index2){
        return 0;
    } else if(index1 < index2){
        if(distances[index1][index2] == null){
            distances[index1][index2] = inverseDistance(
                particles[index1].x,
                particles[index1].y, 
                particles[index2].x, 
                particles[index2].y
            );
        }
        return distances[index1][index2];
    } else {
        if(distances[index2][index1] == null){
            distances[index2][index1] = inverseDistance(
                particles[index1].x,
                particles[index1].y, 
                particles[index2].x, 
                particles[index2].y
            );
        }
        return distances[index2][index1]
    }
}


function inverseDistance(x1, y1, x2, y2){
    var dx = abs(x1-x2);
    dx = (dx > width/2) ? width - dx : dx;
    var dy = abs(y1-y2);
    dy = (dy > height/2) ? height - dy : dy;
  
    var dist =  sq( sq(dx) * EPSILON + sq(dy) * EPSILON );
    // Make sure the particles never get too close
    return (dist < LIMIT) ? D / LIMIT : D / dist;
}

function dx(x1, x2){
  var d = x1 - x2;
  if(d < -width/2){ return d + width; }
  else if(d < width / 2 ){ return d; }
  else{ return d - width; }
}
function dy(y1, y2){
  var d = y1 - y2;
  if(d < -height/2){ return d + height; }
  else if(d < height / 2 ){ return d; }
  else{ return d - height; }
}
  
    
// Adds a particle with a random mass and color at the position specified
function addParticle(x, y){
    particles.push( new Particle(x, y, 0, 0, random(10)) );
}