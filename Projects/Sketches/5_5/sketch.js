const dots = []
const factor = 20
const count = 200
const size = 600
const radius = size * 0.8 / 2

function setup() {
  createCanvas(size, size);
  background(255);
  noiseDetail(100)
  colorMode(HSB, 100)
  strokeWeight(30)
  stroke(0)
  noFill()
  
  for (let i = 0; i < count; i++) {   
    dots.push(new Dot(radius, [60,200], 20, 5))
  }
}

function draw() {
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i]
    n = sin(millis())
    dot.update(n)
    dot.draw()
  }
  noStroke()
  fill(0);
  text("5.5.20", 30, height - 30)
}

class Dot {
  constructor (radius, colorRange, brightness, alpha) {
    const r = random(PI)
    const x = width / 2 + sin(r) * radius
    const y = height / 2 + cos(r) * radius
    this.pos = createVector(x,y)
    this.prev = createVector(x,y)
    this.color = color(255)
    this.deadCount = 0
    this.radius = radius
    this.colorRange = colorRange
    this.alpha = alpha
    this.brightness = brightness
  }
  
  update(noize) {
    this.v = p5.Vector.fromAngle(noize * TWO_PI + (this.deadCount * PI))
    this.v.setMag(2)
    this.color = color(map(noize, 0, 1, ...this.colorRange), 0, this.brightness, this.alpha)
    this.prev = this.pos.copy()
    this.pos = this.pos.add(this.v)
    
    if (dist(width/2, height/2, this.pos.x, this.pos.y) > this.radius + 2) {
      this.deadCount++
    }
  }
  
  draw() {
    if (
      dist(width / 2, height / 2, this.pos.x, this.pos.y) > this.radius ||
      dist(width / 2, height / 2, this.prev.x, this.prev.y) > this.radius
    ) {
      return
    }

    strokeWeight(0.5)
    stroke(this.color)
    line(this.prev.x, this.prev.y, this.pos.x, this.pos.y)

  }
}

