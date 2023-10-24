import { readFile } from "node:fs";
import { sumArr } from "./helper.js";
readFile("./day2input.txt", { encoding: "ascii" }, processInput);

function wrappingPaper([l, w, h]) {
	l = +l;
	w = +w;
	h = +h;
	const smallestSide = Math.min(l * w, w * h, h * l);
	const vol = l * w * h;

	const totalRibbon = Math.min(l + w, w + h, h + l) * 2 + vol;
	return [2 * l * w + 2 * w * h + 2 * h * l + smallestSide, totalRibbon];
}

function processInput(err, input) {
	if (err) return err;

	const output = input
		.replace(/\r/g, "")
		.split("\n")
		.reduce(
			([totalWrap, totalRibbon], present) => {
				const [w, r] = wrappingPaper(present.split("x"));
				return [totalWrap + w, totalRibbon + r];
			},
			[0, 0]
		);

	console.log(output);
}
