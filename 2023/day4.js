import { sumArr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day4input as input } from "./inputs.js";

const score = card => {
	let pow = -1;
	let count = 0;
	for (const w of card.wins) {
		if (card.nums.has(w)) {
			pow++;
			count++;
		}
	}
	return { total: pow === -1 ? 0 : 2 ** pow, count };
};

const cards = input.map(line => {
	const [id, winning, nums] = line.split(/: | \| /);
	const card = {
		id: +id.match(/\d+/),
		wins: [...winning.matchAll(/\d+/g)].map(w => +w),
		nums: new Set([...nums.matchAll(/\d+/g)].map(n => +n)),
	};
	card.score = score(card);
	return card;
});

const partOne = cards.reduce((sum, cur) => sum + cur.score.total, 0);

const numCopies = {};
let sum = 0;
cards.forEach(c => (numCopies[c.id] = 1));
for (let i = 0; i < cards.length; i++) {
	const c = cards[i];
	sum += numCopies[c.id];
	for (let j = c.id; j < c.id + c.score.count; j++) {
		numCopies[j + 1] += numCopies[c.id];
	}
}

console.log("Part one:", partOne);
console.log("Part two:", sum);

const endTime = Date.now();
timeUsed(startTime, endTime);
