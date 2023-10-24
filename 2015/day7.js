import { readFile } from "node:fs";
readFile("./day7input.txt", { encoding: "ascii" }, processInput);
readFile("./day7inputP2.txt", { encoding: "ascii" }, processInput);

const regex =
	/(?<in1>[a-z0-9]+)? ?(?<op>[A-Z]+)? ?(?<in2>[a-z0-9]+)? -> (?<out>\w+)/g;

function processInput(err, raw) {
	if (err) return err;

	const input = [...raw.matchAll(regex)];

	const wires = {};

	console.log(readAllInstructions(input, wires).a);
}

function readAllInstructions(_input, output) {
	const input = [..._input];
	while (input.length > 0) {
		const instruction = input[0];
		const res = readInstruction(instruction, output);
		if (res === undefined) input.push(input.shift());
		else input.shift();
	}
	return output;
}

function readInstruction(instruction, outputObj) {
	const { in1, in2, op, out } = instruction.groups;

	if (in1 !== undefined && isNaN(Number(in1)) && outputObj[in1] === undefined)
		return undefined;
	if (in2 !== undefined && isNaN(Number(in2)) && outputObj[in2] === undefined)
		return undefined;

	const val1 = !isNaN(Number(in1)) ? Number(in1) : outputObj[in1];
	const val2 = !isNaN(Number(in2)) ? Number(in2) : outputObj[in2];

	const res = performOp(val1, val2, op);
	if (!res && res !== 0) console.log(res);

	outputObj[out] = res;
	return true;
}

function performOp(in1, in2, op) {
	switch (op) {
		case undefined:
			return in1;
		case "AND":
			return in1 & in2;
		case "OR":
			return in1 | in2;
		case "NOT":
			return ~in2;
		case "LSHIFT":
			return in1 << in2;
		case "RSHIFT":
			return in1 >> in2;
	}
}
