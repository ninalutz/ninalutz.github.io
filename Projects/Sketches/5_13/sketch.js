var t;
var theta;
var maxFrameCount = 100; // frameCount, change for faster or slower animation

function setup() {
  createCanvas(600, 600);
  noStroke();
  background(0)
}

function draw() {
  background(0, 15);
    fill(255);
  text("5.13.20", 30, height - 30)
  translate(width/2, height/2); // translate 0,0 to center

  t = frameCount/maxFrameCount;
  theta = TWO_PI*t;

  for ( var x= -width/2; x <= width/2; x += 25) {
    for (var y= -height/2; y <= height/2; y += 15) {
      var offSet = 0.1*x+y+y;   // play with offSet to change map below

      var x2 = map(sin(-theta+offSet), 0, 1, 0, 25); // map x position
      var y2 = map(cos(-theta+offSet), 0, 1, 25, 0); // map y position
       var sz2 = map(sin(-theta+offSet), 0, 1, 2, 20); // map size off the ellipse
      fill(255); // color with gradient created
    //  stroke(250-(x/2) - 10, 250-(y/2) - 10 , 150+(x/6) - 10)
      ellipse(x+x2, y+y2, 2, 2);

    }
  }

}