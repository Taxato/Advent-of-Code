import { readFileSync } from "fs";
import { create2DArr, loop2DArr, time } from "../../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./input.txt", { encoding: "utf8" });
const test = readFileSync("./test.txt", { encoding: "utf8" });

let data = input;
data = data.replaceAll("\n", "");
const size = Math.sqrt(data.length);
const grid = create2DArr(size, size);
let start;

loop2DArr(grid, (col, row) => {
	const index = col + row * size;
	const char = data.charAt(index);
	if (char === "S") start = { x: col, y: row };
	grid[col][row] = char;
});

function fillGrid(sX, sY, steps) {
	const valid = new Set();
	const visited = new Set([sX + "/" + sY]);

	const queue = [[sX, sY, steps]];
	while (queue.length) {
		const [x, y, steps] = queue.shift();

		if (steps % 2 === 0) valid.add(x + "/" + y);
		if (steps === 0) continue;

		for (const [nX, nY] of [
			[x + 1, y],
			[x - 1, y],
			[x, y + 1],
			[x, y - 1],
		]) {
			if (
				nX < 0 ||
				nX >= size ||
				nY < 0 ||
				nY >= size ||
				grid[nX][nY] === "#" ||
				visited.has(nX + "/" + nY)
			)
				continue;

			visited.add(nX + "/" + nY);
			queue.push([nX, nY, steps - 1]);
		}
	}
	return valid.size;
}

// console.log("Part one:", fillGrid(start.x,start.y, 64));

const steps = 26501365;
const gridWidth = Math.floor(steps / size) - 1;

const odd = (Math.floor(gridWidth / 2) * 2 + 1) ** 2;
const even = (Math.floor((gridWidth + 1) / 2) * 2) ** 2;

const oddPoints = fillGrid(start.x, start.y, size * 2 + 1);
const evenPoints = fillGrid(start.x, start.y, size * 2);

const cornerT = fillGrid(start.x, size - 1, size - 1);
const cornerR = fillGrid(size - 1, start.y, size - 1);
const cornerB = fillGrid(start.x, 0, size - 1);
const cornerL = fillGrid(0, start.y, size - 1);

const half = Math.floor(size / 2);

const smallTL = fillGrid(size - 1, size - 1, half - 1);
const smallTR = fillGrid(0, size - 1, half - 1);
const smallBR = fillGrid(0, 0, half - 1);
const smallBL = fillGrid(size - 1, 0, half - 1);

const bigTL = fillGrid(size - 1, size - 1, size + half - 1);
const bigTR = fillGrid(0, size - 1, size + half - 1);
const bigBR = fillGrid(0, 0, size + half - 1);
const bigBL = fillGrid(size - 1, 0, size + half - 1);

console.log(
	odd * oddPoints +
		even * evenPoints +
		cornerT +
		cornerB +
		cornerL +
		cornerR +
		(gridWidth + 1) * (smallTL + smallTR + smallBL + smallBR) +
		gridWidth * (bigTL + bigTR + bigBR + bigBL)
);

time(startTime);

// Shoutout/credit to HyperNeutrino, wouldnt have been able to solve without help.
// https://www.youtube.com/watch?v=9UOMZSL0JTg
