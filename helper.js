export function sumArr(arr) {
	return arr.reduce((sum, val) => (sum += val), 0);
}

export function minInArr(arr) {
	return arr.reduce((min, cur) => (cur < min ? cur : min));
}

export function maxInArr(arr) {
	return arr.reduce((max, cur) => (cur > max ? cur : max));
}

export function feedBackOutInFunc(input, func, numTimes) {
	numTimes--;
	const result = func(input);
	if (numTimes > 0) return feedBackOutInFunc(result, func, numTimes);
	return result;
}

export function timeUsed(start, finish) {
	const totalMs = finish - start;
	const seconds = Math.floor(totalMs / 1000);
	console.log(
		`Ran in ${
			seconds
				? `${seconds}seconds and ${totalMs % 1000}ms`
				: `${totalMs}ms`
		}`
	);
}

export function create2DArr(cols, rows, fill = 0) {
	return Array.from({ length: cols }, () =>
		Array.from({ length: rows }, () => fill)
	);
}

export function loop2DArr(arr, cb) {
	for (let col = 0; col < arr.length; col++) {
		for (let row = 0; row < arr[0].length; row++) {
			cb(col, row);
		}
	}
}

export function log2DArr(arr, logVals = false) {
	let output = "";

	for (let y = 0; y < arr[0].length; y++) {
		arr.forEach(col => {
			if (logVals) {
				if (col[y] === 1) output += "#";
				else if (col[y] === 0) output += ".";
				else output += col[y];
			} else {
				if (col[y]) output += "#";
				else output += ".";
			}
		});
		output += "\n";
	}
	console.log(output);
}

export function rotate2DArr(arr, times = 1) {}

export function sumProp(arr, prop) {
	return arr.reduce((sum, val) => {
		if (!val[prop]) return sum;
		return sum + +val[prop];
	}, 0);
}

export function pipe(fn1, ...fns) {
	return fns.reduce((prevFn, nextFn) => value => nextFn(prevFn(value)), fn1);
}

export function arrProduct(arr) {
	return arr.reduce((product, num) => (product *= num), 1);
}

export function manhattanDist(startCoords, endCoords = null) {
	if (!endCoords) {
		endCoords = startCoords;
		startCoords = { x: 0, y: 0 };
	}

	return (
		Math.abs(startCoords.x - endCoords.x) +
		Math.abs(startCoords.y - endCoords.y)
	);
}

export function combinations(iterable, r) {
	const pool = Array.from(iterable);
	const n = pool.length;
	if (r > n) return [];

	const combos = [];
	const indices = Array.from({ length: r }, (_, i) => i);

	while (true) {
		combos.push(indices.map(i => pool[i]));

		let i;
		for (i = r - 1; i >= 0; i--) {
			if (indices[i] !== i + n - r) break;
		}
		if (i < 0) break;

		indices[i]++;
		for (let j = i + 1; j < r; j++) {
			indices[j] = indices[j - 1] + 1;
		}
	}
	return combos;
}

export function reverseStr(str) {
	let res = "";
	for (let i = str.length - 1; i >= 0; i--) {
		res += str.at(i);
	}
	return res;
}

export function permutations(
	input,
	choose = input.length,
	curPerm = [],
	allPerms = []
) {
	if (curPerm.length === choose) allPerms.push(curPerm);
	const unusedVals = input.filter(el => !curPerm.includes(el));
	for (let i = 0; i < unusedVals.length; i++) {
		const newPerm = [...curPerm, unusedVals[i]];
		permutations(unusedVals, choose, newPerm, allPerms);
	}
	return allPerms;
}

export function factorial(n) {
	if (n === 1) return 1;
	return n * factorial(n - 1);
}

export function asciiArrFromStr(str) {
	return str.split("").map(char => char.charCodeAt(0));
}

export function singleKnotHash({
	listLength,
	instructions,
	curPos = 0,
	skipSize = 0,
	list = Array.from({ length: listLength }, (_, i) => i),
}) {
	for (const length of instructions) {
		const section = [];
		for (let i = curPos; i < curPos + length; i++) {
			section.push({
				val: list.at(i % list.length),
				pos: i % list.length,
			});
		}

		const reverseOrder = section.map(item => item.pos).reverse();
		const reversedSection = section.map((item, i) => ({
			...item,
			pos: reverseOrder[i],
		}));
		reversedSection.forEach(item => {
			list[item.pos] = item.val;
		});
		curPos = (curPos + length + skipSize) % list.length;
		skipSize++;
	}

	return {
		list,
		listLength,
		instructions,
		curPos,
		skipSize,
		result: list[0] * list[1],
	};
}

export function knotHash(input) {
	const sequence = [...asciiArrFromStr(input), 17, 31, 73, 47, 23];
	const result = feedBackOutInFunc(
		{ listLength: 256, instructions: sequence },
		singleKnotHash,
		64
	);
	const sparseHash = result.list;
	const blocks = [];
	for (let i = 0; i < 16; i++) {
		blocks.push(sparseHash.slice(i * 16, (i + 1) * 16));
	}
	const denseHash = blocks.map(block =>
		block.reduce((res, cur) => res ^ cur)
	);

	return denseHash.map(num => num.toString(16).padStart(2, "0")).join("");
}

export class GridState {
	constructor(
		grid,
		currentCoords,
		goalCoords = null,
		visitedCoords = [],
		steps = 0
	) {
		this.grid = grid;
		this.currentCoords = currentCoords;
		this.goalCoords = goalCoords;
		this.visitedCoords = [...visitedCoords, currentCoords];
		this.steps = steps;
	}

	get dstToGoal() {
		if (!this.goalCoords) return null;
		return manhattanDist(this.currentCoords, this.goalCoords);
	}

	get reachedGoal() {
		if (!this.goalCoords) return null;
		return this.dstToGoal === 0;
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
				newX >= this.grid.length ||
				newY < 0 ||
				newY >= this.grid[0].length ||
				this.visitedCoords.some(
					coords => coords.x === newX && coords.y === newY
				) ||
				this.grid[newX][newY] === 1
			)
				continue;

			newStates.push(this.generateState([newX, newY]));
		}
		return newStates;
	}

	generateState([x, y]) {
		return new GridState(
			this.grid,
			{ x, y },
			this.goalCoords,
			this.visitedCoords,
			this.steps + 1
		);
	}
}

export class Grid {
	constructor(cols, rows) {
		this.grid = create2DArr(cols, rows);
	}

	get totalOn() {
		return sumArr(this.grid.flat());
	}

	neighbors(pos) {
		const neighbors = [];

		for (const dir of [
			{ x: 0, y: -1 },
			{ x: 1, y: 0 },
			{ x: 0, y: 1 },
			{ x: -1, y: 0 },
		]) {
			const nX = pos.x + dir.x;
			const nY = pos.y + dir.y;

			if (
				nX < 0 ||
				nX >= this.grid.length ||
				nY < 0 ||
				nY >= this.grid[0].length
			)
				continue;

			neighbors.push({ x: nX, y: nY });
		}
		return neighbors;
	}

	get numRegions() {
		let regions = 0;
		let visited = new Set();
		const key = pos => `${pos.x}/${pos.y}`;

		for (let x = 0; x < this.grid.length; x++) {
			for (let y = 0; y < this.grid[0].length; y++) {
				if (this.grid[x][y] === 0) continue;
				else if (visited.has(key({ x, y }))) {
					continue;
				} else {
					regions++;
					const queue = [{ x, y }];
					while (queue.length) {
						const pos = queue.shift();
						for (const neighbor of this.neighbors(pos)) {
							const n = this.grid[neighbor.x][neighbor.y];
							if (n === 0) continue;
							const nKey = key(neighbor);
							if (!visited.has(nKey)) {
								visited.add(nKey);
								queue.push(neighbor);
							}
						}
					}
				}
			}
		}
		return regions;
	}

	pathFind(start, end) {
		const initialState = new GridState(this.grid, start, end);
		const queue = [initialState];
		const visited = new Set(
			JSON.stringify(Object.values(initialState.currentCoords))
		);

		while (queue.length) {
			const state = queue.shift();
			if (state.reachedGoal) return state.steps;

			for (const nextState of state.nextStates()) {
				const nextStateKey = JSON.stringify(
					Object.values(nextState.currentCoords)
				);
				if (!visited.has(nextStateKey)) {
					queue.push(nextState);
					visited.add(nextStateKey);
				}
			}
		}
	}

	distinctLocs(start, maxSteps) {
		const initialState = new GridState(this.grid, start);
		const queue = [initialState];
		const allLocs = new Set([
			JSON.stringify(Object.values(initialState.currentCoords)),
		]);

		while (queue.length) {
			const state = queue.shift();

			for (const nextState of state.nextStates()) {
				const nextStateKey = JSON.stringify(
					Object.values(nextState.currentCoords)
				);
				if (nextState.steps > maxSteps) continue;

				if (!allLocs.has(nextStateKey)) {
					queue.push(nextState);
					allLocs.add(nextStateKey);
				}
			}
		}
		return allLocs.size;
	}
}
