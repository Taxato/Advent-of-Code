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

	willGetCaught(delay) {
		// caught at delay = if (depth+delay) % ((range-1)*2) === 0
		return (this.depth + delay) % ((this.range - 1) * 2) === 0;
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
	packetPos = -1;
	severity = 0;
	scanners = [];
	started = false;
	finished = false;

	constructor(rangeDepthPairs) {
		rangeDepthPairs.forEach(pair => {
			this.scanners.push(new Scanner(...pair));
		});
		this.maxDepth = this.scanners.at(-1).depth;
	}

	delay(time) {
		for (let i = 0; i < time; i++) {
			this.update();
		}
	}

	update() {
		if (this.started) {
			this.packetPos++;
			if (this.packetPos > this.maxDepth) {
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

	willGetCaught(delay) {
		return this.scanners.some(s => s.willGetCaught(delay));
	}

	run() {
		this.started = true;
		while (!this.finished) {
			this.update();
		}
	}
}

const partOne = new State(input);
partOne.run();
console.log("Part one:", partOne.severity);

const state = new State(input);
let delay = -1;
while (state.willGetCaught(++delay));
console.log("Part two:", delay);

const endTime = Date.now();
timeUsed(startTime, endTime);
