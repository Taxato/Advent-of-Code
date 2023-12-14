import { insertInArr, removeFromArr, time } from "../helper.js";
const startTime = process.hrtime();

let prevInc = 0;
function marbleMania(numElfs, finalMarbleWorth) {
	const elfs = {};
	for (let i = 0; i < numElfs; i++) {
		elfs[i] = 0;
	}
	const state = {
		numElfs,
		elfs,
		turn: 1,
		index: 0,
		marbles: [0],
		lastMarble: 0,
	};

	let prevLog = "";
	while (state.lastMarble !== finalMarbleWorth) {
		turn(state);
		// console.log(state.marbles.join("-"));
		// const log = Object.entries(state.elfs)
		// 	.filter(e => e[1] !== 0)
		// 	.sort((a, b) => +a[0] - +b[0])
		// 	.map(e => e.join("-"))
		// 	.join(" ");

		// if (log !== prevLog) {
		// 	console.log(
		// 		log,
		// 		"||||",
		// 		Object.values(state.elfs)
		// 			.filter(v => v !== 0)
		// 			.join("--")
		// 	);

		// 	prevLog = log;
		// }
	}

	return Math.max(...Object.values(state.elfs));
}

function turn(state) {
	const curElf = state.turn % state.numElfs;
	const len = state.marbles.length;

	if (state.turn % 23 === 0) {
		const removedMarbleIndex = (state.index - 7 + len) % len;
		const inc = state.turn + state.marbles[removedMarbleIndex];
		// console.log(inc, inc - prevInc);
		prevInc = inc;
		state.elfs[curElf] += inc;
		state.marbles = removeFromArr(state.marbles, removedMarbleIndex);
		state.index = removedMarbleIndex;
	} else {
		const nextMarbleIndex = (state.index + 2) % len;
		state.index = nextMarbleIndex;
		state.marbles = insertInArr(state.marbles, state.turn, nextMarbleIndex);
	}

	state.lastMarble = state.turn;
	state.turn++;
}

// console.log(marbleMania(9, 25));
// console.log(marbleMania(10, 500));

// 418 players; last marble is worth 71339 points
console.log("Part one:", marbleMania(418, 71339));
// console.log("Part two:", marbleMania(418, 71339 * 100));

time(startTime);
