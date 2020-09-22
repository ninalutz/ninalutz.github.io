const num = 80
let counter = 0

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER)
  drawingContext.shadowOffsetX = 10;
  drawingContext.shadowOffsetY = 10;
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = color(100)
  noStroke();
  fill(255);
}

function draw() {
  background(0)

  fill(0)
  translate(width / 2, height / 2)
  for (let i = num; i > 0; --i) {
    push()
    rotate(radians(sin(frameCount / 100) * i) * 20)
    const s = width / num * i
    stroke(200)
    triangle(0, 0, s, s + 20, s + 20, 20)
    pop()
  }
  translate(-width / 2, -height / 2)
  fill(255)
  text("9.21.20", 30, height-30)
}