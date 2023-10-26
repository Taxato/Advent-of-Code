import { readFile } from "node:fs";
readFile("./day18input.txt", { encoding: "ascii" }, readInput);
function readInput(err, raw) {
	if (err) return err;
	const input = raw.replaceAll(/\r\n/g, "");
	processInput(input);
}

function processInput(input) {
	const width = 100;
	const height = 100;
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const light = input[x + y * width];

			const neighbors = [
				input[x - 1 + (y - 1) * width],
				input[x + 1 + y * width],
			];
		}
	}
}
