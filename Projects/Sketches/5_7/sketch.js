function setup() {
  createCanvas(600, 600);
}
var w =600;
var N=35;
var r=2;
var t=0
var k=0;

function draw() {
  background(255);
    fill(0);
  text("5.7.20", 30, height - 30)
  var dw = 600/N;
  translate(width/2, height/2);
  noStroke();
  rectMode(CENTER);
  for (var i=0; i<N; i++) { 
    rotate(radians(t*(N-i)));
    if (i%2==0)fill(-1);
    else fill(255);
    rect(0, 0, w-i*dw, w-i*dw, r*(N-i), r*(N-i), r*(N-i), r*(N-i) );
  }
  t = sin(radians(k));
  k++;


}

