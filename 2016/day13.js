import { timeUsed, Grid, loop2DArr, sumArr } from "../helper.js";
const startTime = Date.now();

const input = 1358;
const goal = { x: 31, y: 39 };

const building = new Grid(50, 50);

// Populate building with walls
loop2DArr(building.grid, (x, y) => {
	const wall =
		sumArr(
			(x * x + 3 * x + 2 * x * y + y + y * y + input)
				.toString(2)
				.split("")
				.map(char => +char)
		) %
			2 !==
		0;

	building.grid[x][y] = wall ? 1 : 0;
});

const startPos = { x: 1, y: 1 };
console.log("Part one:", building.pathFind(startPos, goal));
console.log("Part two:", building.distinctLocs(startPos, 50));

const endTime = Date.now();
timeUsed(startTime, endTime);
