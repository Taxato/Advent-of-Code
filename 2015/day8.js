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
	const escapedCharsGroupRegex = /(\\")|(\\\\)|(\\x..)/g;

	input = input.replace(escapedCharsGroupRegex, replacer);
	input = input.replace(/^"(.*)"$/gm, `"\\"$1\\""`);

	function replacer(_match, g1, g2, g3) {
		if (g1) return `\\\\\\"`;
		if (g2) return `\\\\\\\\`;
		if (g3) return `\\${g3}`;
	}

	const newTotalChars = input.match(totalCharCodesRegex).length;
	return newTotalChars - totalChars;
}
