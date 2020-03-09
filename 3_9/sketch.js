/*========================================================
   Modifications of Atsushi Tanaka's great sketch at
   https://www.openprocessing.org/sketch/596369
 =========================================================*/
var curTime;
var lastTime;

var order;  
var count;  

var steps;
var diffs;
var cpx   = [];
var cpy   = [];
var tempx = [];
var tempy = [];
var bzx   = [];
var bzy   = [];

function setup() {
  createCanvas(600, 600);
  background(0);

  order = 40;
  count = 0.0;
  steps = 0.0;
  diffs = 0.1;

  for (var i = 0; i < order; i++) {
    tempx[i] = [];
    tempy[i] = [];
    bzx[i]   = [];
    bzy[i]   = [];
    for (var j = 0; j < order; j++) {
      bzx[i][j] = [];
      bzy[i][j] = [];
    }  
  }  
  lastTime = millis();
  restart();
} 

function draw() {
  if ((count < int(1/diffs))) {
    for (var i = 0; i < order; i++) {
      tempx[i][count] = (cpx[i + 1] * (1 - steps)) + (cpx[i] * steps);
      tempy[i][count] = (cpy[i + 1] * (1 - steps)) + (cpy[i] * steps);
      if (i > 0) {
        for (var j = 0; j < order; j++) {
          if (j == 0) {
            bzx[j][i][count] = (tempx[i][count] * (1 - steps)) + (tempx[i - 1][count] * steps);
            bzy[j][i][count] = (tempy[i][count] * (1 - steps)) + (tempy[i - 1][count] * steps);
          } 
          else {
            bzx[j][i][count] = (bzx[j - 1][i][count] * (1 - steps)) + (bzx[j - 1][i - 1][count] * steps);
            bzy[j][i][count] = (bzy[j - 1][i][count] * (1 - steps)) + (bzy[j - 1][i - 1][count] * steps);
          } 
          
          if (count > 0) {
            if (i > j) {
              noStroke();
              fill(255, 15);
              var cordx = bzx[j][i][count];
              var cordy = bzy[j][i][count];
              ellipse(cordx, cordy, bzx[j][i][count]/20, bzx[j][i][count]/20);
              //line(bzx[j][i][count - 1], bzy[j][i][count - 1], bzx[j][i][count], bzy[j][i][count]);
            } 
          } 
        } 
      } 
    } 

    steps += diffs;
    count += 1;

    fill(255);
    noStroke();
    text("3.9.20", 50, height - 30);
    noFill();
  } 

  curTime = millis();
  if(curTime - lastTime >= 2000){ 
    restart();
    lastTime = millis();
  }
}

function restart() {

  background(0);
  count = 0.0;
  steps = 0.0;
  cpx   = [];
  cpy   = [];

  for (var i = 0; i < order; i++) {
    cpx[i] = random(width);
    cpy[i] = random(height);
  } 

} 