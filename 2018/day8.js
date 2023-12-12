import { readFileSync } from "fs";
import { sumArr, time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day8input.txt", { encoding: "utf8" })
	// const input = readFileSync("./day8test.txt", { encoding: "utf8" })
	.split(" ")
	.map(Number);

let cursor = 0;

const nodes = [];

function getNodes() {
	const numChildren = input[cursor];
	const numData = input[cursor + 1];

	cursor += 2;

	const children = [];

	let i = numChildren;
	while (i > 0) {
		children.push(getNodes());
		i--;
	}
	const data = input.slice(cursor, cursor + numData);
	cursor += numData;

	let value = 0;
	if (children.length > 0) {
		for (const d of data) {
			if (d === 0 || d > children.length) continue;
			value += children[d - 1].value;
		}
	} else {
		value = sumArr(data);
	}

	const node = { numChildren, numData, data, children, value };
	nodes.push(node);
	return node;
}

getNodes();
console.log(
	nodes
		.map(n => n.data)
		.flat()
		.reduce((sum, cur) => sum + cur, 0)
);
console.log(nodes.at(-1).value);

time(startTime);
