let input;
let test;
let data;

let grid;
let scale;

let beams = [];
const energized = new Set();
const dupeBeams = new Set();
let maxEnergized = 0;

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

function preload() {
	input = loadStrings("input.txt");
	test = loadStrings("test.txt");

	data = input;
}

class Beam {
	dead = false;
	constructor(pos, dir) {
		this.pos = createVector(...pos);
		this.prevPos = this.pos.copy();
		this.dir = dir;
	}

	update() {
		if (this.dead) return;

		energized.add(this.pos.toString());

		const char = grid[this.pos.y][this.pos.x];

		switch (this.dir) {
			case UP:
				if (char === "/") this.dir = RIGHT;
				else if (char === "\\") this.dir = LEFT;
				else if (char === "-") {
					this.dir = LEFT;
					beams.push(new Beam(this.pos.array(), RIGHT));
				}
				break;
			case RIGHT:
				if (char === "/") this.dir = UP;
				else if (char === "\\") this.dir = DOWN;
				else if (char === "|") {
					this.dir = UP;
					beams.push(new Beam(this.pos.array(), DOWN));
				}
				break;
			case DOWN:
				if (char === "/") this.dir = LEFT;
				else if (char === "\\") this.dir = RIGHT;
				else if (char === "-") {
					this.dir = LEFT;
					beams.push(new Beam(this.pos.array(), RIGHT));
				}
				break;
			case LEFT:
				if (char === "/") this.dir = DOWN;
				else if (char === "\\") this.dir = UP;
				else if (char === "|") {
					this.dir = UP;
					beams.push(new Beam(this.pos.array(), DOWN));
				}
				break;
		}

		const vel = createVector(
			[0, 1, 0, -1][this.dir],
			[-1, 0, 1, 0][this.dir]
		);

		this.prevPos = createVector(this.pos.x, this.pos.y);
		this.pos.add(vel);
		if (
			this.pos.x < 0 ||
			this.pos.x >= grid.length ||
			this.pos.y < 0 ||
			this.pos.y >= grid.length
		)
			this.dead = true;

		if (dupeBeams.has(this.hash)) this.dead = true;
		else dupeBeams.add(this.hash);
	}

	get hash() {
		return this.pos.toString() + "/" + this.dir;
	}

	show() {
		// translate(100, 100);
		stroke(255, 0, 0);
		strokeWeight(2);
		line(
			this.prevPos.x * scale + scale / 2,
			this.prevPos.y * scale + scale / 2,
			this.pos.x * scale + scale / 2,
			this.pos.y * scale + scale / 2
		);
	}
}

function setup() {
	createCanvas(1200, 1200);
	background(0);
	const rows = Array.from({ length: data.length }, (_, i) => data[i]);
	grid = rows.map(r => r.split(""));
	scale = (width - 200) / grid.length;
	// translate(100, 100);

	stroke(255);
	strokeWeight(4);
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid.length; x++) {
			switch (grid[y][x]) {
				case "|":
					line(
						x * scale + scale / 2,
						y * scale,
						x * scale + scale / 2,
						y * scale + scale
					);
					break;
				case "-":
					line(
						x * scale,
						y * scale + scale / 2,
						x * scale + scale,
						y * scale + scale / 2
					);
					break;
				case "/":
					line(
						x * scale,
						y * scale + scale,
						x * scale + scale,
						y * scale
					);
					break;
				case "\\":
					line(
						x * scale + scale,
						y * scale + scale,
						x * scale,
						y * scale
					);
					break;
			}
		}
	}

	partOneSetup();
	// frameRate(5);
}

function draw() {
	partOneDraw();
}

function partOneSetup() {
	beams.push(new Beam([0, 0], RIGHT));
}
function partOneDraw() {
	for (const b of beams) {
		b.update();
		b.show();
	}
	if (beams.every(b => b.dead)) {
		noLoop();
		console.log(energized.size);
	}
}

function partTwo() {
	// LEFT TO RIGHT
	for (let i = 0; i < grid.length; i++) {
		shootBeam([0, i], RIGHT);
	}
	// RIGHT TO LEFT
	for (let i = 0; i < grid.length; i++) {
		shootBeam([grid.length - 1, i], LEFT);
	}
	// TOP TO BOTTOM
	for (let i = 0; i < grid.length; i++) {
		shootBeam([i, 0], DOWN);
	}
	// BOTTOM TO TOP
	for (let i = 0; i < grid.length; i++) {
		shootBeam([i, grid.length - 1], UP);
	}
	noLoop();
	console.log(maxEnergized);
}

function shootBeam(pos, dir) {
	beams.push(new Beam(pos, dir));
	do {
		for (const b of beams) {
			b.update();
			// b.show();
		}
	} while (beams.some(b => !b.dead));
	if (energized.size > maxEnergized) maxEnergized = energized.size;
	energized.clear();
	dupeBeams.clear();
}
