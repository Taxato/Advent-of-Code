import { readFileSync } from "fs";
import { create2DArr, loop2DArr, time } from "../../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./input.txt", { encoding: "utf8" });
const test = readFileSync("./test.txt", { encoding: "utf8" });

let data = input;
data = data.replaceAll("\n", "");
const size = Math.sqrt(data.length);
const grid = create2DArr(size, size);

loop2DArr(grid, (col, row) => {
	const index = col + row * size;
	const char = data.charAt(index);
	grid[col][row] = char;
});

let start, end;
for (let x = 0; x < size; x++) {
	if (grid[x][0] === ".") start = [x, 0];
	if (grid[x][size - 1] === ".") end = [x, size - 1];
}

const points = [start, end];

for (let row = 0; row < size; row++) {
	for (let col = 0; col < size; col++) {
		const char = grid[col][row];
		if (char === "#") continue;

		let neighbors = 0;
		for (const [nCol, nRow] of [
			[col + 1, row],
			[col - 1, row],
			[col, row + 1],
			[col, row - 1],
		]) {
			if (
				nCol >= 0 &&
				nCol < size &&
				nRow >= 0 &&
				nRow < size &&
				grid[nCol][nRow] !== "#"
			)
				neighbors++;
		}
		if (neighbors >= 3) points.push([col, row]);
	}
}
const key = (x, y) => x + "/" + y;

const graphWithSlopes = {};
const graphWithoutSlopes = {};
const pointKeys = new Set();
points.forEach(p => {
	const k = key(...p);
	graphWithSlopes[k] = {};
	graphWithoutSlopes[k] = {};
	pointKeys.add(k);
});

const dirs = {
	">": [[1, 0]],
	v: [[0, 1]],
	".": [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1],
	],
};

// Build graph with slopes
for (const [sX, sY] of points) {
	const stack = [[0, sX, sY]];
	const seen = new Set([key(sX, sY)]);

	while (stack.length) {
		const [dst, x, y] = stack.pop();
		if (dst !== 0 && pointKeys.has(key(x, y))) {
			graphWithSlopes[key(sX, sY)][key(x, y)] = dst;
			continue;
		}

		for (const [dX, dY] of dirs[grid[x][y]]) {
			const nX = x + dX;
			const nY = y + dY;

			if (
				nX >= 0 &&
				nX < size &&
				nY >= 0 &&
				nY < size &&
				grid[nX][nY] !== "#" &&
				!seen.has(key(nX, nY))
			) {
				stack.push([dst + 1, nX, nY]);
				seen.add(key(nX, nY));
			}
		}
	}
}

// Build graph without slopes
for (const [sX, sY] of points) {
	const stack = [[0, sX, sY]];
	const seen = new Set([key(sX, sY)]);

	while (stack.length) {
		const [dst, x, y] = stack.pop();
		if (dst !== 0 && pointKeys.has(key(x, y))) {
			graphWithoutSlopes[key(sX, sY)][key(x, y)] = dst;
			continue;
		}

		for (const [nX, nY] of [
			[x + 1, y],
			[x - 1, y],
			[x, y + 1],
			[x, y - 1],
		]) {
			if (
				nX >= 0 &&
				nX < size &&
				nY >= 0 &&
				nY < size &&
				grid[nX][nY] !== "#" &&
				!seen.has(key(nX, nY))
			) {
				stack.push([dst + 1, nX, nY]);
				seen.add(key(nX, nY));
			}
		}
	}
}

function longestPath(graph, start) {
	const seen = new Set();
	function dfs(p) {
		const [x, y] = p.split("/").map(Number);

		if (p === key(...end)) return 0;

		let max = -Infinity;

		seen.add(p);
		for (const nx of Object.keys(graph[key(x, y)])) {
			if (seen.has(nx)) continue;

			max = Math.max(max, dfs(nx) + graph[key(x, y)][nx]);
		}
		seen.delete(p);

		return max;
	}
	return dfs(key(...start));
}

console.log(longestPath(graphWithSlopes, start));
console.log(longestPath(graphWithoutSlopes, start));

time(startTime);
