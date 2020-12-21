

var rSeed = -0.6; 
var r = 0; 
var i = 0;


function setup() {
  createCanvas(600,600);
  rectMode(CENTER);
  ellipseMode(CENTER);
  noStroke();
}


function draw(){

  
  r = sin(rSeed);
  rSeed += 0.05; 
  
  for(var row = 0; row < 10; row++) { 
    for(var column = 0; column < 10; column++){ 
	  	translate(width/2,height/2);
	  	rotate(radians(i));
	  	i = i + 0.05;
	 	fill(255);
	  	ellipse(row + 50, column + 50, 10 * r, 10 * r);
    }
  }
fill(0,5);
rect(0,0,width,height);

fill(255);
text("3.14.20", 30, height - 30);
}


