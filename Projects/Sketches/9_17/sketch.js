let a = 1.2;
let b = 1.924;
let c = 1.2;
let d = 1.832;
let scale;

function setup() {
  createCanvas(600, 600);
  scale = min(width, height)/ 4 * 0.8;
  background(255)
}

function draw() {
  background(0, 10);
  strokeWeight(1);
  a += pow(-1, floor(frameCount/ 200)) * 0.001;
  b += pow(-1, floor(frameCount/ 300)) * 0.001;
  c += pow(-1, floor(frameCount/ 200)) * 0.002;
  d += pow(-1, floor(frameCount/ 400)) * 0.001;
  
  let x = 0;
  let y = 0;
  
  for(let i = 0; i <200; i++){
    let nx = cos(a * y) - sin(b * x);
    let ny = cos(c * x) - sin(d * y);
    fill(255, 5)
    noStroke();
    ellipse(width/2 + nx * scale, height/2 +ny * scale, ny*scale/2, ny*scale/2);
    x = nx;
    y = ny;
  }

  fill(255)
  text("9.17.20", 30, height-30)
}