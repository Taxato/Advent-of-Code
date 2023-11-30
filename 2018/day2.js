import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day2input as input } from "./inputs.js";

function checkSum(data) {
	let totalTwos = 0;
	let totalThrees = 0;
	data.forEach(line => {
		const letters = {};

		line.split("").forEach(letter => {
			letters[letter] = letter in letters ? letters[letter] + 1 : 1;
		});

		if (Object.values(letters).includes(2)) totalTwos++;
		if (Object.values(letters).includes(3)) totalThrees++;
	});

	return totalTwos * totalThrees;
}

function commonCorrect(data) {
	let bestScore = Infinity;
	let correct;

	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data.length; j++) {
			if (i === j) continue;

			const a = data[i];
			const b = data[j];

			let score = 0;
			for (let x = 0; x < a.length; x++) {
				if (a.charAt(x) !== b.charAt(x)) score++;
			}
			if (score < bestScore) {
				bestScore = score;
				correct = [a, b];
			}
		}
	}

	let out = "";
	for (let i = 0; i < correct[0].length; i++) {
		if (correct[0][i] === correct[1][i]) out += correct[0][i];
	}
	return out;
}

console.log("Part one:", checkSum(input));
console.log("Part two:", commonCorrect(input));

const endTime = Date.now();
timeUsed(startTime, endTime);
