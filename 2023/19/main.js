import { readFileSync } from "fs";
import { sumArr, time } from "../../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./input.txt", { encoding: "utf8" });
const test = readFileSync("./test.txt", { encoding: "utf8" });

const data = test;

const [workflows, parts] = data.split("\n\n").map(p => p.split("\n"));

const wfs = {};
for (const wf of workflows) {
	let [_, name, rules] = wf.match(/(\w+)\{(.+)\}/);
	rules = rules.split(",");
	const finalOut = rules.pop();
	rules = rules.map(r => {
		const [exp, dst] = r.split(":");
		const op = exp.match(/<|>/)[0];
		const category = exp.charAt(0);
		const checkVal = +exp.match(/\d+/)[0];
		return { op, category, checkVal, dst };
	});

	wfs[name] = {
		rules,
		finalOut,
	};
}

function partOne() {
	const acceptedParts = [];

	parts: for (let part of parts) {
		const [x, m, a, s] = part.match(/(\d)+/g).map(Number);
		part = { x, m, a, s };
		let curWf = wfs["in"];

		rules: while (true) {
			let res;
			for (const rule of curWf.rules) {
				const { op, category: cat, checkVal, dst } = rule;
				if (op === "<") {
					res = part[cat] < checkVal;
				} else if (op === ">") {
					res = part[cat] > checkVal;
				} else console.log("ERROR, INVALID OPERATOR");
				if (res === true) {
					switch (dst) {
						case "A":
							acceptedParts.push(part);
							continue parts;
						case "R":
							continue parts;
						default:
							curWf = wfs[dst];
							continue rules;
					}
				}
			}
			switch (curWf.finalOut) {
				case "A":
					acceptedParts.push(part);
					continue parts;
				case "R":
					continue parts;
				default:
					curWf = wfs[curWf.finalOut];
					continue rules;
			}
		}
	}

	return acceptedParts.reduce(
		(sum, cur) => sum + sumArr(Object.values(cur)),
		0
	);
}

function partTwo() {
	function splitRange(range, val) {
		const { min, max } = range;
		return [
			{ min, max: val - 1 },
			{ min: val, max },
		];
	}
}

console.log(partOne());
console.log(partTwo());

// 167409079868000 -- correct answer for part two test input

time(startTime);
