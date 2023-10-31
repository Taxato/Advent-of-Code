import { maxInArr } from "../helper.js";
const input = `Vixen can fly 8 km/s for 8 seconds, but then must rest for 53 seconds.
Blitzen can fly 13 km/s for 4 seconds, but then must rest for 49 seconds.
Rudolph can fly 20 km/s for 7 seconds, but then must rest for 132 seconds.
Cupid can fly 12 km/s for 4 seconds, but then must rest for 43 seconds.
Donner can fly 9 km/s for 5 seconds, but then must rest for 38 seconds.
Dasher can fly 10 km/s for 4 seconds, but then must rest for 37 seconds.
Comet can fly 3 km/s for 37 seconds, but then must rest for 76 seconds.
Prancer can fly 9 km/s for 12 seconds, but then must rest for 97 seconds.
Dancer can fly 37 km/s for 1 seconds, but then must rest for 36 seconds.`;

const testInput = `Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`;

const matches = input.matchAll(
	/(?<name>\w+).+?(?<spd>\d+).+?(?<flyTime>\d+).+?(?<restTime>\d+)/g
);

const reindeer = [];

for (const match of matches) {
	const { name, spd, flyTime, restTime } = match.groups;
	reindeer.push({
		name,
		spd: +spd,
		flyTime: +flyTime,
		restTime: +restTime,
		totalCycle: +flyTime + +restTime,
		distTraveled: 0,
		points: 0,
	});
}

for (let sec = 0; sec < 2503; sec++) {
	reindeer.forEach(deer => {
		const flying = sec % deer.totalCycle < deer.flyTime;
		if (flying) deer.distTraveled += deer.spd;
	});

	reindeer
		.reduce(
			([leadDist, earners], deer) => {
				if (deer.distTraveled > leadDist) {
					leadDist = deer.distTraveled;
					earners = [deer];
				} else if (deer.distTraveled == leadDist) {
					earners = [...earners, deer];
				}
				return [leadDist, earners];
			},
			[0, []]
		)[1]
		.forEach(deer => deer.points++);

	// const maxDistance = maxInArr(reindeer.map(deer => deer.distTraveled));
	// const pointRecievers = reindeer.filter(
	// 	deer => deer.distTraveled === maxDistance
	// );
	// pointRecievers.forEach(deer => {
	// 	deer.points++;
	// });
}

const maxDistance = maxInArr(reindeer.map(el => el.distTraveled));
const maxPoints = maxInArr(reindeer.map(el => el.points));

console.log(maxDistance, maxPoints);
