import { readFileSync } from "fs";
import { PriorityQueue, time } from "../../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./input.txt", { encoding: "utf8" });
const test = readFileSync("./test.txt", { encoding: "utf8" });

function minHeat(input, minSteps, maxSteps) {
	const board = {};
	let maxX = 0;
	let maxY = 0;
	input
		.trim()
		.split("\n")
		.forEach((line, row) =>
			line.split("").forEach((char, col) => {
				board[`${col},${row}`] = +char;
				maxX = Math.max(maxX, col);
				maxY = Math.max(maxY, row);
			})
		);

	const queue = new PriorityQueue();
	queue.enqueue([0, 0, 0, 0, 0], 0);
	const seen = new Set();

	while (!queue.isEmpty) {
		const [heat, x, y, px, py] = queue.dequeue();

		const key = [x, y, px, py].join("/");
		if (x === maxX && y === maxY) return heat;
		if (seen.has(key)) continue;
		seen.add(key);

		for (const [dx, dy] of [
			[1, 0],
			[0, 1],
			[-1, 0],
			[0, -1],
		].filter(([dx, dy]) => {
			let turn = true;
			if (dx === px && dy === py) turn = false;
			if (dx === -px && dy === -py) turn = false;
			return turn;
		})) {
			let [a, b, h] = [x, y, heat];
			for (let i = 1; i <= maxSteps; i++) {
				a = a + dx;
				b = b + dy;

				const key = `${a},${b}`;
				if (!(key in board)) continue;

				h += board[key];
				if (i >= minSteps) queue.enqueue([h, a, b, dx, dy], h);
			}
		}
	}
}

console.log(minHeat(input, 1, 3));
console.log(minHeat(input, 4, 10));

time(startTime);
