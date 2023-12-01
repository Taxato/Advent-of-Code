import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day5input as input } from "./inputs.js";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function react(input) {
	let string = input;
	let prevLength;
	do {
		prevLength = string.length;
		for (const letter of alphabet) {
			const regex = new RegExp(
				`${letter}${letter.toUpperCase()}|${letter.toUpperCase()}${letter}`,
				`g`
			);
			string = string.replaceAll(regex, "");
		}
	} while (prevLength !== string.length);
	return string.length;
}

function improvedPolymer(input) {
	let bestLength = input.length;
	for (const letter of alphabet) {
		const regex = new RegExp(letter, "gi");

		let string = input.replaceAll(regex, "");
		const len = react(string);
		if (len < bestLength) bestLength = len;
	}
	return bestLength;
}

console.log("Part one:", react(input));
console.log("Part two:", improvedPolymer(input));

const endTime = Date.now();
timeUsed(startTime, endTime);
