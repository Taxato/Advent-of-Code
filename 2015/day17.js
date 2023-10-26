import { sumArr, timeUsed } from "./helper.js";
const startTime = Date.now();

const input = [
	33, 14, 18, 20, 45, 35, 16, 35, 1, 13, 18, 13, 50, 44, 48, 6, 24, 41, 30,
	42,
];

// const testInput = [20, 15, 10, 5, 5];

// const testAnswer = getCombinations(testInput, 25);
const answerPartOne = getCombinations(input, 150);

function getCombinations(arr, desiredMax) {
	const maxBin = "1".repeat(arr.length);
	const maxComboNum = Number.parseInt(maxBin, 2);
	const validCombos = [];

	for (let curNum = 0; curNum <= maxComboNum; curNum++) {
		const comboNumStr = curNum.toString(2).padStart(arr.length, "0");

		const combo = arr.filter((_, elIndex) => {
			return comboNumStr.charAt(elIndex) === "1";
		});
		if (sumArr(combo) === desiredMax) validCombos.push(combo);
	}
	// return validCombos.length; // PART ONE
	const smallestCombo = validCombos.reduce((smallest, combo) => {
		return combo.length < smallest ? combo.length : smallest;
	}, arr.length);
	console.log(smallestCombo);
	const totalSmallestCombos = validCombos.reduce((total, combo) => {
		return combo.length === smallestCombo ? ++total : total;
	}, 0);
	return totalSmallestCombos;
}

// console.log(testAnswer);
console.log(answerPartOne);

const endTime = Date.now();
timeUsed(startTime, endTime);
