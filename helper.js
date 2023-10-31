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