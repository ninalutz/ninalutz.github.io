
//forked from https://editor.p5js.org/wvnl/sketches 

function setup() {
  createCanvas(600, 600);
}
var timer = 0;

function draw() {
  timer +=1;
  background(0);
  for (let i = 0; i < 600; i += 20) {
    bezier(
      i - timer / 2.0,
      40 + i,
      timer - 410,
      20,
      timer + 440,
      300,
      timer - i / 16.0,
      300 + i / 8.0
    );
  if(timer == 1000){
    timer = 0;
  }
  fill(255);
  text("1.20.2020", 20, height - 20); 
}
}


