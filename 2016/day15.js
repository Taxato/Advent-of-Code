import { day15input as input } from "./inputs.js";

const discs = input.map(line => {
	const [_, positions, offset] = line.match(/ (\d+).*\b(\d+)/);
	return {
		positions: +positions,
		offset: +offset,
	};
});

// Part two
discs.push({ positions: 11, offset: 0 });

function willPassDisc(startTime, i, disc) {
	return (startTime + i + 1 + disc.offset) % disc.positions === 0;
}

function willPass(startTime) {
	return discs.reduce((p, d, i) => p && willPassDisc(startTime, i, d), true);
}
let i = 0;
while (!willPass(i)) {
	i++;
}
console.log(i);
