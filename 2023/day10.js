import { readFileSync } from "fs";
import { create2DArr, log2DArr, loop2DArr, time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day10input.txt", { encoding: "utf8" });

const grid = create2DArr(140, 140);
let startPos;

input.split("\n").forEach((row, rowI) => {
	row.split("").forEach((char, colI) => {
		grid[colI][rowI] = char;
		if (char === "S") startPos = { x: colI, y: rowI };
	});
});

const newDir = char =>
	Object.entries(pipes[char]).find(
		e => e[1] === true && e[0] !== dirInverses[dir]
	)[0];

function probe(dir, curPos, enclosed) {
	const { x, y } = curPos;
	switch (dirRights[dir]) {
		case "right":
			for (let i = x + 1; i < 140; i++) {
				const key = i + "/" + y;
				if (edgePositions.has(key)) break;
				else enclosed.add(key);
			}
			break;
		case "down":
			for (let i = y + 1; i < 140; i++) {
				const key = x + "/" + i;
				if (edgePositions.has(key)) break;
				else enclosed.add(key);
			}
			break;
		case "left":
			for (let i = x - 1; i >= 0; i--) {
				const key = i + "/" + y;
				if (edgePositions.has(key)) break;
				else enclosed.add(key);
			}
			break;
		case "up":
			for (let i = y - 1; i >= 0; i--) {
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

const pipes = {
	"|": {
		up: true,
		right: false,
		down: true,
		left: false,
	},
	"-": {
		up: false,
		right: true,
		down: false,
		left: true,
	},
	L: {
		up: true,
		right: true,
		down: false,
		left: false,
	},
	J: {
		up: true,
		right: false,
		down: false,
		left: true,
	},
	7: {
		up: false,
		right: false,
		down: true,
		left: true,
	},
	F: {
		up: false,
		right: true,
		down: true,
		left: false,
	},
};

const dirInverses = {
	up: "down",
	down: "up",
	left: "right",
	right: "left",
};

const dirRights = {
	up: "right",
	right: "down",
	down: "left",
	left: "up",
};

const edgePositions = new Set();
let curPos = { ...startPos };
let dir = "up";
let steps = 0;
while (true) {
	edgePositions.add(curPos.x + "/" + curPos.y);
	move(dir, curPos);
	steps++;
	const char = grid[curPos.x][curPos.y];
	if (char === "S") break;
	dir = newDir(char);
}

curPos = { ...startPos };
dir = "up";
const enclosed = new Set();
while (true) {
	probe(dir, curPos, enclosed);
	move(dir, curPos);
	probe(dir, curPos, enclosed);
	const char = grid[curPos.x][curPos.y];
	if (char === "S") break;
	dir = newDir(char);
}

console.log("Part one:", steps / 2);
console.log("Part two:", enclosed.size);

time(startTime);
