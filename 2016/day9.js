import { writeFile } from "fs";

import { day9input as input } from "./inputs.js";

function decompress(input) {
	let len = 0;
	for (let i = 0; i < input.length; i++) {
		const char = input.at(i);
		if (char === "(") {
			const [_, repLength, repAmount] = input
				.slice(i)
				.match(/(\d+)x(\d+)/);
			if (!repLength || !repAmount) console.log("ERROR");

			const padding = repLength.length + repAmount.length + 2;

			len += +repLength * +repAmount;
			i += padding + +repLength;
		} else len++;
	}

	return len;
}

function recursiveDecompress(input) {
	let len = 0;
	for (let i = 0; i < input.length; i++) {
		const char = input.at(i);

		if (char === "(") {
			const [op, rawRepLength, repAmount] = input
				.slice(i)
				.match(/\((\d+)x(\d+)\)/);
			const repStr = input.slice(
				i + op.length,
				i + op.length + +rawRepLength
			);
			len += recursiveDecompress(repStr) * +repAmount;
			i += op.length + +rawRepLength - 1;
		} else {
			len++;
		}
	}
	return len;
}

console.log("Part 1:", decompress(input));
console.log("Part 2:", recursiveDecompress(input));
