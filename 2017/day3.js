import { manhattanDist, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day3input as input } from "./inputs.js";

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

function sumSpiral(target) {
	const spiral = {};
	let curVal = 1;
	const curPos = { x: 0, y: 0 };
	const dirs = ["right", "up", "left", "down"];

	let numSteps = 1;
	let dirIndex = 0;

	spiral[hash(curPos)] = curVal;

	let step = 0;
	while (true) {
		step++;

		let dir = dirs[dirIndex % dirs.length];
		if (step % numSteps === 0) {
			dirIndex++;
			if (dirIndex % 2 === 0) numSteps++;
		}
		switch (dir) {
			case "right":
				curPos.x += 1;
				break;
			case "up":
				curPos.y += 1;
				break;
			case "left":
				curPos.x -= 1;
				break;
			case "down":
				curPos.y -= 1;
				break;
		}

		curVal = getSumOfNeighbors(curPos);
		spiral[hash(curPos)] = curVal;

		if (curVal > target) return curVal;
	}

	function hash(pos) {
		return `${pos.x}/${pos.y}`;
	}
	function getSumOfNeighbors(pos) {
		let sum = 0;
		for (const n of [
			[-1, -1],
			[0, -1],
			[1, -1],
			[-1, 0],
			[1, 0],
			[-1, 1],
			[0, 1],
			[1, 1],
		]) {
			const [xOff, yOff] = n;
			const nPos = { x: pos.x + xOff, y: pos.y + yOff };
			if (spiral[hash(nPos)]) sum += spiral[hash(nPos)];
		}
		return sum;
	}
}

console.log("Part one:", manhattanDist(calcCoords(input)));
console.log("Part two:", sumSpiral(input));

const endTime = Date.now();
timeUsed(startTime, endTime);
