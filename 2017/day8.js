import { maxInArr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day8input as input } from "./inputs.js";

const regs = {};
let highestVal = 0;
input.forEach(line => {
	const [_, reg, op, amnt, checkReg, exp] = line.match(
		/(\w+) (inc|dec) ([\d-]+) if (\w+) (.*)/
	);
	if (regs[reg] === undefined) regs[reg] = 0;
	if (regs[checkReg] === undefined) regs[checkReg] = 0;

	if (eval?.(`${regs[checkReg]} ${exp}`)) {
		regs[reg] += op === "inc" ? +amnt : -amnt;

		if (regs[reg] > highestVal) highestVal = regs[reg];
	}
});

console.log("Part one:", maxInArr(Object.values(regs)));
console.log("Part two:", highestVal);

const endTime = Date.now();
timeUsed(startTime, endTime);
