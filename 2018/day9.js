import { readFileSync } from "fs";
import { time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day9input.txt", { encoding: "utf8" });
const [numElfs, lastMarble] = input.match(/\d+/g).map(Number);

function addAfter(val, marble) {
	const newM = {
		val,
		prev: marble,
		next: marble.next,
	};
	marble.next.prev = newM;
	marble.next = newM;
	return newM;
}

function marbleMania(numElfs, numMarbles) {
	const elfs = {};
	for (let i = 1; i <= numElfs; i++) elfs[i] = 0;

	let curElf = 1;
	let curMarble = {
		val: 0,
	};
	curMarble.next = curMarble;
	curMarble.prev = curMarble;

	for (let i = 1; i <= numMarbles; i++) {
		if (i % 23 === 0) {
			curMarble = curMarble.prev.prev.prev.prev.prev.prev;
			// console.log(curMarble);
			elfs[curElf] += i + curMarble.prev.val;

			curMarble.prev.prev.next = curMarble;
			curMarble.prev = curMarble.prev.prev;
		} else {
			curMarble = addAfter(i, curMarble.next);
		}
		curElf = (curElf % numElfs) + 1;
	}
	return Math.max(...Object.values(elfs));
}

console.log("Part one:", marbleMania(numElfs, lastMarble));
console.log("Part two:", marbleMania(numElfs, lastMarble * 100));

time(startTime);
