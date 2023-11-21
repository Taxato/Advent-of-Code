import {
	create2DArr,
	flip2DArr,
	log2DArr,
	loop2DArr,
	rotate2DArr,
	timeUsed,
} from "../helper.js";
const startTime = Date.now();

import { day21input as input } from "./inputs.js";

const rules = {};

input.forEach(line => {
	const [input, output] = line.split(" => ");
	rules[input] = output;
});

class ArtProgram {
	iteration = 0;

	grid = {
		arr: this.stringToArr(".#./..#/###", 3),
		size: 3,
	};

	iterate() {
		this.iteration++;

		const splitGrid = this.splitGrid();
		const newSubGrids = [];
		for (const subGrid of splitGrid) {
			const newSubGrid = this.stringToArr(this.matchRule(subGrid));
			newSubGrids.push(newSubGrid);
		}

		const newSize =
			this.grid.size % 2 === 0
				? (this.grid.size / 2) * 3
				: (this.grid.size / 3) * 4;

		const newGrid = this.joinSubGrids(newSize, newSubGrids);
		this.grid = {
			arr: newGrid,
			size: newSize,
		};
	}

	splitGrid() {
		const subGrids = [];
		let cellSize = this.grid.size % 2 === 0 ? 2 : 3;
		for (let j = 0; j < this.grid.size; j += cellSize) {
			for (let i = 0; i < this.grid.size; i += cellSize) {
				const subGrid = create2DArr(cellSize, cellSize);
				for (let x = 0; x < cellSize; x++) {
					for (let y = 0; y < cellSize; y++) {
						subGrid[x][y] = this.grid.arr[x + i][y + j];
					}
				}
				subGrids.push(subGrid);
			}
		}
		return subGrids;
	}

	joinSubGrids(size, subGrids) {
		const grid = create2DArr(size, size);
		const numCells = Math.sqrt(subGrids.length);
		subGrids.forEach((subGrid, i) => {
			loop2DArr(subGrid, (x, y) => {
				grid[x + (i % numCells) * (size / numCells)][
					y + Math.floor(i / numCells) * (size / numCells)
				] = subGrid[x][y];
			});
		});
		return grid;
	}

	get numPixelsOn() {
		return this.grid.arr
			.flat()
			.reduce((sum, cur) => sum + (cur === "#" ? 1 : 0), 0);
	}

	matchRule(input) {
		const permutations = [];

		for (let i = 0; i < 4; i++) {
			permutations.push(this.arrToString(input));
			rotate2DArr(input);
		}
		flip2DArr(input);
		for (let i = 0; i < 4; i++) {
			permutations.push(this.arrToString(input));
			rotate2DArr(input);
		}

		for (const perm of permutations) {
			if (perm in rules) return rules[perm];
		}
	}

	arrToString(arr) {
		let out = "";
		for (let j = 0; j < arr[0].length; j++) {
			for (let i = 0; i < arr.length; i++) {
				out += arr[i][j];
			}
			out += "/";
		}
		return out.slice(0, -1);
	}

	stringToArr(str) {
		const strArr = str.split("/");
		const arr = create2DArr(strArr.length, strArr.length);
		strArr.forEach((row, rowI) => {
			row.split("").forEach((char, colI) => {
				arr[colI][rowI] = char;
			});
		});
		return arr;
	}
}

const program = new ArtProgram();
while (program.iteration < 5) program.iterate();
console.log("Part one:", program.numPixelsOn);
while (program.iteration < 18) program.iterate();
console.log("Part two:", program.numPixelsOn);

const endTime = Date.now();
timeUsed(startTime, endTime);
