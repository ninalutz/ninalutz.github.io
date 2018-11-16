// (c) 2016-17 Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0/

//Clock 1 modification

var z = -250;
var r = 0;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
   background(255);
  frameRate(1);
}


function draw() {

  fill(255);
  noStroke(0);
  rect(0, 0, width*2, 75)
  fill(0);
  textSize(20);
  text(hoursMinutes() +":" +  nf(second(), 2), width/2, 30);
  

  noFill();
  // stroke(minute()*2, second()/60*255, 255-second()/60*255);  
	stroke(0);
  translate(width/2, height/2,z);
  rotate(r);
  
 // rect(1, 1, minute()*2, minute()*2);
 rect(1, 1, 3.5*second(), 3.5*second())
  r+=1;
  z=z+1;
  
  
}


// return hours that read 1 through 12 rather than 0 through 23
function twelveHour() {
  var h = hour() % 12;
  if (h === 0) {
    h = 12;
  }
  return h;
}


// format hours and minutes
function hoursMinutes() {
  return nf(twelveHour(), 2) + ':' + nf(minute(), 2);
}


