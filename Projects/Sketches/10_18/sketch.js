var depth = 15;
var strtLen = 60;

function setup() {
  createCanvas(600, 600);
  noLoop();
}

function draw() {
  background(220)
  // drawPaper();
  // startX, startY, initial angle, initial branch (trunk) length, recursion control
  branch(width/2, height-100, -random(1.4, 1.74), strtLen, depth);
  noFill();
  // stroke(180);
  // strokeWeight(1);
  // rect(0, 0, width-1, height-1);
}

function branch(x, y,  ang,  len,  d) {
  var x2 = x;
  var y2 = y;
  x += cos(ang) * len;
  y += sin(ang) * len;

  if (d == 1) {
    noStroke();
    if (len > 4.0) {
      fill(240, 177, 2);
      ellipse(x2, y2, 2, 4);
    } else if ( len <= 4.0) {
      fill(232, 14, 2);
      ellipse(x2, y2, 3, 1);
    }
  } else {
    drawLine(x2, y2, x, y, len);
  }

  len *= random(0.7, 0.94);
  d--;
  if (d > 0) {
    branch(x, y, ang - random(0.2, 0.6), len, d);
    branch(x, y, ang + random(0.2, 0.6), len, d);
  }
  fill(0);
  text("10.18.20", 30, height-30);
}


function drawLine(strtx,  strty,  finx,  finy,  sw) { 
  var numSegs = 15;
  var fraction = 0;
  var  divBy = numSegs;
  var x1 = strtx;
  var y1 = strty;
  stroke(60);
  noFill();
  strokeWeight(sw * 0.05); 
  beginShape();
  for (var j = 0; j <= numSegs; j++) {
    var x = (randomGaussian()*.3) + x1 + (fraction * (finx-x1));
    var y = (randomGaussian()*.3) + y1 + (fraction * (finy-y1));
    vertex(x, y);
    x1 = x;
    y1 = y;
    fraction = 1.0/divBy--;
  }
  endShape();
}

