import { readFileSync } from "fs";
import { time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day15input.txt", { encoding: "utf8" });
const test = readFileSync("./day15test.txt", { encoding: "utf8" });

function hash(str) {
	let val = 0;

	for (let i = 0; i < str.length; i++) {
		val += str.charCodeAt(i);
		val *= 17;
		val = val % 256;
	}
	return val;
}

function partOne(input) {
	let sum = 0;
	for (const inst of input.split(",")) {
		sum += hash(inst);
	}
	return sum;
}

function partTwo(input) {
	const boxes = {};
	for (let i = 0; i < 256; i++) {
		boxes[i] = {};
	}

	for (const inst of input.split(",")) {
		const [_, label, op, len] = inst.match(/([a-z]+)(-|=)(\d+)?/);
		const box = hash(label);

		switch (op) {
			case "-":
				if (label in boxes[box]) delete boxes[box][label];
				break;

			case "=":
				boxes[box][label] = +len;
				break;
		}
	}

	let focus = 0;
	for (const box of Object.entries(boxes)) {
		Object.values(box[1]).forEach((val, i) => {
			let pow = +box[0] + 1;
			pow *= (i + 1) * val;
			focus += pow;
		});
	}
	return focus;
}

console.log(partOne(input));
console.log(partTwo(input));

time(startTime);
