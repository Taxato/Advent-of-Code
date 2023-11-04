import { combinations } from "../helper.js";

import { day11input as input } from "./inputs.js";

class Item {
	constructor(element) {
		this.element = element;
	}

	get repr() {
		return `${this.constructor.name}${this.element}`;
	}

	eq(other) {
		return this.repr === other.repr;
	}
}
class Chip extends Item {}
class Gen extends Item {}

class Floor {
	constructor(gens, chips) {
		this.gens = gens;
		this.chips = chips;
	}

	get items() {
		return new Set([...this.gens, ...this.chips]);
	}

	remove(item) {
		if (item instanceof Gen) this.gens.delete(item);
		else this.chips.delete(item);
	}

	add(item) {
		if (item instanceof Gen) this.gens.add(item);
		else this.chips.add(item);
	}

	clone() {
		return new Floor(new Set(this.gens), new Set(this.chips));
	}
}

class State {
	constructor(elevator, floors, steps) {
		this.elevator = elevator;
		this.floors = floors;
		this.steps = steps;

		this.topFloor = this.floors.length;
	}

	get repr() {
		let res = String(this.steps);
		for (const floor of this.floors) {
			res += [...floor.items].map(item => item.repr).join(",") + "//";
		}
		return res;
	}

	get hash() {
		const itemPairs = {};

		this.floors.forEach((floor, i) => {
			floor.chips.forEach(chip => {
				itemPairs[chip.element] = [i];
			});
		});
		this.floors.forEach((floor, i) => {
			floor.gens.forEach(gen => {
				itemPairs[gen.element].push(i);
			});
		});
		return (
			JSON.stringify(
				Object.values(itemPairs).sort((a, b) => a[0] - b[0])
			) + this.elevator
		);
	}

	eq(other) {
		return this.hash === other.hash;
	}

	get isValid() {
		for (const floor of this.floors) {
			if (floor.gens.size === 0) continue;

			for (const chip of floor.chips) {
				let matchingGen = false;
				for (const gen of floor.gens) {
					if (chip.element === gen.element) {
						matchingGen = true;
						break;
					}
				}
				if (!matchingGen) return false;
			}
		}
		return true;
	}

	get isComplete() {
		return this.floors.slice(0, -1).every(floor => floor.items.size === 0);
	}

	nextStates() {
		const curFloor = this.floors[this.elevator];
		const allNextStates = [];
		for (const dir of [-1, 1]) {
			if (this.elevator + dir < 0 || this.elevator + dir >= this.topFloor)
				continue;

			for (const numItems of [1, 2]) {
				combinations(curFloor.items, numItems).forEach(items => {
					const newState = this.generateState(dir, items);
					if (newState.isValid) allNextStates.push(newState);
				});
			}
		}
		return allNextStates;
	}

	generateState(dir, items) {
		const newFloors = this.floors.map(floor => floor.clone());
		for (const item of items) {
			newFloors[this.elevator].remove(item);
			newFloors[this.elevator + dir].add(item);
		}

		return new State(this.elevator + dir, newFloors, this.steps + 1);
	}
}

const initialFloors = input.map(line => {
	const items = { gens: new Set(), chips: new Set() };
	Array.from(
		line.matchAll(/(\w+)(?:-compatible)? (generator|microchip)/g)
	).forEach(match => {
		const [_, name, type] = match;
		if (type === "generator") items.gens.add(new Gen(name));
		else items.chips.add(new Chip(name));
	});
	return new Floor(items.gens, items.chips);
});

const initialState = new State(0, initialFloors, 0);

function run(initialState) {
	const queue = [initialState];
	const visited = new Set(initialState.hash);

	while (queue.length) {
		const state = queue.shift();
		if (state.isComplete) return state.steps;

		for (const nextState of state.nextStates()) {
			if (!visited.has(nextState.hash)) {
				queue.push(nextState);
				visited.add(nextState.hash);
			}
		}
	}
}

const partOne = run(initialState);

for (const element of ["elerium", "dilithium"]) {
	initialState.floors[0].add(new Gen(element));
	initialState.floors[0].add(new Chip(element));
}
const partTwo = run(initialState);

console.log(partOne);
console.log(partTwo);
