
var circles = []
var total = 10
var img;


function setup() {
  createCanvas(600, 600);
  background(0);
  
  for(var i = 0; i < total; i++){
    circles[i] = {};
    circles[i].prevPos = {x: width/2, y: height/2}
    circles[i].pos = {x: width/2, y: height/2}
    circles[i].dir = random() > 0.5 ? 1 : -1
    circles[i].radius = random(3, 10)
    circles[i].angle = 0
  }
  colorMode(HSB);
}

function draw() {
  for(var i = 0; i < total; i++){
    var circle = circles[i]
    circle.angle += 1/circle.radius*circle.dir

    circle.pos.x += cos(circle.angle) * circle.radius
    circle.pos.y += sin(circle.angle) * circle.radius
    if(random(100) > 70 || circle.pos.x < 0 || circle.pos.x > width || circle.pos.y < 0 || circle.pos.y > height){
      circle.dir *= -1
      circle.radius = random(3, 10)
      circle.angle += PI
    }
    noStroke();

    fill(map(circle.pos.x, 0, width, 0, 360), 255, 255, 10);

    ellipse(circle.prevPos.x, circle.prevPos.y, 20, 20)

    circle.prevPos.x = circle.pos.x
    circle.prevPos.y = circle.pos.y
  }
  fill(255);
  noStroke();
  text("2.22.20", 50, height - 40);
}