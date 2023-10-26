import { readFile } from "node:fs";
import { create2DArr, feedBackOutInFunc } from "./helper.js";

const testInput = `.#.#.#
...##.
#....#
..#...
#.#..#
####..`;

readFile("./day18input.txt", { encoding: "ascii" }, readInput);
function readInput(err, raw) {
	if (err) return err;
	const input = raw.replaceAll(/\s/g, "");

	processInput(input);
}

const cols = 100;
const rows = 100;
const grid = create2DArr(cols, rows, null);

function processInput(input) {
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			const light = input[x + y * rows];
			if (!light) console.log("ERROR");
			const state = light === "#" ? 1 : 0;
			grid[x][y] = state;
		}
	}
	grid[0][0] = 1;
	grid[0][rows - 1] = 1;
	grid[cols - 1][rows - 1] = 1;
	grid[cols - 1][0] = 1;
	console.log(countLights(feedBackOutInFunc(grid, updateGrid, 100)));
}

function countNeighbors(grid, x, y) {
	let sum = 0;
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			const col = x + i;
			const row = y + j;
			if (col < 0 || row < 0 || col > cols - 1 || row > rows - 1)
				continue;
			sum += grid[col][row];
		}
	}
	sum -= grid[x][y];
	return sum;
}

function updateGrid(grid) {
	const newGrid = create2DArr(cols, rows, null);

	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			const light = grid[x][y];
			const numNeighbors = countNeighbors(grid, x, y);
			let newState;
			if (light === 1) {
				if (numNeighbors === 2 || numNeighbors === 3) newState = 1;
				else newState = 0;
			} else {
				if (numNeighbors === 3) newState = 1;
				else newState = 0;
			}

			newGrid[x][y] = newState;
		}
	}
	newGrid[0][0] = 1;
	newGrid[0][rows - 1] = 1;
	newGrid[cols - 1][rows - 1] = 1;
	newGrid[cols - 1][0] = 1;
	return newGrid;
}

function countLights(grid) {
	return grid.flat().reduce((totalOn, curLight) => {
		if (curLight === 1) return ++totalOn;
		else return totalOn;
	}, 0);
}
