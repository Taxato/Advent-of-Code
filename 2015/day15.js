import { maxInArr, sumArr, timeUsed } from "./helper.js";

const startTime = Date.now();

const input = `Sugar: capacity 3, durability 0, flavor 0, texture -3, calories 2
Sprinkles: capacity -3, durability 3, flavor 0, texture 0, calories 9
Candy: capacity -1, durability 0, flavor 4, texture 0, calories 1
Chocolate: capacity 0, durability 0, flavor -2, texture 2, calories 8`;

const testInput = `Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`;

const ings = input
	.replace("\r", "")
	.split("\n")
	.map(ing => {
		const parts = ing.split(" ");

		const name = parts[0].slice(0, -1);
		const capacity = +parts[2].slice(0, -1);
		const durability = +parts[4].slice(0, -1);
		const flavor = +parts[6].slice(0, -1);
		const texture = +parts[8].slice(0, -1);
		const calories = +parts[10];

		return { capacity, durability, flavor, texture, calories };
	});

console.log(getScores(ings));

function getScores(ings) {
	const validAmounts = [];
	for (let i = 0; i < 10 ** (ings.length * 2); i++) {
		const bigNum = (i + "").padStart(ings.length * 2, 0);
		const nums = [];
		for (let j = 0; j < ings.length; j++) {
			const num = +bigNum.slice(j * 2, j * 2 + 2);
			nums.push(num);
		}
		if (nums.includes(0)) continue;
		if (sumArr(nums) !== 100) continue;
		validAmounts.push(nums);
	}
	const scores = validAmounts.map(amnt => cookieScore(ings, amnt));
	return maxInArr(scores);
}

function cookieScore(ings, ingAmounts) {
	// const totals = [0,0,0,0] // PART ONE
	const totals = [0, 0, 0, 0, 0]; // PART TWO
	ings.forEach((ing, i) => {
		Object.values(ing)
			// .slice(0, 4) // PART ONE
			.slice(0, 5) // PART TWO
			.forEach((stat, j) => {
				totals[j] += stat * ingAmounts[i];
			});
	});

	if (totals[4] !== 500) return 0; // PART TWO
	if (totals.filter(t => t < 0).length > 0) return 0;
	return totals[0] * totals[1] * totals[2] * totals[3];
}

const finishedTime = Date.now();
timeUsed(startTime, finishedTime);
