/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/697866

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss

Mod by Nina Lutz 2020 
******************/

const textToWrite = "Plz  read  Nina's  essay";
const frequency = 0.002;
const fontSize = 50;

//auto start variables
let centerX, centerY, startX, step, amplitude;

function setup() {
  createCanvas(600, 600);
  centerX = 300;
  centerY = 300;
  textFont('Helvetica');
  textSize(fontSize);
  
  step = 0;
  startX = centerX - textWidth(textToWrite) / 2;
}

function getY(x){
  return centerY / 2 + noise(step, x * frequency) * amplitude;
}

function draw() {
  background(255, 15);
  // fill(0);

  noFill();
  stroke(0);  
  //for calculating the noise in getY function
  step += 0.01;
  amplitude = map(300, 0, height, 300, 800);
  
  //draw liquid
  beginShape();
    vertex(0, height);
    for(let x = 0; x < width; x += 20){
      vertex(x, getY(x));
    }
    vertex(width, getY(width));
    vertex(width, height);
  endShape(CLOSE);
  
  //draw text
  let x = startX;
  for (var i = 0; i < textToWrite.length; i++) {
    let charWidth = textWidth(textToWrite.charAt(i));
    x += charWidth/2;
    let y = getY(x);
  
    //calculate angle
    let angle = atan2(getY(x - charWidth / 2) - getY(x + charWidth / 2), -fontSize) + PI;
    angle *= 2;//expression
    push();
      //apply angle
      translate(x, y);
        rotate(angle);
      translate(-x, -y);  
      text(textToWrite.charAt(i), x-charWidth/2, y);
    pop();
    x += charWidth/2;
    fill(0);
    textSize(20)
    text("10.19.20: Please read Nina's essay -- pinned tweet", 30, height-30)
    textSize(50)
  }//for
}

// function mouseMoved(){
//   startX = mouseX - textWidth(textToWrite) / 2;
// }
  
  