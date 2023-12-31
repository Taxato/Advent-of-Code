import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day23input as input } from "./inputs.js";

const regs = {
	a: 7,
	b: 0,
	c: 0,
	d: 0,
};

let lineIndex = 0;
const instructions = [...input];
while (lineIndex < instructions.length) {
	execute(instructions[lineIndex]);
}

console.log(regs);

function execute(instruction) {
	const [_, op, in1, in2] = instruction.match(
		/(\w+) ([\w\d-]+)? ?([\w\d-]+)?/
	);

	switch (op) {
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
		case "tgl":
			toggle(lineIndex + +regs[in1]);
			lineIndex++;
			break;
	}
}

function toggle(index) {
	const oldInstruction = instructions[index];
	if (!oldInstruction) return;

	const [_, oldOp, oldIn1, oldIn2] = oldInstruction.match(
		/(\w+) ([\w\d-]+)? ?([\w\d-]+)?/
	);

	let newInstruction = "";
	switch (oldOp) {
		case "inc":
			newInstruction = `dec ${oldIn1}`;
			break;
		case "dec":
		case "tgl":
			newInstruction = `inc ${oldIn1}`;
			break;
		case "jnz":
			newInstruction = `cpy ${oldIn1} ${oldIn2}`;
			break;
		case "cpy":
			newInstruction = `jnz ${oldIn1} ${oldIn2}`;
			break;
	}
	instructions[index] = newInstruction;
}

const endTime = Date.now();
timeUsed(startTime, endTime);
