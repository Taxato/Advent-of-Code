import { readFile } from "node:fs";
readFile("./day7input.txt", { encoding: "ascii" }, processInput);

function processInput(err, raw) {
	if (err) return err;
	const input = raw.replaceAll("\r", "").split("\n");

	const regex =
		/(?<in1>[a-z0-9]+)? ?(?<op>[A-Z]+)? ?(?<in2>[a-z0-9]+)? -> (?<out>\w+)/;

	console.log(input[0].match(regex));

	const output = input;

	// console.log(output);
}
