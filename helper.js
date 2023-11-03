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

export function create2DArr(cols, rows, fill) {
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

export function log2dArr(arr, useArrVals) {
	let output = "";

	for (let y = 0; y < arr[0].length; y++) {
		arr.forEach(col => {
			if (useArrVals) {
				output += col[y];
			} else {
				if (col[y]) output += "#";
				else output += " ";
			}
		});
		output += "\n";
	}
	console.log(output);
}

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
