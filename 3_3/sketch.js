//Mod of mslijkhuis curl noise
// Resources:
// Kniss and Hart - Volume effects: modeling smoke, fire, and clouds - presentation: https://slideplayer.com/slide/5058681/
// Bridson - Curl-Noise for Procedural Fluid Flow - paper: https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf presentation: https://www.youtube.com/watch?v=K7ObYXr1egg

var detail = 0.05; // How small the details in the noise should be (making it too small will cause stability issues due to potentially dropping below the continuity threshold for the curl calculation)
var pot_scale = 20; // Scale the potential and with it the max. speed of the particles
var dx = .0001; // Half the step size for the finite difference derivative approx.
var view_scale = 7; // Scale the whole thing

var nx = 100; // x resolution of the velocity field
var ny = 100; // y resolution of the velocity field
var vel = []; // velocity field array
var particles = []; // particle array
var num_particles = 400; // number of particles

function setup() {
  createCanvas(600, 600);
  background(0);
  loadPixels();
  
  // Init the velocity field
  for (var i=0; i<nx*ny; ++i) {
    vel[i] = {"x": 0, "y": 0};
  }
  // Generate the particles
  seed_particles(particles, num_particles);
}

// Randomly distribute particles in a disk shape
//==================================================================================================
function seed_particles(parts, num) {
  var center_x = nx / 2;
  var center_y = ny / 2;
  var radius = min(nx / 2, ny / 2);
  for (var p=0; p<num; ++p) {
    var rangle = random() * TWO_PI;
    var rdist = random() * radius;
    parts[p] = {"x": center_x + cos(rangle) * rdist, "y": center_y + sin(rangle) * rdist, "len": 0};
    parts[p].px = parts[p].x;
    parts[p].py = parts[p].y;
  }
}

// Calculate the potential at a point in 2D space and time (in this case just some 2D perlin noise)
//==================================================================================================
// It's scaled relative to the distance from the center to keep particles from flying out
//--------------------------------------------------------------------------------------------------
function get_potential(x, y, res_x, res_y, time) {
  var distmult = pow(1 / (min(res_x, res_y)/2), 2);
  var dist_center = max(1 - (pow(x - res_x/2, 2) + pow(y - res_y/2, 2)) * distmult, 0);
  return (noise(x*detail, y*detail, time) * 2 - 1) * pot_scale * dist_center;
}

// Calculate the velocity from the curl of the potential
//==================================================================================================
// Basically it gives a vector perpendicular to the gradient.
//This makes the particles flow alongside each other indefinitely (aka divergence free) and not all ending up lumped together (which is what happens when you use noise as the velocity directly)
// It's really just a combination of a 2D cross product (-y,x) (perpendicular) and a finite difference ((x-dx) - (x+dx)) approx. of the derivative (gradient)
//--------------------------------------------------------------------------------------------------
function vel_from_pot(vel_arr, res_x, res_y) {
  var time = frameCount * 0.005;
  for (var y=1; y<res_y-1; ++y) {
    for (var x=1; x<res_x-1; ++x) {
      vel_arr[IX(x,y)] = {"x": -(get_potential(x,y+dx, res_x, res_y, time) - get_potential(x,y-dx, res_x, res_y, time)) / (2*dx), 
                          "y":  (get_potential(x+dx,y, res_x, res_y, time) - get_potential(x-dx,y, res_x, res_y, time)) / (2*dx)};
    }
  }
}

// Update the velocity field, advect the particles through it and draw them
//==================================================================================================
function draw() {
  // Update  velocities
  vel_from_pot(vel, nx, ny);
  // Fade effect for the trails
  fill(0, 0, 0, 1);
  noStroke();
  rect(0,0,width,height);
  // Loop through the particles
  for (var p=0; p<num_particles; ++p) {
    // Advect the particle through the velocity field
    advect_particle(particles[p], vel, nx, ny);
    // Calculate a nice stroke color and weight based on the velocity of the particle
    stroke(255);
    strokeWeight(particles[p].len * 3);
    // Draw a line between the previous position and the new position
    line(particles[p].px * view_scale, particles[p].py * view_scale, particles[p].x * view_scale, particles[p].y * view_scale);
    // Set the previous position to the new position
    particles[p].px = particles[p].x;
    particles[p].py = particles[p].y;
  }
  noStroke();
  fill(255);
  text("3.3.20", 30, height - 30);
}


function IX(x, y) {
  return x + y * nx;
}

// Bilinear sampling of a 2D field of 2D vectors
//==================================================================================================
function sample_2d(arr, x, y, res_x, res_y) {
  x = min(max(x, 0), res_x-2);
  y = min(max(y, 0), res_y-2);
  var ix = floor(x);
  var iy = floor(y);
  var s0 = arr[IX(ix,   iy  )];
  var s1 = arr[IX(ix+1, iy  )];
  var s2 = arr[IX(ix,   iy+1)];
  var s3 = arr[IX(ix+1, iy+1)];
  var tx = x - ix;
  var ty = y - iy;
  var sx0 = {"x": s0.x + (s1.x - s0.x) * tx, "y": s0.y + (s1.y - s0.y) * tx};
  var sx1 = {"x": s2.x + (s3.x - s2.x) * tx, "y": s2.y + (s3.y - s2.y) * tx};
  return {"x": sx0.x + (sx1.x - sx0.x) * ty, "y": sx0.y + (sx1.y - sx0.y) * ty};
}

// 3rd order Runge-Kutta particle advection (probably a bit overkill but I already had it)
//==================================================================================================
function advect_particle(p, vel_arr, res_x, res_y) {
  var h = 0.1;
  var steps = 1 / h;
  var ox = p.x;
  var oy = p.y;
  // RK3
  var k1, k2, k3, tx, ty;
  for (var s = 0; s < steps; ++s) {
    k1 = sample_2d(vel_arr, p.x, p.y, res_x, res_y);
    tx = p.x + k1.x * 0.5 * h;
    ty = p.y + k1.y * 0.5 * h;
    k2 = sample_2d(vel_arr, tx, ty, res_x, res_y);
    tx = tx + k2.x * 2.0 * h;
    ty = ty + k2.y * 2.0 * h;
    k3 = sample_2d(vel_arr, tx, ty, res_x, res_y);
    p.x += k3.x * h;
    p.y += k3.y * h;
  }
  
  p.len = sqrt(pow(p.x-ox,2) + pow(p.y-oy,2));
  
  if (p.x < 1) p.x = 1;
  if (p.x > width-2) p.x = width-2;
  if (p.y < 1) p.y = 1;
  if (p.y > height-2) p.y = height-2;
}