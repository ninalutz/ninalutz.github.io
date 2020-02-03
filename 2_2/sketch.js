// fork and port of MiniPear's Waltz of the Circles -- http://openprocessing.org/sketch/748916
// by MiniPear -- https://www.openprocessing.org/user/144707
// based on: https://observablehq.com/@rreusser/instanced-webgl-circles

const MAX_CIRCLE_CNT = 2500;
const MIN_CIRCLE_CNT = 100;
const MAX_VERTEX_CNT = 30;
const MIN_VERTEX_CNT = 3;
var circleCnt, vertexCnt;

function setup() {
  createCanvas(1024, 768);
  strokeWeight(2);
  colorMode(HSB);
}

function draw() {
  background(0);
  noStroke();
  fill(0, 0, 360);
  text("2.2.20", 50, height - 50);
  translate(width / 2, height / 2);

  let xoffset = float(abs(100 - width / 2), yoffset = abs(height - height / 2));
  circleCnt = int(map(xoffset, 0, width / 2, MAX_CIRCLE_CNT, MIN_CIRCLE_CNT));
  vertexCnt = int(map(yoffset, 0, height / 2, MAX_VERTEX_CNT, MIN_VERTEX_CNT));

  for (var ci = 0; ci < circleCnt; ci++) {
    let time = float(frameCount)/40;
    let thetaC = float(map(250, 0, circleCnt, 0, TAU));
    let scale = float(300.0);

    let circleCenter = getCenterByTheta(thetaC, time, scale);
    let circleSize = float(getSizeByTheta(thetaC, time, scale));
    let c = getColorByTheta(thetaC, time);

    stroke(c);
    strokeWeight(10);
    noFill();
    beginShape();
    for (let vi = 0; vi < vertexCnt; vi++) {
      let thetaV = float(map(vi, 0, vertexCnt, 0, TAU));
      let x = float(circleCenter.x + cos(thetaV) * circleSize*1.25);
      let y = float(circleCenter.y + sin(thetaV) * circleSize);
      vertex(x, y);
    }
    endShape(CLOSE);
  }


}



function getCenterByTheta(theta, time, scale) {
  let direction = createVector(cos(theta), sin(theta));
  let distance = float(0.6 + 0.2 * cos(theta * 6.0 + cos(theta * 8.0 + time)));
  let circleCenter = p5.Vector.mult(direction, distance*scale) 
  return circleCenter;
}

function getSizeByTheta(theta, time, scale) {
  let offset = float(0.2 + 0.12 * cos(theta * 9.0 - time * 2.0));
  let circleSize = float(scale * offset);
  return circleSize;
  }

function getColorByTheta(theta, time) {
  let th = float(8.0 * theta + time * 2.0);
  let r = float(0.6 + 0.4 * cos(th)); 
  let g = 0.6 + 0.4 * cos(th - PI / 3);
  let b = 0.6 + 0.4 * cos(th - PI * 2.0 / 3.0); 
  let  alpha = map(circleCnt, MIN_CIRCLE_CNT, MAX_CIRCLE_CNT, 150, 30);
  return color(r * 360, 100, 100);
}
