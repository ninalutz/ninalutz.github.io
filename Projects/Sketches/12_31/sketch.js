let fc, num = 2300;
let ballCollection = [];
let save = false;
let scal;
let theta = 0;
let letter; // Graphics
let font;
let l = "20"
let l2 = "21"
let threshold = 20;


function setup() {
  createCanvas(600, 600);
  letter = createGraphics(width, height);
  createStuff();
    background(0);


}

function draw() {
  background(0, 5);
  for (let i = 0; i < ballCollection.length; i++) {
    let mb = ballCollection[i];
    mb.run();
  }

  theta += .0523;

  fill(255);
  text("12.31.20: Goodbye 2020!", 30, height-30)


}

function createStuff() {
  ballCollection.length = 0;

  letter.noStroke();
  letter.background(255);
  letter.fill(0);
  letter.textFont('Arial Black', 300);
  // letter.textSize(20)
  letter.textAlign(CENTER);
  letter.text(l, 300, 270);

  letter.text(l2, 300, 530);
  // letter.loadPixels();

  for (let i = 0; i < num; i++) {
    let x = int(random(width));
    let y = int(random(height));
    let c = letter.get(x, y);
    if (brightness(c) < 100) {
      let org = createVector(x, y);
      let radius = random(5, 10);
      let loc = createVector(org.x + radius, org.y);
      let offSet = random(TWO_PI);
      let dir = 1;
      let r = random(1);
      if (r > 0.5) dir = -1;
      let myBall = new Ball(org, loc, radius, dir, offSet);
      ballCollection.push(myBall);
    }
  }
}


class Ball {

  constructor(_org, _loc, _radius, _dir, _offSet) {
    // this.alpha = 0;
    this.connection = [];
    // this.countC = 1;
    this.sz = 2;
    this.org = _org;
    this.loc = _loc;
    this.radius = _radius;
    this.dir = _dir;
    this.offSet = _offSet;
  }

  run() {
    this.display();
    this.move();
    this.lineBetween();
  }

  move() {
    this.loc.x = this.org.x + sin(theta * this.dir + this.offSet) * this.radius;
    this.loc.y = this.org.y + cos(theta * this.dir + this.offSet) * this.radius;
  }

  lineBetween() {
    // this.countC = 1;
    for (let i = 0; i < ballCollection.length; i++) {
      let other = ballCollection[i];
      let distance = this.loc.dist(other.loc);
      if (distance > 0 && distance < threshold) {
        // print(this.countC);
        // this.alpha = map(this.countC, 0, 10, 10, 100);
        stroke(100, 20);
        line(this.loc.x, this.loc.y, other.loc.x, other.loc.y);
        this.connection[i] = true;
      } else {
        this.connection[i] = false;
      }
    }
    // for (let i = 0; i < ballCollection.length; i++) {
    //  if (this.connection[i]) this.countC++;
    // }
  }

  display() {
    noStroke();
    fill(255);
    ellipse(this.loc.x, this.loc.y, this.sz, this.sz);
  }
}