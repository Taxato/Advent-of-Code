import { reverseStr } from "../helper.js";

const input = "11110010111001001";

function dragonCurve(a) {
	const b = swapBits(reverseStr(a));
	return `${a}0${b}`;
}

function swapBits(str) {
	let res = "";
	for (let i = 0; i < str.length; i++) {
		res += str.at(i) === "0" ? "1" : "0";
	}
	return res;
}

function getCheckSum(data) {
	let checkSum = "";
	for (let i = 0; i < data.length; i += 2) {
		const pair = data.substring(i, i + 2);
		if (/00|11/.test(pair)) checkSum += "1";
		else checkSum += "0";
	}
	return checkSum;
}

function run(input, length) {
	let len = 0;
	let data = input;
	while (len < length) {
		data = dragonCurve(data);
		len = data.length;
	}
	data = data.slice(0, length);
	let checkSum = getCheckSum(data);
	while (checkSum.length % 2 === 0) {
		checkSum = getCheckSum(checkSum);
	}
	return checkSum;
}

const partOne = run(input, 272);
const partTwo = run(input, 35651584);

console.log(partOne);
console.log(partTwo);
