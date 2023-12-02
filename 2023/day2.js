import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day2input as input } from "./inputs.js";

const games = input.map(line => {
	let [gameNum, data] = line.split(":");
	gameNum = +gameNum.match(/\d+/)[0];
	data = data.split(";").map(g =>
		g.split(",").map(c => {
			const [_, amnt, color] = c.match(/(\d+) (\w+)/);
			return { color, amnt: +amnt };
		})
	);

	return { gameNum, data };
});

function partOne(games) {
	const maxRed = 12;
	const maxGreen = 13;
	const maxBlue = 14;

	let sumIDs = 0;

	for (const game of games) {
		let valid = true;
		for (const color of game.data.flat()) {
			if (color.color === "red" && color.amnt > maxRed) valid = false;
			if (color.color === "green" && color.amnt > maxGreen) valid = false;
			if (color.color === "blue" && color.amnt > maxBlue) valid = false;
		}
		if (valid) sumIDs += game.gameNum;
	}

	return sumIDs;
}

function partTwo(games) {
	let sumPower = 0;

	for (const game of games) {
		let minRed = 0;
		let minGreen = 0;
		let minBlue = 0;

		for (const round of game.data) {
			for (const c of round) {
				if (c.color === "red" && c.amnt > minRed) minRed = c.amnt;
				if (c.color === "green" && c.amnt > minGreen) minGreen = c.amnt;
				if (c.color === "blue" && c.amnt > minBlue) minBlue = c.amnt;
			}
		}
		sumPower += minRed * minGreen * minBlue;
	}

	return sumPower;
}

console.log("Part one:", partOne(games));
console.log("Part two:", partTwo(games));

const endTime = Date.now();
timeUsed(startTime, endTime);
