let time = 0;
let lapse = 0;    // mouse timer

function setup(){
  createCanvas(600, 600);
  noStroke();
}

function draw(){
  background(255, 20);
  for(let i = 0; i <600; i+=3){
    let x = cos(radians(i)) * 320 + width / 2;
    let y = sin(radians(i)) * 240 + height / 2;
    let w = sin(radians(time+i+y )) * 260;      
    noFill();
    stroke(0)
    ellipse(x,y,w,w);
  }
  time++;
  fill(0);
  noStroke(0)
  text("11.5.20", 30, height-30)
}
