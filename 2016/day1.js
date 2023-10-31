import { manhattanDist } from "../helper.js";
import { day1input as input } from "./inputs";

const [NORTH, EAST, SOUTH, WEST] = [0, 1, 2, 3];
const coords = { x: 0, y: 0 };
const visitedCoords = [];
let facing = NORTH;
let firstDouble = null;

input.forEach(line => {
	const dir = line.slice(0, 1);
	const dist = +line.slice(1);

	switch (dir) {
		case "R":
			facing = (facing + 1) % 4;
			break;
		case "L":
			facing = (facing - 1 + 4) % 4;
			break;
	}
	for (let distMoved = 0; distMoved < dist; distMoved++) {
		switch (facing) {
			case NORTH:
				coords.y++;
				break;
			case EAST:
				coords.x++;
				break;
			case SOUTH:
				coords.y--;
				break;
			case WEST:
				coords.x--;
				break;
		}
		const alreadyVisited = visitedCoords.find(
			visited => visited.x === coords.x && visited.y === coords.y
		);
		if (!alreadyVisited) visitedCoords.push({ ...coords });
		else if (!firstDouble) firstDouble = { ...coords };
	}
});

const partOne = manhattanDist(coords);
const partTwo = manhattanDist(firstDouble);
console.log(partOne, partTwo);
