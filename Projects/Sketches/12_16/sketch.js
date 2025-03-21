
//port of https://twitter.com/Hau_kun/status/1273643037747318785
//artist: Hau_kun
//date: Jun 18
//source: 

let t = 0.0;
let r = 0.0;

function setup(){
  createCanvas(600, 600);
  background(0) 

}

function draw(){
  // clear();
  background(0, 30); //originally 255
  t += 0.015;
  for(r=0.0; r<40.0; r++)
    f(300.0, 300.0, PI/6.0*float(r), 200.0);
    fill(255);
    noStroke();
    text("12.16.20", 30, height-30)
}

function f(x,y,r,d){
  if(d>20.0){
    stroke(255)
    fill(255);
    line(x+=cos(r)*d, y+=sin(r)*d, x+=cos(r*2)*d, y+=sin(r*2)*d) 
    f(x, y, cos(t)+r+PI/2.0, d*0.70);
    f(x, y, sin(t)+r-PI/7.0, d*0.72);
  }
}


// function mousePressed(){
//   stroke(random(200,255),random(60,255),0);
// }