var r=200;
var s=0.002;
function setup() { 
  createCanvas(600, 600);
  background(0)
}
function draw() {   
  background(0, 5);
  translate(width/2, height/2);
  let n=360;
  for (let i=0; i<n; i++) {
     let t1= i*2*PI/n;
     let t2= s*t1;
     let x1= r*cos(t1);
     let y1= r*sin(t1);
     let x2= r*cos(t2);
     let y2= r*sin(t2);
     stroke(i%255, 50)
     strokeWeight(0.5)
     noFill();
     line(x1, y1, x2,y2);
  }
  s+=0.05;
  fill(255);
  noStroke();
   translate(-width/2, -height/2);
  text("8.15.20", 30, height-30);
  noFill();
}

