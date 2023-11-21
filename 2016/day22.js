import { create2DArr, log2DArr, loop2DArr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day22input as input } from "./inputs.js";

const testInput = [
	"Filesystem            Size  Used  Avail  Use%",
	"/dev/grid/node-x0-y0   10T    8T     2T   80%",
	"/dev/grid/node-x0-y1   11T    6T     5T   54%",
	"/dev/grid/node-x0-y2   32T   28T     4T   87%",
	"/dev/grid/node-x1-y0    9T    7T     2T   77%",
	"/dev/grid/node-x1-y1    8T    0T     8T    0%",
	"/dev/grid/node-x1-y2   11T    7T     4T   63%",
	"/dev/grid/node-x2-y0   10T    6T     4T   60%",
	"/dev/grid/node-x2-y1    9T    8T     1T   88%",
	"/dev/grid/node-x2-y2    9T    6T     3T   66%",
];

class Node {
	target = false;

	constructor(index, pos, size, used) {
		this.index = index;
		this.pos = { x: +pos.x, y: +pos.y };
		this.size = +size;
		this.used = +used;
		this.avail = size - used;
		this.hash = Object.values(this.pos).join("/");
	}

	clone() {
		return new Node(this.pos, this.size, this.used);
	}
}

class NodeCluster {
	constructor(nodes) {
		this.nodePositions = new Set();
		this.nodes = nodes.map(({ x, y, size, used }, index) => {
			const node = new Node(index, { x, y }, size, used);
			this.nodePositions.add(node.hash);
			return node;
		});

		this.nodes.forEach(n => {
			n.neighbors = this.getNeighbors(n);
		});
	}

	setTargetNode() {
		let maxX = 0;
		let maxNode;
		this.nodes.forEach(node => {
			if (node.pos.y === 0) {
				if (node.pos.x > maxX) {
					maxX = node.pos.x;
					maxNode = node;
				}
			}
		});
		maxNode.target = true;
	}

	nodeHash(pos) {
		return Object.values(pos).join("/");
	}

	findNode(nodeHash) {
		if (!this.nodePositions.has(nodeHash)) return null;
		const [_, hashX, hashY] = nodeHash.match(/(\d+)\/(\d+)/);
		return this.nodes.find(n => n.pos.x === +hashX && n.pos.y === +hashY);
	}

	getNeighbors(node) {
		const neighbors = [];

		for (const dir of [
			[1, 0],
			[0, 1],
			[-1, 0],
			[0, -1],
		]) {
			const [x, y] = dir;
			const nX = node.pos.x + x;
			const nY = node.pos.y + y;
			const nHash = this.nodeHash({ nX, nY });
			if (this.nodePositions.has(nHash))
				neighbors.push(
					this.nodes.find(n => n.pos.x === nX && n.pos.y === nY)
				);
		}
		return neighbors;
	}

	nextStates() {
		const nextStates = [];

		return nextStates;
	}

	generateState(nodes, instruction) {
		const [from, to] = instruction;
		const updatedFrom = new Node(from.pos, from.size, 0);
		const updatedTo = new Node(to.pos, to.size, to.used + from.used);

		const updatedNodes = nodes.map(n => n.clone());
		updatedNodes[from.index] = updatedFrom;
		updatedNodes[to.index] = updatedTo;

		return new NodeCluster(updatedNodes);
	}
}

const initialNodes = input.slice(2).map(line => {
	const [_, x, y, size, used] = line.match(/x(\d+)-y(\d+).+?(\d+).+?(\d+)/);
	return { x, y, size, used };
});

const initalState = new NodeCluster(initialNodes);

// Part one
/* let numViablePairs = 0;
for (const nodeA of initalState.nodes) {
	for (const nodeB of initalState.nodes) {
		if (nodeA === nodeB) continue;
		if (nodeA.used === 0) continue;
		if (nodeA.used <= nodeB.avail) numViablePairs++;
	}
}
console.log(numViablePairs); */

// Part Two
// const queue = [initalState.nextStates()];
// while (queue.length) {
// 	const state = queue.shift();
// }

const testState = new NodeCluster(
	testInput.slice(1).map(line => {
		const [_, x, y, size, used] = line.match(
			/x(\d+)-y(\d+).+?(\d+).+?(\d+)/
		);
		return { x, y, size, used };
	})
);
testState.setTargetNode();

// const testGrid = create2DArr(3, 3, 0);
// testState.nodes.forEach(node => {
// 	const { x, y } = node.pos;
// 	let output;
// 	if (node.used === 0) output = "_";
// 	else if (node.size > 20) output = "#";
// 	else output = ".";

// 	if (x === 0 && y === 0) output = `(${output})`;
// 	if (node.target) output = "G";

// 	output = output.padEnd(5, " ");
// 	testGrid[x][y] = output;
// });
// log2DArr(testGrid, true);

const grid = create2DArr(34, 31, null);
initalState.setTargetNode();
for (const node of initalState.nodes) {
	const { x, y } = node.pos;
	let output;
	if (node.used === 0) output = "_";
	else if (node.size > 400) output = "#";
	else output = ".";

	if (x === 0 && y === 0) output = `(${output})`;
	if (node.target) output = "G";

	output = output.padEnd(3, " ");
	grid[x][y] = output;
}
log2DArr(grid, true);

const endTime = Date.now();
timeUsed(startTime, endTime);

// 69 to get to front of G
// per G left-move : 5
// spaces to move left: 33
// 69 + 5*33
