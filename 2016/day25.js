import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day25input as input } from "./inputs.js";

let lineIndex = 0;
let regs;

let i = 0;
main: while (true) {
	regs = {
		a: i,
		b: 0,
		c: 0,
		d: 0,
	};

	let output = "";
	lineIndex = 0;
	while (lineIndex < input.length) {
		output = execute(input[lineIndex], regs, output);
		if (output.length === 12) {
			if (output === "010101010101" || output === "101010101010") {
				console.log(output, i);
				break main;
			} else break;
		}
	}
	i++;
}

function execute(instruction, regs, output) {
	const [_, op, in1, in2] = instruction.match(
		/(\w+) ([\w\d]+)? ?([\w\d-]+)?/
	);

	switch (op) {
		case "out":
			output += regs[in1];
			lineIndex++;
			break;
		case "inc":
			regs[in1]++;
			lineIndex++;
			break;
		case "dec":
			regs[in1]--;
			lineIndex++;
			break;
		case "jnz":
			if (regs[in1] !== undefined) {
				if (regs[in1] !== 0) lineIndex += regs[in2] || +in2;
				else lineIndex++;
			} else {
				if (+in1 !== 0) lineIndex += regs[in2] || +in2;
				else lineIndex++;
			}
			break;
		case "cpy":
			if (regs[in2] !== undefined) {
				if (regs[in1] !== undefined) regs[in2] = regs[in1];
				else regs[in2] = +in1;
			}
			lineIndex++;
			break;
	}

	return output;
}

const endTime = Date.now();
timeUsed(startTime, endTime);
