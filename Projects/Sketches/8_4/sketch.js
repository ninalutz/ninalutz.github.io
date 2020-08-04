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
let lapse = 0;    // mouse timer

function setup() {
  createCanvas(600, 600);
  // colorMode(HSB, 255);
  frameRate(30);
  background(5);
  strokeWeight(2);
  stroke(0, 255);
  noFill();
  _divideNum = 40;
  _objectNum = 20;
  _noiseSeedRad = random(20);
  _noiseSeedAng = random(10);
  _noiseStepRad = 0.1;
  _noiseStepAng = 0.2;
  _noiseSpeedRad = 0.01;
  _noiseSpeedAng = 0.01;
  _noiseStepObj = 0.02;
  _rad = width/4;
  _scale = 0.16;
  _rad_offset = -0.5;
}

function Circle(divideNum, rad, rad_offset, noiseSeedAng, noiseStepAng, noiseSeedRad, noiseStepRad) {
  let sumNoiseVal = 0;
  for (let i = 0; i < divideNum; i++) {
    sumNoiseVal += noise(noiseSeedAng + i * noiseStepAng);
  }
  let centX = width/2;
  let centY = height/2;
  let currentNoiseVal = noise(noiseSeedAng);
  //fill((255*sin(2*PI*noise(noiseSeedRad))+140)%255, 100);
  noFill();
  stroke((255*sin(2*PI*noise(noiseSeedRad))+140)%255);
  //beginShape();
  for (let i = 0; i < divideNum+3; i++) {
    let tgt_i = i;
    if (tgt_i >= divideNum) { tgt_i -= divideNum; }
    currentNoiseVal += noise(noiseSeedAng + tgt_i * noiseStepAng);
    rect(centX + rad * (noise(noiseSeedRad + tgt_i * noiseStepRad)+rad_offset) * cos(2*PI*currentNoiseVal/sumNoiseVal),
      centY + rad * (noise(noiseSeedRad + tgt_i * noiseStepRad)+rad_offset) * sin(2*PI*currentNoiseVal/sumNoiseVal), 200*sin(2*PI*currentNoiseVal/sumNoiseVal), 200*sin(2*PI*currentNoiseVal/sumNoiseVal));
  }
 // endShape();
}

function draw() {
  background(5);
  let myNoiseSeedRad;
  let myNoiseSeedAng;
  _noiseSeedRad += _noiseSpeedRad;
  _noiseSeedAng += _noiseSpeedAng;
  for (let i = 0; i < _objectNum; i++) {
    myNoiseSeedRad = _noiseSeedRad + i * _noiseStepObj;
    myNoiseSeedAng = _noiseSeedAng + i * _noiseStepObj;
    Circle(_divideNum, _rad * _scale * (i+1), _rad_offset, myNoiseSeedAng, _noiseStepAng, myNoiseSeedRad, _noiseStepRad)
  }
  noStroke();
  fill(250);
  text("8.4.20", 30, height-30);
  noFill();
}

