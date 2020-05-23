let shapes = [];
let curTime = 0.0;
let speed = 50.0;

let myFont;
function preload() {
  myFont = loadFont('Ligconsolata-Regular.otf');
}

function setup() {
  createCanvas(800, 800, WEBGL);
  background(0);
  textFont(myFont);
  textSize(14);

  let num = 30;
  for(let i=0; i<num; i++){
    let shape = new Shape(i, num, width, width, color(255, 0, 0));
    shapes.push(shape);
  }
  for(let i=0; i<num; i++){
    let shape = new Shape(i, num, width, -100, color(0, 0, 255));
    shapes.push(shape);
  }
}

function draw() {
 background(0)
  for(let i=0; i<shapes.length; i++){
    let shape = shapes[i];
    shape.draw();
  }
  
  curTime += deltaTime * 0.001;

  text("5.23.20", 30, height-30)

}

class Shape{
  constructor(id, maxnum, size, shift, c2){
    this.id = id;
    this.shift = shift;
    this.maxnum = maxnum;
    this.size = size;
    this.col1 = color("#ffffff")
    this.col2 = c2;
  }
  
  draw(){

    noFill();
    let maxid = this.maxnum * 0.1;
    let thresh =map(max(this.id, maxid), maxid, this.maxnum-1, 0, 1.0); 
    stroke(lerpColor(this.col2, this.col1, thresh));
    strokeWeight(map(max(thresh, 0.5), 0.5, 1.0, 0.0, 2.0));
    
    push();
    let angrange = map(sin(radians(curTime * 10.0)), -1.0, 1.0, 60.0, 360.0);
    let addang = radians( curTime * speed +  angrange * this.id / (this.maxnum - 1.0));
    let ang = radians(45.0) + addang;
    
    rotateX(ang+ this.shift);
    rotateY(ang + this.shift);
    rotateZ(ang + this.shift);
    let scaleval = (1.0 - this.id / this.maxnum);
    let addscale = map(sin(radians(curTime * 100.0)), -1.0, 1.0, 0.0,0.05);
    scaleval = map(scaleval, 0.0, 1.0, addscale, 1.0 + addscale);
    box(this.size * scaleval);
    pop()
  
  }
  
}