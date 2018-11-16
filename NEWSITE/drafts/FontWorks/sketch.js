var myFont;
function preload(){
  myFont = loadFont('Arial.ttf');
  myFont2 = loadFont('ArialNarrow.ttf');
}

function setup() {
  createCanvas(400, 400);
  fill('#ED225D');
  textFont(myFont);
  textSize(36);
  text('p5*js', 10, 50);
  
  textFont(myFont2);
  textSize(36);
  text('p5*js', 10, 100);
  
}

function draw() {
  
}