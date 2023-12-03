import { create2DArr, loop2DArr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day3input as input } from "./inputs.js";

const grid = create2DArr(input.length, input[0].length);
const numGrid = create2DArr(input.length, input[0].length, ".");

function getNeighbors(grid, pos) {
	const neighbors = [];

	for (const dir of [
		{ x: -1, y: -1 },
		{ x: 0, y: -1 },
		{ x: 1, y: -1 },
		{ x: -1, y: 0 },
		{ x: 1, y: 0 },
		{ x: -1, y: 1 },
		{ x: 0, y: 1 },
		{ x: 1, y: 1 },
	]) {
		const nX = pos.x + dir.x;
		const nY = pos.y + dir.y;

		if (nX < 0 || nX >= grid.length || nY < 0 || nY >= grid[0].length)
			neighbors.push(null);
		else neighbors.push(grid[nX][nY]);
	}
	return neighbors;
}

function getFullNumber(firstPos) {
	let num = [];
	for (let xOff = firstPos.x; xOff < grid.length; xOff++) {
		if (/\d/.test(grid[xOff][firstPos.y])) num.push(grid[xOff][firstPos.y]);
		else break;
	}
	return +num.join("");
}

loop2DArr(grid, (col, row) => {
	grid[col][row] = input[row][col];
});

let partOne = 0;
for (let y = 0; y < grid[0].length; y++) {
	for (let x = 0; x < grid.length; x++) {
		if (/\d/.test(grid[x][y])) {
			const partNum = getFullNumber({ x, y });
			let valid = false;
			for (let pX = x; pX < x + (partNum + "").length; pX++) {
				numGrid[pX][y] = partNum;
				if (
					getNeighbors(grid, { x: pX, y }).some(
						n => n !== null && /[^\d\.]/.test(n)
					)
				)
					valid = true;
			}
			if (valid) partOne += partNum;
			x += (partNum + "").length;
		} else numGrid[x][y] = grid[x][y];
	}
}

let partTwo = 0;
for (let y = 0; y < grid[0].length; y++) {
	for (let x = 0; x < grid.length; x++) {
		if (grid[x][y] === "*") {
			const numberNeighbors = [
				...new Set(
					getNeighbors(numGrid, { x, y }).filter(
						n => !isNaN(+n) && n !== 0
					)
				),
			];
			if (numberNeighbors.length === 2) {
				partTwo += numberNeighbors[0] * numberNeighbors[1];
			}
		}
	}
}

console.log("Part one:", partOne);
console.log("Part two:", partTwo);

const endTime = Date.now();
timeUsed(startTime, endTime);
