import { readFileSync } from "fs";
import {
	PriorityQueue,
	gridFromText,
	manhattanDist,
	time,
} from "../../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./input.txt", { encoding: "utf8" });
const test = readFileSync("./test.txt", { encoding: "utf8" });

let data = test;
const city = gridFromText(data);

const posKey = pos => pos.x + "/" + pos.y;

const graph = {};

for (let y = 0; y < city.length; y++) {
	for (let x = 0; x < city.length; x++) {
		const key = posKey({ x, y });
		graph[key] = { pos: { x, y }, cost: city[x][y], neighbors: [] };

		for (const dir of [
			[0, -1],
			[-1, 0],
			[1, 0],
			[0, 1],
		]) {
			const dX = x + dir[0];
			const dY = y + dir[1];

			if (dX < 0 || dX >= city.length || dY < 0 || dY >= city.length)
				continue;

			graph[key].neighbors.push({
				pos: { x: dX, y: dY },
				cost: city[dX][dY],
			});
		}
	}
}

const start = graph["0/0"];
const frontier = new PriorityQueue();
frontier.enqueue(start, 0);
const cameFrom = {};
const costSoFar = {};
cameFrom["0/0"] = {};
costSoFar["0/0"] = start.cost;

const goal = { x: city.length - 1, y: city.length - 1 };

while (!frontier.isEmpty) {
	const current = frontier.dequeue();
	const key = posKey(current.pos);

	if (key === posKey(goal)) {
		console.log("Reached goal");
		console.log(costSoFar[key]);
		break;
	}

	for (const next of graph[key].neighbors) {
		const nextKey = posKey(next.pos);
		const newCost = costSoFar[key] + next.cost;
		if (!(nextKey in costSoFar) || newCost < costSoFar[nextKey]) {
			costSoFar[nextKey] = newCost;
			const priority = newCost + heuristic(goal, next.pos);
			frontier.enqueue(next, priority);
			cameFrom[nextKey] = key;
		}
	}
}

console.log(cameFrom);
// console.log(costSoFar);
function heuristic(end, start) {
	return manhattanDist(end, start);
}

time(startTime);
