import { readFileSync } from "fs";
import { time } from "../../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./input.txt", { encoding: "utf8" });
const test = readFileSync("./test.txt", { encoding: "utf8" });
const data = input;

const dirRights = {
	up: "right",
	right: "down",
	down: "left",
	left: "up",
};

const dirInverses = {
	up: "down",
	down: "up",
	left: "right",
	right: "left",
};

const dirs = {
	R: "right",
	U: "up",
	L: "left",
	D: "down",
};

function probe(dir, curPos, enclosed) {
	const { x, y } = curPos;
	switch (dirRights[dir]) {
		case "right":
			for (let i = x + 1; i < 3e4; i++) {
				const key = i + "/" + y;
				if (edgePositions.has(key)) break;
				else enclosed.add(key);
			}
			break;
		case "down":
			for (let i = y + 1; i < 3e4; i++) {
				const key = x + "/" + i;
				if (edgePositions.has(key)) break;
				else enclosed.add(key);
			}
			break;
		case "left":
			for (let i = x - 1; i >= -3e4; i--) {
				const key = i + "/" + y;
				if (edgePositions.has(key)) break;
				else enclosed.add(key);
			}
			break;
		case "up":
			for (let i = y - 1; i >= -3e4; i--) {
				const key = x + "/" + i;
				if (edgePositions.has(key)) break;
				else enclosed.add(key);
			}
			break;
	}
}

function move(dir, curPos) {
	switch (dir) {
		case "up":
			curPos.y--;
			break;
		case "right":
			curPos.x++;
			break;
		case "down":
			curPos.y++;
			break;
		case "left":
			curPos.x--;
			break;
	}
}

const curPos = { x: 0, y: 0 };
const key = pos => pos.x + "/" + pos.y;

const start = key(curPos);

const edges = [];
const edgePositions = new Set();
const dug = new Set();

edgePositions.add(start);
edges.push(start);

// First pass, create edges
for (const inst of data.split("\n")) {
	let [_, dir, numSteps, _color] = inst.match(/(\w) (\d+) \((#\w{6})\)/);

	dir = dirs[dir];

	for (let i = 0; i < +numSteps; i++) {
		move(dir, curPos);
		const posKey = key(curPos);
		edges.push(posKey);
		edgePositions.add(posKey);
	}
}

// Second pass, probe inside
for (const inst of data.split("\n")) {
	let [_, dir, numSteps, _color] = inst.match(/(\w) (\d+) \((#\w{6})\)/);

	dir = dirs[dir];

	for (let i = 0; i < +numSteps; i++) {
		move(dir, curPos);
		probe(dir, curPos, dug);
	}
}
console.log(dug.size + edgePositions.size);

time(startTime);
