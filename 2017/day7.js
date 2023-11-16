import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day7input as input } from "./inputs.js";

class Program {
	parent = null;
	constructor(name, weight, children) {
		this.name = name;
		this.weight = weight;
		this.children = children ? children : null;
	}

	get totalWeight() {
		if (!this.children) return this.weight;
		return (
			this.weight +
			this.children.reduce((sumC, curC) => (sumC += curC.totalWeight), 0)
		);
	}
}

const programs = [];

// Parse input
const regex =
	/(?<name>[a-z]+) \((?<weight>\d+)\)(?: -> )?(?<children>[\w, ]+)?/;
input.forEach(line => {
	const { name, weight, children } = line.match(regex).groups;
	programs.push(
		new Program(name, +weight, children ? children.split(", ") : null)
	);
});

// Map parents and children
programs.forEach(program => {
	if (program.children) {
		program.children = program.children.map(c => {
			const child = programs.find(p => p.name === c);
			child.parent = program;
			return child;
		});
	}
});
function findCorrectedWeight(input) {
	const deviant = input.find(
		p =>
			p.parent &&
			p.children &&
			p.parent.children.filter(c => c.totalWeight !== p.totalWeight)
				.length > 1 &&
			new Set(p.children.map(c => c.totalWeight)).size === 1
	);

	return (
		deviant.weight -
		Math.abs(
			deviant.parent.children.find(c => c !== deviant).totalWeight -
				deviant.totalWeight
		)
	);
}

const partOne = programs.find(p => p.parent === null).name;
const partTwo = findCorrectedWeight(programs);

console.log("Part one:", partOne);
console.log("Part two:", partTwo);
const endTime = Date.now();
timeUsed(startTime, endTime);
