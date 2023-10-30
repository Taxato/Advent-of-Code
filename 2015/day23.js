import { readFile } from "node:fs";
readFile("./day23input.txt", { encoding: "ascii" }, readInput);
function readInput(err, raw) {
	if (err) return err;
	const input = raw.replaceAll("\r", "").split("\n");
	executeAll(input);
}

const registers = {
	a: 1,
	b: 0,
};

let lineIndex = 0;

function executeAll(input) {
	while (lineIndex < input.length) {
		execute(input[lineIndex]);
		// break;
	}
	console.log(registers);
}

function execute(instruction) {
	const parseRegex =
		/(?<op>\w{3}) ((?<reg>\w)|(?<offset>(?:\+|-)\d+))(, (?<condOffset>[\d+-]+))?/;
	const { op, reg, offset, condOffset } =
		instruction.match(parseRegex).groups;

	switch (op) {
		case "hlf":
			registers[reg] /= 2;
			lineIndex++;
			break;
		case "tpl":
			registers[reg] *= 3;
			lineIndex++;
			break;
		case "inc":
			registers[reg]++;
			lineIndex++;
			break;
		case "jmp":
			lineIndex += +offset;
			break;
		case "jie":
			if (registers[reg] % 2 === 0) {
				lineIndex += +condOffset;
			} else lineIndex++;
			break;
		case "jio":
			if (registers[reg] === 1) {
				lineIndex += +condOffset;
			} else lineIndex++;
			break;
	}
}
