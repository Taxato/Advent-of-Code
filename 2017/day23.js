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

console.log("Part one:", numMul);

for (let i = 0; i < Math.sqrt(123700); i++) {
	for (let j = 0; j < Math.sqrt(123700); j++) {}
}

const endTime = Date.now();
timeUsed(startTime, endTime);
