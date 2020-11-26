const CYCLE = 100;
let tex;

function setup() {
  createCanvas(600, 600,WEBGL);

  tex = createGraphics(600, 600)
  tex.noFill();
  tex.background(0);
  texture(tex);
  noStroke();
}

function draw() {
  background(0);
  orbitControl();

  
  //texture
  let fc = (frameCount % CYCLE)/CYCLE;
  let step = (tex.width)/20;
  //tex.clear();
  tex.background(0,10);
  tex.stroke(255);
  tex.strokeWeight(step/10);
  for(let x = step*(- 3) ; x < tex.width + step*3; x+=step){
    tex.beginShape();
    for(let y = 0; y <= tex.height;  y+=10){
      let r = map(y,0,tex.height, 0, TAU*4) + fc*TAU;
      tex.vertex(x + sin(r)*step*(1 + cos(fc*TAU)*0.2), y);
    }
    tex.endShape();
  }

  // rotateY(0.8);
  // rotateX(1);
  ellipse(0, 0,300, 300);
}