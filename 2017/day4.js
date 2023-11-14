import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day4input as input } from "./inputs.js";

let numValidPhrases = 0;
partOne: for (const line of input) {
	const words = new Set();
	for (const word of line.split(" ")) {
		if (words.has(word)) continue partOne;
		words.add(word);
	}
	numValidPhrases++;
}
console.log("Part one:", numValidPhrases);

numValidPhrases = 0;
partTwo: for (const line of input) {
	const words = [];
	for (const word of line.split(" ")) {
		for (const w of words) {
			if (word.split("").sort().join("") === w.split("").sort().join(""))
				continue partTwo;
		}
		words.push(word);
	}
	numValidPhrases++;
}

console.log("Part two:", numValidPhrases);
const endTime = Date.now();
timeUsed(startTime, endTime);
