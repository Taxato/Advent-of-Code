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
	let r = {
		b: 67,
		c: 67,
		d: 0,
		f: 0,
		g: 0,
		h: 0,
	};
	r.b = r.b * 100 + 100000;
	r.c = r.b + 17000;
	do {
		r.f = 1;
		r.d = 2;
		for (let d = r.d; d * d < r.b; ++d) {
			if (r.b % d === 0) {
				r.f = 0;
				break;
			}
		}
		if (r.f === 0) r.h++;
		r.g = r.b - r.c;
		r.b += 17;
	} while (r.g !== 0);

	return r.h;
}

console.log("Part one:", numMul);

console.log("Part two:", partTwo());

const endTime = Date.now();
timeUsed(startTime, endTime);
