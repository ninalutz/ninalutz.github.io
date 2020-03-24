var center;
var numDrawings = 2 // Even numbers work better
var lineWeight = 2

function setup() {
  createCanvas(600, 600)
  center = createVector(width/2,height/2);
}

function draw() {
  if(mouseIsPressed){
    let pos = createVector(mouseX,mouseY)
    let ppos = createVector(pmouseX,pmouseY)
    stroke(255);
    strokeWeight(3)
   // line(ppos.x,ppos.y,pos.x,pos.y)

    for(let a=0; a<TAU; a+=TAU/numDrawings){
      pos = symmetric(pos,a)
      ppos = symmetric(ppos,a)
      line(ppos.x,ppos.y,pos.x,pos.y)
    }
  }

  noStroke();
  fill(0, 0, 0, 5);
  rect(0, 0, width, height);

 // incrementDrawing();
 fill(255);
 text("3.24.20: draw with mouse", 30, height - 30);
}

//Does the symmetry of the points
function symmetric(point, angle){
  let u = p5.Vector.fromAngle(angle)
  let pcu = p5.Vector.mult(u,p5.Vector.dot(p5.Vector.sub(center,point),u))
  let symmetricPoint = p5.Vector.sub(center, pcu).mult(1.5).sub(point)
  return symmetricPoint
}
