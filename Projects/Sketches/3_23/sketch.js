let ratio = 0.66;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let depthMax = 3;
let bg;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  blendMode(ADD);
  bg = createGraphics(width, height);
  bg.fill(0, 0, 100, 10);
  bg.noStroke();
}

function draw() {
  background(0);
  cells = int(2);
  int(3);
  cols = cells;
  rows = cells;
  offset = width / 10;
  margin = offset / 5;

  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = offset + i * (cellW + margin);
      let y = offset + j * (cellH + margin);
      let cx = x + cellW / 2;
      let cy = y + cellH / 2;
      push();
      translate(cx, cy);
      let l = width / 4;
      let depth = int(random(3, 6));
      tree(depth, l);
      pop();
    }
  }
  image(bg, 0, 0);

  fill(255);
  noStroke();
  text("3.23.20", 30, height - 30);
  noLoop();
}


function tree(depth, l) {
  let len = 200;
  if (depth > 0) {
    let n = int(random(3, 10));
    for (let angle = 0; angle < 360; angle += 360 / n) {
      push();
      rotate(angle);
      stroke(100);
      noFill();
      let sw = map(l, 0, len, 0, depthMax);
      strokeWeight(sw);
      if (random(100) > 50) {
        bezier(0, 0, l / 2, l / 2, l / 2, -l / 2, l, 0);
      } else {
        bezier(0, 0, l / 2, -l / 2, l / 2, l / 2, l, 0);
      }
      translate(l, 0);
      rotate(random(360));
      tree(depth - 1, l * random(0.2, 0.7));
      pop();
    }
  }
}