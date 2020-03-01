/*
Some oscillation notes:
http://natureofcode.com/book/chapter-3-oscillation/
*/

var shift, amplitude, x, y, rad, grow, n, incr, showtime, startsec;

function setup() {
  createCanvas(600, 600);
  background(255);
  strokeWeight(.5);
  grow = millis()%1000/1000;
  n = hour();
  incr = TWO_PI/1000;
  showtime = false;
  startsec = second();
}

function draw() {
  fill(0);
  noStroke();
  text("2.29.20", 30, height - 30)
  
  grow+=.1;
  amplitude = (sin(second()*.01)*n)*grow;
  shift = (hour() + sin(millis()*1.16)*second())*grow;
  rad = map(sin(second()*.1), -1, 1, .1, 1);
  
  if(second() != startsec){
    print("shift =" + hour() + " + (sin(" + second() + "*.016)*"+minute()+")*grow");
    print("time =" + hour() + ":" + minute() + ":" + second());
    startsec = second();
    }

  fill(255);
  translate(width/2, height/2);
  rotate(sin(frameCount*.005)*.9);
  
  for(var i = 0; i<TWO_PI; i+=incr){
    x = (shift + amplitude*sin(n*i)) * cos(i);
    y = (shift + amplitude*cos(n*i)) * sin(i);
    stroke(abs(sin(i*3)*240), grow*60);
    ellipse(x, y, rad, rad);
    
  }
  
  if(second() % 10 == 0){
    loop();
    background(255);
    grow = millis()%1000/1000;
  }


 
}

function keyPressed(){
  showtime = !showtime;
}

