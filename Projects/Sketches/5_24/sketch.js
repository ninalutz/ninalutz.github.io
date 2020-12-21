let cells, offset, margin, d;
let bg;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  init();
}

function init() {
  cells = 1;
  offset = width / 10;
  margin = offset / 5;
  d = (width - offset * 2 - margin * (cells - 1)) / cells;

}

function draw() {
  background(0);
  drawShape();
  randomSeed(0);
      let x = width/2;
      let y = height/2;
      let rs = random(10000);
     
      randomSeed(rs);
      drawShape(x, y, d / 2,rs);
    
  
  fill(255)
  text("5.24.20", 30, height-30)
}


function drawShape(x, y, rMax,rs) {
  noStroke()
  let rSep = int(random(2,15));
  let rStep = rMax / rSep;
  for (let r = rMax; r > 0; r -= rStep) {
    let num = int(random(6, 10));
    let numArr = [];
    let numSum = 0;
    push();
    translate(x, y);
    rotate(360 * noise(r, frameCount / 300)+random(360));
    for (let i = 0; i < num; i++) {
      let n = map(pow(sin(frameCount + i * 90),3), -1, 1, 0, 1) * noise(r / 10, i, frameCount / 150);
      numArr.push(n);
      numSum += n;
    }
    let angleSum = 0;
    for (let i = 0; i < num; i++) {
    let nn = map(1-sq(numArr[i]),0,1,-1,1);
      let angle = map(numArr[i] / numSum, 0, 1, 0, 360);
      fill(250, 20);
      beginShape();
      for (let j = angleSum; j < angleSum + angle; j += 1) {
        vertex(cos(j) * r, sin(j) * r);
      }
      for (let j = angleSum + angle; j > angleSum; j -= 1) {
        vertex(cos(j) * (r - rStep / 2)*nn, sin(j) * (r - rStep / 2)*nn);
      }
      endShape(CLOSE);


      angleSum += angle;
    }
    pop();
  }
}
