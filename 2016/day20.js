import { timeUsed } from "../helper.js";
const startTime = Date.now();
import { day20input as input } from "./inputs.js";

function inRange(num, [min, max]) {
	return num >= min && num <= max;
}

function partOne(ranges) {
	let ip = 0;
	let valid = false;
	while (!valid) {
		valid = true;
		for (const range of ranges) {
			if (inRange(ip, range)) {
				ip = range[1] + 1;
				valid = false;
			}
		}
	}
	return ip;
}

function partTwo(ranges, limit) {
	let ip = 0;
	let totalIps = 0;
	while (ip <= limit) {
		let valid = true;
		for (const range of ranges) {
			if (inRange(ip, range)) {
				ip = range[1] + 1;
				valid = false;
			}
		}
		if (valid) {
			totalIps++;
			ip++;
		}
	}
	return totalIps;
}

console.log("Part one:", partOne(input));
console.log("Part two:", partTwo(input, 4294967295));

const endTime = Date.now();
timeUsed(startTime, endTime);
