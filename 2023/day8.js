import { readFileSync } from "fs";
import { arrProduct, sumArr, time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day8input.txt", { encoding: "utf8" });

const [instructions, nodeInputs] = input.split("\n\n");

const nodes = {};

nodeInputs.split("\n").forEach(line => {
	const [node, left, right] = line.match(/[A-Z]{3}/g);
	nodes[node] = { left, right };
});

const turns = instructions.split("");

let curNode = "AAA";
let numSteps = 0;

for (let i = 0; true; i = (i + 1) % turns.length) {
	const dir = turns[i];
	if (dir === "L") curNode = nodes[curNode].left;
	if (dir === "R") curNode = nodes[curNode].right;
	numSteps++;
	if (curNode === "ZZZ") break;
}
console.log("Part one:", numSteps);

let curNodes = Object.keys(nodes).filter(n => n.endsWith("A"));

const factors = [];

for (const n of curNodes) {
	let curNode = n;
	let numSteps = 0;

	for (let i = 0; true; i = (i + 1) % turns.length) {
		const dir = turns[i];
		if (dir === "L") curNode = nodes[curNode].left;
		if (dir === "R") curNode = nodes[curNode].right;
		numSteps++;
		if (curNode.endsWith("Z")) break;
	}
	factors.push(numSteps);
}

const ffactors = [];
for (const f of factors) {
	const ff = [];
	for (let i = 2; i <= Math.sqrt(f); i++) {
		if (f % i === 0) {
			ff.push(i);
			ff.push(f / i);
		}
	}
	ffactors.push(ff);
}

console.log("Part two", arrProduct([...new Set(ffactors.flat())]));

time(startTime);
