import { create2DArr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day22input as input } from "./inputs.js";

const grid = {};
const posKey = pos => `${pos.x}/${pos.y}`;

input.forEach((row, rowI) => {
	[...row].forEach((char, colI) => {
		const pos = { x: colI, y: rowI };
		grid[posKey(pos)] = char === "#" ? "infected" : "clean";
	});
});

class Virus {
	constructor(grid) {
		this.grid = { ...grid };
	}
	dirs = ["up", "right", "down", "left"];
	dirI = 0;
	pos = { x: (input[0].length - 1) / 2, y: (input.length - 1) / 2 };
	numInfected = 0;

	burst() {
		const state = this.standingOn;
		if (state === "infected") {
			this.turnRight();
			this.state = "clean";
		} else if (state === "clean") {
			this.turnLeft();
			this.state = "infected";
			this.numInfected++;
		}
		this.moveForward();
	}

	/**
	 * @param {CellState} state
	 */
	set state(state) {
		this.grid[posKey(this.pos)] = state;
	}

	get facing() {
		return this.dirs[this.dirI];
	}

	get standingOn() {
		const pos = posKey(virus.pos);
		if (!(pos in this.grid)) this.grid[pos] = "clean";
		return this.grid[pos];
	}

	turnRight() {
		this.dirI = (this.dirI + 1) % this.dirs.length;
	}

	turnLeft() {
		this.dirI = (this.dirI - 1 + this.dirs.length) % this.dirs.length;
	}

	moveForward() {
		switch (this.facing) {
			case "up":
				this.pos.y--;
				break;
			case "right":
				this.pos.x++;
				break;
			case "down":
				this.pos.y++;
				break;
			case "left":
				this.pos.x--;
				break;
		}
	}
}

let virus = new Virus(grid);

for (let i = 0; i < 1e4; i++) {
	virus.burst();
}
console.log("Part one:", virus.numInfected);

virus = new Virus(grid);
virus.burst = function () {
	const cur = this.standingOn;
	switch (cur) {
		case "clean":
			this.turnLeft();
			this.state = "weakened";
			break;
		case "weakened":
			this.state = "infected";
			this.numInfected++;
			break;
		case "infected":
			this.turnRight();
			this.state = "flagged";
			break;
		case "flagged":
			this.turnLeft();
			this.turnLeft();
			this.state = "clean";
			break;
	}
	this.moveForward();
};
for (let i = 0; i < 1e7; i++) {
	virus.burst();
}
console.log("Part two:", virus.numInfected);

const endTime = Date.now();
timeUsed(startTime, endTime);
