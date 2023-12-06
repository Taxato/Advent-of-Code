import { time } from "../helper.js";
const startTime = process.hrtime();
const races = [
	[38, 241],
	[94, 1549],
	[79, 1074],
	[70, 1091],
];
let product = 1;
for (const [maxTime, recordDst] of races) {
	let wins = 0;
	for (let releaseTime = 0; releaseTime < maxTime; releaseTime++) {
		const dst = (maxTime - releaseTime) * releaseTime;
		if (dst > recordDst) wins++;
	}
	if (wins > 0) product *= wins;
}
const bigRace = races
	.reduce(([time, dst], race) => [time + race[0], dst + race[1]], ["", ""])
	.map(Number);
let wins = 0;
for (let releaseTime = 0; releaseTime < bigRace[0]; releaseTime++) {
	const dst = (bigRace[0] - releaseTime) * releaseTime;
	if (dst > bigRace[1]) wins++;
}
console.log("Part one:", product);
console.log("Part two:", wins);
time(startTime);
