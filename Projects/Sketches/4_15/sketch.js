function setup() {
  createCanvas(600, 600);
  background(255);
}
var N = 10;
var r = 60;
var k=0, t ;

function draw() {
  background(255, 5);
  fill(0);
  noStroke();
  text("4.15.20", 30, height - 30);

  stroke(0);
  strokeWeight(0.5);
  fill(0, 150);
  translate(width>>1, height>>1);
  for (var i=0; i<N; i++) {
    var ang = 360/N;
    var l = r*sin(radians(ang/2 + random(20)))+ random(-20,20);
    var x = r*cos(radians(ang*i));
    var y = r*sin(radians(ang*i));

    push()
    translate(x, y);
    rotate(PI/2+radians(ang*i+k));
    // ellipse(0, l, 1, 1);
    // ellipse(0, -l, 1, 1)
    line(0, l, -l, 0);
    pop();

    l = r/2*sin(radians(ang/4))+ random(-20,20);
    x = r/2*cos(radians(ang*i));
    y = r/2*sin(radians(ang*i));

    push();
    translate(x, y);
    rotate(PI/2+radians(-ang*i+k));
    // ellipse(0, l, 5, 5);
    // ellipse(0, -l, 5, 5);
    line(0, l, -l, 0);
    pop();


    l = r*2*sin(radians(ang))+ random(-20,20);
    x = r*2*cos(radians(ang*i));
    y = r*2*sin(radians(ang*i));

    push();
    translate(x, y);
    rotate(PI/2+radians(-ang*i+k));
    // ellipse(0, l, 10, 10);
    // ellipse(0, -l, 15, 15);
    line(0, l, -l, 0);
    pop();



    l = r*3*sin(radians(ang/2))+ random(-20,20);
    x = r*3*cos(radians(ang*i));
    y = r*3*sin(radians(ang*i));
    push()
    translate(x, y);
    rotate(PI/2+radians(ang*i+k));
    // ellipse(-l, 0, 20, 20);
    // ellipse(l, 0, 25, 25);
    line(0, l, -l, 0);
    pop();

  }
  k=180*sin(radians(t));
  if (t<90) t+=2;
  else t=0;

}