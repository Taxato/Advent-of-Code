import { readFileSync } from "fs";
import { create2DArr, manhattanDist, time } from "../helper.js";
const startTime = process.hrtime();

let input = readFileSync("./day11input.txt", { encoding: "utf8" });
// let input = readFileSync("./day11test.txt", { encoding: "utf8" });

let size = input.split("\n").length;
input = input.replaceAll("\n", "");

let universe = create2DArr(size, size);

const emptyRows = [];
const emptyCols = [];
for (let j = 0; j < size; j++) {
	let emptyRow = true;
	let emptyCol = true;
	for (let i = 0; i < size; i++) {
		const rChar = input.charAt(j * size + i);
		const cChar = input.charAt(i * size + j);
		if (rChar === "#") emptyRow = false;
		if (cChar === "#") emptyCol = false;
		universe[i][j] = rChar;
	}
	if (emptyRow) emptyRows.push(j);
	if (emptyCol) emptyCols.push(j);
}

function expandUniverse(amount) {
	amount--;
	let points = [];

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			if (universe[x][y] !== "#") continue;

			const numXExpands = emptyCols.filter(c => c < x).length;
			const numYExpands = emptyRows.filter(r => r < y).length;

			points.push({
				x: x + amount * numXExpands,
				y: y + amount * numYExpands,
			});
		}
	}

	points = points.map((pos, i) => ({ i, pos }));

	let sum = 0;
	for (const A of points) {
		for (const B of points) {
			if (A === B) continue;
			const dst = manhattanDist(A.pos, B.pos);
			sum += dst;
		}
	}
	return sum / 2;
}

console.log("Part one:", expandUniverse(2));
console.log("Part two:", expandUniverse(1e6));

time(startTime);
