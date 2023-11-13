import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day1input as input } from "./inputs.js";

let partOne = 0;
for (let i = 0; i < input.length; i++) {
	if (input.charAt(i) === input.charAt((i + 1) % input.length))
		partOne += Number(input.charAt(i));
}

let partTwo = 0;
for (let i = 0; i < input.length; i++) {
	if (input.charAt(i) === input.charAt((i + input.length / 2) % input.length))
		partTwo += Number(input.charAt(i));
}

console.log("Part one", partOne);
console.log("Part two", partTwo);

const endTime = Date.now();
timeUsed(startTime, endTime);
