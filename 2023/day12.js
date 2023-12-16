import { readFileSync } from "fs";
import { time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day12input.txt", { encoding: "utf8" });
const test = readFileSync("./day12test.txt", { encoding: "utf8" });

const cache = {};

function solve(input, partTwo = false) {
	let total = 0;

	for (const row of input.split("\n")) {
		let [springs, counts] = row.split(" ");

		if (partTwo) {
			springs = (springs + "?").repeat(5).slice(0, -1);
			counts = (counts + ",").repeat(5).slice(0, -1);
		}

		counts = counts.split(",").map(Number);
		total += numSolutions(springs, counts);
	}

	return total;
}

function numSolutions(springs, counts) {
	// console.log(springs, counts);

	const key = springs + "||" + counts.join("/");
	if (key in cache) return cache[key];

	let res;

	if (springs.length === 0) {
		res = counts.length === 0 ? 1 : 0;
		cache[key] = res;
		return res;
	}
	if (counts.length === 0) {
		res = /#/.test(springs) ? 0 : 1;
		cache[key] = res;
		return res;
	}

	let [char, ...remSprings] = springs.split("");
	remSprings = remSprings.join("");
	let remCounts = [...counts];

	if (char === ".") res = numSolutions(remSprings, remCounts);
	else if (char === "#") {
		const count = remCounts[0];
		if (
			springs.length >= count &&
			!/\./.test(springs.substring(0, count)) &&
			(springs.length === count || springs.charAt(count) !== "#")
		) {
			// console.log(springs, remCounts);
			remSprings = remSprings.slice(count);
			remCounts = remCounts.slice(1);
			res = numSolutions(remSprings, remCounts);
		} else res = 0;
	} else if (char === "?") {
		res =
			numSolutions("." + remSprings, remCounts) +
			numSolutions("#" + remSprings, remCounts);
	}

	cache[key] = res;
	return res;
}

console.log("Part one:", solve(input));
console.log("Part two:", solve(input, true));

time(startTime);
