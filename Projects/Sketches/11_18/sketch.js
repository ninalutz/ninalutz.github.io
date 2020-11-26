
/* class definitions */

/* global variables */

/* t: time */
let t = 0;
/* dt: delta t */
let dt = 0.01;
/* ns: noise scale */
let ns = 0.02;
/* rotx, roty: rotation angles */
let rotx;
let roty;
/* s: scale factor */
let s;

/* main routines */

function setup()
{
  createCanvas(600,600, WEBGL);
  
  rotx = 0;
  roty = 0;
  s = 1;



}

function draw()
{
  background(0);
  scale(s)

  let N = 100;
  let R = 80;
  for(var i = 0; i < N; i++){
      var r = -R*log((N-i)/N);
      strokeWeight(0.005*r);
      stroke(120);
      noFill();
      var v = 1*((N-i)/N);
      rotateX(v*t);
      rotateY(v*t);
      rect(-width/4, -height/4, r, r);
      rotateY(-v*t);
      rotateX(-v*t);    
  }
  
  t += dt;

}

