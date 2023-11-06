import { day18input as input } from "./inputs.js";

const [safe, trapped] = [".", "^"];
const trappedSituations = new Set(["^^.", ".^^", "^..", "..^"]);

function nextRow(row) {
	let nextRow = "";
	for (let i = 0; i < row.length; i++) {
		nextRow += isTrapped(row, i);
	}
	return nextRow;
}

function isTrapped(prevRow, i) {
	let situation = "";
	for (const j of [i - 1, i, i + 1]) {
		if (j < 0 || j >= prevRow.length) situation += ".";
		else situation += prevRow.at(j);
	}

	if (trappedSituations.has(situation)) return "^";
	else return ".";
}

function run(input, totalRows) {
	const rows = [input];
	while (rows.length < totalRows) {
		rows.push(nextRow(rows.at(-1)));
	}

	return rows
		.join("")
		.split("")
		.reduce((totalSafes, cur) => totalSafes + (cur === "." ? 1 : 0), 0);
}

const partOne = run(input, 40);
console.log(partOne);

const partTwo = run(input, 400000);
console.log(partTwo);
