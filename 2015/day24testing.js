import { sumArr } from "./helper.js";

const input = [1, 2, 3, 4, 5, 6];

const desiredSum = sumArr(input) / 3; //7

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
const validCombos = getCombos(input, desiredSum);
console.log(validCombos);
