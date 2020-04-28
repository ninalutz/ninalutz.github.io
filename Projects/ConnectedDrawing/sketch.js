var prompt = 1;
var strokes1 = [];
var strokes2 = [];
var strokes3 = [];
var strokes4 = [];
var strokes5 = [];
var strokes6 = [];
var released = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  fill(0);
  noStroke();
  rect(0, 0, width, 170)
  noStroke();
  fill(255);
  textSize(20)
  text("Welcome to drawing Mad Libs!", 40, 50);
  text("Draw a small drawing each step. Press d to continue. Current step: " + prompt + "/6", 40, 100)
  stroke(255);
  line(0, 110, width, 115);

  //Prompt
  if(prompt == 1){
    noStroke();
    text("Draw a SINGULAR NOUN below in box, press 'd' when done ", 40, 150);
    stroke(255)
      if (mouseIsPressed === true) {
          line(mouseX, mouseY, pmouseX, pmouseY);
          var v = createVector(mouseX, mouseY);
          var pv = createVector(pmouseX, pmouseY);
          strokes1.push(v)
          strokes1.push(pv)
      }
      if(released){
        var reset = createVector(0, 0);
        strokes1.push(reset)
        released = false;
      }
      stroke(255)
      noFill();
      rect(100, 200, 200, 200)
  }
  if(prompt == 2){
    noStroke();
    text("Draw a PLURAL NOUN below in box, press 'd' when done", 40, 150);
    stroke(255)
      if (mouseIsPressed === true) {
          line(mouseX, mouseY, pmouseX, pmouseY);
          var v = createVector(mouseX, mouseY);
          var pv = createVector(pmouseX, pmouseY);
          append(strokes2, v);
          append(strokes2, pv);
      }
      if(released){
        var reset = createVector(0, 0);
        append(strokes2, reset);
        released = false;
      }
      stroke(255)
      noFill();
      rect(100, 200, 200, 200)
  }
  if(prompt == 3){    
    noStroke();
    text("Draw a SINGULAR NOUN below in box, press 'd' when done", 40, 150);
    stroke(255)
      if (mouseIsPressed === true) {
          line(mouseX, mouseY, pmouseX, pmouseY);
          var v = createVector(mouseX, mouseY);
          var pv = createVector(pmouseX, pmouseY);
          append(strokes3, v);
          append(strokes3, pv);
      }
      if(released){
        var reset = createVector(0, 0);
        append(strokes3, reset);
        released = false;
      }
      stroke(255)
      noFill();
      rect(100, 200, 200, 200)
  }
    if(prompt == 4){    
    noStroke();
    text("Draw a SINGULAR NOUN below in box, press 'd' when done", 40, 150);
    stroke(255)
      if (mouseIsPressed === true) {
          line(mouseX, mouseY, pmouseX, pmouseY);
          var v = createVector(mouseX, mouseY);
          var pv = createVector(pmouseX, pmouseY);
          append(strokes4, v);
          append(strokes4, pv);
      }
      if(released){
        var reset = createVector(0, 0);
        append(strokes4, reset);
        released = false;
      }
      stroke(255)
      noFill();
      rect(100, 200, 200, 200)
  }
  if(prompt == 5){
    noStroke();
    text("Draw a PLACE below in box, press 'd' when done", 40, 150);
    stroke(255)
    if (mouseIsPressed === true) {
          line(mouseX, mouseY, pmouseX, pmouseY);
          var v = createVector(mouseX, mouseY);
          var pv = createVector(pmouseX, pmouseY);
          append(strokes5, v);
          append(strokes5, pv);
      }
      if(released){
        var reset = createVector(0, 0);
        append(strokes5, reset);
        released = false;
      }
      stroke(255)
      noFill();
      rect(100, 200, 200, 200)
  }
  if(prompt == 6){
    noStroke();
    text("Draw a ADJECTIVE below in box, press 'd' when done", 40, 150);
    stroke(255)
    if (mouseIsPressed === true) {
          line(mouseX, mouseY, pmouseX, pmouseY);
          var v = createVector(mouseX, mouseY);
          var pv = createVector(pmouseX, pmouseY);
          append(strokes6, v);
          append(strokes6, pv);
      }
      if(released){
        var reset = createVector(0, 0);
        append(strokes6, reset);
        released = false;
      }
      stroke(255)
      noFill();
      rect(100, 200, 200, 200)
  }

  if(prompt == 7){
    fill(255);
    noStroke();
    text("Press 'd' to start another prompt!", 40, 150);  
    var p1 = "Be kind to your "
    text(p1, 40, 250);
    noFill();
    stroke(255);
    rect(textWidth(p1)*1.5, 200, 200, 200);
    translate(textWidth(p1)*1.5 - 100, 0)
    for(var i =0; i<strokes1.length-1; i+=2){
      if(strokes1[i].x != 0 && strokes1[i+1].x != 0) {
        stroke(255);
        line(strokes1[i].x, strokes1[i].y, strokes1[i+1].x, strokes1[i+1].y);
      }
    }
  translate(-textWidth(p1)*1.5 + 100, 0)

    fill(255);
    noStroke();
    var p2 = "-footed "
    text(p2,textWidth(p1)*1.5 +200, 250);
    noFill();
    stroke(255);
    rect(textWidth(p1)*1.5 + 220 + textWidth(p2), 200, 200, 200);
    translate(textWidth(p1)*1.5 + 220 + textWidth(p2) - 100, 0)
    for(var i =0; i<strokes2.length-1; i+=2){
      if(strokes2[i].x != 0 && strokes2[i+1].x != 0) {
        stroke(255);
        line(strokes2[i].x, strokes2[i].y, strokes2[i+1].x, strokes2[i+1].y);
      }
    }
    translate((textWidth(p1)*1.5 + 220 + textWidth(p2) - 100)*-1, 0)

    var left3 = textWidth(p1)*1.5 + 220*2 + textWidth(p2);
    fill(255);
    noStroke();
    var p3 = ". For a duck may be somebody's "
    text(p3,left3, 250);
    noFill();
    stroke(255);
    rect(left3 + textWidth(p3) + 20, 200, 200, 200);
    translate(left3 + textWidth(p3) + 20 - 100, 0)
    for(var i =0; i<strokes3.length-1; i+=2){
      if(strokes3[i].x != 0 && strokes3[i+1].x != 0) {
        stroke(255);
        line(strokes3[i].x, strokes3[i].y, strokes3[i+1].x, strokes3[i+1].y);
      }
    }
    translate(-(left3 + textWidth(p3) + 20 - 100), 0)


    fill(255);
    noStroke();
    var p4 = "Be kind to your "
    text(p4,40, 500);
    noFill();
    stroke(255);
    rect(textWidth(p4)*1.5, 450, 200, 200);
    translate(textWidth(p4)*1.5 - 100, 450 - 200)
    for(var i =0; i<strokes4.length-1; i+=2){
      if(strokes4[i].x != 0 && strokes4[i+1].x != 0) {
        stroke(255);
        line(strokes4[i].x, strokes4[i].y, strokes4[i+1].x, strokes4[i+1].y);
      }
    }
    translate(-(textWidth(p4)*1.5 - 100), -(450 - 200))

    fill(255);
    var left4 = 40 + textWidth(p4)*1.5 + 200;
    noStroke();
    var p5 = " in "
    text(p5,left4, 500);
    noFill();
    stroke(255);
    rect(left4 + 50, 450, 200, 200);
    translate(left4+50 - 100, 450 - 200)
    for(var i =0; i<strokes5.length-1; i+=2){
      if(strokes5[i].x != 0 && strokes5[i+1].x != 0) {
        stroke(255);
        line(strokes5[i].x, strokes5[i].y, strokes5[i+1].x, strokes5[i+1].y);
      }
    }
    translate(-(left4+50 - 100), -(450 - 200))

    fill(255);
    var left5 = left4 + 290;
    noStroke();
    var p5 = "Where the weather is always "
    text(p5,left5, 500);
    noFill();
    stroke(255);
    rect(left5 + 32 + textWidth(p5), 450, 200, 200);
    translate(left5 + 32 + textWidth(p5) - 100, 450 - 200)
    for(var i =0; i<strokes6.length-1; i+=2){
      if(strokes6[i].x != 0 && strokes6[i+1].x != 0) {
        stroke(255);
        line(strokes6[i].x, strokes6[i].y, strokes6[i+1].x, strokes6[i+1].y);
      }
    }
    translate(-(left5 + 32 + textWidth(p5)), -450 + 200)
    
  }
}

function keyPressed(){
  if(key == 'd'){
    background(0);
    if(prompt<7){
      prompt+=1;
    } 
    else prompt = 1;
  }

}

function mouseReleased(){
  released = true;
}



