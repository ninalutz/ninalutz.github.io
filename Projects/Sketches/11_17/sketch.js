// By Roni Kaufman
// inspired by https://twitter.com/dmitricherniak/status/1214888292421951488?s=09

let particles = [];
let circles = [];
let squiggliness = 1/200;
let interval;
let margin = 10;
let theEnd = false;
let r = 200;
let noiseFactor;

function setup() {
  createCanvas(600, 600);
  noStroke();
  
  background(0);
  generateCircles();
  updateParticles();
  
  squiggliness = 1/150;
  noiseFactor = 70;
  
  interval = setInterval(updateParticles, 1000);
}

function draw() {
  if (theEnd) {
    noLoop();
  } else {
    for (let p of particles) {
      p.draw();
      p.move();
    }
  }
  fill(255)
  text("11.17.20", 30, height-30)
}

function updateParticles() {
  particles = [];
  let xCenter = width/2;
  let yCenter = height/2;
  let n = r*10;
  for (let i = 0; i < n; i++) {
    let theta = map(i, 0, n, -PI, PI);
    let x_ = xCenter + r*cos(theta);
    let y_ = yCenter + r*sin(theta);
    let s_ = 1;
    particles.push(new Particle(x_, y_, s_));
  }
  r -= 20;
  if (r < 20) {
    clearInterval(interval);
    theEnd = true;
  }
}

function Particle(x_, y_, s_) {
  this.x = x_;
  this.y = y_;
  this.size = s_;
  
  this.alpha = 100;
  this.dist = 1;
  
  this.move = function() {
    let theta = noise(this.x * squiggliness, this.y * squiggliness, r/1000)*PI*noiseFactor;
    let v = p5.Vector.fromAngle(theta, this.dist);
    this.x += v.x;
    this.y += v.y;
    //this.dist *= 0.999;
    this.alpha *= 0.99;
    this.size *= 0.99;
  }
  
  this.draw = function() {
    let d = distanceToCircles(this.x, this.y)*100;
    fill(255)
    circle(this.x, this.y, this.size*2);
  }
}

function generateCircles() {
  //fill(100);
  let maxCircles = 20;
  let xCenter = width/2;
  let yCenter = height/2;
  for (let i = 0; i < maxCircles; i++) {
    let x_ = xCenter + random(-r, r);
    let y_ = yCenter + random(-r, r);
    let r_ = random(20, 70);
    if (!intersectsWithOtherCircles(x_, y_, r_)) {
      circles.push({x: x_, y: y_, r: r_});
      //circle(x_, y_, r_*2);
    }
  }
}

function intersectsWithOtherCircles(x_, y_, r_) {
  for (let c of circles) {
    if (dist(c.x, c.y, x_, y_) < c.r + r_ + margin) {
      return true;
    }
  }
  return false;
}

function distanceToCircles(x_, y_) {
  let d = 0;
  for (let c of circles) {
    d += c.r/dist(c.x, c.y, x_, y_)
  }
  return d;
}