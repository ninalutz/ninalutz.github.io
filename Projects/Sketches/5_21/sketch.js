/*

FORKED FROM 
 * twisted lines
 *
 * @author aadebdeb
 * @date 2017/02/04

 Fork by Nina Lutz 2020
 */

var colors;
var type;

function setup() {
  createCanvas(600, 600)
  
  colors = [
    color(0, 200, 0, 50),
    color(200, 0, 0, 50),
    color(0, 0, 200, 50)
  ];
  
  type = 0;
}

function draw() {


  blendMode(BLEND);
 background(255, 50);
     fill(0);
  noStroke();
  text("5.21.20", 30, height - 30)
  blendMode(EXCLUSION);
  

  // noFill();
  noStroke()
 // strokeWeight(5);
  for(var i = 0; i < 3; i++) {
    fill(colors[i]);
   // beginShape();
    for(var w = -20; w < width + 20; w += 5) {
      var h = height / 2;
      h += 200 * tan(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + frameCount * 0.02)), 5);
      ellipse(w, h+ random(20),100, 100);
    }    
    //endShape()
    //beginShape();
    // fill(colors[0]);
    // for(var w = -20; w < width + 20; w += 5) {
    //   var h = height / 2;
    //   h += 200 * sin(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + frameCount * 0.02)), 5);

    //   ellipse(w, h+20 +random(20), 50, 50);
    // }    
    // //endShape();
    // //beginShape();
    // stroke(colors[1]);
    // for(var w = -20; w < width + 20; w += 5) {
    //   var h = height / 2;
    //   h += 200 * sin(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + frameCount * 0.02)), 5);

    //   ellipse(w, h+40 + random(20), 50, 50);
    // }    
    // //endShape();
    // //beginShape();
    // fill(colors[2]);
    // for(var w = -20; w < width + 20; w += 5) {
    //   var h = height / 2;
    //   h += 200 * sin(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + frameCount * 0.02)), 5);

    //   curveVertex(w, h - 20 + random(20));
    // }    
   // endShape();
  }
  

}

// function mousePressed() {
//   if(type == 0) {
//     type = 1;
//   } else {
//     type = 0;
//   }
// }