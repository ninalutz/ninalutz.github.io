var r=200;
var s=0.002;
function setup() { 
  createCanvas(600, 600);
  background(255)
}
function draw() {   
  background(255, 150);
  translate(width/2, height/2);
  let n=200;
  for (let i=0; i<n; i++) {
     let t1= i*PI/n;
     let t2= s*t1;
     let x1= r*cos(t1);
     let y1= r*sin(t1);
     let x2= r*cos(t2);
     let y2= r*sin(t2);
     stroke(i%255, 50)
     strokeWeight(0.2)
     noFill();
     ellipse(x1, y1, r*cos(t1), r*sin(t1));
     ellipse(x2,y2, r*sin(t1), r*cos(t1));
  }
  s+=0.005;
  fill(0);
  noStroke();
   translate(-width/2, -height/2);
  text("8.18.20", 30, height-30);
  noFill();
}
