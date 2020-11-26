// This picture started as a spiral
// Moving points at every fixed angle on the spiral
// (Using noise() to move them)
// Contact each point with a line

// t:timer
// r:number of rotations of spirals

// >>   for(i=0;i<TAU*r;i+=TAU/36){

// TAU/36 // 36:keepng symmetry in multiples of 12

// >>n=noise(cos(i*3),sin(i*3)*k+t)*.7

// Try something different

// cos(i*3),sin(i*2)
// cos(i/2),sin(i*2)
    
r=99
t=0

function setup(){
    createCanvas(600, 600)
}

function draw(){
    t+=.02
    beginShape()
        background(200, 100, 30)
    fill(120, 100, 30);
    for(i=0;i<TAU*r;i+=TAU/36){
        k=map(i/TAU,0,r,1,30/height)
        n=noise(cos(i*3),sin(i*3)*k+t)*.7
        curveVertex(cos(i)*width*n*k+height - width/2,sin(i)*width*n*k+height - height/2)
    }
    endShape()

    fill(0);
    text("10.25.20", 30, height-30);
}