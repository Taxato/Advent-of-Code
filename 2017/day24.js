import { maxInArr, sumArr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day24input as input } from "./inputs.js";

const allPieces = input.map(line => {
	const [_, a, b] = line.match(/(\d+)\/(\d+)/);
	return [+a, +b];
});

function getBridges(
	pieces,
	bridge = { strength: 0, length: 0 },
	connector = 0
) {
	let bridges = [];

	for (const piece of pieces) {
		if (piece.includes(connector)) {
			const newBridge = {
				strength: bridge.strength + sumArr(piece),
				length: bridge.length + 1,
			};

			bridges.push(newBridge);
			const piecesLeft = pieces.filter(p => p !== piece);
			const newConnector = piece[0] === connector ? piece[1] : piece[0];

			bridges = bridges.concat(
				getBridges(piecesLeft, newBridge, newConnector)
			);
		}
	}

	return bridges;
}
const allBridges = getBridges(allPieces);

const maxStrength = allBridges.sort((a, b) => b.strength - a.strength)[0]
	.strength;

const strongestLongest = allBridges
	.sort((a, b) => b.length - a.length)
	.filter((b, _i, arr) => b.length === arr[0].length)
	.sort((a, b) => b.strength - a.strength)[0].strength;

console.log("Part one:", maxStrength);
console.log("Part two:", strongestLongest);

const endTime = Date.now();
timeUsed(startTime, endTime);
