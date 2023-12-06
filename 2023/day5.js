const startTime = process.hrtime();

import { day5input as input } from "./inputs.js";

let [seeds, ...mappings] = input;
seeds = seeds.split(" ").map(Number);

function lookup(inputs) {
	let res = inputs;
	for (const mapping of mappings) {
		let outputs = [];
		for (let [start, length] of res) {
			while (length > 0) {
				let found = false;
				for (const m of mapping) {
					let [dst, src, len] = m.split(" ").map(Number);
					if (src <= start && start < src + len) {
						len -= Math.max(start - src, len - length);
						outputs.push([start - src + dst, len]);
						start += len;
						length -= len;
						found = true;
						break;
					}
				}
				if (!found) {
					outputs.push([start, length]);
					break;
				}
			}
		}
		res = outputs;
	}
	return Math.min(...res.map(r => r[0]));
}

const result = [
	seeds.map(s => [s, 1]),
	seeds
		.filter((_, i) => i % 2 === 0)
		.map((seed, i) => [seed, seeds[1 + i * 2]]),
].map(part => lookup(part));

console.log(...result);

const endTime = process.hrtime(startTime);
console.log(`Execution time: ${endTime[0] * 1000 + endTime[1] / 1000000}ms`);
