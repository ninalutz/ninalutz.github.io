let _divideNum;
let _noiseStep;
let _objectNum;
let _aryObjects = [];
let _noiseSeedRad;
let _noiseSeedAng;
let _noiseStepRad;
let _noiseStepAng;
let _noiseSpeedRad;
let _noiseSpeedAng;
let _rad;
let _scale;
let _rad_offset;

function setup() {
  let canvasSize;
  if (windowWidth <= windowHeight) {
    canvasSize = windowWidth;
  } else {
    canvasSize = windowHeight;
  }
  createCanvas(600, 600);
  frameRate(30);
  noStroke();
  _divideNum = 100;
  _objectNum =30;

  _noiseSeedRad = random(10);
  _noiseSeedAng = random(10);
  _noiseStepRad = 0.01;
  _noiseStepAng = 0.02;
  _noiseSpeedRad = 0.003;
  _noiseSpeedAng = 0.01;
  _noiseStepObj = 0.02;
  _rad = width/2;
  _scale = 0.2;
  _rad_offset = -0.7;
}

function Circle(divideNum, rad, rad_offset, noiseSeedAng, noiseStepAng, noiseSeedRad, noiseStepRad) {
  let sumNoiseVal = 0;
  for (let i = 0; i < divideNum; i++) {
    sumNoiseVal += noise(noiseSeedAng + i * noiseStepAng);
  }
  let currentNoiseVal = noise(noiseSeedAng);
  stroke(227.5*sin(2*PI*noise(noiseSeedAng*2))+127.5);
  for (let i = 0; i < divideNum; i++) {
    let tgt_i = i;
    currentNoiseVal += noise(noiseSeedAng + tgt_i * noiseStepAng);
    let rx = rad * (noise(noiseSeedRad + tgt_i * noiseStepRad)+rad_offset) * cos(2*PI*currentNoiseVal/sumNoiseVal);
    let ry = rad * (noise(noiseSeedRad + tgt_i * noiseStepRad)+rad_offset) * sin(2*PI*currentNoiseVal/sumNoiseVal);
    let rx2 = rad * (noise(noiseSeedRad + tgt_i * noiseStepRad)+rad_offset) * cos(4*PI*currentNoiseVal/sumNoiseVal);
    let ry2 = rad * (noise(noiseSeedRad + tgt_i * noiseStepRad)+rad_offset) * sin(4*PI*currentNoiseVal/sumNoiseVal);

    line(rx, ry, rx2, ry2);
  }
}

function draw() {
  background(125, 50);
  push();
  translate(width/2, height/2);
  rotate(-frameCount/200);
  let myNoiseSeedRad;
  let myNoiseSeedAng;
  _noiseSeedRad += _noiseSpeedRad;
  _noiseSeedAng += _noiseSpeedAng;
  for (let i = 0; i < _objectNum; i++) {
    myNoiseSeedRad = _noiseSeedRad + i * _noiseStepObj;
    myNoiseSeedAng = _noiseSeedAng + i * _noiseStepObj;
    Circle(_divideNum, _rad * _scale * (i+1), _rad_offset, myNoiseSeedAng, _noiseStepAng, myNoiseSeedRad, _noiseStepRad);
  }
  pop();
  fill(0);
  text("8.10.20", 30, height-30)
}