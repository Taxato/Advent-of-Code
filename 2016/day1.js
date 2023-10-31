import { manhattanDist } from "../helper.js";

const input = [
	"R4",
	"R3",
	"L3",
	"L2",
	"L1",
	"R1",
	"L1",
	"R2",
	"R3",
	"L5",
	"L5",
	"R4",
	"L4",
	"R2",
	"R4",
	"L3",
	"R3",
	"L3",
	"R3",
	"R4",
	"R2",
	"L1",
	"R2",
	"L3",
	"L2",
	"L1",
	"R3",
	"R5",
	"L1",
	"L4",
	"R2",
	"L4",
	"R3",
	"R1",
	"R2",
	"L5",
	"R2",
	"L189",
	"R5",
	"L5",
	"R52",
	"R3",
	"L1",
	"R4",
	"R5",
	"R1",
	"R4",
	"L1",
	"L3",
	"R2",
	"L2",
	"L3",
	"R4",
	"R3",
	"L2",
	"L5",
	"R4",
	"R5",
	"L2",
	"R2",
	"L1",
	"L3",
	"R3",
	"L4",
	"R4",
	"R5",
	"L1",
	"L1",
	"R3",
	"L5",
	"L2",
	"R76",
	"R2",
	"R2",
	"L1",
	"L3",
	"R189",
	"L3",
	"L4",
	"L1",
	"L3",
	"R5",
	"R4",
	"L1",
	"R1",
	"L1",
	"L1",
	"R2",
	"L4",
	"R2",
	"L5",
	"L5",
	"L5",
	"R2",
	"L4",
	"L5",
	"R4",
	"R4",
	"R5",
	"L5",
	"R3",
	"L1",
	"L3",
	"L1",
	"L1",
	"L3",
	"L4",
	"R5",
	"L3",
	"R5",
	"R3",
	"R3",
	"L5",
	"L5",
	"R3",
	"R4",
	"L3",
	"R3",
	"R1",
	"R3",
	"R2",
	"R2",
	"L1",
	"R1",
	"L3",
	"L3",
	"L3",
	"L1",
	"R2",
	"L1",
	"R4",
	"R4",
	"L1",
	"L1",
	"R3",
	"R3",
	"R4",
	"R1",
	"L5",
	"L2",
	"R2",
	"R3",
	"R2",
	"L3",
	"R4",
	"L5",
	"R1",
	"R4",
	"R5",
	"R4",
	"L4",
	"R1",
	"L3",
	"R1",
	"R3",
	"L2",
	"L3",
	"R1",
	"L2",
	"R3",
	"L3",
	"L1",
	"L3",
	"R4",
	"L4",
	"L5",
	"R3",
	"R5",
	"R4",
	"R1",
	"L2",
	"R3",
	"R5",
	"L5",
	"L4",
	"L1",
	"L1",
];

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
