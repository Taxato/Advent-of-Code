import { create2DArr, loop2DArr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day24input as input } from "./inputs.js";

const map = create2DArr(input[0].length, input.length);
let pointsOfInterest = [];
loop2DArr(map, (x, y) => {
	const val = input[y][x];
	if (!isNaN(+val)) pointsOfInterest.push({ x, y, num: +val });
	map[x][y] = val;
});
pointsOfInterest = pointsOfInterest.sort((a, b) => a.num - b.num);

function dstBetweenPoints(map, pointA, pointB) {
	const queue = [pointA];
	const visited = new Set([pointA]);

	while (queue.length) {
		const pos = queue.shift();
	}

	function getNeighbors(map, x, y) {
		const neighbors = [];
		for (const dir of [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0],
		]) {
			const newX = x + dir[0];
			const newY = y + dir[1];

			if (
				newX < 0 ||
				newX > map.length ||
				newY < 0 ||
				newY > map[0].length ||
				map[x][y] === "#"
			)
				continue;

			neighbors.push({ x: newX, y: newY });
		}
		return neighbors;
	}
}

const endTime = Date.now();
timeUsed(startTime, endTime);
