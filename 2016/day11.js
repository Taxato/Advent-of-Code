// The first floor contains a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.
// The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.
// The third floor contains a thulium-compatible microchip.
// The fourth floor contains nothing relevant.

let elevator = { floor: 0, carrying: [] };
const floors = [
	["SG", "SM", "PG", "PM"],
	["TG", "RG", "RM", "CG", "CM"],
	["TM"],
	[],
];
const initalState = {
	moves: 0,
	elevator,
	floors,
};

function isStateValid(state) {
	let valid = true;

	state.floors.forEach(floor => {
		const gens = floor
			.filter(item => item.at(1) === "G")
			.map(gen => gen.at(0));
		const chips = floor
			.filter(item => item.at(1) === "M")
			.map(chip => chip.at(0));

		if (chips.length !== 0 && gens.length !== 0) {
			const loneGens = gens.filter(gen => !chips.includes(gen));
			const loneChips = chips.filter(chip => !gens.includes(chip));

			if (loneGens.length !== 0 && loneChips.length !== 0) valid = false;
		}
	});

	console.log(valid);
	return valid;
}

function getPossibleMoves(state) {
	const { elevator, floors, moves } = state;

	// check for completion
	if (
		floors[0].length === 0 &&
		floors[1].length === 0 &&
		floors[2].length === 0
	)
		return [];
}
