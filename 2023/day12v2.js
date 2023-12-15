import { readFileSync } from "fs";
import { time } from "../helper.js";
const startTime = process.hrtime();

// const input = readFileSync("./day12input.txt", { encoding: "utf8" });
const input = readFileSync("./day12test.txt", { encoding: "utf8" });

class State {
	constructor(str, repeat = false) {
		let [springs, groups] = str.split(" ");

		if (repeat) {
			springs = (springs + "?").repeat(5).slice(0, -1);
			groups = (groups + ",").repeat(5).slice(0, -1);
		}
		groups = groups.split(",").map(Number);
		springs = springs.split("");

		this.springs = springs;
		this.groups = groups;
		this.index = this.springs.findIndex(s => s === "?");
	}

	nextStates() {
		const states = [];
		for (const choice of [".", "#"]) {
			const newSprings = [...this.springs];
			newSprings[this.index] = choice;
			states.push(this.generateState(newSprings, this.groups));
		}
		return states;
	}

	get isComplete() {
		if (!this.springs.some(s => s === "?")) return true;
		else return false;
	}

	get isValid() {
		const brokenSprings = this.springs
			.join("")
			.split(/\.+/)
			.filter(s => s);
		let valid = true;

		for (let i = 0; i < this.groups.length; i++) {
			if (brokenSprings[i].length !== this.groups[i]) {
				valid = false;
				break;
			}
		}
		return valid;
	}

	generateState(springs, groups) {
		const str = springs.join("") + " " + groups.join(",");
		return new State(str);
	}

	get hash() {
		return this.springs.join("/") + "//" + this.groups.join("/");
	}
}

const initialState = new State(input.split("\n")[1], true);
// console.log(initialState);

const queue = [initialState];
const checkedStates = new Set([initialState.hash]);
let total = 0;
while (queue.length) {
	const state = queue.shift();

	if (state.isComplete) {
		if (state.isValid) total++;
	} else {
		for (const next of state.nextStates()) {
			if (!checkedStates.has(next.hash)) {
				queue.push(next);
				checkedStates.add(next.hash);
			}
		}
	}
}
console.log(total);

time(startTime);
