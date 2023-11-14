import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day6input as input } from "./inputs.js";

function numDistributionsUntilRepeat(input) {
	let banks = [...input];
	const checkedStates = new Set();
	let numDistributions = 0;
	while (true) {
		const hash = banks.join("/");
		if (checkedStates.has(hash)) {
			break;
		} else checkedStates.add(hash);
		banks = distribute(banks);
		numDistributions++;
	}
	return { numDistributions, banks };
}

function numCycles(input) {
	const hash = input.banks.join("/");
	let banks = [...input.banks];
	let num = 0;
	while (true) {
		banks = distribute(banks);
		num++;
		if (banks.join("/") === hash) return num;
	}
}

function distribute(banks) {
	const newBanks = [...banks];
	const highest = newBanks.reduce(
		(max, blocks, i) => {
			if (blocks > max.blocks) return { blocks, i };
			else return max;
		},
		{
			blocks: 0,
		}
	);
	let curIndex = highest.i;
	newBanks[curIndex] = 0;
	for (let blocksLeft = highest.blocks; blocksLeft > 0; blocksLeft--) {
		curIndex = (curIndex + 1) % newBanks.length;
		newBanks[curIndex]++;
	}
	return newBanks;
}

const result = numDistributionsUntilRepeat(input);
console.log("Part one:", result.numDistributions);
console.log("Part two:", numCycles(result));

const endTime = Date.now();
timeUsed(startTime, endTime);
