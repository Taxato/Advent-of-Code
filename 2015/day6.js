import { readFile } from "node:fs";
import { sumArr } from "./helper.js";
readFile("./day6input.txt", { encoding: "ascii" }, processInput);

const lights = Array.from({ length: 1000 }, () =>
	Array.from({ length: 1000 }, () => 0)
);

const testInstruction = "toggle 0,0 through 2,2";

function processInput(err, raw) {
	if (err) return err;
	const input = raw.replaceAll("\r", "").split("\n");

	input.forEach(str => {
		readInstruction(str);
	});

	// readInstruction(testInstruction);

	// const output = lights.flat().filter(l => l === true).length;
	const output = sumArr(lights.flat());

	console.log(output);
}

function flickLight(x, y, state) {
	switch (state) {
		case "turn on":
			lights[x][y]++;
			break;
		case "turn off":
			lights[x][y] = Math.max(lights[x][y] - 1, 0);
			break;
		case "toggle":
			lights[x][y] += 2;
			break;
	}
}

function readInstruction(str) {
	const { instruction, x1, y1, x2, y2 } = str.match(
		/(?<instruction>turn off|turn on|toggle) (?<x1>\d+),(?<y1>\d+) through (?<x2>\d+),(?<y2>\d+)/
	).groups;

	if (!instruction || !x1 || !y1 || !x2 || !y2) console.log("ERROR");

	// if (x2 < x1 || y2 < y1) console.log("FORMULA ERROR");

	for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
		for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
			flickLight(x, y, instruction);
		}
	}
}
