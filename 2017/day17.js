import { timeUsed } from "../helper.js";
const startTime = Date.now();

const input = 348;

let arr = [0];
let curPos = 0;

for (let i = 1; i <= 2017; i++) {
	curPos = (curPos + input + 1) % arr.length;
	arr = [...arr.slice(0, curPos), i, ...arr.slice(curPos)];
}
console.log("Part one:", arr[arr.indexOf(2017) + 1]);

curPos = 0;
let out = null;

for (let i = 1; i <= 5e7; i++) {
	curPos = ((curPos + input) % i) + 1;
	if (curPos === 1) out = i;
}
console.log("Part two:", out);

const endTime = Date.now();
timeUsed(startTime, endTime);
