import { day12input as input } from "./inputs.js";

const regs = {
	a: 0,
	b: 0,
	c: 1,
	d: 0,
};

let lineIndex = 0;

while (lineIndex < input.length) {
	execute(input[lineIndex]);
	// break;
}
console.log(regs);

function execute(instruction) {
	const [_, op, in1, in2] = instruction.match(
		/(\w+) ([\w\d]+)? ?([\w\d-]+)?/
	);

	switch (op) {
		case "cpy":
			if (regs[in1]) regs[in2] = regs[in1];
			else regs[in2] = +in1;
			lineIndex++;
			break;
		case "inc":
			regs[in1]++;
			lineIndex++;
			break;
		case "dec":
			regs[in1]--;
			lineIndex++;
			break;
		case "jnz":
			if (regs[in1] !== 0) lineIndex += +in2;
			else lineIndex++;
			break;
	}
	// console.log(instruction);
	// console.log(regs);
}
