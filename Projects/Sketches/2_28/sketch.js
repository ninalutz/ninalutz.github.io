/*
Agent based model approach refs:
http://cp.media.mit.edu/blog/agents
http://natureofcode.com/book/chapter-6-autonomous-agents/
*/

var startsec, sec;

var secrad = 200;
var hrrad = secrad;
var hrsize = 50;
var minsize = 20;
var angle = -90;

function setup() {
  sec = [];
  createCanvas(600, 600);
  startsec = second();
  
  for(var i = 0; i<60; i++){
    s = new Agent(60, startsec, 3);
    sec.push(s);
  }
  
}

function draw() {
  noStroke();
  fill(0, 40);
  rect(0, 0, width, height);
  
  fill(50, 50, 255);
  stroke(255);
  
  if(second() != startsec){
    startsec = second();
  }
  
  for(var i = 0; i<sec.length; i++){
    sec[i].update(startsec, 60);
    sec[i].display();
  }
  
  noFill();
  
  ellipse(width/2, height/2, secrad*2, secrad*2);
  angle = -90;
  
 for(i = 1; i<61; i++){
      angle += 360.0/60;
      if(i % 5 === 0){
          if(i/5 == hour()%12 || (i == 60 && hour() === 0)){
            stroke(200);
             fill(255);
             ellipse(hrrad*cos(radians(angle)) + width/2, hrrad*sin(radians(angle)) + height/2, hrsize, hrsize);
          }
      }
     
      if(i == minute()){

            fill(255);
            ellipse(hrrad*cos(radians(angle)) + width/2, hrrad*sin(radians(angle)) + height/2, minsize, minsize);
          }

    }
    noStroke();
  text("2.28.20", 30, height -30);
}

var Agent = function(num, time, maxspeed){
  this.num = num;
  this.time = time;
  this.turnFactor = random(3, 10);
  this.maxspeed = maxspeed;
  
  this.pos = createVector(width/2, height/2);
  this.prev = this.pos.copy();
  this.speed = createVector(random(2), random(2));
  this.acel = createVector();
}

Agent.prototype.update = function(time, num){
  this.attract = createVector(secrad*cos(radians((360*time/num)-90)) + width/2, secrad*sin(radians((360*time/num)-90)) + height/2);
  fill(255);
  stroke(255);
  this.applyBehaviors(this.attract, this.pos);
}

Agent.prototype.applyBehaviors = function(attractor, position){
  this.prev = this.pos.copy();
  this.attractor = this.attract;
  
  if(this.pos.x > width || this.pos.x<0){
    this.speed.x*=-0.9;
  }
    
  if(this.pos.y > height || this.pos.y<0){
    this.speed.y*=-0.9;
  }
  
  this.attractor.sub(this.pos);
  this.acel.set(this.attractor);
  this.acel.normalize();
  this.acel.div(this.turnFactor);
  this.speed.add(this.acel);
  this.speed.limit(this.maxspeed);
  this.pos.add(this.speed);
    
}

Agent.prototype.display = function(){
  stroke(255);
  line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
  
}