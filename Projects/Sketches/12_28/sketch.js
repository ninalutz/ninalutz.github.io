var inc = 0;

var xval = random(600);
var yval = random(600);
function setup() {
  createCanvas(600, 600);
  background(0);

}

function draw() {
  fill(255);
  text("12.28.20", 30, height-30)
  inc += 0.05;
  push()
  stroke(255, 20);
  background(0, 3)
  strokeWeight(10);
  if (millis() % 30 == 0){
    xval = random(600);
    yval = random(600);  }
    translate(xval, yval)

  for (var i = 0 ; i <= TWO_PI ; i += PI *0.00051){
    
    var nf
        if (i < PI) nf = map(i, 0, PI, 0, 1)
        else nf = map(i, PI,TWO_PI, 1, 0)
        

    var xpos = noise(inc,nf) * 500 * cos(i)
    var ypos = noise(inc,nf) * 500 * sin(i)
    
    point(xpos,ypos);
  }
    pop();
}