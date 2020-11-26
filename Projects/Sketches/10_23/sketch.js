var s = 10;
var area = 300;

function setup() {
  createCanvas(600, 600);
  stroke(255, 100, 50);
  noFill();
  background(0)
}

function draw() {
  background(10, 5);
  for (var x = 0; x < width + s; x+=s*2) {
    for (var y = 0; y < height + s; y+=s*2) {
      var diff = sin(radians(dist(x, y, sin(radians(x))*width, cos(radians(y))*height)-frameCount*4))*s;
      if(dist(x, y, width/2, height/2) < area*2){
        ellipse(x, y, s-diff, s-diff);
      }
    }
  }
}

