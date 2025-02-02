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
  cnv = createCanvas(600, 600)
  
  colors = [
    color(100, 100, 100, 50),
    color(150, 150, 150, 50),
    color(50, 50, 50, 50)
  ];
  
  type = 0;
}

function draw() {


  blendMode(BLEND);
 background(255, 50);
     fill(0);
  noStroke();
  text("5.19.20", 30, height - 30)
 // blendMode(EXCLUSION);
  

  noFill();
  strokeWeight(5);
  for(var i = 0; i < 3; i++) {
    stroke(colors[i]);
    beginShape();
    for(var w = -20; w < width + 20; w += 5) {
      var h = height / 2;
      h += 200 * sin(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + frameCount * 0.02)), 5);
      curveVertex(w, h+ random(20));
    }    
    endShape();
    beginShape();
    stroke(colors[0]);
    for(var w = -20; w < width + 20; w += 5) {
      var h = height / 2;
      h += 200 * sin(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + frameCount * 0.02)), 5);

      curveVertex(w, h+20 +random(20));
    }    
    endShape();
    beginShape();
    stroke(colors[1]);
    for(var w = -20; w < width + 20; w += 5) {
      var h = height / 2;
      h += 200 * sin(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + frameCount * 0.02)), 5);

      curveVertex(w, h+40 + random(20));
    }    
    endShape();
    beginShape();
    stroke(colors[2]);
    for(var w = -20; w < width + 20; w += 5) {
      var h = height / 2;
      h += 200 * sin(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + frameCount * 0.02)), 5);

      curveVertex(w, h - 20 + random(20));
    }    
    endShape();
  }
  

}



// function keyPressed() {
//     save(cnv, 'myCanvas.png');
// }

// function mousePressed() {
//   if(type == 0) {
//     type = 1;
//   } else {
//     type = 0;
//   }
// }