import { Grid, knotHash, timeUsed } from "../helper.js";

const startTime = Date.now();

const input = `vbqugkhl`;

const grid = new Grid(128, 128);

// Populate grid
for (let row = 0; row < 128; row++) {
	const hash = knotHash(input + "-" + row);
	const binary = hash
		.split("")
		.map(x =>
			Number("0x" + x)
				.toString(2)
				.padStart(4, 0)
		)
		.join("");

	for (let col = 0; col < 128; col++) {
		grid.grid[col][row] = +binary.charAt(col);
	}
}

console.log("Part one:", grid.totalOn);
console.log("Part two:", grid.numRegions);

const endTime = Date.now();
timeUsed(startTime, endTime);
