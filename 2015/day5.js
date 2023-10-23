import { readFile } from "node:fs";
readFile("./day5input.txt", { encoding: "ascii" }, processInput);

function processInput(err, input) {
	if (err) return err;

	const output = input
		.replaceAll("\r", "")
		.split("\n")
		.filter(str => {
			const doubleLetter = /(\w)\1/.test(str);
			const uglyStr = /(ab|cd|pq|xy)/.test(str);
			const threeVowels = /(?:.*[aeiou].*){3}/.test(str);

			// Part 2
			const doublePair = /.*(\w\w).*\1/.test(str);
			const repeatLetter = /(\w).\1/.test(str);

			// return doubleLetter && !uglyStr && threeVowels;
			return doublePair && repeatLetter;
		}).length;

	console.log(output);
}
