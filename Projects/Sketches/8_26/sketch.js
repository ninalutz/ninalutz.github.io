function setup() {
  createCanvas(600, 600, WEBGL);
  //ortho
  let dep = max(width,height);
  //ortho(-width / 2, width / 2, -height / 2, height / 2,-dep*3 , dep*3);
  background(0);
}

function draw() {

  background(0);

  strokeWeight(min(width,height)*0.005);
  rotateX(-PI/6);
  rotateY(-PI/6);
  
  const cycle = 300;
  let frameRatio = (frameCount % cycle) / cycle;
  let size = min(width , height)* 0.75;
  let vSphRadius = size/6;
  let vSphZ = frameRatio * (size + vSphRadius * 2) - size/2- vSphRadius;
  let count = 0;
  
  for(let z = -size/2; z < size/2; z+=size/50){
    stroke(50*map(z, -size/2, size/2, 1, 10));
    let dist = abs(vSphZ - z);
    let radius = dist > vSphRadius ? 0 : sin(acos(dist / vSphRadius)) *vSphRadius ;
    push();
    translate(0,0,z);
    if(count % 2 == 0)rotateZ(PI/2);
    if(radius > 0)bendLineTwoSide(radius,size);
    translate(0,z/2,z);
    if(radius > 0)bendLineTwoSide(radius,size);
    translate(-z/2,z/2,z);
    if(radius > 0)bendLineTwoSide(radius,size);
   // else line(-size/2, 0, 0, size/2, 0, 0);
    pop();
    count ++;
  }

}

function bendLineTwoSide(radius, length)
{
  bendedLine(radius, length);
  rotateZ(PI);
}

function bendedLine(radius, length)
{
  const radiusStep = PI/20;
  const edgePosX = radius * 2;
  noFill();
  beginShape();
  //vertex(length/2, 0, 0);
  for(let rad = -PI * 0.5; rad <= PI * 1.5; rad += radiusStep)
  {
    let x = map(rad, -PI * 0.5, PI * 1.5, edgePosX, -edgePosX);
    vertex(x, pow((sin(rad) + 1)/2, 2.5) * radius);
  }
  //vertex(-length/2, 0, 0);
  endShape();
}
