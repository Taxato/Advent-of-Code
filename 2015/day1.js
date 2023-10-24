import { readFile } from "node:fs";
readFile("./day1input.txt", { encoding: "ascii" }, processInput);

function processInput(err, input) {
	if (err) return err;

	let floor = 0;
	let firstNeg = null;
	input.split("").forEach((char, i) => {
		char == "(" ? floor++ : floor--;
		if (floor < 0 && !firstNeg) firstNeg = i + 1;
	});
	console.log(floor, firstNeg);
}
