//Create some vertical and then offset control points with a circular motion controlled by perlin noise.

//declaration of slider variables.
let sizeSlider;
let colorPicker;
let backgroundColorPicker;
let speedSlider;
let animationButton;
let radiusSlider;
let saveButton;
//isAnimated boolean.
let animate = true;

function setup() {
  createCanvas(600, 600);
  strokeWeight(1.5);
  pixelDensity(2);//increase for better resolution images.
}

let zoff = 0;
let angle = 0;

function draw() {

  //Get the values from DOM elements.
  let size = 1000;
  let animationSpeed = 0.2;
  let backgroundColor = 0;
  let mainColor = 255;
  let radius = 200;

  background(0, 10);
 
  noFill();

  //Create a grid of points.
  //max value of i will affect the density of vertical lines.
  for (i = width / 4; i <= width - (width / 4); i += 5) {
    beginShape();
    for (j = height / 6; j <= height - (height / 6); j += 20) {
      let x =i;
      let y =j;
      let scale = 0.005;//using a scale vaiable because steps between i and j counters are too large steps for noise function.
      //check if points are inside the slider size value.
      if (dist(i, j, width / 2, height / 2) < size) {
        n = map(noise(i * scale, j * scale, zoff), 0, 1, -1, 1);
        x = i +  n*radius * sin(angle + n * 10);
        y = j +  n*radius * cos(angle + n * 10);
      }
      //connect points.
      fill(255);

      ellipse(x, y, 2, 2);
      // point(x,y);
    }
    endShape();
  }

  //Toogle animation with button.
  if (animate === true) {
    zoff += 0.01;
    angle += animationSpeed;
  }

  fill(255);
  noStroke();
  text("11.12.20", 30, height-30);

}
