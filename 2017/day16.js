import { feedBackOutInFunc, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day16input as input } from "./inputs.js";

function dance(input, string = "abcdefghijklmnop") {
	for (const instruction of input) {
		const [_, op, in1, in2] = instruction.match(
			/(s|x|p)(\d+|\w)\/?(\d+|\w)?/
		);

		switch (op) {
			case "s":
				string = spin(string, +in1);
				break;
			case "x":
				string = exchange(string, +in1, +in2);
				break;
			case "p":
				string = partner(string, in1, in2);
				break;
		}
	}
	return string;
}

function spin(str, num) {
	return str.slice(-num) + str.slice(0, str.length - num);
}
function exchange(str, a, b) {
	const arr = str.split("");
	const temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
	return arr.join("");
}
function partner(str, a, b) {
	const arr = str.split("");
	const temp = arr.indexOf(b);
	arr[arr.indexOf(a)] = b;
	arr[temp] = a;
	return arr.join("");
}

console.log("Part one:", dance(input));

// Part two
const initialString = "abcdefghijklmnop";
let string = "abcdefghijklmnop";
let numUntilRepeat;
for (let i = 0; i < 1e9; i++) {
	string = dance(input, string);
	if (string === initialString) {
		numUntilRepeat = i + 1;
		break;
	}
}
for (let i = 0; i < 1e9 % numUntilRepeat; i++) {
	string = dance(input, string);
}
console.log("Part two:", string);
const endTime = Date.now();
timeUsed(startTime, endTime);
