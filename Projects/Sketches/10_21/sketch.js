// By Roni Kaufman

let noiseBackground;

function setup() {
  createCanvas(600, 600);
  fill(10, 200);
  noStroke();
  createNoiseBackground();
}

function draw() {
  background(240, 150, 20);
  image(noiseBackground, 0, 0);
  fill(0);
  text("10.21.20", 30, height-30);
  let alpha = 150;
  let t = frameCount/200;
  for (let x = 0; x < width; x += 4) {
    for (let y = 0; y < height; y += 4) {
      let nse;
      if (x < width/2) {
        nse = noise(x/alpha, y/alpha, t);
      } else {
        nse = noise((width - x)/alpha, y/alpha, t);
      }
      if (nse < 0.37) {
        circle(x, y, 8);
      }
    }
  }

}

function createNoiseBackground() {
  noiseBackground = createGraphics(width, height);
  noiseBackground.noStroke();

  for (let i = 0; i < 100; i++) {
    noiseBackground.fill(random(180, 230), 5);
    noiseBackground.ellipse(random(width), random(height), random(10), random(2));
  }
}