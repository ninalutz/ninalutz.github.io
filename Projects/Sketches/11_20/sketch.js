var xoff=0.400;
var yoff=0.300;

function setup() {
  createCanvas(600, 600);
 
  smooth();
  //smooth();
  //frameRate(30);
  //noiseSeed(random(1,600));

}

function draw() {
  background(255, 10)
  
  noiseDetail(1,20);
  noFill();
  //CODE FOR PLAYING RANDOM
 // background(250,200,0);
  
   /* for (var i=1; i<640; i+=10){
  xoff+=0.05;
  arc(width/2,height/2,i,i, PI*(random(0,1)*2),PI*(random(0,1)*2));
  println(PI*(noise(xoff)*i/1000));
    }*/
    
    //RECOMMENDED xoff+=0.05 and yoff=0.03
    xoff += 0.011;
    yoff += 0.005;
    for (var i=1; i<500; i+=10){
      //USE stroke RANDOM for vibrating sort of effect while noise on strokeWEight will give more rhythm to change of stroke
      //strokeWeight(random(1,4);
      strokeWeight(noise(xoff,i)*8);
      arc(width/2,height/2,i,i,PI*(noise(xoff*i/640)*8),PI*(noise(yoff*i/450)*3));
      //println(PI*(noise(xoff)*2));
    }
    fill(0);
    text("11.20.20", 30, height-30)
}