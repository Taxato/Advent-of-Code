import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day5input } from "./inputs.js";

let input = [...day5input];
let index = 0;
let steps = 0;
// Part one
while (index < input.length) {
	steps++;

	const instruction = input[index];
	input[index]++;
	index += instruction;
}
console.log("Part one:", steps);

// Part two
input = [...day5input];
index = 0;
steps = 0;
while (index < input.length) {
	steps++;

	const instruction = input[index];
	if (instruction >= 3) input[index]--;
	else input[index]++;

	index += instruction;
}
console.log("Part two:", steps);

const endTime = Date.now();
timeUsed(startTime, endTime);
