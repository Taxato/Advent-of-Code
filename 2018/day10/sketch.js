let test, input;
let points = [];

class Point {
	size = 4;

	constructor(str) {
		const [x, y, vX, vY] = str.match(/[\d-]+/g).map(Number);

		this.pos = createVector(x, y);
		this.vel = createVector(vX, vY);

		// console.log(this.pos, this.vel);
	}

	draw() {
		stroke(255);
		fill(255);
		rect(
			// map(this.pos.x, -50000, 50000, -width / 2, width / 2),
			// map(this.pos.y, -50000, 50000, -height / 2, height / 2),
			this.pos.x * this.size,
			this.pos.y * this.size,
			this.size
		);
	}

	update() {
		this.pos.add(this.vel);
	}
}

function preload() {
	test = loadStrings("./test.txt");
	input = loadStrings("./input.txt");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(1);

	for (const row of input) {
		points.push(new Point(row));
	}

	for (const p of points) {
		for (let i = 0; i < 10076; i++) {
			p.update();
		}
	}
}

function draw() {
	// translate(width / 2, height / 2);
	background(0);

	for (const p of points) {
		// p.update();
		p.draw();
	}
	noLoop();
}
