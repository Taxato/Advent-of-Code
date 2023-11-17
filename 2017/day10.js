import { knotHash, singleKnotHash, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day10input as input } from "./inputs.js";

const partOneInput = {
	listLength: 256,
	instructions: input.split(",").map(len => +len),
};
console.log("Part one:", singleKnotHash(partOneInput).result);
console.log("Part two:", knotHash(input));

const endTime = Date.now();
timeUsed(startTime, endTime);
