import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day18input as input } from "./inputs.js";

function partOne(input) {
	const regs = {};
	new Set(input.join(" ").matchAll(/\b[a-z]\b/g)).forEach(letter => {
		regs[letter] = 0;
	});

	let lastFrequency;
	let lineIndex = 0;

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
			case "add":
				regs[in1] = val1 + val2;
				lineIndex++;
				break;
			case "mul":
				regs[in1] = val1 * val2;
				lineIndex++;
				break;
			case "mod":
				regs[in1] = val1 % val2;
				lineIndex++;
				break;
			case "snd":
				lastFrequency = val1;
				lineIndex++;
				break;
			case "rcv":
				if (val1 !== 0 && lastFrequency !== null) {
					return lastFrequency;
				}
				lineIndex++;
				break;
			case "jgz":
				if (val1 > 0) lineIndex += val2;
				else lineIndex++;
				break;
		}
		if (lineIndex < 0 || lineIndex >= input.length) break;
	}
}
console.log("Part one:", partOne(input));

function partTwo(input) {
	const regs = [{}, {}];
	new Set(input.join(" ").matchAll(/\b[a-z]\b/g)).forEach(letter => {
		regs[0][letter] = 0;
		regs[1][letter] = 0;
	});
	regs[1].p = 1;

	const waiting = [false, false];
	const terminated = [false, false];
	const lineIndexes = [0, 0];
	const signals = [[], []];
	let numSentFromP1 = 0;

	while (true) {
		if ((waiting[0] && waiting[1]) || (terminated[0] && terminated[1]))
			break;
		for (const curProgram of [0, 1]) {
			if (terminated[curProgram]) continue;

			const [_, op, in1, in2] = input[lineIndexes[curProgram]].match(
				/(\w+) ([\w-]+) ?([\w-]+)?/
			);
			const val1 = in1 in regs[curProgram] ? regs[curProgram][in1] : +in1;
			const val2 = in2 in regs[curProgram] ? regs[curProgram][in2] : +in2;

			switch (op) {
				case "set":
					regs[curProgram][in1] = val2;
					lineIndexes[curProgram]++;
					break;
				case "add":
					regs[curProgram][in1] = val1 + val2;
					lineIndexes[curProgram]++;
					break;
				case "mul":
					regs[curProgram][in1] = val1 * val2;
					lineIndexes[curProgram]++;
					break;
				case "mod":
					regs[curProgram][in1] = val1 % val2;
					lineIndexes[curProgram]++;
					break;
				case "snd":
					if (curProgram === 1) numSentFromP1++;
					signals[curProgram].push(val1);
					lineIndexes[curProgram]++;
					break;
				case "rcv":
					const signal = signals[(curProgram + 1) % 2].shift();
					if (signal === undefined) {
						waiting[curProgram] = true;
						break;
					} else {
						regs[curProgram][in1] = signal;
					}
					lineIndexes[curProgram]++;
					break;
				case "jgz":
					if (val1 > 0) lineIndexes[curProgram] += val2;
					else lineIndexes[curProgram]++;
					break;
			}
			if (
				lineIndexes[curProgram] < 0 ||
				lineIndexes[curProgram] >= input.length
			)
				terminated[curProgram] = true;
		}
	}
	return numSentFromP1;
}
console.log("Part two:", partTwo(input));

const endTime = Date.now();
timeUsed(startTime, endTime);
