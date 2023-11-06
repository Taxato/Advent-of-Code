const input = 3012210;

function josephus(n) {
	return 2 * Number(`0b${n.toString(2).slice(1)}`) + 1;
}

function josephusAcross(
	n,
	m = 1,
	people = Array.from({ length: n }, (_, i) => ({ num: i + 1, alive: true }))
) {
	let alive = Object.values(people)
		.filter(p => p.alive)
		.map(p => p.num);

	if (alive.length === 1) return m;

	const nextDead =
		alive[(alive.indexOf(m) + Math.floor(alive.length / 2)) % alive.length];

	people[nextDead - 1].alive = false;

	alive = Object.values(people)
		.filter(p => p.alive)
		.map(p => p.num);
	const nextM = alive[(alive.indexOf(m) + 1) % alive.length];

	return josephusAcross(n, nextM, people);
}

function josAcrossFast(n) {
	let i = 0;
	let res = 0;
	while (res < n) {
		i++;
		res = 3 ** i;
	}
	return n - 3 ** (i - 1);
}

const partOne = josephus(input);

const partTwo = josAcrossFast(input);

console.log(partOne, partTwo);

// for (let i = 0; i < 100; i++) {
// 	const josA = josAcrossFast(i);
// 	const i3 = i.toString(3);
// 	const i3Stripped = i3.at(0) - 1 + i3.slice(1);

// 	console.log(i, josA);
// }

// for (let i = 1; i < 500; i++) {
// 	const josA = josephusAcross(i);
// 	console.log(i, josA, josA.toString(3));
// }
