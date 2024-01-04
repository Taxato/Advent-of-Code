import { readFileSync } from "fs";
import { time } from "../../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./input.txt", { encoding: "utf8" });
const test = readFileSync("./test.txt", { encoding: "utf8" });
const data = test;

const dirs = {
	R: [1, 0],
	U: [0, -1],
	L: [-1, 0],
	D: [0, 1],
};

function numPoints(outline, len) {
	// shoelace formula
	let area = 0;
	for (let i = 0; i < outline.length - 1; i++) {
		const vertex = outline[i];
		const nextVertex = outline[i + 1];

		area += vertex.y * nextVertex.x - vertex.x * nextVertex.y;
	}
	area /= 2;

	// picks theorem, the minus one to length is due to outline including starting point twice
	return Math.abs(area) + len / 2 + 1;
}

function partOne(input) {
	let len = 0;
	const pos = { x: 0, y: 0 };
	const points = [{ ...pos }];

	for (const inst of input.split("\n")) {
		const [_, dir, numSteps, _color] = inst.match(
			/(\w) (\d+) \((#\w{6})\)/
		);

		const [xOff, yOff] = dirs[dir];

		len += +numSteps;
		pos.x += xOff * +numSteps;
		pos.y += yOff * +numSteps;
		points.push({ ...pos });
	}

	return numPoints(points, len);
}

function partTwo(input) {
	let len = 0;
	const pos = { x: 0, y: 0 };
	const points = [{ ...pos }];

	const opDirs = ["R", "D", "L", "U"];

	for (const inst of input.split("\n")) {
		const [_, op] = inst.match(/#(\w{6})/);

		const [xOff, yOff] = dirs[opDirs[+op.slice(-1)]];
		const numSteps = Number("0x" + op.slice(0, 5));

		pos.x += xOff * numSteps;
		pos.y += yOff * numSteps;
		len += +numSteps;
		points.push({ ...pos });
	}

	return numPoints(points, len);
}

console.log("Part one:", partOne(input));
console.log("Part two:", partTwo(input));

time(startTime);
