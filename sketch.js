var NUMSINES = 7;
var sines = new Array(NUMSINES); // an array to hold all the current angles
var rad; // an initial radius value for the central sine
var i;

var fund = 0.003; // the speed of the central sine
var ratio = 1; // speed multiplier
var alpha = 50;

var trace = false;

function setup() {
  createCanvas(300, 200);

  rad = height/4; //radius second circle
  background(255); // clear the screen

  for (var i = 0; i<sines.length; i++) {
    sines[i] = PI; //face same way
  }
}

function draw() {
  if (!trace) {
    background(255); // clear screen if showing geometry
    stroke(88, 255);
    noFill(); //don't fill
  }

  // MAIN ACTION
  push(); // start a transformation matrix
  translate(width/2, height/2); // move to middle of screen
  for (var i = 0; i<sines.length; i++) {
    var erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
    // setup for tracing
    if (trace) {
      stroke(255*(float(i)/sines.length),0, 0, alpha);
      noFill();
      fill(255, 0, 0, alpha/2);
      erad = 5.0*(1.0-float(i)/sines.length); // pen width will be related to which sine
    }
    var radius = rad/(i+1); // radius for circle itself
    rotate(sines[i]); // rotate circle
    if (!trace) ellipse(0, 0, radius*2, radius*2); // if we're simulating, draw the sine
    push(); // go up one level
    stroke(255, 0, 0, alpha);
    translate(0, radius); // move to sine edge
    if (!trace) ellipse(0, 0, 5, 5); // draw a little circle
    if (trace) ellipse(0, 0, erad, erad); // draw with erad if tracing
    pop(); // go down one level
    translate(0, radius); // move into position for next sine
    sines[i] = (sines[i]+(fund+(fund*i*ratio)))%TWO_PI; // update angle based on fundamental
  }

  pop(); // pop down final transformation

}

function mousePressed() {
    trace = !trace;
    background(255);
}