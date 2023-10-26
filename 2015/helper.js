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
