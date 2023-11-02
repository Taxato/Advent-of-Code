import { day9input as input } from "./inputs.js";

for (let i = 0; i < input.length; i++) {
	const char = input.at(i);
	if (char === "(") {
		const match = input.slice(i).match(/(\d+)x(\d+)/);
		const repLength = +match[1];
		const repAmount = +match[2];

		const padding = i + repLength + repAmount + 2;
		const repStr = input.slice(padding, padding + repLength);
		console.log(repStr, repStr.length);

		// index += "2x1)" +
		// i += repLength + repAmount + 2 + repLength * repAmount;
		break;
	}
}
