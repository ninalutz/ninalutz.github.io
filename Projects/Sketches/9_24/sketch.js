let angle = 0;
let w = 25;
let ma;
let maxD;

function setup() {
  createCanvas(600, 600, WEBGL);
  ma = atan(1/sqrt(2));
  maxD = dist(0,0,200,200);
}

function draw() {
  background(0); 
  rotateX(ma);
  rotateY(-PI/8);
  for (let z = 0; z < height; z += w){
     for (let x = 0; x < width; x += w){
      push();
      let d = dist(x, z, width/2, height/2);
      let offset = map(d, 0, maxD, -PI, PI);
      let a = angle + offset; 
      let h = map(sin(a*2), -1, 1, 0, 300); 
      translate(x - width / 2, 0, z - height / 2);
      stroke(map(z, 0, height, 20, 100));
      noFill();
      //stroke(0)
      box(w - 2, h, w - 2);
      pop();
    } 
  }
  angle += 0.02; 
}