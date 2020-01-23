var mass = [];
var positionX = [];
var positionY = [];
var velocityX = [];
var velocityY = [];

/////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
  createCanvas(600, 600);
  noStroke();
  fill(64, 255, 255, 192);
  frameRate = 30;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function draw() {
  background(32);
  
  for (var particleA = 0; particleA < mass.length; particleA++) {
    var accelerationX = 0, accelerationY = 0;
    
    for (var particleB = 0; particleB < mass.length; particleB++) {
      if (particleA != particleB) {
        var distanceX = positionX[particleB] - positionX[particleA];
        var distanceY = positionY[particleB] - positionY[particleA];

        var distance = sqrt(distanceX * distanceX + distanceY * distanceY);
        if (distance < 1) distance = 1;

        var force = (distance - 320) * mass[particleB] / distance;
        accelerationX += force * distanceX;
        accelerationY += force * distanceY;
      }
    }
    
    velocityX[particleA] = velocityX[particleA] * 0.99 + accelerationX * mass[particleA];
    velocityY[particleA] = velocityY[particleA] * 0.99 + accelerationY * mass[particleA];
  }
  
  for (var particle = 0; particle < mass.length; particle++) {
    positionX[particle] += velocityX[particle];
    positionY[particle] += velocityY[particle];
    
    ellipse(positionX[particle], positionY[particle], mass[particle] * 1000, mass[particle] * 1000);
  }
  fill(255);
  text("1.23.2020", 20, height - 20);

  var x = random(0, 1);
  if(x < 0.1) addNewParticle();

  if(mass.length == 200){
    mass = [];
   positionX = [];
  positionY = [];
  velocityX = [];
  velocityY = [];

  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function addNewParticle() {
  mass.push(random(0.003, 0.03));
  positionX.push(random(width));
  positionY.push(random(height));
  velocityX.push(0);
  velocityY.push(0);
}
