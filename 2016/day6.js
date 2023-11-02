import { maxInArr, minInArr } from "../helper.js";
import { day6input as input } from "./inputs.js";

const chars = new Array(8).fill(0).map(() => ({}));

input.forEach(line => {
	line.split("").forEach((char, i) => {
		if (!chars[i][char]) chars[i][char] = 1;
		else chars[i][char]++;
	});
});

let partOne = "";
let partTwo = "";
chars.forEach(position => {
	const posVals = Object.values(position);
	const max = maxInArr(posVals);
	const maxIndex = posVals.indexOf(max);
	const mostCommonChar = Object.keys(position)[maxIndex];

	const min = minInArr(posVals);
	const minIndex = posVals.indexOf(min);
	const leastCommonChar = Object.keys(position)[minIndex];

	partOne += mostCommonChar;
	partTwo += leastCommonChar;
});
console.log(partOne, partTwo);
