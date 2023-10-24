import { day1 as input } from "./inputs.json" assert {type:"json"}

const regex = /((?:\d+\n)+)/gm;

const output = input
	.match(regex)
	.map(elf =>
		elf
			.split("\n")
			.map(n => +n)
			.reduce((sum, cur) => (sum += cur), 0)
	)
	.sort((a, b) => b - a)
	.slice(0, 3)
	.reduce((sum, cur) => (sum += cur), 0);

console.log(output);
