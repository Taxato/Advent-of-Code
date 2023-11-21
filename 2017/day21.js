import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day21input as input } from "./inputs.js";

const rules = {};

input.forEach(line => {
	const [input, output] = line.split(" => ");
	rules[input] = output;
});

function matchRule(input) {}

const endTime = Date.now();
timeUsed(startTime, endTime);
