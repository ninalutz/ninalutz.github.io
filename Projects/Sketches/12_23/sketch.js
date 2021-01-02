var inc = 0

var xval = random(600);
var yval = random(600);
function setup() {
  createCanvas(600, 600);
  background(0);

}

function draw() {
  //ellipse(mouseX, mouseY, 20, 20);
  fill(255);
  text("12.23.20", 30, height-30)
  inc += 0.005;
  //background(0,1);
  push()
  stroke(255, 20);
  strokeWeight(1);
  if (millis() % 20 == 0){
    xval = random(600);
    yval = random(600);  }
      translate(xval, yval)

  for (var i = 0 ; i <= TWO_PI ; i += PI *0.00051){
    
    var nf
        if (i < PI) nf = map(i, 0, PI, 0, 1)
        else nf = map(i, PI,TWO_PI, 1, 0)
        
    var xpos = noise(inc,nf) * 250 * cos(i)
    var ypos = noise(inc,nf) * 250 * sin(i)
    
    point(xpos,ypos);
  }
    pop()
}