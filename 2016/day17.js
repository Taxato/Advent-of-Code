import md5 from "md5";

const input = "mmsxrhfx";

class State {
	constructor(moveStr, curPos, goalPos, gridSize) {
		this.moveStr = moveStr;
		this.curPos = curPos;
		this.goalPos = goalPos;
		this.gridSize = gridSize;
	}

	readRoom() {
		const hash = md5(this.moveStr);
		const doors = hash
			.slice(0, 4)
			.split("")
			.map(char => {
				if (/[bcdef]/.test(char)) return true;
				else return false;
			});
		return [
			{ open: doors[0], str: "U" },
			{ open: doors[1], str: "D" },
			{ open: doors[2], str: "L" },
			{ open: doors[3], str: "R" },
		];
	}

	nextStates() {
		const openDoors = this.readRoom().filter(door => door.open);
		const nextStates = [];
		for (const door of openDoors) {
			const newPos = { ...this.curPos };

			switch (door.str) {
				case "U":
					newPos.y--;
					break;
				case "D":
					newPos.y++;
					break;
				case "L":
					newPos.x--;
					break;
				case "R":
					newPos.x++;
					break;
			}
			if (
				newPos.x < 0 ||
				newPos.x >= this.gridSize.w ||
				newPos.y < 0 ||
				newPos.y >= this.gridSize.h
			)
				continue;

			nextStates.push(
				new State(
					this.moveStr + door.str,
					newPos,
					this.goalPos,
					this.gridSize
				)
			);
		}
		return nextStates;
	}
}

const initialState = new State(
	input,
	{ x: 0, y: 0 },
	{ x: 3, y: 3 },
	{ w: 4, h: 4 }
);

function shortestPath(initialState) {
	const inputLength = initialState.moveStr.length;
	const queue = [initialState];

	while (true) {
		const state = queue.shift();
		if (
			state.curPos.x === state.goalPos.x &&
			state.curPos.y === state.goalPos.y
		)
			return state.moveStr.slice(inputLength);

		state.nextStates().forEach(newState => queue.push(newState));
	}
}

function longestPath(initialState) {
	const inputLength = initialState.moveStr.length;
	let longestDst = 0;

	const queue = [initialState];
	while (queue.length) {
		const state = queue.shift();
		if (
			state.curPos.x === state.goalPos.x &&
			state.curPos.y === state.goalPos.y
		) {
			const pathLength = state.moveStr.slice(inputLength).length;
			if (pathLength > longestDst) longestDst = pathLength;
			continue;
		}

		state.nextStates().forEach(newState => queue.push(newState));
	}
	return longestDst;
}

const partOne = shortestPath(initialState);
console.log(partOne);

const partTwo = longestPath(initialState);
console.log(partTwo);
