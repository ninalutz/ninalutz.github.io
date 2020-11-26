var circle_size = 40;

function setup() {
    createCanvas(600, 600);
    background(0)
}

function draw() {
    background(10, 20);
    for (var x = 0; x < width + circle_size; x+=circle_size*2) {
        for (var y = 0; y < height + circle_size; y+=circle_size*2) {
            var delta = sin(radians(dist(x, y, sin(radians(x))*width, cos(radians(y))*height)-frameCount*4))*circle_size;
            if(dist(x, y, width/2, height/2) < width){
                fill(0);
                noStroke();
                ellipse(x, y, 50, 50)
                strokeWeight(0.4)
                stroke(255, 100, 50);
                noFill();
                ellipse(x - delta, y - delta, width/2, height/2);
            }
        }
    }
}

