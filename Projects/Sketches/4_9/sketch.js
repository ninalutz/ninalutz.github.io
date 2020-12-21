function setup() {
  createCanvas(600, 600);
}
var N = 12;
var r = 100;
var k=0, t ;

function draw() {
  background(26);
  fill(255);
  noStroke();
  text("4.9.20", 30, height - 30);

  strokeWeight(10);
  stroke(255);
  translate(width>>1, height>>1);
  for (var i=0; i<N; i++) {
    var ang = 360/N;
    var l = r*sin(radians(ang/2));
    var x = r*cos(radians(ang*i));
    var y = r*sin(radians(ang*i));
    push()
    translate(x, y);
    rotate(PI/2+radians(ang*i+k));
    line(- l, 0, l, 0);
    pop();

    l = r/2*sin(radians(ang/2));
    x = r/2*cos(radians(ang*i));
    y = r/2*sin(radians(ang*i));

    push();
    translate(x, y);
    rotate(PI/2+radians(-ang*i+k));
    line(l, 0, -l, 0);
    pop();
  }
  k=180*sin(radians(t));
  if (t<90) t+=2;
  else t=0;

}