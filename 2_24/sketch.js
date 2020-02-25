var b = 10;
var co = 10;
 
function setup() {
  createCanvas(400, 400);
  background(0);
    fill(255);
  text("2.24.20", 50, 50);
  colorMode(RGB, 100);
}
 
function draw() {
  // buggy
  // copy(0, 0, width, height, 0, -1, width, height);

  loadPixels();
  for(var i=0; i<pixels.length-width; i++) {
    pixels[i] = pixels[i+width];
  }
  updatePixels();
 
  var a = 0;
  var x = 0;
  var k1 = map(sin(1+b*0.31), -1, 1, 0.11, 2.1);
  var k2 = map(sin(2+b*0.47), -1, 1, 0.13, 2.3);
  var k3 = map(sin(3+b*0.71), -1, 1, 0.15, 2.5);
  var oldy = 0;
  while (x < width) {
    var y = map(sin(b*k1-a)*sin(a*k2+b*k3)*sin(a*k1-b), -1, 1, 300, 390);
    stroke(co, 70, map(y - oldy, -1, 1, 0, 100));
    line(x, y, x, height);
    x = x + 1;
    a = a + 0.0171;
    oldy = y;
  }
  b = b + 0.0183;
  co = co + 1;
  if (co > 100) {
    co = 0;
  }
}