import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day23input as input } from "./inputs.js";

const regs = {};

new Set(input.join(" ").matchAll(/\b[a-z]\b/g)).forEach(letter => {
	regs[letter] = 0;
});

let lineIndex = 0;

let numMul = 0;
while (true) {
	const [_, op, in1, in2] = input[lineIndex].match(
		/(\w+) ([\w-]+) ?([\w-]+)?/
	);
	const val1 = in1 in regs ? regs[in1] : +in1;
	const val2 = in2 in regs ? regs[in2] : +in2;

	switch (op) {
		case "set":
			regs[in1] = val2;
			lineIndex++;
			break;
		case "sub":
			regs[in1] = val1 - val2;
			lineIndex++;
			break;
		case "mul":
			numMul++;
			regs[in1] = val1 * val2;
			lineIndex++;
			break;
		case "mod":
			regs[in1] = val1 % val2;
			lineIndex++;
			break;
		case "jnz":
			if (val1 !== 0) lineIndex += val2;
			else lineIndex++;
			break;
	}
	if (lineIndex < 0 || lineIndex >= input.length) break;
}

function partTwo() {
	const regs = {
		b: 67,
		c: 67,
		d: 0,
		f: 0,
		g: 0,
		h: 0,
	};
	regs.b = regs.b * 100 + 100000;
	regs.c = regs.b + 17000;
	do {
		regs.f = 1;
		regs.d = 2;
		for (let d = regs.d; d * d < regs.b; d++) {
			if (regs.b % d === 0) {
				regs.f = 0;
				break;
			}
		}
		if (regs.f === 0) regs.h++;
		regs.g = regs.b - regs.c;
		regs.b += 17;
	} while (regs.g !== 0);

	return regs.h;
}

console.log("Part one:", numMul);
console.log("Part two:", partTwo());

const endTime = Date.now();
timeUsed(startTime, endTime);
