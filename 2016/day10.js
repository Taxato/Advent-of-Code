import { day10input as input } from "./inputs.js";

const bots = {};
const outputs = {};
input.forEach(line => {
	if (line.startsWith("value")) {
		const [_, val, bot] = line.match(/(\d+).*?(\d+)/);
		if (!bots[bot]) bots[bot] = { chips: [] };
		bots[bot].chips.push(+val);
	} else {
		const [_, from, low, high] = line.match(
			/(\d+).*?((?:bot|output) \d+).*?((?:bot|output) \d+)/
		);
		const [lowType, lowNum] = low.split(" ");
		const [highType, highNum] = high.split(" ");

		if (!bots[from]) bots[from] = { chips: [] };

		bots[from].low = [lowType, +lowNum];
		bots[from].high = [highType, +highNum];
	}
});

while (Object.values(bots).filter(bot => bot.chips.length === 2).length !== 0) {
	Object.entries(bots)
		.filter(bot => bot[1].chips.length === 2)
		.forEach(bot => {
			exectuteOp(bot);
		});
}

function exectuteOp(bot) {
	const [lowChip, highChip] = bot[1].chips.sort((a, b) => a - b);

	if (lowChip === 17 && highChip === 61) console.log(+bot[0]);

	bot[1].low[0] === "output"
		? (outputs[bot[1].low[1]] = lowChip)
		: bots[bot[1].low[1]].chips.push(lowChip);

	bot[1].high[0] === "output"
		? (outputs[bot[1].high[1]] = highChip)
		: bots[bot[1].high[1]].chips.push(highChip);

	bot[1].chips = [];
}

console.log(outputs);
