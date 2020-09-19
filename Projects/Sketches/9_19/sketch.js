const num = 20
let counter = 0

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER)
  drawingContext.shadowOffsetX = 10;
  drawingContext.shadowOffsetY = 10;
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = color(200)
  noStroke();
  fill(255);
}

function draw() {
  background(255)
  fill(0)
  text("9.19.20", 30, height-30)
  fill(250)
  translate(width / 2, height / 2)
  for (let i = num; i > 0; --i) {
    push()
    rotate(radians(sin(frameCount / 100) * i) * 20)
    const s = width / num * i
    stroke(200)
    rect(0, 0, s, s, 20, 20)
    pop()
  }
}