var nbranchs = 75;

/*-------------*/

function setup() {
  createCanvas(600, 600);
  background(0, 0, 20);
  
  noFill();
  
  noLoop();
}


/*-------------*/


function draw() {
    tree(40, 70, 50, 200);
    tree(140, 170, 50, 200);
    tree(240, 270, 50, 200);
    tree(340, 370, 50, 200);
    tree(440, 470, 50, 200);
    tree(540, 570, 50, 200);


    tree(0, 150, 100, 450);
    tree(100, 250, 100, 450);
    tree(200, 350, 100, 450);
    tree(300, 450, 100, 450);    
    tree(400, 550, 100, 450);    
    tree(500, 650, 100, 450);    


    tree(0, 300, 300, 600);
    tree(100, 400, 300, 600);
    tree(200, 500, 300, 600);    
    tree(300, 600, 300, 600);
    // tree(100, 250, 100, 450);
    // tree(200, 350, 100, 450);
    // tree(300, 450, 100, 450);    
    // tree(400, 550, 100, 450);    
    // tree(500, 650, 100, 450);    
}


/*-------------*/


function mousePressed() {
  background(0, 0, 20);
  redraw();
}


/*-------------*/


function branch(x, y, dx, dy, top, bottom) {
  var sign = dx/abs(dx);
  
  for (var i = 0; i <= x; i += 3) {
    var idx = i/x;
    
    var xi = bezierPoint(x, x + dx/2,   x + dx, x + dx, idx);
    var yi = bezierPoint(y, y, y + dy, y + dy, idx);

    fill(map(y, top, bottom, 255, 50));
    noStroke();
    ellipse(x, y, 2, 2);

    if (x%2 == 0){
    ellipse(xi, yi,1, 1);
    }
  }
}


/*-------------*/


function tree(left, right, top, bottom) {


  for (var idx = 0; idx < nbranchs; idx += 1) {
    
    // choose a random y position
    var y = random(bottom, top);
    
    // choose a random x position inside of a triangle
    var dx = map(y, bottom, top, 0, (right-left)/2);
    var x = random(left + dx, right - dx);
    
    // choose the size of the branch according to the position on the tree
    var w = map (x, left, right, -50, 50) + 1;
    var h = map (y, bottom, top, 25, 5);
    
    // randonize the size
    var dw = random(-10, 5);
    var dh = random (-5, 5);
    
    // create the new branch
    branch(x, y, w + dw, h + dh, top, bottom);
    
  }
}