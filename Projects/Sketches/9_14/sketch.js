let a = 1.2;
let b = 1.924;
let c = 1.226;
let d = 1.832;
let scale;

function setup() {
  cnv = createCanvas(600, 600);
  scale = min(width, height)/ 4 * 0.8;
}

function draw() {
  background(255,10);
  strokeWeight(1);
  a += pow(-1, floor(frameCount/ 200)) * 0.001;
  b += pow(-1, floor(frameCount/ 300)) * 0.001;
  c += pow(-1, floor(frameCount/ 800)) * 0.002;
  d += pow(-1, floor(frameCount/ 400)) * 0.001;
  
  let x = 0;
  let y = 0;
  
  for(let i = 0; i <20000; i++){
    let nx = sin(a * y) - cos(b * x);
    let ny = sin(c * x) - cos(d * y);
    point(width/2 + nx * scale, height/2 +ny * scale);
    x = nx;
    y = ny;
  }

  fill(0)
  text("9.14.20", 30, height-30)
    
}

// function keyPressed() {
//     save(cnv, 'myCanvas.png');
// }
