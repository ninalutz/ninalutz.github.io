var source,aim, locPixel, PathFindersArray, seekX, seekY;

var buffer, limitDown, numPoints, inertia;

var larg, top, largI, topI, briMax;

var minBrightness, maxBrightness, locTest, locTaX, locTaY;

var brightnessTemp, amplitudeTest, devMax, vMax, hazard;

var myweight, drawing, limit;

function preload(){
  source = loadImage("me.jpg");
  
}
function setup() {
  buffer = [];
  larg=largI=800;
  top=topI=600;
  limitDown = [];
  drawing = true;
  limit = false;
  aim = createVector();
  createCanvas(600, 600);
  
    if(topI*source.width>largI*source.height){
    larg=largI;
    top=larg*source.height/source.width;
  }else{
    top=topI;
    larg=top*source.width/source.height;
  }
  
  source.resize(larg,top);
  source.loadPixels();
  fill(0);
  initialiser();
  
}

function draw() {
  background(0);
  
}