import { create2DArr, loop2DArr, manhattanDist, sumArr } from "../helper.js";

const input = 1358;

class State {
	constructor(currentCoords, visitedCoords, goalCoords, steps) {
		this.currentCoords = currentCoords;
		this.visitedCoords = [...visitedCoords, currentCoords];
		this.goalCoords = goalCoords;
		this.steps = steps;
	}

	get dstToGoal() {
		return manhattanDist(this.currentCoords, this.goalCoords);
	}

	get reachedGoal() {
		if (this.dstToGoal === 0) return true;
		else return false;
	}

	nextStates() {
		const newStates = [];

		for (const dir of [
			{ x: 0, y: -1 },
			{ x: 1, y: 0 },
			{ x: 0, y: 1 },
			{ x: -1, y: 0 },
		]) {
			const newX = this.currentCoords.x + dir.x;
			const newY = this.currentCoords.y + dir.y;

			if (
				newX < 0 ||
				newX >= building.length ||
				newY < 0 ||
				newY >= building[0].length ||
				this.visitedCoords.some(
					coords => coords.x === newX && coords.y === newY
				) ||
				building[newX][newY] === 1
			)
				continue;

			newStates.push(this.generateState({ x: newX, y: newY }));
		}
		return newStates;
	}

	generateState({ x, y }) {
		return new State(
			{ x, y },
			this.visitedCoords,
			this.goalCoords,
			this.steps + 1
		);
	}

	get hash() {
		return `${this.steps}//${Object.values(
			this.currentCoords
		)}//${this.visitedCoords
			.map(coords => Object.values(coords))
			.join("/")}`;
	}
}

const building = create2DArr(50, 50);

loop2DArr(building, (x, y) => {
	const wall =
		sumArr(
			(x * x + 3 * x + 2 * x * y + y + y * y + input)
				.toString(2)
				.split("")
				.map(char => +char)
		) %
			2 !==
		0;

	building[x][y] = wall ? 1 : 0;
});

function run(initialState) {
	const queue = [initialState];
	const checkedStates = new Set(initialState.hash);

	while (queue.length) {
		const state = queue.shift();
		if (state.reachedGoal) return state.steps;

		for (const nextState of state.nextStates()) {
			if (!checkedStates.has(nextState.hash)) {
				queue.push(nextState);
				checkedStates.add(nextState.hash);
			}
		}
	}
}

function distinctLocs(initalState) {
	const queue = [initialState];
	const checkedStates = new Set(initialState.hash);
	const allLocs = new Set([
		JSON.stringify(Object.values(initalState.currentCoords)),
	]);

	while (queue.length) {
		const state = queue.shift();

		for (const nextState of state.nextStates()) {
			if (nextState.steps > 50) continue;
			allLocs.add(JSON.stringify(Object.values(nextState.currentCoords)));

			if (!checkedStates.has(nextState.hash)) {
				queue.push(nextState);
				checkedStates.add(nextState.hash);
			}
		}
	}
	return allLocs.size;
}

const initialState = new State({ x: 1, y: 1 }, [], { x: 31, y: 39 }, 0);

const partOne = run(initialState);
const partTwo = distinctLocs(initialState);

console.log(partOne, partTwo);
