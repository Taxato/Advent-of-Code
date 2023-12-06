import { readFileSync } from "fs";
import { arrProduct, sumArr, time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day3input.txt", { encoding: "utf8" });

const board = input.split("\n").map(row => row.split(""));
const chars = {};
for (const r in board) {
	for (const c in board) {
		const key = `${r}/${c}`;
		if (board[r][c].match(/[^\d\.]/)) chars[key] = [];
	}
}

for (let i = 0; i < board.length; i++) {
	const row = board[i];
	for (const n of row.join("").matchAll(/\d+/g)) {
		const len = n[0].length;
		const num = +n[0];

		const edges = [];
		for (const r of [i - 1, i, i + 1]) {
			for (let c = n.index - 1; c < n.index + len + 1; c++) {
				edges.push([r, c]);
			}
		}

		const edgeKeys = edges.map(e => `${e[0]}/${e[1]}`);
		for (const o of edgeKeys.filter(e => e in chars)) {
			chars[o].push(num);
		}
	}
}

console.log("Part one:", sumArr(Object.values(chars).flat()));
console.log(
	"Part two:",
	sumArr(
		Object.values(chars)
			.filter(p => p.length === 2)
			.map(p => arrProduct(p))
	)
);

time(startTime);
