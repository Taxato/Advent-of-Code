import { readFile } from "node:fs";
readFile("./day1input.txt", { encoding: "ascii" }, processInput);

const regex = /((?:\d+\n)+)/gm;

function processInput(err, raw) {
	if (err) return err;
	const input = raw.replaceAll("\r", "");

	const output = input
		.match(regex)
		.map(elf =>
			elf
				.split("\n")
				.map(n => +n)
				.reduce((sum, cur) => (sum += cur), 0)
		)
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((sum, cur) => (sum += cur), 0);

	console.log(output);
}
