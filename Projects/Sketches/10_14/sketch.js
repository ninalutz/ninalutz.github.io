let _nsRate;
let _maxPoint;
let _aryObject = [];
let _objectNum;

function setup() {
  let canvasSize;
  if (windowWidth <= windowHeight) {
    canvasSize = windowWidth;
  } else {
    canvasSize = windowHeight;
  }
  createCanvas(600, 600)
  frameRate(60);
  // colorMode(HSB, 360, 100, 100, 255);
  // strokeCap(ROUND);
  // strokeJoin(ROUND);
  noFill();
  _objectNum = 26;
  _nsRate = 0.001;
  _maxPoint = 50;
  for (let i = 0; i < _objectNum; i++) {
    _aryObject.push(new line());
  }
}

function draw() {
  background(0);
  for (let i = 0; i < _objectNum; i++) {
    _aryObject[i].update();
    _aryObject[i].draw();
  }
  fill(255, 100, 0)
  noStroke();
  text("10.14.20", 30, height-30)
}

class line {
  constructor() {
    this.nsX = random(100);
    this.nsY = random(100);
    this.color = color(random(255), random(75),0);
    this.sw = random(width/20, width/4);
    this.aryPoints = [];
  }
  update() {
    this.nsX += _nsRate;
    this.nsY += _nsRate;
    this.aryPoints.unshift([
      width/3 * cos(8*PI*noise(this.nsX)),
      height/3 * sin(8*PI*noise(this.nsY))
    ]);
    while (this.aryPoints.length > _maxPoint) {
      this.aryPoints.pop();
    }
  }
  draw() {
    drawingContext.shadowColor = color(0);
    drawingContext.shadowOffsetY = width/10;
    drawingContext.shadowBlur = width/10;
    stroke(this.color);
    strokeWeight(this.sw);
    push();
    translate(width/2, height/2);
    beginShape();
    for (let i = 0; i < this.aryPoints.length; i++) {
      ellipse(this.aryPoints[i][0], this.aryPoints[i][1], 10, 10);
    }
    endShape();
    pop();
  }
}

