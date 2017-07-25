function setup() {
  createCanvas(900, 600);

}

var shrinking = false;
var maxrad = 400;
var maxsize = maxrad;
var xmax = maxsize-150;

var xagg = xmax + maxrad + 70;
var yagg = 55;
var aggper = .09;
var radagg = aggper*maxrad;
var aggsize = aggper*maxsize;

var xcomm = xagg;
var ycomm = yagg + 80;
var commper = .12;
var radcomm = commper*maxrad;
var commsize = commper*maxsize;

var xind = xagg;
var yind = ycomm + 95;
var indper = .21;
var radind = indper*maxrad;
var indsize = indper*maxsize;

var xtrans = xagg;
var ytrans = yind + 130;
var transper = .27;
var radtrans = transper*maxrad;
var transsize = transper*maxsize;

var xelec =  xagg;
var yelec = ytrans+ 145;
var elecper = .29;
var radelec = elecper*maxrad;
var elecsize = elecper*maxsize;

function draw() {

  background(54);
  noStroke();
  // fill(255, 38, 38, 100);
  fill(255, 56, 97);
  ellipse(xmax, height/2, maxrad, maxrad);
  noFill();
  stroke(255, 56, 97);
    strokeWeight(3);
  ellipse(xmax, height/2, maxsize, maxsize)
  noStroke();
  fill(255);
  text("2005", xmax-maxsize*.74/4 + 50, height/2-170);
  noStroke();
  fill(255);
  text("Paris Agreement", xmax-maxsize*.74/4 + 5, height/2-90);
  noFill();
  strokeWeight(3);
  // stroke(150, 255, 255, 150);
  stroke(0, 209, 178);
  // text("Paris Agreement Number", xmax + maxsize*.74, height/2)
  ellipse(xmax, height/2, maxsize*.74, maxsize*.74);

  noStroke();
  strokeWeight(1);



  push();
  translate(-30, 0);
  noStroke();
  textSize(18);
  textAlign(LEFT);
  fill(255);
  text("Electricity", xelec - elecsize - 40, yelec);
  text("Agriculture", xelec - elecsize - 40, yagg);
  text("Transportation", xelec - elecsize - 40, ytrans);
  text("Industry", xelec - elecsize - 40, yind);
  text("Commericial\nResidential", xelec - elecsize - 40, ycomm);
  pop();

  fill(255);
  textSize(20);
  // text(int(radelec*100/maxrad) + "%",xelec + 90, yelec);
  // text(int(radtrans*100/maxrad) + "%",xelec + 90, ytrans);
  // text(int(radind*100/maxrad) + "%",xelec + 90, yind);
  // text(int(radcomm*100/maxrad) + "%",xelec + 90, ycomm);
  // text(int(radagg*100/maxrad) + "%",xelec + 90, yagg);
  text(int(radelec*100/elecsize) + "%",xelec + 90, yelec + 5);
  text(int(radtrans*100/transsize) + "%",xelec + 90, ytrans + 5);
  text(int(radind*100/indsize) + "%",xelec + 90, yind + 5);
  text(int(radcomm*100/commsize) + "%",xelec + 90, ycomm + 5);
  text(int(radagg*100/aggsize) + "%",xelec + 90, yagg + 5);



  // fill(255,82,79);
  fill(255, 56, 97);
  // fill(255, 38, 38, 100)
  // fill(255, 56, 57);
  ellipse(xelec, yelec, radelec, radelec);
  triangle(xelec + 110,  yelec - 30, xelec + 100, yelec - 20, xelec + 120, yelec - 20);
  triangle(xelec + 110,  yelec + 25, xelec + 100, yelec + 15, xelec + 120, yelec + 15);

  //fill(255, 61, 75);
  // fill(255,83,67);
  // fill(255, 56, 67);
  // fill(255, 38, 38, 100)
  fill(255, 56, 97);
  ellipse(xtrans, ytrans, radtrans, radtrans);
  triangle(xtrans + 110,  ytrans - 30, xtrans + 100, ytrans - 20, xtrans + 120, ytrans - 20);
  triangle(xtrans + 110,  ytrans + 25, xtrans + 100, ytrans + 15, xtrans + 120, ytrans + 15);

  // fill(255, 69, 59);
  // fill(255, 56, 77);
  // fill(255, 38, 38, 100)
  fill(255, 56, 97);
  ellipse(xind, yind, radind, radind);
  triangle(xind + 110,  yind - 30, xind + 100, yind - 20, xind + 120, yind - 20);
  triangle(xind + 110,  yind + 25, xind + 100, yind + 15, xind + 120, yind + 15);

//  fill(255,83,67);
  // fill(255, 56, 87);
  // fill(255, 38, 38, 100)
  fill(255, 56, 97);
  ellipse(xcomm, ycomm, radcomm, radcomm);
  triangle(xcomm + 110,  ycomm - 30, xcomm + 100, ycomm - 20, xcomm + 120, ycomm - 20);
  triangle(xcomm + 110,  ycomm + 25, xcomm + 100, ycomm + 15, xcomm + 120, ycomm + 15);

  //fill(255,82,79);
  fill(255, 56, 97);
  // fill(255, 38, 38, 100)
  // fill(255, 56, 97);
  ellipse(xagg, yagg, radagg, radagg);
  triangle(xagg + 110,  yagg - 30, xagg+ 100, yagg - 20, xagg + 120, yagg - 20);
  triangle(xagg + 110,  yagg + 25, xagg + 100, yagg + 15, xagg + 120, yagg + 15);


  noFill();
  stroke(255, 0, 57);
  // stroke(255, 56, 97);
  ellipse(xelec, yelec, elecsize, elecsize);
  stroke(255, 0, 67);
  // stroke(255, 56, 97);
  ellipse(xtrans, ytrans, transsize, transsize);
  stroke(255, 0, 77);
  // stroke(255, 56, 97);
  ellipse(xind, yind, indsize, indsize);
  stroke(255,0,87);
  // stroke(255, 56, 97);
  ellipse(xcomm, ycomm, commsize, commsize);
  stroke(255,0,0);
  // stroke(255, 56, 97);
  ellipse(xagg, yagg, aggsize, aggsize);

  noStroke();

  fill(200, 100, 200);

  if(mouseX > xagg){
    cursor(HAND);
  }
  else{
    cursor(ARROW);
  }


  if (mouseIsPressed){

  //   if(mouseX < xtrans + radtrans/2 && mouseX > xtrans - radtrans/2 && mouseY < ytrans + radtrans/2 && mouseY > ytrans - radtrans/2){
  //     radtrans -=.01*transsize;
  //     maxrad -= .01*transper*maxsize;
  // }
  //   if(mouseX < xcomm + radcomm/2 && mouseX > xcomm - radcomm/2 && mouseY < ycomm + radcomm/2 && mouseY > ycomm - radcomm/2){
  //     radcomm -=.01*commsize;
  //     maxrad -= .01*commper*maxsize;
  //   }
  // if(mouseX < xelec + radelec/2 && mouseX > xelec- radelec/2 && mouseY < yelec + radelec/2 && mouseY > yelec - radelec/2){
  //   radelec -=.01*elecsize;
  //   maxrad -= .01*elecper*maxsize;
  // }
  // if(mouseX < xagg + radagg/2 && mouseX > xagg - radagg/2 && mouseY < yagg + radagg/2 && mouseY > yagg - radagg/2){
  //   radagg -=.01*aggsize;
  //   maxrad -= .01*aggper*maxsize;
  // }
  // if(mouseX < xind + radind/2 && mouseX > xind - radind/2 && mouseY < yind + radind/2 && mouseY > yind - radind/2){
  //   radind -=.01*indsize;
  //   maxrad -= .01*indper*maxsize;
  // }


  if(mouseX < xelec + 120 && mouseX > xelec + 100 && mouseY < yelec - 20 && mouseY > yelec - 30){
    if(radelec < elecsize){
    radelec +=.01*elecsize;
    maxrad  += .01*elecper*maxsize;
  }
  }

  if(mouseX < xelec + 120 && mouseX > xelec + 100 && mouseY < yelec + 25 && mouseY > yelec + 15){
    if(radelec > 0){
    radelec -=.01*elecsize;
    maxrad -= .01*elecper*maxsize;
  }
  }

  if(mouseX < xcomm + 120 && mouseX > xcomm + 100 && mouseY < ycomm - 20 && mouseY > ycomm - 30){
    if(radcomm < commsize){
    radcomm +=.01*commsize;
    maxrad  += .01*commper*maxsize;
  }
  }

  if(mouseX < xcomm + 120 && mouseX > xcomm + 100 && mouseY < ycomm + 25 && mouseY > ycomm + 15){
    if(radcomm > 0){
    radcomm -=.01*commsize;
    maxrad -= .01*commper*maxsize;
  }
  }

  if(mouseX < xagg + 120 && mouseX > xagg + 100 && mouseY < yagg - 20 && mouseY > yagg - 30){
    if(radagg < aggsize){
    radagg +=.01*aggsize;
    maxrad  += .01*aggper*maxsize;
  }
  }

  if(mouseX < xagg + 120 && mouseX > xagg + 100 && mouseY < yagg + 25 && mouseY > yagg + 15){
    if(radagg > 0){
    radagg -=.01*aggsize;
    maxrad -= .01*aggper*maxsize;
  }
  }

  if(mouseX < xtrans + 120 && mouseX > xtrans + 100 && mouseY < ytrans - 20 && mouseY > ytrans - 30){
    if(radtrans< transsize){
    radtrans +=.01*transsize;
    maxrad  += .01*transper*maxsize;
  }
  }

  if(mouseX < xtrans + 120 && mouseX > xtrans + 100 && mouseY < ytrans + 25 && mouseY > ytrans + 15){
    if(radtrans > 0){
    radtrans -=.01*transsize;
    maxrad -= .01*transper*maxsize;
  }
  }

  if(mouseX < xind + 120 && mouseX > xind + 100 && mouseY < yind - 20 && mouseY > yind - 30){
    if(radind< indsize){
    radind +=.01*indsize;
    maxrad  += .01*indper*maxsize;
  }
  }

  if(mouseX < xind + 120 && mouseX > xind + 100 && mouseY < yind + 25 && mouseY > yind + 15){
    if(radind > 0){
    radind -=.01*indsize;
    maxrad -= .01*indper*maxsize;
  }
  }

  }

if(maxrad < maxsize*.74){
  // fill(150, 255, 255, 150);
  fill(0, 209, 178);
  textSize(20);
  noStroke();
  push();
  text("Good job, you got the US to the\nParis agreement number!", 20, height-50);
  pop();
  Logger.log({"event": "bubble_success", aggsize: aggsize, commsize: commsize, indsize: indsize, transsize: transsize, elecsize: elecsize});
  Logger = {};
  Logger.log = function(){};
}

// fill(150, 255, 255, 150);
fill(0, 209, 178);
rectMode(CENTER);
rect(70, 40, 120, 50, 20, 20, 20, 20);
fill(255);
text("RESET", 35, 48);
}


function mousePressed(){
  if(mouseX < 120 && mouseX > 0 && mouseY < 100 && mouseY > 0){
    maxrad = maxsize;
    indsize = maxsize*indper;
    radind = indsize;
    aggsize = maxsize*aggper;
    radagg = aggsize;
    commsize = maxsize*commper;
    radcomm = commsize;
    transize = maxsize*transper;
    radtrans = transize;
    elecsize = maxsize*elecper;
    radelec = elecsize;
  }

}
