import { maxInArr, sumArr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day24input as input } from "./inputs.js";

// const input = ["0/1", "0/2", "2/2", "2/3", "3/5", "3/4", "1/10", "9/10"];

const components = input.map(line => {
	const [_, a, b] = line.match(/(\d+)\/(\d+)/);

	return [+a, +b];
});

let allBridges = [];
let maxStrength = 0;
let strongestBridge;
const starters = components.filter(c => c.includes(0));
starters.forEach(s => getBridges([s], s[1]));

function getBridges(bridge, curPort) {
	const validComps = components.filter(
		c => !bridge.includes(c) && c.includes(curPort)
	);
	if (validComps.length === 0) {
		allBridges.push(bridge);
		const strength = sumArr(bridge.flat());
		if (strength > maxStrength) {
			strongestBridge = bridge;
			maxStrength = strength;
		}
	} else {
		for (const next of validComps) {
			const newBridge = [...bridge, next];
			const newPort = next.find(p => p !== curPort);
			getBridges(newBridge, newPort);
		}
	}
}

console.log("Part one:", maxStrength);
console.log(allBridges.length);

const endTime = Date.now();
timeUsed(startTime, endTime);
