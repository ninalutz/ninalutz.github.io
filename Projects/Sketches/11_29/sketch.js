//reference: https://observablehq.com/@rreusser/instanced-webgl-circles
//also https://www.openprocessing.org/sketch/748916

let max_circle_cnt = 1000;
let min_circle_cnt = 10;
let max_vertex_cnt = 20;
let min_vertex_cnt = 3;
let circle_cnt, vertex_cnt;

var xoff, yoff;

function setup() {
    createCanvas(800, 800);
    xoff = random(50, 70);
    yoff = random(400, 800);

    console.log(xoff);
    console.log(yoff);
}


function draw() {
  background(0);
  push();
  translate(width / 2, height / 2);



  let xOffset = abs(xoff - width / 2);
  let yOffset = abs(yoff - height / 2);
  circle_cnt = int(map(xOffset, 0, width / 2, max_circle_cnt, min_circle_cnt));
  vertex_cnt = int(map(yOffset, 0, height / 2, max_vertex_cnt, min_vertex_cnt));

  for (let i = 0; i < circle_cnt; i++) {
    let time = frameCount / 20;
    let theta = map(i, 0, circle_cnt, 0, TWO_PI);
    let scale = width / 2 * 0.8;

   let th = 8.0 * theta + time * 2.0;


    let circle_center = getCenterByTheta(theta, time, scale);
    let circle_size = getSizeByTheta(theta, time, scale);
    let circle_color = color(0.5 + 0.5 * cos(th)*255);

    stroke(circle_color);
    noFill();
    beginShape();
    for (let vi = 0; vi < vertex_cnt; vi++) {
      let thetaV = map(vi, 0, vertex_cnt, 0, TWO_PI);
      let x = circle_center.x + cos(time + thetaV) * circle_size;
      let y = circle_center.y + sin(time + thetaV) * circle_size;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
  pop();

  fill(255);
  text("11.29.20", 30, height-30)

}

function getCenterByTheta(theta, time, scale) {
  let direction = createVector(cos(theta), sin(theta));
  let distance = 0.6 + 0.2 * cos(theta * 6.0 + cos(theta * 8.0 + time));
  let circleCenter = p5.Vector.mult(direction, distance * scale);
  return circleCenter;
}

function getSizeByTheta(theta, time, scale) {
  let offset = 0.2 + 0.15 * cos(theta * 3.0 - time * 2.0);
  let circleSize = scale * offset;
  return circleSize;
}