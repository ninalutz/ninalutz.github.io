var r=200;
var s=0.002;
function setup() { 
  createCanvas(600, 600);
  background(255)
}
function draw() {   
  background(100, 20);
  translate(width/2, height/2);
  let n=200;
  for (let i=0; i<n; i++) {
     let t1= i*PI/n;
     let t2= s*t1;
     let x1= r*cos(t1);
     let y1= r*sin(t1);
     let x2= r*cos(t2);
     let y2= r*sin(t2);
     strokeWeight(.002)
     stroke(100);
     //fill(255)
     rectMode(CENTER)
     rotate(-r*cos(t1)*0.25)
     // rect(x1, y1, 120, 120);
     //line(x1, y1, x2, y2);
     strokeWeight(.002)
     stroke(0);
     line(x2,y2, x1, y1);
     rotate(r*cos(t1)*0.25)
  }
  s+=0.005;
  fill(255);
  noStroke();
   translate(-width/2, -height/2);
  text("8.25.20", 30, height-30);
  noFill();
}

