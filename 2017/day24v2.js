function getExtendedBridges(bridge, pieces, connector) {
	let bridges = [];

	for (let i = 0; i < pieces.length; i++) {
		if (pieces[i].a === connector || pieces[i].b === connector) {
			let newBridge = {
				strength: bridge.strength + pieces[i].a + pieces[i].b,
				chainLength: bridge.chainLength + 1,
			};

			bridges.push(newBridge);

			let leftpieces = pieces.slice();
			leftpieces.splice(i, 1);

			let newConnector =
				pieces[i].a === connector ? pieces[i].b : pieces[i].a;

			bridges = bridges.concat(
				getExtendedBridges(newBridge, leftpieces, newConnector)
			);
		}
	}

	return bridges;
}

function getPiecesFrom(data) {
	return data.map(line => {
		const [_, a, b] = line.match(/(\d+)\/(\d+)/);
		return { a: +a, b: +b };
	});
}

function solve1(data) {
	let pieces = getPiecesFrom(data);
	let bridges = getExtendedBridges(
		{ strength: 0, chainLength: 0 },
		pieces,
		0
	);
	console.log(bridges.length);
	return bridges.sort((a, b) => b.strength - a.strength)[0].strength;
}

console.log(solve1(input));

import { day24input as input } from "./inputs.js";
