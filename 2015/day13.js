import { readFile } from "node:fs";
import { maxInArr } from "./helper.js";
readFile("./day13input.txt", { encoding: "ascii" }, readInput);
function readInput(err, raw) {
	if (err) return err;
	const input = raw.replaceAll("\r", "").split("\n");
	processInput(input);
	processInputPart2(input);
}

function processInput(input) {
	const people = {};

	input.forEach(line => {
		const { p1, p2, amount } = parseInput(line);
		if (!people[p1]) people[p1] = {};
		people[p1][p2] = amount;
	});

	const allTotals = getAllArrangements(people).map(arr =>
		calculateHappiness(people, arr)
	);
	console.log(maxInArr(allTotals));
}

function processInputPart2(input) {
	const people = {};

	input.forEach(line => {
		const { p1, p2, amount } = parseInput(line);
		if (!people[p1]) people[p1] = {};
		people[p1][p2] = amount;
	});
	people.Thomas = {};
	for (const p of Object.keys(people)) {
		people[p].Thomas = 0;
		people.Thomas[p] = 0;
	}

	const allTotals = getAllArrangements(people).map(arr =>
		calculateHappiness(people, arr)
	);
	console.log(maxInArr(allTotals));
}

function getAllArrangements(
	people,
	curPerson,
	alreadySeated = [],
	allArrangements = []
) {
	const pKeys = Object.keys(people);
	if (!curPerson) curPerson = pKeys[0];
	// if (curPerson) alreadySeated.push(curPerson);
	alreadySeated.push(curPerson);

	const unseated = pKeys.filter(p => !alreadySeated.includes(p));

	if (unseated.length === 0) {
		allArrangements.push(alreadySeated);
	}

	for (let i = 0; i < unseated.length; i++) {
		const nextPerson = unseated[i];
		const newAlreadySeated = [...alreadySeated];
		getAllArrangements(
			people,
			nextPerson,
			newAlreadySeated,
			allArrangements
		);
	}

	return allArrangements;
}

function parseInput(input) {
	const parseRegex =
		/(?<p1>\w+).+(?<sign>lose|gain) (?<amount>\d+).+\b(?<p2>\w+)/;
	const { p1, p2, sign, amount } = input.match(parseRegex).groups;

	return { p1, p2, amount: sign == "gain" ? +amount : -amount };
}

function calculateHappiness(people, seatingArrangement) {
	let totalHappiness = 0;

	const numChairs = seatingArrangement.length;
	for (let i = 0; i < numChairs; i++) {
		const curPerson = seatingArrangement[i];
		const nextPerson = seatingArrangement[(i + 1) % numChairs];
		const prevPerson = seatingArrangement[(i - 1 + numChairs) % numChairs];
		const curPersonObj = people[curPerson];
		const happinessChange =
			curPersonObj[nextPerson] + curPersonObj[prevPerson];
		totalHappiness += happinessChange;

		// totalHappiness +=
		// 	people[seatingArrangement[i]][
		// 		seatingArrangement[(i + 1) % numChairs]
		// 	] +
		// 	people[seatingArrangement[i]][
		// 		seatingArrangement[(i - 1 + numChairs) % numChairs]
		// 	];
	}

	return totalHappiness;
}
