import { readFileSync } from "fs";
import { sumArr, time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day9input.txt", { encoding: "utf8" });

console.log(
	sumArr(
		input
			.split("\n")
			.map(line => line.split(" ").map(Number))
			.map(history => {
				let feed = history;
				let sum = history.at(-1);
				while (true) {
					feed = feed.slice(0, -1).map((n, i) => feed[i + 1] - n);
					sum += feed.at(-1);
					if (feed.every(n => n === 0) || feed.length === 1) break;
				}
				return sum;
			})
	)
);

console.log(
	sumArr(
		input
			.split("\n")
			.map(line => line.split(" ").map(Number))
			.map(history => {
				let feed = history;
				let starts = [history[0]];
				while (true) {
					feed = feed.slice(0, -1).map((n, i) => feed[i + 1] - n);
					starts.push(feed[0]);
					if (feed.every(n => n === 0) || feed.length === 1) break;
				}
				let sum = feed[0];
				for (let i = starts.length - 1; i >= 0; i--) {
					sum = starts[i] - sum;
				}
				return sum;
			})
	)
);

time(startTime);
