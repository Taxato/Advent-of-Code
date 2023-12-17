import { readFileSync } from "fs";
import { create2DArr, log2DArr, loop2DArr, time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day14input.txt", { encoding: "utf8" });
const test = readFileSync("./day14test.txt", { encoding: "utf8" });

function key(grid) {
	return JSON.stringify(grid);
}

function load(grid) {
	let load = 0;
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid.length; x++) {
			if (grid[x][y] === "O") load += grid.length - y;
		}
	}
	return load;
}

function move(grid, dir) {
	const dX = [0, -1, 0, 1][dir];
	const dY = [-1, 0, 1, 0][dir];

	let prevKey = key(grid);
	while (true) {
		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid.length; x++) {
				if (
					x + dX < 0 ||
					x + dX >= grid.length ||
					y + dY < 0 ||
					y + dY >= grid.length
				)
					continue;

				if (grid[x][y] === "O" && grid[x + dX][y + dY] === ".") {
					grid[x + dX][y + dY] = "O";
					grid[x][y] = ".";
				}
			}
		}
		const newKey = key(grid);
		if (newKey === prevKey) break;
		prevKey = newKey;
	}
}

function createGrid(input) {
	input = input.split("\n").map(l => l.split(""));
	const grid = create2DArr(input.length, input.length);

	loop2DArr(grid, (col, row) => {
		grid[col][row] = input[row][col];
	});
	return grid;
}

function partOne(input) {
	const grid = createGrid(input);
	let prevKey = key(grid);

	while (true) {
		move(grid, 0);
		const newKey = key(grid);
		if (newKey === prevKey) break;
		prevKey = newKey;
	}
	return load(grid);
}

function partTwo(input) {
	const grid = createGrid(input);

	const cache = new Set();

	let loop;
	let loopSize = 0;
	let i = 0;
	for (i; i < 1e9; i++) {
		const k = key(grid);
		if (cache.has(k)) {
			if (k == loop) break;
			if (!loopSize) loop = k;
			loopSize++;
		}
		cache.add(k);
		cycle();
	}
	for (let j = 0; j < (1e9 - i) % loopSize; j++) {
		cycle();
	}
	return load(grid);

	function cycle() {
		for (let i = 0; i < 4; i++) move(grid, i);
	}
}

console.log(partOne(input));
console.log(partTwo(input));

time(startTime);
