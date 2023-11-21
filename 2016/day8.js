import { day8input as input } from "./inputs.js";
import { create2DArr, log2DArr, sumArr } from "../helper.js";

const screen = create2DArr(50, 6, 0);

function rect(width, height) {
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			screen[x][y] = 1;
		}
	}
}

function rotCol(colIndex, amount) {
	for (let i = 0; i < amount; i++) {
		screen[colIndex].unshift(screen[colIndex].pop());
	}
}

function rotRow(rowIndex, amount) {
	const row = screen.map(col => col[rowIndex]);
	for (let i = 0; i < amount; i++) {
		row.unshift(row.pop());
	}
	for (let i = 0; i < screen.length; i++) {
		screen[i][rowIndex] = row[i];
	}
}

function parseInstruction(instruction) {
	if (instruction.startsWith("rect")) {
		const [_, width, height] = instruction.match(/(\d+)x(\d+)/);
		rect(width, height);
	} else {
		const [_, axis, index, amount] =
			instruction.match(/(x|y)=(\d+) by (\d+)/);
		if (axis === "x") rotCol(index, amount);
		else rotRow(index, amount);
	}
}

input.forEach(line => parseInstruction(line));

log2DArr(screen);
console.log(sumArr(screen.flat()));
