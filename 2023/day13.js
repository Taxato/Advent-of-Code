import { readFileSync } from "fs";
import { time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day13input.txt", { encoding: "utf8" });
// const input = readFileSync("./day13test.txt", { encoding: "utf8" });

const partOneCache = new Set();

const partOne = input
	.split("\n\n")
	.map((gStr, i) => {
		const v = findVertical(gStr);
		const h = findHorizontal(gStr);

		if (v !== null) {
			partOneCache.add(i + "/" + v);
			return v;
		} else {
			partOneCache.add(i + "/" + h);
			return h;
		}
	})
	.reduce((sum, cur) => sum + cur, 0);

const partTwo = input
	.split("\n\n")
	.map((gStr, idx) => {
		for (let i = 0; i < gStr.length; i++) {
			let newStr = gStr.split("");
			const char = newStr[i];
			if (char === "\n") continue;
			if (char === ".") newStr[i] = "#";
			else newStr[i] = ".";
			newStr = newStr.join("");
			const v = findVertical(newStr, idx);
			if (v) return v;
			const h = findHorizontal(newStr, idx);
			if (h) return h;
		}
	})
	.reduce((sum, cur) => sum + cur, 0);

console.log(partOne);
console.log(partTwo);

function findVertical(gridStr, idx = null) {
	let cols = [];
	for (let i = 0; i < gridStr.indexOf("\n"); i++) {
		cols.push([]);
	}
	gridStr.split("\n").forEach(line => {
		for (let i = 0; i < line.length; i++) {
			cols[i].push(line.charAt(i));
		}
	});
	// console.log(cols);

	const pairs = [];
	cols = cols.map(c => c.join(""));
	for (let i = 0; i < cols.length - 1; i++) {
		if (cols[i] === cols[i + 1]) pairs.push(i);
	}

	let center = null;
	pairs: for (const pair of pairs) {
		if (idx !== null && partOneCache.has(idx + "/" + (pair + 1))) continue;

		let left = pair;
		let right = pair + 1;

		while (true) {
			if (left < 0 || right >= cols.length) {
				center = pair;
				break pairs;
			}
			if (cols[left] !== cols[right]) break;
			left--;
			right++;
		}
	}

	return center !== null ? center + 1 : null;

	// console.log(pairs);
}

function findHorizontal(gridStr, idx = null) {
	const rows = gridStr.split("\n");

	const pairs = [];
	for (let i = 0; i < rows.length - 1; i++) {
		if (rows[i] === rows[i + 1]) pairs.push(i);
	}

	let center = null;
	pairs: for (const pair of pairs) {
		if (idx !== null && partOneCache.has(idx + "/" + 100 * (pair + 1)))
			continue;

		let up = pair;
		let down = pair + 1;

		while (true) {
			if (up < 0 || down >= rows.length) {
				center = pair;
				break pairs;
			}
			if (rows[up] !== rows[down]) break;
			up--;
			down++;
		}
	}

	return center !== null ? 100 * (center + 1) : null;

	// console.log(pairs);
}

time(startTime);
