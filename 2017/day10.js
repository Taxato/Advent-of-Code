import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day10input as input } from "./inputs.js";

const exInput = [3, 4, 1, 5];

knotHash(5, exInput);

function knotHash(listLength, input) {
	let list = Array.from({ length: listLength }, (_, i) => i);
	let curPos = 3;
	let skipSize = 0;

	for (const length of input) {
		const section = [];
		for (let i = curPos; i < curPos + length; i++) {
			section.push({
				val: list.at(i % list.length),
				pos: i % list.length,
			});
		}
		console.log(section);
		// section.reverse();
		// curPos = (curPos + length + skipSize) % list.length;
		// console.log(curPos);
		// skipSize++;
	}
}

const endTime = Date.now();
timeUsed(startTime, endTime);
