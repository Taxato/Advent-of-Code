import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day1input as input } from "./input.js";

function calibrate(input) {
	return input
		.map(line => {
			const nums = line.replaceAll(/[a-zA-Z]/g, "");
			return +`${nums.charAt(0)}${nums.charAt(nums.length - 1)}`;
		})
		.reduce((sum, cur) => sum + cur, 0);
}
const partOne = calibrate(input);
let partTwoInput = input.join("\n");

const replacements = {
	one: "o1e",
	two: "t2o",
	three: "t3e",
	four: "4",
	five: "f5e",
	six: "6",
	seven: "s7n",
	eight: "e8t",
	nine: "n9e",
};

for (const num of [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
]) {
	partTwoInput = partTwoInput.replaceAll(num, replacements[num]);
}
partTwoInput = partTwoInput.split("\n");
const partTwo = calibrate(partTwoInput);

console.log("Part one:", partOne);
console.log("Part two:", partTwo);

const endTime = Date.now();
timeUsed(startTime, endTime);
