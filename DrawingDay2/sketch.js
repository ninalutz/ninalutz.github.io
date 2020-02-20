var center;
var numDrawings = 2 // Even numbers work better
var lineWeight = 2

function setup() {
  createCanvas(800, 800)
  center = createVector(width/2,height/2);
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
  incrementDrawing();
}

//Does the symmetry of the points
function symmetric(point, angle){
  let u = p5.Vector.fromAngle(angle)
  let pcu = p5.Vector.mult(u,p5.Vector.dot(p5.Vector.sub(center,point),u))
  let symmetricPoint = p5.Vector.sub(center,pcu).mult(2).sub(point)
  return symmetricPoint
}

function incrementDrawing(){
  if(second() > 0 && second() < 5)numDrawings = 2;
  if(second() >= 5 && second() < 10) numDrawings = 4;
  if(second() >= 10 && second() < 15) numDrawings = 6;
  if(second() >= 15 && second() < 20) numDrawings = 8;
  if(second() >= 20 && second() < 25) numDrawings = 10;
  if(second() >= 25 && second() < 30) numDrawings = 12;
  if(second() >= 30 && second() < 35) numDrawings = 14;
  if(second() >= 35 && second() < 40) numDrawings = 16;
  if(second() >= 40 && second() < 45) numDrawings = 18;
  if(second() >= 45 && second() < 50) numDrawings = 20;
  if(second() >= 50 && second() < 55) numDrawings = 22;
  if(second() >= 55 && second() < 60) numDrawings = 24;
}

