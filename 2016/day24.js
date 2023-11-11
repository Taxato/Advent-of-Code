import {
	combinations,
	create2DArr,
	loop2DArr,
	permutations,
	timeUsed,
} from "../helper.js";
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

function dstBetweenPoints(map, start, goal) {
	const queue = [start];
	const visited = new Set([hashPos(start)]);

	while (queue.length) {
		const pos = { steps: 0, ...queue.shift() };

		if (pos.x === goal.x && pos.y === goal.y) {
			return pos.steps;
		}

		for (const neighbor of getNeighbors(map, pos)) {
			if (visited.has(hashPos(neighbor))) continue;
			else {
				visited.add(hashPos(neighbor));
				queue.push({ ...neighbor, steps: pos.steps + 1 });
			}
		}
	}

	function getNeighbors(map, { x, y }) {
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
				newX >= 0 &&
				newX < map.length &&
				newY >= 0 &&
				newY < map[0].length &&
				map[newX][newY] !== "#"
			) {
				neighbors.push({ x: newX, y: newY });
			} else continue;
		}
		return neighbors;
	}

	function hashPos(pos) {
		return `${pos.x}/${pos.y}`;
	}
}

function shortestPath(map, pointsOfInterest) {
	const allDistances = {};

	for (const pair of combinations(pointsOfInterest, 2)) {
		const [a, b] = pair;

		const dst = dstBetweenPoints(map, a, b);

		const key = `${a.num}/${b.num}`;
		const reverseKey = `${b.num}/${a.num}`;
		allDistances[key] = dst;
		allDistances[reverseKey] = dst;
	}

	let shortestDst = Infinity;

	for (const perm of permutations(pointsOfInterest.slice(1))) {
		const points = [pointsOfInterest[0], ...perm];

		let totalDst = 0;
		for (let i = 0; i < perm.length; i++) {
			totalDst += allDistances[`${points[i].num}/${points[i + 1].num}`];
		}
		shortestDst = Math.min(shortestDst, totalDst);
	}
	return shortestDst;
}

function shortestPathReturnToStart(map, pointsOfInterest) {
	const allDistances = {};

	for (const pair of combinations(pointsOfInterest, 2)) {
		const [a, b] = pair;

		const dst = dstBetweenPoints(map, a, b);

		const key = `${a.num}/${b.num}`;
		const reverseKey = `${b.num}/${a.num}`;
		allDistances[key] = dst;
		allDistances[reverseKey] = dst;
	}

	let shortestDst = Infinity;

	for (const perm of permutations(pointsOfInterest.slice(1))) {
		const points = [pointsOfInterest[0], ...perm];

		let totalDst = 0;
		for (let i = 0; i < perm.length; i++) {
			totalDst += allDistances[`${points[i].num}/${points[i + 1].num}`];
		}
		totalDst += allDistances[`${points.at(-1).num}/0`];
		shortestDst = Math.min(shortestDst, totalDst);
	}
	return shortestDst;
}

console.log("Part one:", shortestPath(map, pointsOfInterest));
console.log("Part two:", shortestPathReturnToStart(map, pointsOfInterest));

const endTime = Date.now();
timeUsed(startTime, endTime);
