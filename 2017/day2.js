import { maxInArr, minInArr, sumArr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day2input as input } from "./inputs.js";

const partOne = sumArr(
	input.map(line => {
		const [min, max] = line.reduce(
			([min, max], cur) => {
				return [Math.min(min, cur), Math.max(max, cur)];
			},
			[Infinity, 0]
		);
		return max - min;
	})
);

const partTwo = sumArr(
	input.map(line => {
		let result;
		for (const num of line) {
			if (result) break;
			for (const den of line) {
				if (num === den) continue;

				if (num % den === 0) {
					result = num / den;
					break;
				}
			}
		}
		return result;
	})
);

console.log("Part one:", partOne);
console.log("Part two:", partTwo);

const endTime = Date.now();
timeUsed(startTime, endTime);
