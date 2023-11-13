import { manhattanDist, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day3input as input } from "./inputs.js";

class Spiral {
	squares = {};

	addSquare(square) {
		squares[square.hash] = square;
	}
}

class Square {
	constructor(pos, index, val) {
		this.pos = { ...pos };
		this.index = index;
		this.val = val;
	}

	get hash() {
		return this.pos.x + "/" + this.pos.y;
	}
}

function calcCoords(num) {
	const pos = { x: 0, y: 0 };
	const dirs = ["right", "up", "left", "down"];

	let numSteps = 1;
	let dirIndex = 0;

	for (let step = 1; step < num; step++) {
		let dir = dirs[dirIndex % dirs.length];
		if (step % numSteps === 0) {
			dirIndex++;
			if (dirIndex % 2 === 0) numSteps++;
		}
		switch (dir) {
			case "right":
				pos.x += 1;
				break;
			case "up":
				pos.y += 1;
				break;
			case "left":
				pos.x -= 1;
				break;
			case "down":
				pos.y -= 1;
				break;
		}
	}
	return pos;
}

function sumSpiral() {
	let num = 0;

	const curPos = { x: 0, y: 0 };
	const dirs = ["right", "up", "left", "down"];

	let numSteps = 1;
	let dirIndex = 0;

	for (let step = 1; step < num; step++) {
		let dir = dirs[dirIndex % dirs.length];
		if (step % numSteps === 0) {
			dirIndex++;
			if (dirIndex % 2 === 0) numSteps++;
		}
		switch (dir) {
			case "right":
				pos.x += 1;
				break;
			case "up":
				pos.y += 1;
				break;
			case "left":
				pos.x -= 1;
				break;
			case "down":
				pos.y -= 1;
				break;
		}
	}
	return pos;

	if (num > input) return num;
}

const partOne = manhattanDist(calcCoords(input));
console.log("Part one:", partOne);
console.log("Part two:", sumSpiral());

const endTime = Date.now();
timeUsed(startTime, endTime);
