import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day4input as input } from "./inputs.js";

const timeline = [...input].sort(
	(a, b) =>
		+a.slice(1, 17).split(/[: -]/).join("") -
		+b.slice(1, 17).split(/[: -]/).join("")
);

let curID;
const guardTimelines = {};

for (let i = 0; i < timeline.length; i++) {
	const line = timeline[i];

	if (/Guard/.test(line)) {
		curID = line.match(/#(\d+)/)[1];
		if (!(curID in guardTimelines)) guardTimelines[curID] = [];
	}
	if (!/Guard/.test(line)) guardTimelines[curID].push(line);
}

let sleepiestGuard = { minutesAsleep: 0 };
let consistentAsleepGuard = { mostMinsAsleep: 0 };

Object.entries(guardTimelines).forEach(gtl => {
	const id = +gtl[0];
	let minutesAsleep = 0;
	const asleepTimes = {};

	for (let i = 0; i < gtl[1].length; i += 2) {
		const asleepAt = +gtl[1][i].slice(15, 17);
		const awakeAt = +gtl[1][i + 1].slice(15, 17);

		for (let j = asleepAt; j < awakeAt; j++) {
			if (!(j in asleepTimes)) asleepTimes[j] = 1;
			else asleepTimes[j]++;
		}

		minutesAsleep += awakeAt - asleepAt;
	}
	const mostAsleepAt = Object.entries(asleepTimes).sort(
		(a, b) => b[1] - a[1]
	)?.[0];

	const guard = {
		id,
		minutesAsleep,
		minMostAsleep: mostAsleepAt?.[0],
		mostMinsAsleep: mostAsleepAt?.[1],
	};

	if (guard.minutesAsleep > sleepiestGuard.minutesAsleep)
		sleepiestGuard = guard;
	if (guard.mostMinsAsleep > consistentAsleepGuard.mostMinsAsleep)
		consistentAsleepGuard = guard;
});

const partOne = sleepiestGuard.id * sleepiestGuard.minMostAsleep;
const partTwo = consistentAsleepGuard.id * consistentAsleepGuard.minMostAsleep;

console.log("Part one:", partOne);
console.log("Part two:", partTwo);

const endTime = Date.now();
timeUsed(startTime, endTime);
