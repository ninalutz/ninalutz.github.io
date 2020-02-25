
const noiseZoom = 0.1; //how zoomed in the perlin noise is
const noiseOctaves = 5; //The number of octaves for the noise
const noiseFalloff = 0.9; //The falloff for the noise layers

const lineSpeed = .5; //the maximum amount each point can move each frame

const newPointsCount = 1; //the number of new points added when the mouse is dragged


var points = [];
var startingPoints;

function setup() {
  createCanvas(700, 700);
  background(0);
  stroke(255, 10);
  noiseDetail(noiseOctaves, noiseFalloff);
}

function draw() {
  for (let pt = 0; pt < points.length; pt++) {
    let p = points[pt];
    let noiseX = p.x * noiseZoom;
    let noiseY = p.y * noiseZoom;
    let newPX = p.x + map(noise(noiseX, noiseY), 0, 1, -lineSpeed, lineSpeed);
    let newPY = p.y + map(noise(noiseX, noiseY,  214), 0, 1, -lineSpeed, lineSpeed);
    line(p.x, p.y, newPX, newPY);
    p.x = newPX;
    p.y = newPY;
  }
}

function mouseDragged() {
  for (let i = 0; i < newPointsCount; i++) {
    let angle = random(TAU);
    let magnitude = randomGaussian() * ((newPointsCount-1)**0.5*3);
    let newPoint = {
      "x": mouseX + magnitude * cos(angle),
      "y": mouseY + magnitude * sin(angle)
    };
    points[points.length] = newPoint;
  }
}