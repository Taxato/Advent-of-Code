import { sumArr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day1input as input } from "./inputs.js";

console.log("Part one", sumArr(input));

console.log("Part two", firstDuplicateFrequency(input));

function firstDuplicateFrequency(arr) {
	const frequencies = new Set();

	let frequency = 0;
	for (let i = 0; true; i = (i + 1) % arr.length) {
		frequency += arr[i];
		if (frequencies.has(frequency)) return frequency;
		else frequencies.add(frequency);
	}
}

const endTime = Date.now();
timeUsed(startTime, endTime);
