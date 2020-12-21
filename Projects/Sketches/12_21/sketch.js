
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
  background(0, 15); //originally 255
  t += 0.015;
  for(r=0.0; r<4.0; r++)
    f(300.0, 300.0, PI/5.0*float(r), 200.0);
    fill(255);
    noStroke();
    text("12.21.20", 30, height-30)
}

function f(x,y,r,d){
  if(d>40.0){
    noFill();
    stroke(200);
    rect(x+=cos(r)*d/4, y+=sin(r)*2*d, 100, 100);
    rect(y+=cos(r)*d/4, x+=sin(r)*2*d, 100, 100);
    //ellipse( x+=sin(r*2)*d, y+=cos(r*2)*d, 2, 2);
    f(x, y, sin(t)+r+PI/2.0, d*0.70);
    f( x, y, cos(t)+r-PI/7.0, d*0.72);
  }
}
