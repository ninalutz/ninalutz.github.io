let _aryObject = [];
let _tileNumT;
let _tileNumR;
let _ellipseRatio;
let _count;
let _stepR;
let _stepT;

function setup() {
  createCanvas(600, 600);
 
  // strokeJoin(MITER);
  
  _freqCount = 40;

  _count = 0;
  _ellipseRatio = 4;
  _tileNumT = 12;
  _tileNumR = 7;
  
  let layerNum = 40;
  let initT = int(random(_tileNumT));
  for (k = 1; k <= layerNum; k++) {
    let baseColor = 360 + random(20);
    _aryObject.push(new f(
      1, initT,
      color((baseColor + 180) % 360, 200, 50, 100),
      width/2/_tileNumR/layerNum*k
    ));
  }
}

function draw() {
  // clear();
 // blendMode(DIFFERENCE);
  background(0);
  
  for (let i = 0; i < _aryObject.length; i++) {
    _aryObject[i].update();
    _aryObject[i].drawMe();
  }

  _count ++;
  noStroke()
  fill(255,69,0);
  text("10.8.20", 30, height-30);
  fill(255,69,0, 30);
}

class f {
  constructor(iR, iT, myColor,sw) {
    this.target_iR = iR;
    this.target_iT = iT;
    this.myColor = myColor;
    this.sw = sw *_ellipseRatio; 
    this.aryPoint = [];
  }

  setTarget() {
    _stepR = 4;
    _stepT = 2;
    this.iR = this.target_iR;
    this.iT = this.target_iT % _tileNumT;
    
    this.aryPoint.unshift([this.iR, this.iT]);

    let dir;
    if (this.iR <= _stepR) {
      dir = random(["down", "left", "right"]);
    } else if (this.iR >= _tileNumR-_stepR) {
      dir = random(["up", "left", "right"]);
    } else {
      dir = random(["up", "down", "left", "right"]);
    }

    if (dir == "up") { this.target_iR = this.iR - _stepR; }
    else if (dir == "down") { this.target_iR = this.iR + _stepR; }
    else if (dir == "left") { this.target_iT = this.iT - _stepT; }
    else if (dir == "right") { this.target_iT = this.iT + _stepT; }

    this.dR = (this.target_iR - this.iR) / (_freqCount+1);
    this.dT = (this.target_iT - this.iT) / (_freqCount+1);
  }
  
  update() {
    if (_count % _freqCount == 0) {
      this.setTarget();
    }

    if (this.target_iR == this.iR) { //dir = right or left
      this.aryPoint.unshift([this.iR, this.aryPoint[0][1] + this.dT]);
    } else if (this.target_iT == this.iT) {
      this.aryPoint.unshift([this.aryPoint[0][0] + this.dR, this.iT]);
    }

    while (this.aryPoint.length >= 20) {
      this.aryPoint.pop();
    }
  }

  drawMe() {
    stroke(255,69,0);
    strokeWeight(5)
    noStroke()
    
    push();
    translate(width/2, height/2);

    for (let i = 0; i < this.aryPoint.length; i++) {
      var x =  width / 2 / _tileNumR * this.aryPoint[i][0] * cos(3.5*PI / _tileNumT * this.aryPoint[i][1]);
      var y = height / 2 / _tileNumR * this.aryPoint[i][0] * sin(4*PI / _tileNumT * this.aryPoint[i][1]);
      ellipse(x,y, sin(y)*20, sin(y)*20);
    }
   
    pop();
  }
}
