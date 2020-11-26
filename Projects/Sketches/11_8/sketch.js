var xoff1 = 200;
var xoff2 = 100;
var x;
var y;
var nx;
var ny;
var incr = 0.005;

function setup() {
  createCanvas(600, 600);
  x = map(noise(xoff1), 0, 1, -200, width+200);
  y = map(noise(xoff2), 0, 1, -200, height+200);
  background(0);
}

function draw() {
  stroke(100, 100);

  nx = map(noise(xoff1), 0, 1, -200, width+200);
  ny = map(noise(xoff2), 0, 1, -200, height+200);


  nx2 = map(noise(xoff1), 0, 1, -500, width+500);
  ny2 = map(noise(xoff2), 0, 1, -300, height+300);

  xoff1 += incr;
  xoff2 += incr;

  x = x +(nx-x)* incr;
  y = y +(ny-y)* incr;

  line(x,y,nx,ny);


  x = x +(nx-x)* incr;
  y = y +(ny-y)* incr;

  line(x,y,nx2,ny2);

  fill(255);
  noStroke();
  text("11.9.20", 30, height-30)
}