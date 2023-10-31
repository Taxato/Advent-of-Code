import { arrProduct, sumArr } from "../helper.js";

const input = [
	1, 2, 3, 7, 11, 13, 17, 19, 23, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73,
	79, 83, 89, 97, 101, 103, 107, 109, 113,
];

function getCombos(
	inputArr,
	desiredSum,
	curSum = 0,
	curCombo = [],
	allCombos = []
) {
	if (curSum === desiredSum) {
		allCombos.push(curCombo);
		return;
	}
	if (curSum > desiredSum) return;

	for (let i = 0; i < inputArr.length; i++) {
		const newArr = inputArr.slice(i + 1);
		const newSum = curSum + inputArr[i];
		const newCombo = [...curCombo, inputArr[i]];
		getCombos(newArr, desiredSum, newSum, newCombo, allCombos);
	}
	return allCombos;
}

// Part one
{
	const validCombos = getCombos(input, sumArr(input) / 3);
	const sortedCombos = validCombos.sort((a, b) => a.length - b.length);
	const shortestCombo = sortedCombos[0].length;
	const shortestSorted = sortedCombos.filter(
		arr => arr.length === shortestCombo
	);
	const bestQe = shortestSorted.reduce((minQe, combo) => {
		const qe = arrProduct(combo);
		return qe < minQe ? qe : minQe;
	});
	console.log(bestQe, arrProduct(bestQe));
}

// Part two
{
	const validCombos = getCombos(input, sumArr(input) / 4);
	const sortedCombos = validCombos.sort((a, b) => a.length - b.length);
	const shortestCombo = sortedCombos[0].length;
	const shortestSorted = sortedCombos.filter(
		arr => arr.length === shortestCombo
	);
	const bestQe = shortestSorted.reduce((minQe, combo) => {
		const qe = arrProduct(combo);
		return qe < minQe ? qe : minQe;
	});
	console.log(bestQe, arrProduct(bestQe));
}
