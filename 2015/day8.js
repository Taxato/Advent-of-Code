import { readFile } from "node:fs";
readFile("./day8input.txt", { encoding: "ascii" }, processInput);

const totalCharCodesRegex = /./g;
const escapedCharsRegex = /(\\\\|\\x..|\\")/g;
const stringLiteralCharsRegex = /(^"|"$)/gm;

function processInput(err, input) {
	if (err) return err;

	// console.log(partOne(input));
	console.log(partTwo(input));
}

function partOne(input) {
	const totalChars = input.match(totalCharCodesRegex).length;

	input = input.replace(escapedCharsRegex, "X");
	input = input.replace(stringLiteralCharsRegex, "");
	const totalMemory = input.match(totalCharCodesRegex).length;

	return totalChars - totalMemory;
}

function partTwo(input) {
	const totalChars = input.match(totalCharCodesRegex).length;

	// Replace all \\

	// Replace all \"
	input = input.replace(/\\"/g, `\\\\\\"`);

	// Replace all \x..
	input = input.replace(/\\(x..)/g, `\\\\$1`);

	// Replace start and end ""
	input = input.replace(/^"(.*)"$/gm, `"\\"$1\\""`);

	console.log(input);
	const newTotalChars = input.match(totalCharCodesRegex).length;
	return newTotalChars - totalChars;
}
