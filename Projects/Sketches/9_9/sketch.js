var globe;
var total = 20;
var offset =2;
var angle =0;

var m=0;
var mchange=0;

var a = 2;
var b = 1;

function setup(){
  createCanvas(600,600)
  globe = new Array((total+1)*(total+1));
  background(0)
}

function supershape(theta, m, n1, n2, n3){
  var t1=abs((1/a)*cos(m*theta/4));
  t1=pow(t1,n2);
  var t2=abs((1/b)*sin(m*theta/4));
  t2=pow(t2,n3);
  var t3 =t1+t2;
  var r=pow(t3,-1/n1);
  return r;
}

function draw(){
  background(0, 5);

  m=map(sin(mchange),-2,1,0,100);
  mchange+=0.0005;

  var r=100;

  for(var i=0;i<total+1;i++){
    globe[i] =[];
    var lat =map(i,0,total,-HALF_PI,HALF_PI);
    var r2 = supershape(lat,m,0.2,1.7,1.7);

    for(var j=0;j<total+1;j++){
      var lon = map(j,0,total,-PI,PI);
      var r1=supershape(lon,m,0.1,2.7,2.7);

      var x = r*r1*sin(lon)*r2*sin(lon);
      var y = r*r1*cos(lon)*r2*cos(lat);

      var index=i+j*(total+1);
      globe[index] = createVector(x,y);
    }
  }

  offset+=5;
  // noStroke();

  for(var i=0;i<total;i+=2){
    for(var j=0;j<total+1;j+=2){
      var index1=i+j*(total+1);
      var v1 = globe[index1];
      var index2=(i+1)+j*(total+1);
      var v2 = globe[index2];
      stroke(map(i,0,total,0,200));
      noFill();
      rectMode(CENTER)
      rect(v1.x + width/2,v1.y + height/2,v2.x + width/2,v2.y + height/2);
      ellipse(v1.x + width/2,v1.y + height/2,v2.x + width/2,v2.y + height/2);
    }
  }
  angle+=0.3;

  fill(255);
  noStroke();
  text("9.9.20", 30, height-30);
}