/*
T-Virus

Recursively creates `branches` that uses dynamics to drive their angles.

Author:
  Jason Labbe

Site:
  jasonlabbe3d.com
*/


var maxLevel = 5; // The amount of nested branches it will subdivide to. More is slower!
var branchForce = 0.5; // The branch's resistance against the mouse. A lower value will make it feel sluggish, while a bigger value will make it spring-like.
var rootBranches = [];
var debug = false;
var count = 0;


function setup() {
  createCanvas(600, 600);
  generateNewTree();
}


function draw() {
  background(0, 50);
  
  push();
    translate(width / 2, height / 2);
    for (let i = 0; i < rootBranches.length; i++) {
      treeIterator(rootBranches[i], 0, -height / 2, 0);
    }
  
  pop();
  
  fill(255);
  noStroke();
  text("11.22.20", 30, height-30)
}


// A branch's position is always relative to its parent.
function Branch(length, angle, level) {
  this.vel = 0;
  this.acc = 0
  this.level = level;
  this.angle = angle;
  this.restAngle = angle;
  this.length = length;
  this.children = [];
  this.leaves = [];
  count++;
  this.index = count;
  
  // Adds a new branch as a child.
  this.newBranch = function(angle, mult) {
    let newBranch = new Branch(this.length * mult, angle, this.level + 1)
    this.children.push(newBranch);
    return newBranch;
  }
  
  // Adds a new velocity to its acceleration.
  this.applyForce = function(force) {
    this.acc += force;
  }
  
  // Simulates its new angle.
  this.move = function() {
    // Add some weak wind so there's subtle motion when it's idle.
    let windMult = map(this.level, 0, maxLevel, 0.1, 1) * random(0.75, 1.25);
    let wind = noise((frameCount + this.index) * 0.005) * windMult;
    this.applyForce(wind);
    
    // Always have the angle chasing back to its rest pose.
    // This is what causes the branches to bounce.
    let angleThresh = 10;
    let spring = new p5.Vector(this.restAngle, 0);
    let distance = dist(this.angle, 0, this.restAngle, 0);
    let force = map(min(distance, angleThresh), 0, angleThresh, 0, branchForce);
    
    spring.sub(new p5.Vector(this.angle, 0));
    spring.normalize();
    spring.mult(force);
    this.applyForce(spring.x);
    
    // Slow down velocity with air drag.
    this.vel *= 0.95;
    
    // Add acceleration to velocity, and then to the angle.
    this.vel += this.acc;
    this.angle += this.vel;
    this.angle = constrain(this.angle, this.restAngle - 45, this.restAngle + 45);  // Limit how far its angle can bend, otherwise it could spin!
    this.acc = 0;
  }
}


// Takes a branch and spawns new children branches that will come from it.
// This is a recursive function that makes up the tree's structure.
function subDivide(branch) {
  let newBranches = [];
  let newBranchCount = int(random(1, 4));
  let minLength = 0.7;
  let maxLength = 0.85;
  
  // The angles will change depending on how many new branches will be created.
  // This will allow the tree to have more natural looking angles than being random.
  if (newBranchCount == 2) {
    newBranches.push(branch.newBranch(random(-45.0, -10.0), random(minLength, maxLength)));
    newBranches.push(branch.newBranch(random(10.0, 45.0), random(minLength, maxLength)));
  } else if (newBranchCount == 3) {
    newBranches.push(branch.newBranch(random(-45.0, -15.0), random(minLength, maxLength)));
    newBranches.push(branch.newBranch(random(-10.0, 10.0), random(minLength, maxLength)));
    newBranches.push(branch.newBranch(random(15.0, 45.0), random(minLength, maxLength)));
  } else {
    newBranches.push(branch.newBranch(random(-45.0, 45.0), random(minLength, maxLength)));
  }
  
  // If the new branches haven't reach the max level yet then spawn new branches from them.
  for (let i = 0; i < newBranches.length; i++) {
    if (newBranches[i].level < maxLevel) {
      subDivide(newBranches[i]);
    }
  }
}


// Creates a new tree. The first branch is always vertical in the scene's center.
function generateNewTree() {
  rootBranches = [];
  for (let a = 0; a < 360; a+=12) {
    let newBranch = new Branch(random(30.0, 100.0), a, 0)
    rootBranches.push(newBranch);
    subDivide(newBranch);
  }
}


// A recursive function to display the tree.
// It uses `push` and `pop` so that we don't have to deal with actual positions.
// Instead we only care about a branch's length and angle so that we can position them relatively.
function treeIterator(branch, worldX, worldY, worldA) {
  // Even though `push` and `pop` will help *display* the tree, we still need a means to interact with it.
  // So to interact with the mouse, we must keep track of the current branch's world position/rotation.
  worldA += branch.angle;
  
  let vec = new p5.Vector(branch.length, 0);
  vec.rotate(radians(worldA));
  
  worldX += vec.x;
  worldY += vec.y;
  
  push();
    stroke(map(branch.level, 0, maxLevel, 50, 200));
    strokeWeight(maxLevel - branch.level + 1);
    
    // Push the branch if it's within distance of the mouse.
    let d = 0.5;
    let distThresh = 30;
    if (d < distThresh) {
      let force = map(random(-30, 30), -30, distThresh, 1.5, 0);  // Closer branches will be pushed more.
      
      // Lower branches have greater resistance.
      force *= map(branch.level, 0, maxLevel, 0.2, 1);
      branch.applyForce(force);
      
    }
  
    // Simulate branch.
    branch.move();
  
    rotate(radians(branch.angle));
    

    // Draw branch.
    line(0, 0, branch.length, 0);
  
  
    translate(branch.length, 0);
    
    // Continue iterating to children branches, and pass world values.
    for (let i = 0; i < branch.children.length; i++) {
      treeIterator(branch.children[i], worldX, worldY, worldA);
    }
  pop();
}