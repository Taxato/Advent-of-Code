import { timeUsed } from "../helper.js";
const startTime = Date.now();

const initGens = {
	a: 703,
	b: 516,
};

const factors = {
	a: 16807,
	b: 48271,
};

function matchPairs(gens, factors, reps, bitRems = null) {
	let numPairs = 0;

	function next(gens) {
		let a = gens.a;
		let b = gens.b;
		if (bitRems !== null) {
			do {
				a = (a * factors.a) % 2147483647;
			} while (a & bitRems.a);
			do {
				b = (b * factors.b) % 2147483647;
			} while (b & bitRems.b);
		} else {
			a = (a * factors.a) % 2147483647;
			b = (b * factors.b) % 2147483647;
		}
		return { a, b };
	}

	const match = gens => (gens.a & 0xffff) === (gens.b & 0xffff);

	for (let i = 0; i < reps; i++) {
		gens = next(gens);
		if (match(gens)) numPairs++;
	}
	return numPairs;
}

const partOne = matchPairs(initGens, factors, 4e7);
const partTwo = matchPairs(initGens, factors, 5e6, { a: 3, b: 7 });
console.log("Part one:", partOne);
console.log("Part two:", partTwo);

const endTime = Date.now();
timeUsed(startTime, endTime);
