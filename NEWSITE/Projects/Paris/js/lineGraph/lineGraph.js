// 21
// + this adds code to the end of the display() function to detect
//   when the mouse is near a point and draw the data value


var data = [];
var dataCount;
var dataMin = 0;
var dataMax = 100;

var bounds = { };

var table;
var years = [];
var temps = [];

function preload(){
  table = loadTable("temps.csv", "csv", "header");

}


function setup() {
  //  width: 900px;height: 600px;
  createCanvas(450, 600);
  dataCount = table.getRowCount();
  temps = table.getColumn("Mean");
  years = table.getColumn("Year");

  bounds.left = 30;
  bounds.right = width-5;
  bounds.top = 400;
  bounds.bottom = height-5;

  for (var i = 0; i < dataCount; i++) {
    var temperature = map(temps[i], -1, 1, 0, 100);
    data.push(new DataPoint(i, temperature));
  }



}

function draw() {
  background(255);

  // // put a white rectangle behind the plot
   fill(255);
   rectMode(CORNERS);
   rect(bounds.left, bounds.top, bounds.right, bounds.bottom);



  var meany = map(0, -1, 1, bounds.bottom, bounds.top);
  stroke(200);
  strokeWeight(2);
  line(0, meany, width, meany);
  fill(200);
  noStroke();
  textSize(15);
  text("Mean Temp.\n1888-2016", width-90, meany+20)
  strokeWeight(1.5);
  noStroke();


  for(var i = 0; i<table.getRowCount()-1; i++){
    var coord1y = map(temps[i], -1, 1, bounds.bottom, bounds.top);
    var coord1x = map(i, 0, dataCount-1, bounds.left, bounds.right);
    var coord2y = map(temps[i+1], -1, 1,  bounds.bottom, bounds.top);
    var coord2x = map(i+1, 0, dataCount-1, bounds.left, bounds.right);

    stroke(96);
    line(coord1x, coord1y, coord2x, coord2y);
    noStroke();
  }



  data.forEach(function(entry) {
    entry.update();  // run the next animation step
    entry.display();
  });

  var x = 30;
  var y = 200;
  push();
  fill(96);
  textSize(20);
  translate(30,300);
  rotate(-HALF_PI);
  translate(-x,-y);
  text("Temperature", x-100,y);
  pop();

  fill(96);
  textSize(20);
  text("Years", width/2-20, height-25);




}


function DataPoint(idx, amt) {
  var index = idx;
  var amount = amt;

  // set these null so that they can be set the first time around
  var x = null;
  var y = null;

  // this handles updating any animated variables
  this.update = function() {
    x.update();
    y.update();
  }

  this.display = function() {
    // color the dots in gray, with no outline
    fill(50, 115, 220);
    noStroke();

    ellipse(x.value, y.value, 8, 8);

    cursor(HAND);
    // if the distance from the mouse to the data point is within 10 pixels
    if (dist(mouseX, mouseY, x.value, y.value) < 5) {
      // textAlign(CENTER);
      fill(96);
      textSize(25);
      // draw the value of this data point (using 1 decimal point)
      text(years[idx], 20, 50);
      textSize(18);
      if(temps[idx] < 0){
      fill(0, 209, 178);
      text("Temperatures dropped " + -1*temps[idx] + "° Celsius from the mean.", 20, 75);
    }
    else{
      fill(255, 56, 97);
      text("Temperatures rose " + temps[idx] + "° Celsius from the mean.", 20, 75);
    }
    }
  }

  // a function to set the 'index' (where it is in the array)
  // which we can use to determine the x-position
  this.setIndex = function(idx) {
    index = idx;
    // use setTarget() instead of x= so that it will animate
    var newX = map(index, 0, dataCount-1, bounds.left, bounds.right);
    // if this is the first time it's being set, create the SoftFloat
    if (x == null) {
      x = new SoftFloat(newX);
    } else {
      x.setTarget(newX);
    }
  }

  // this sets the actual value for this data point
  this.setAmount = function(amt) {
    amount = amt;
    // use setTarget() instead of y= so that it will animate
    var newY = map(amt, dataMin, dataMax, bounds.bottom, bounds.top);
    if (y == null) {
      y = new SoftFloat(newY);
    } else {
      y.setTarget(newY);
    }
  }

  // function to get the data point's value so it can be sorted
  this.getAmount = function() {
    return amount;
  }

  // because these are inside DataPoint, not inside another function,
  // this code will run when "new DataPoint(idx, amt)" is called,
  // setting the initial index and amount to the numbers passed in.
  this.setIndex(idx);
  this.setAmount(amt);
}
