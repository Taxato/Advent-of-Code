import {
	create2DArr,
	log2DArr,
	loop2DArr,
	manhattanDist,
	minInArr,
	timeUsed,
} from "../helper.js";
const startTime = Date.now();

import { day6input as input } from "./inputs.js";
// const input = [
// 	[1, 1],
// 	[1, 6],
// 	[8, 3],
// 	[3, 4],
// 	[5, 5],
// 	[8, 9],
// ];

const coords = input.map((pos, i) => ({ i, x: pos[0], y: pos[1] }));

const grid = create2DArr(2000, 2000);

// for (const point of coords) {
// 	grid[point.x][point.y] = point.i;
// }

function closestPoint(pos) {
	let allDsts = [];
	let shortestDst = Infinity;
	let closestPoint;

	coords.forEach(point => {
		const dst = manhattanDist(pos, point);
		if (dst < shortestDst) {
			shortestDst = dst;
			closestPoint = point;
		}
		allDsts.push({ point: point.i, dst });
	});

	let duplicates = false;
	for (let i = 0; i < allDsts.length; i++) {
		for (let j = 0; j < allDsts.length; j++) {
			if (i === j) continue;
			if (allDsts[i].dst === allDsts[j].dst) duplicates = true;
		}
	}

	return duplicates ? "." : closestPoint.i;
}

loop2DArr(grid, (x, y) => {
	grid[x][y] = closestPoint({ x, y });
});

// log2DArr(grid, true);

let areas = {};
for (const point of grid.flat()) {
	if (!(point in areas)) areas[point] = 1;
	else areas[point]++;
}
const sortedAreas = Object.entries(areas).sort((a, b) => b[1] - a[1]);
console.log(sortedAreas);

console.log("Part one:");

const endTime = Date.now();
timeUsed(startTime, endTime);

[
	[".", 958733],
	["5", 16967],
	["16", 15286],
	["12", 2514],
	["8", 2191],
	["0", 765],
	["29", 389],
	["9", 380],
	["39", 305],
	["30", 260],
	["17", 258],
	["24", 243],
	["14", 228],
	["22", 146],
	["11", 137],
	["1", 134],
	["47", 114],
	["27", 106],
	["26", 98],
	["13", 96],
	["44", 96],
	["41", 88],
	["6", 87],
	["10", 77],
	["31", 68],
	["33", 58],
	["25", 44],
	["43", 41],
	["7", 37],
	["32", 22],
	["3", 18],
	["15", 12],
	["40", 2],
];

[
	[".", 2180733],
	["5", 29967],
	["16", 26786],
	["12", 4014],
	["8", 3691],
	["0", 1265],
	["29", 389],
	["9", 380],
	["39", 305],
	["30", 260],
	["17", 258],
	["24", 243],
	["14", 228],
	["22", 146],
	["11", 137],
	["1", 134],
	["47", 114],
	["27", 106],
	["26", 98],
	["13", 96],
	["44", 96],
	["41", 88],
	["6", 87],
	["10", 77],
	["31", 68],
	["33", 58],
	["25", 44],
	["43", 41],
	["7", 37],
	["32", 22],
	["3", 18],
	["15", 12],
	["40", 2],
];

[
	[".", 3902733],
	["5", 42967],
	["16", 38286],
	["12", 5514],
	["8", 5191],
	["0", 1765],
	["29", 389],
	["9", 380],
	["39", 305],
	["30", 260],
	["17", 258],
	["24", 243],
	["14", 228],
	["22", 146],
	["11", 137],
	["1", 134],
	["47", 114],
	["27", 106],
	["26", 98],
	["13", 96],
	["44", 96],
	["41", 88],
	["6", 87],
	["10", 77],
	["31", 68],
	["33", 58],
	["25", 44],
	["43", 41],
	["7", 37],
	["32", 22],
	["3", 18],
	["15", 12],
	["40", 2],
];
