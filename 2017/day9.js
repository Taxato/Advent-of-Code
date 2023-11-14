import { sumArr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day9input as input } from "./inputs.js";

// Already done on the raw input to save space on the inputs.js file
/*
const input = removeCancelledChars(day9input);
function removeCancelledChars(raw) {
	let input = raw;
	let i = 0;
	while (i < input.length) {
		if (input.charAt(i) === "!")
			input = input.slice(0, i) + input.slice(i + 2);
		else i++;
	}
	return input;
}
*/

function removeGarbage(raw) {
	let input = raw;
	let i = 0;
	while (i < input.length) {
		if (input.charAt(i) === "<") {
			input = input.slice(0, i) + input.slice(input.indexOf(">", i) + 1);
		} else i++;
	}
	return input;
}

function partOne(input) {
	let totalGroupSum = 0;
	let curGroupSum = 0;
	let curDepth = 0;
	for (let i = 0; i < input.length; i++) {
		const char = input.at(i);
		if (char === "{") {
			curDepth++;
		} else if (char === "}") {
			curDepth--;
			curGroupSum += curDepth + 1;
			if (curDepth === 0) {
				totalGroupSum += curGroupSum;
				curGroupSum = 0;
			}
		}
	}
	return totalGroupSum;
}

function partTwo(input) {
	let totalGarbage = 0;
	let i = 0;
	while (i < input.length) {
		if (input.charAt(i) === "<") {
			const slice = input.slice(i + 1, input.indexOf(">", i));
			totalGarbage += slice.length;
			i += slice.length + 2;
		} else i++;
	}
	return totalGarbage;
}

console.log("Part one:", partOne(removeGarbage(input)));
console.log("Part two:", partTwo(input));

const endTime = Date.now();
timeUsed(startTime, endTime);
