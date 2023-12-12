import { readFileSync } from "fs";
import { time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day7input.txt", { encoding: "utf8" });
// const input = readFileSync("./day7test.txt", { encoding: "utf8" });

let instructions = input.split("\n").map(inst => {
	const [_, a, b] = inst.match(
		/Step (\w) must be finished before step (\w) can begin./
	);
	return [a, b];
});

function runInstructions(
	instructions,
	numWorkers = 1,
	offsetAlphabet = false,
	timeOffset = 0
) {
	const alphabet = "_ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	const requirements = {};
	instructions.forEach(([a, b]) => {
		requirements[a] = [];
		requirements[b] = [];
	});
	const stepKeys = Object.keys(requirements);

	stepKeys.forEach(a => {
		instructions
			.filter(i => i[1] === a)
			.map(i => i[0])
			.forEach(b => {
				requirements[a].push(b);
			});
		requirements[a].sort();
	});

	let time = 0;
	const remaining = new Set(stepKeys);
	const order = [];
	let inProgress = [];
	while (remaining.size > 0 || inProgress.length > 0) {
		let nextSteps = stepKeys
			.filter(s => remaining.has(s))
			.filter(s => {
				let validNext = true;
				for (const req of requirements[s]) {
					if (!order.includes(req)) validNext = false;
				}
				return validNext;
			});
		nextSteps.sort();
		nextSteps = nextSteps.slice(0, numWorkers);

		for (const s of nextSteps) {
			if (inProgress.length === numWorkers) break;
			const timer =
				timeOffset + (offsetAlphabet ? alphabet.indexOf(s) : 0);
			inProgress.push({ step: s, timer });
			remaining.delete(s);
		}

		inProgress.forEach(p => p.timer--);
		for (const p of inProgress) {
			if (p.timer <= 0) {
				order.push(p.step);
			}
		}
		inProgress = inProgress.filter(p => p.timer > 0);
		time++;
	}

	return [order.join(""), time];
}

console.log("Part one:", runInstructions(instructions, 1)[0]);
console.log("Part two:", runInstructions(instructions, 5, true, 60)[1]);

time(startTime);
