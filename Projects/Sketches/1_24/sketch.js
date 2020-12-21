function setup() {
   createCanvas(600, 600)
   stroke(240, 250, 255, 80);
   noFill()
   radius = height / 3
   scaleX = 0.8
   sqrt3 = sqrt(3)
   deg120 = (PI / 3) * 2
   run()
   frameRate = 2;
}

function recursive_triangle(x, y, r, angle) {
   push()
   translate(x, y)
   rotate(angle)
   tri(0, cos(deg120) * r, sin(deg120) * r, cos(deg120 * 2) * r, sin(deg120 * 2) * r, cos(deg120 * 3) * r, sin(deg120 * 3) * r)
   pop()
}


function draw(){
     scaleX = second()/60;
     run();
}

function run() {
   background(0)
   for (var y = 0; y < 2; y += 1) {
      for (var x = 0; x < 3; x += 1) {
         recursive_triangle(x * radius * sqrt3, radius + y * height / 2, radius, PI / 6)
         if (x != 2) recursive_triangle(x * radius * sqrt3 + radius * sqrt3 * 0.5, radius - (radius / 2) + y * height / 2, radius, PI / 6 + PI / 3)
      }
   }
}


var frac = 5

function tri(n, x1, y1, x2, y2, x3, y3) {
   if (n == frac) {
      triangle(x1, y1, x2, y2, x3, y3);
      return
   }
   var _x1 = (x2 - x3) * scaleX + x3
   var _y1 = (y2 - y3) * scaleX + y3
   var _x2 = (x3 - x1) * scaleX + x1
   var _y2 = (y3 - y1) * scaleX + y1
   var _x3 = (x1 - x2) * scaleX + x2
   var _y3 = (y1 - y2) * scaleX + y2
   tri(n + 1, x1, y1, _x3, _y3, _x2, _y2)
   tri(n + 1, x2, y2, _x1, _y1, _x3, _y3)
   tri(n + 1, x3, y3, _x2, _y2, _x1, _y1)
   tri(n + 1, _x1, _y1, _x2, _y2, _x3, _y3)
}