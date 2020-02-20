var c, phue
var numDrawings = 2 // Even numbers work better
var lineWeight = 2

function setup() {
  createCanvas(800, 800)
  c = createVector(width/2,height/2)
}

function draw() {
  if(mouseIsPressed){
    let pos = createVector(mouseX,mouseY)
    let ppos = createVector(pmouseX,pmouseY)
    stroke(255);
    strokeWeight(3)
    line(ppos.x,ppos.y,pos.x,pos.y)
    for(let a=0; a<TAU; a+=TAU/numDrawings){
      pos = symmetric(pos,a)
      ppos = symmetric(ppos,a)
      line(ppos.x,ppos.y,pos.x,pos.y)
    }
  }
  noStroke();
  fill(0, 0, 0, 5);
  rect(0, 0, width, height);
  if(second() > 0 && second() <410)numDrawings = 2;
  if(second() >= 10 && second() < 20) numDrawings = 4;
  if(second() >= 20 && second() < 30) numDrawings = 6;
  if(second() >= 30 && second() < 40) numDrawings = 8;
  if(second() >= 40 && second() < 50) numDrawings = 10;
  if(second() >= 50 && second() < 60) numDrawings = 10;
}

// Calculate the symmetric of a point with respect to a line defined by a point(c) and a vector(u)
function symmetric(point, angle){
  let u = p5.Vector.fromAngle(angle)
  let pcu = p5.Vector.mult(u,p5.Vector.dot(p5.Vector.sub(c,point),u))
  let symmetricPoint = p5.Vector.sub(c,pcu).mult(2).sub(point)
  return symmetricPoint
}

