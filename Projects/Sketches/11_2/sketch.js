

const handle_len_rate = 40;
const maxDistance = 100;
var circlePaths = [];
var connections = [];
var hu = 200;

function setup() {
    createCanvas(600, 600);
    fill(0);
    background(0);
    // noFill();
    // noStroke();
    
    //generate circles
    for (var i = 0; i < 30; i++) {
        circlePaths.push({
            position: createVector(random(width), random(height)),
            radius: i==0 ? 120 : random(100, 120),
            vel: createVector(random(-2, 2), random(-2, 2))
        });
    }
    circlePaths[0].radius = 120;
    colorMode(HSB, 255);
}

function draw() {
    background(200, 10);
    //draw circles
    circlePaths.forEach((circle, index) => {
        with(circle){

            position.add(vel);
            if(position.x > width) position.x = position.x - width;
            else if(position.x < 0) position.x = width - position.x;
            if(position.y > height) position.y = position.y - height;
            else if(position.y < 0) position.y = height - position.y;
        
            stroke(hu + 20, 255, 255);
           // noFill();
           fill(hu, 255, 255, 10);
       // line(position.x,position.y,position.x + 5,position.y + 5)
        }
        hu += .01;
        if (hu > 255) hu = 0;
    })
    
    //generate connections
    connections.length = 0;
    for (var i = 0, l = circlePaths.length; i < l; i++) {
        for (var j = i - 1; j >= 0; j--) {
            var path = metaball(circlePaths[i], circlePaths[j], 0.5, handle_len_rate, maxDistance);
            if (path) {
                connections.push(path);
            }
        }
    }
    
    //draw connections
    connections.forEach(path => {
        beginShape();
        for(var j = 0; j < 4; j++){
            if(j==0) vertex(path.segments[j].x, path.segments[j].y);
            else if(j%2!=0) {
                vertex(path.segments[(j+1)%4].x, path.segments[(j+1)%4].y);
            }
            if(j%2!=0) continue;
            bezierVertex(
                path.segments[j].x+path.handles[j].x, path.segments[j].y+path.handles[j].y,
                path.segments[(j+1)%4].x+path.handles[(j+1)%4].x, path.segments[(j+1)%4].y+path.handles[(j+1)%4].y,
                path.segments[(j+1)%4].x, path.segments[(j+1)%4].y
            );
        }
        endShape();
    })
    fill(0);
    noStroke()
    text("11.2.20", 30, height-30)
}

function metaball(ball1, ball2, v, handle_len_rate, maxDistance) {
    var radius1 = ball1.radius/2;
    var radius2 = ball2.radius/2;
    var center1 = ball1.position;
    var center2 = ball2.position;
    var d = center1.dist(center2);
    var u1 = 0;
    var u2 = 0;
    if (d > maxDistance || d <= abs(radius1 - radius2)) {
        return;
    } else if (d < radius1 + radius2) {
        // case circles are overlapping
        u1 = acos((radius1 * radius1 + d * d - radius2 * radius2) / (2 * radius1 * d));
        u2 = acos((radius2 * radius2 + d * d - radius1 * radius1) / (2 * radius2 * d));
    }
    var angle1 = atan2(center2.y - center1.y, center2.x - center1.x);
    var angle2 = acos((radius1 - radius2) / d);
    var angle1a = angle1 + u1 + (angle2 - u1) * v;
    var angle1b = angle1 - u1 - (angle2 - u1) * v;
    var angle2a = angle1 + PI - u2 - (PI - u2 - angle2) * v;
    var angle2b = angle1 - PI + u2 + (PI - u2 - angle2) * v;
    var p1a = p5.Vector.add(center1, p5.Vector.fromAngle(angle1a, radius1));
    var p1b = p5.Vector.add(center1, p5.Vector.fromAngle(angle1b, radius1));
    var p2a = p5.Vector.add(center2, p5.Vector.fromAngle(angle2a, radius2));
    var p2b = p5.Vector.add(center2, p5.Vector.fromAngle(angle2b, radius2));
    // define handle length by the distance between
    // both ends of the curve to draw
    var d2 = min(v * handle_len_rate, dist(p1a.x, p1a.y, p2a.x, p2a.y) / (radius1 + radius2));
    // case circles are overlapping:
    d2 *= min(1, d * 2 / (radius1 + radius2));
    radius1 *= d2;
    radius2 *= d2;
    var path = {
        segments: [p1a, p2a, p2b, p1b],
        handles: [
            p5.Vector.fromAngle(angle1a - HALF_PI, radius1),
            p5.Vector.fromAngle(angle2a + HALF_PI, radius2),
            p5.Vector.fromAngle(angle2b - HALF_PI, radius2),
            p5.Vector.fromAngle(angle1b + HALF_PI, radius1)
        ]
    };
    return path;
}