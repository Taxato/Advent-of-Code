import { readFile } from "node:fs";
readFile("./day7input.txt", { encoding: "ascii" }, processInput);

function processInput(err, raw) {
	if (err) return err;
	const input = raw.replaceAll("\r", "").split("\n");

	const output = input;

	console.log(output);
}
