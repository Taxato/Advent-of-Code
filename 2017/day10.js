import { asciiArrFromStr, feedBackOutInFunc, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day10input as input } from "./inputs.js";

function singleKnotHash({
	listLength,
	instructions,
	curPos = 0,
	skipSize = 0,
	list = Array.from({ length: listLength }, (_, i) => i),
}) {
	for (const length of instructions) {
		const section = [];
		for (let i = curPos; i < curPos + length; i++) {
			section.push({
				val: list.at(i % list.length),
				pos: i % list.length,
			});
		}

		const reverseOrder = section.map(item => item.pos).reverse();
		const reversedSection = section.map((item, i) => ({
			...item,
			pos: reverseOrder[i],
		}));
		reversedSection.forEach(item => {
			list[item.pos] = item.val;
		});
		curPos = (curPos + length + skipSize) % list.length;
		skipSize++;
	}

	return {
		list,
		listLength,
		instructions,
		curPos,
		skipSize,
		result: list[0] * list[1],
	};
}

function knotHash(input) {
	const sequence = [...asciiArrFromStr(input), 17, 31, 73, 47, 23];
	const result = feedBackOutInFunc(
		{ listLength: 256, instructions: sequence },
		singleKnotHash,
		64
	);
	const sparseHash = result.list;
	const blocks = [];
	for (let i = 0; i < 16; i++) {
		blocks.push(sparseHash.slice(i * 16, (i + 1) * 16));
	}
	const denseHash = blocks.map(block =>
		block.reduce((res, cur) => res ^ cur)
	);

	return denseHash.map(num => num.toString(16).padStart(2, "0")).join("");
}

const partOneInput = {
	listLength: 256,
	instructions: input.split(",").map(len => +len),
};
console.log("Part one:", singleKnotHash(partOneInput).result);
console.log("Part two:", knotHash(input));

const endTime = Date.now();
timeUsed(startTime, endTime);
