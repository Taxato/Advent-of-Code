import { sumArr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day24input as input } from "./inputs.js";

class Pit {
	constructor(input) {
		this.allComps = input.map(str => {
			const [_, portA, portB] = str.match(/(\w+)\/(\w+)/);
			return [+portA, +portB];
		});
	}

	strongestBridge() {
		let maxStrength = 0;
		let strongestBridge;

		for (const bridge of this.generateBridges()) {
			const strength = sumArr(bridge.flat());
			if (strength > maxStrength) {
				maxStrength = strength;
				strongestBridge = bridge;
			}
		}

		return maxStrength;
	}

	generateBridges(allBridges = [], bridge = []) {
		const availComps =
			bridge.length === 0
				? this.allComps.filter(c => c.includes(0))
				: this.allComps.filter(
						c =>
							!bridge.includes(c) &&
							c.reduce(
								(included, port) =>
									bridge.at(-1).includes(port) || included,
								false
							)
				  );

		if (availComps.length === 0) allBridges.push(bridge);

		availComps.forEach(comp => {
			const newBridge = [...bridge, comp];

			this.generateBridges(allBridges, newBridge);
		});

		return allBridges;
	}
}

const pit = new Pit(input);
console.log(pit.strongestBridge());

const endTime = Date.now();
timeUsed(startTime, endTime);
