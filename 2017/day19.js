import { Grid, create2DArr, log2dArr, loop2DArr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day19input as input } from "./inputs.js";

/* class State {
	dirs = ["up,down,right,left"];

	constructor(maze, pos, dir, steps, letters) {
		this.maze = maze;
		this.pos = { ...pos };
		this.dir = dir;
		this.steps = steps;
		this.letters = letters;
	}

	step() {
		const char = this.maze.grid[this.pos.x][this.pos.y];

		let nextPos;
		("|-+");
		switch (char) {
			case "|":
		}
		return nextPos;
	}
} */

const maze = create2DArr(input[0].length, input.length);
loop2DArr(maze, (col, row) => {
	maze[col][row] = input[row][col];
});

let dir = "down";
let steps = 1;
let prevChar;
let startPos;
let out = "";
for (let i = 0; i < maze.length; i++) {
	if (maze[i][0] === "|") {
		startPos = i;
		break;
	}
}
let pos = { x: startPos, y: 0 };

while (true) {
	prevChar = maze[pos.x][pos.y];
	move(dir);
	steps++;

	const newChar = maze[pos.x][pos.y];

	if (newChar === " ")
		console.log(steps, prevChar, dir, pos, "ERROR, MOVED ONTO NULL SPOT");
	if (newChar !== "|" && newChar !== "-") {
		if (newChar !== "+") out += newChar;

		const neighbors = {
			nU: maze[pos.x][pos.y - 1],
			nD: maze[pos.x][pos.y + 1],
			nL: maze[pos.x - 1][pos.y],
			nR: maze[pos.x + 1][pos.y],
		};

		if (Object.values(neighbors).join("").replaceAll(" ", "").length === 1)
			break;

		switch (dir) {
			case "up":
			case "down":
				if (neighbors.nU !== " " && neighbors.nD !== " ") continue;
				if (neighbors.nL === " ") dir = "right";
				else dir = "left";
				break;
			case "left":
			case "right":
				if (neighbors.nL !== " " && neighbors.nR !== " ") continue;
				if (neighbors.nU === " ") dir = "down";
				else dir = "up";
				break;
		}
	}
}
console.log("Part one:", out);
console.log("Part two:", steps);

function move(dir) {
	switch (dir) {
		case "up":
			pos.y--;
			break;
		case "down":
			pos.y++;
			break;
		case "left":
			pos.x--;
			break;
		case "right":
			pos.x++;
			break;
	}
}

const endTime = Date.now();
timeUsed(startTime, endTime);
