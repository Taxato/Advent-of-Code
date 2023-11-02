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
	const mostCommonChar = Object.keys(position).reduce((max, cur) =>
		position[cur] > position[max] ? cur : max
	);
	partOne += mostCommonChar;

	const leastCommonChar = Object.keys(position).reduce((min, cur) =>
		position[cur] < position[min] ? cur : min
	);
	partTwo += leastCommonChar;
});

console.log(partOne, partTwo);
