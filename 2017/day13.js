import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day13input as input } from "./inputs.js";

class Scanner {
	curLayer = 1;
	dir = "down";

	constructor(depth, range) {
		this.depth = depth;
		this.range = range;
	}

	update() {
		if (this.dir === "down") {
			this.curLayer++;
			if (this.curLayer === this.range) this.dir = "up";
		} else {
			this.curLayer--;
			if (this.curLayer === 1) this.dir = "down";
		}
	}
}

class State {
	timePassed = 0;
	packetPos = -1;
	severity = 0;
	scanners = [];
	started = false;
	finished = false;

	constructor(rangeDepthPairs) {
		rangeDepthPairs.forEach(pair => {
			this.scanners.push(new Scanner(...pair));
		});
	}

	update() {
		this.timePassed++;
		if (this.started) {
			this.packetPos++;
			if (this.packetPos > this.scanners.at(-1).depth) {
				this.finished = true;
				return;
			}
		}

		const scanner = this.scanners.find(s => s.depth === this.packetPos);

		if (scanner && scanner.curLayer === 1) {
			this.severity += scanner.range * scanner.depth;
		}
		this.scanners.forEach(s => {
			s.update();
		});
	}
}

const partOne = new State(input);
partOne.started = true;
while (!partOne.finished) {
	partOne.update();
}
console.log("Part one:", partOne.severity);

let delay = 0;
while (true) {
	const state = new State(input);
	for (let i = 0; i < delay; i++) {
		state.update();
	}
	state.started = true;
	delay++;

	while (!state.finished) {
		state.update();
		if (state.severity > 0) break;
	}
	if (state.severity === 0) {
		console.log(delay);
		break;
	}
}

const endTime = Date.now();
timeUsed(startTime, endTime);
