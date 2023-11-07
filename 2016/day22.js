import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day22input as input } from "./inputs.js";

class Node {
	constructor(pos, size, used) {
		this.pos = { x: +pos.x, y: +pos.y };
		this.size = +size;
		this.used = +used;
		this.avail = size - used;
	}

	hash(pos = this.pos) {
		return Object.values(pos).join("/");
	}
}

class NodeCluster {
	constructor(nodes) {
		this.nodePositions = new Set();
		this.nodes = nodes.map(({ x, y, size, used }) => {
			const node = new Node({ x, y }, size, used);
			this.nodePositions.add(node.hash());
			return node;
		});

		this.nodes.forEach(n => {
			n.neighbors = this.getNeighbors(n);
		});
	}

	findNode(nodeHash) {
		if (!this.nodePositions.has(nodeHash)) return null;
		return;
	}

	getNeighbors(node) {
		const neighbors = [];

		for (const n of [
			[1, 0],
			[0, 1],
			[-1, 0],
			[0, -1],
		]) {
			const [x, y] = n;
			const nX = node.pos.x + x;
			const nY = node.pos.y + y;
			const nHash = node.hash({ x: nX, y: nY });
			if (this.nodePositions.has(nHash))
				neighbors.push(
					this.nodes.find(n => n.pos.x === nX && n.pos.y === nY)
				);
		}
		return neighbors;
	}
}

const initialNodes = input.slice(2).map(line => {
	const [_, x, y, size, used] = line.match(/x(\d+)-y(\d+).+?(\d+).+?(\d+)/);
	return { x, y, size, used };
});

const cluster = new NodeCluster(initialNodes);

const endTime = Date.now();
timeUsed(startTime, endTime);
