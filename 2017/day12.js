import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day12input as input } from "./inputs.js";

class ProgramVillage {
	programs = [];

	constructor(input) {
		input.forEach(line => {
			const [_, id, connections] = line.match(
				/(\d+) <-> ((?:\d+(?:, )?)+)/
			);
			const program = new Program(
				+id,
				connections.split(", ").map(id => +id)
			);
			this.programs.push(program);
		});
		this.programs.forEach(program => {
			program.connections = program.commIds.map(c =>
				this.programs.find(p => p.id === c)
			);
		});
	}

	getAllConnections(id) {
		const program = this.programs.find(p => p.id === id);
		const allConnections = new Set();
		const queue = [...program.connections];
		while (queue.length) {
			const con = queue.shift();
			if (!allConnections.has(con)) {
				allConnections.add(con);
				queue.push(...con.connections);
			}
		}
		return allConnections;
	}

	get numGroups() {
		const checkedIds = new Set();
		let numGroups = 0;
		for (const program of this.programs) {
			if (!checkedIds.has(program.id)) {
				[...this.getAllConnections(program.id)].forEach(p =>
					checkedIds.add(p.id)
				);
				numGroups++;
			}
		}
		return numGroups;
	}
}

class Program {
	connections;
	constructor(id, commIds) {
		this.id = id;
		this.commIds = commIds;
	}
}

const village = new ProgramVillage(input);

console.log("Part one:", village.getAllConnections(0).size);
console.log("Part two:", village.numGroups);

const endTime = Date.now();
timeUsed(startTime, endTime);
