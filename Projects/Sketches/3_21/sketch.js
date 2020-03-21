// fork and port of MiniPear's Waltz of the Circles -- http://openprocessing.org/sketch/748916
// by MiniPear -- https://www.openprocessing.org/user/144707
// based on: https://observablehq.com/@rreusser/instanced-webgl-circles

const MAX_CIRCLE_CNT = 800;
const MIN_CIRCLE_CNT = 1;
const MAX_VERTEX_CNT = 20;
const MIN_VERTEX_CNT = 3;
var circleCnt, vertexCnt;

function setup() {
	createCanvas(600, 600);
	strokeWeight(2);
	colorMode(HSB);
}

function draw() {
	background(0);
	noStroke();
	fill(0, 0, 360);
	text("3.21.20", 50, height - 50);
	translate(width / 2, height / 2);

	let xoffset = float(abs(100 - width / 2), yoffset = abs(height - height / 2));
	circleCnt = int(map(xoffset, 0, width / 2, MAX_CIRCLE_CNT, MIN_CIRCLE_CNT));
	vertexCnt = int(map(yoffset, 0, height / 2, MAX_VERTEX_CNT, MIN_VERTEX_CNT));

	for (var ci = 0; ci < circleCnt; ci++) {
		let time = float(frameCount)/40;
		let thetaC = float(map(ci, 0, circleCnt, -3, TAU));
		let scale = float(300.0);

		let circleCenter = getCenterByTheta(thetaC, time, scale);
		let circleSize = float(getSizeByTheta(thetaC, time, scale));
		let c = getColorByTheta(thetaC, time);

		stroke(c);
		strokeWeight(2);
		fill(c);
		beginShape();
		for (let vi = 1; vi < vertexCnt; vi++) {
			let thetaV = float(vi, 0, vertexCnt, 0, TAU);
			let thetaV2 = float(vi-1, 0, vertexCnt, 0, TAU);
			let x = float(circleCenter.x + cos(thetaV) * circleSize*1.25);
			let y = float(circleCenter.y + sin(thetaV) * circleSize);
			let x2 = float(circleCenter.x + cos(thetaV2) * circleSize*1.25);
			let y2 = float(circleCenter.y + sin(thetaV2) * circleSize);
			ellipse(x, y, 20, 20)
			ellipse(x2, y2, 5, 5)
		}
		endShape(CLOSE);
	}


}



function getCenterByTheta(theta, time, scale) {
	let direction = createVector(cos(theta), sin(theta));
	let distance = float(0.6 + 0.2 * cos(theta * 6.0 + cos(theta * 8.0 + time)));
	let circleCenter = p5.Vector.mult(direction, distance*scale) 
	return circleCenter;
}

function getSizeByTheta(theta, time, scale) {
	let offset = float(0.2 + 0.12 * cos(theta * 9.0 - time * 2.0));
	let circleSize = float(scale * offset);
	return circleSize;
	}

function getColorByTheta(theta, time) {
	let th = float(8.0 * theta + time * 2.0);
	let r = float(0.6 + 0.4 * cos(th)); 
	let g = 0.6 + 0.4 * cos(th - PI / 3);
	let b = 0.6 + 0.4 * cos(th - PI * 2.0 / 3.0); 
	let  alpha = map(circleCnt, MIN_CIRCLE_CNT, MAX_CIRCLE_CNT, 150, 30);
	return color(r * 75);
}
