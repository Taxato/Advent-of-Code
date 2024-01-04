import { readFileSync } from "fs";
import { sumArr, time } from "../../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./input.txt", { encoding: "utf8" });
const test = readFileSync("./test.txt", { encoding: "utf8" });

function partOne(input) {
	const [workflows, parts] = input.split("\n\n").map(p => p.split("\n"));

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

function partTwo(input) {
	const workflows = input.split("\n\n")[0].split("\n");

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

	const initialPart = {
		wf: "in",
		ruleIndex: 0,
		x: { min: 1, max: 4000 },
		m: { min: 1, max: 4000 },
		a: { min: 1, max: 4000 },
		s: { min: 1, max: 4000 },
	};
	const parts = [initialPart];

	const accepted = [];

	loop: while (parts.length) {
		const curPart = parts.shift();
		let wf;
		switch (curPart.wf) {
			case "A":
				accepted.push([curPart.x, curPart.m, curPart.a, curPart.s]);
				continue loop;
			case "R":
				continue loop;
			default:
				wf = wfs[curPart.wf];
		}
		rules: for (const rule of wf.rules) {
			const newPart = {
				...curPart,
				wf: rule.dst,
			};
			if (rule.op === "<") {
				if (curPart[rule.category].min >= rule.checkVal) continue rules;

				newPart[rule.category].max = rule.checkVal - 1;
				parts.push(newPart);
			} else {
				if (curPart[rule.category].min <= rule.checkVal) continue rules;

				newPart[rule.category].min = rule.checkVal + 1;
				parts.push(newPart);
			}
		}
		parts.push({
			...curPart,
			wf: wf.finalOut,
		});
	}
	console.log(accepted);
	console.log(Object.values(accepted[0]));
	return Object.values(accepted[0]).reduce(
		(sum, cur) => sum * (cur.max - cur.min),
		1
	);
}

// console.log(partOne(input));
console.log(partTwo(test));

// 167409079868000 -- correct answer for part two test input
// 2727294722040
time(startTime);
