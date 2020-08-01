let _divideNum;
let _noiseStep;
let _objectNum;
let _aryObjects = [];
let _aryColor = [];

function setup() {
  let canvasSize;
  createCanvas(600, 600);
  frameRate(20);
  noStroke();
  _divideNum = 7;
  _objectNum =40;
  _aryColor = [color(200),
              color(100)];
  for (let i = 0; i < _objectNum; i++) {
    let myColor;
    if (i % 2 == 0) {
      myColor = _aryColor[0];
    } else {
      myColor = _aryColor[1];
    }
    let newObject = new myObject(myColor, (_objectNum-i)/_objectNum);
    _aryObjects.push(newObject);
  }
}

function draw() {
  if (_objectNum%2 == 0) {
    background(200, 200, 200, 50);
  } else {
    background(200, 200, 200, 50);
  }
  for (let i = 0; i < _objectNum; i++) {
    _aryObjects[i].updateMe();
    _aryObjects[i].drawMe();
  }
  fill(0);
  noStroke();
  text("7.31.20", 30, height - 30);
}

class myObject {
  constructor(myColor, radiusRatio) {
    this.aryNoise = set_noise();
    this.color = myColor;
    this.centX = width/2;
    this.centY = height/2;
    this.maxRadius = width/1000 + width/2 * (radiusRatio ** 1);
  }
  updateMe() {
    update_noise(this.aryNoise);
  }
  drawMe() {
    _noiseStep = 0.03;
    this.minRadius = this.maxRadius*(0.7);
    let aryPoints = []; //angle, radius
    let sumNoiseAngle = calc_sum_noise(this.aryNoise, 0);
    let currentSumNoise = noise(this.aryNoise[0][0]);
    for (let i = 0; i < _divideNum; i++) {
      aryPoints[i] = []
      currentSumNoise += noise(this.aryNoise[i][0]);
      aryPoints[i][0] = 2*PI*currentSumNoise/sumNoiseAngle;
      aryPoints[i][1] = this.minRadius + (this.maxRadius - this.minRadius) * noise(this.aryNoise[i][1]);
    }
    fill(this.color);
    stroke(this.color);
    strokeWeight(2);
    for (let i = 0; i < _divideNum; i++) {
      ellipse(this.centX + aryPoints[i][1] * cos(aryPoints[i][0]),
                  this.centY + aryPoints[i][1] * sin(aryPoints[i][0]), 20*sin(frameCount), 20*sin(frameCount));
    }
    for (let i = 0; i < 3; i++) {
      rect(this.centX + aryPoints[i][1] * sin(aryPoints[i][0]),
                  this.centY + aryPoints[i][1] * cos(aryPoints[i][0]), 20*cos(frameCount), 20*cos(frameCount));
    }

  }
}

function calc_sum_noise(ary, column) {
  let sum = 0;
  for (let i = 0; i < ary.length; i++) {
    sum += noise(ary[i][column]);
  }
  return sum;
}

function set_noise() {
  let aryNoise = [];
  for (let i = 0; i < _divideNum; i++) {
    aryNoise[i] = [];
    for (let j = 0; j < 5; j++) {
      aryNoise[i][j] = random();  
    }
  }
  return aryNoise;
}

function update_noise(aryNoise) {
  for (let i = 0; i < _divideNum; i++) {
    for (let j = 0; j < 2; j++) {
      aryNoise[i][j] += _noiseStep; 
    }
  }
}