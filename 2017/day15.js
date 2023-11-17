import { timeUsed } from "../helper.js";
const startTime = Date.now();

const initialGenerators = {
	a: 703,
	b: 516,
};

const testGens = {
	a: 65,
	b: 8921,
};

const factors = {
	a: 16807,
	b: 48271,
};

function next(gens) {
	// return {
	// 	a: ((gens.a & 65535) * factors.a) & 65535,
	// 	b: ((gens.b & 65535) * factors.b) & 65535,
	// };
	return {
		a: (gens.a * factors.a) & 65535,
		b: (gens.b * factors.b) & 65535,
	};
}

function match(gens) {
	// const aBits = gens.a.toString(2).slice(-16);
	// const bBits = gens.b.toString(2).slice(-16);
	// return aBits === bBits;
	return gens.a === gens.b;
}

// Part one
let numPairs = 0;
let gens = next(testGens);
for (let i = 0; i < 40_000_000; i++) {
	if (match(gens)) numPairs++;
	gens = next(gens);
}
console.log("Part one:", numPairs);

// Part two
// let numPairs = 0;
// let gens = next(initialGenerators);
// for (let i = 0; i < 5_000_000; i++) {
// 	if (matchPartTwo(gens)) numPairs++;
// 	gens = next(gens);
// }
// console.log("Part two:", numPairs);

const endTime = Date.now();
timeUsed(startTime, endTime);
