import { readFileSync } from "fs";
import { create2DArr, log2DArr, loop2DArr, time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day14input.txt", { encoding: "utf8" });
const test = readFileSync("./day14test.txt", { encoding: "utf8" });

function partOne(input) {
	input = input.split("\n").map(l => l.split(""));
	const grid = create2DArr(input.length, input.length);

	loop2DArr(grid, (col, row) => {
		grid[col][row] = input[row][col];
	});

	const key = grid => grid.flat().join("");

	let prevKey = key(grid);

	while (true) {
		moveNorth();
		const newKey = key(grid);
		if (newKey === prevKey) break;
		prevKey = newKey;
	}
	// log2DArr(grid, true);
	return load(grid);
	function moveNorth() {
		for (let y = 1; y < grid.length; y++) {
			for (let x = 0; x < grid.length; x++) {
				const char = grid[x][y];
				const above = grid[x][y - 1];

				if (char === "O" && above === ".") {
					grid[x][y - 1] = "O";
					grid[x][y] = ".";
				}
			}
		}
	}

	function load() {
		let load = 0;
		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid.length; x++) {
				if (grid[x][y] === "O") load += grid.length - y;
			}
		}
		return load;
	}
}

function partTwo(input) {
	input = input.split("\n").map(l => l.split(""));
	const grid = create2DArr(input.length, input.length);

	loop2DArr(grid, (col, row) => {
		grid[col][row] = input[row][col];
	});

	function key() {
		return JSON.stringify(grid);
	}

	const cache = new Set();

	let loop;
	let loopSize = 0;
	let i = 0;
	for (i; i < 1e9; i++) {
		const k = key();
		if (cache.has(k)) {
			if (k == loop) break;
			if (!loopSize) loop = k;
			loopSize++;
			// continue;
			// console.log(k);
		}
		cache.add(k);
		cycle();
	}
	for (let j = 0; j < (1e9 - i) % loopSize; j++) {
		cycle();
	}
	return load();

	function cycle() {
		moveNorth();
		moveWest();
		moveSouth();
		moveEast();
	}

	function moveNorth() {
		let prevKey = key();
		while (true) {
			for (let y = 1; y < grid.length; y++) {
				for (let x = 0; x < grid.length; x++) {
					const char = grid[x][y];
					const above = grid[x][y - 1];

					if (char === "O" && above === ".") {
						grid[x][y - 1] = "O";
						grid[x][y] = ".";
					}
				}
			}
			const newKey = key();
			if (newKey === prevKey) break;
			prevKey = newKey;
		}
	}
	function moveEast() {
		let prevKey = key();
		while (true) {
			for (let y = 0; y < grid.length; y++) {
				for (let x = 0; x < grid.length - 1; x++) {
					const char = grid[x][y];
					const right = grid[x + 1][y];

					if (char === "O" && right === ".") {
						grid[x + 1][y] = "O";
						grid[x][y] = ".";
					}
				}
			}
			const newKey = key();
			if (newKey === prevKey) break;
			prevKey = newKey;
		}
	}
	function moveSouth() {
		let prevKey = key();
		while (true) {
			for (let y = 0; y < grid.length - 1; y++) {
				for (let x = 0; x < grid.length; x++) {
					const char = grid[x][y];
					const below = grid[x][y + 1];

					if (char === "O" && below === ".") {
						grid[x][y + 1] = "O";
						grid[x][y] = ".";
					}
				}
			}
			const newKey = key();
			if (newKey === prevKey) break;
			prevKey = newKey;
		}
	}

	function moveWest() {
		let prevKey = key();
		while (true) {
			for (let y = 0; y < grid.length; y++) {
				for (let x = 1; x < grid.length; x++) {
					const char = grid[x][y];
					const left = grid[x - 1][y];

					if (char === "O" && left === ".") {
						grid[x - 1][y] = "O";
						grid[x][y] = ".";
					}
				}
			}
			const newKey = key();
			if (newKey === prevKey) break;
			prevKey = newKey;
		}
	}

	function load() {
		let load = 0;
		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid.length; x++) {
				if (grid[x][y] === "O") load += grid.length - y;
			}
		}
		return load;
	}
}

// console.log(partOne(input));
console.log(partTwo(input));

time(startTime);
