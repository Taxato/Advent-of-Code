const input = `Sugar: capacity 3, durability 0, flavor 0, texture -3, calories 2
Sprinkles: capacity -3, durability 3, flavor 0, texture 0, calories 9
Candy: capacity -1, durability 0, flavor 4, texture 0, calories 1
Chocolate: capacity 0, durability 0, flavor -2, texture 2, calories 8`;

/* const ings = {
	Sugar: {
		capacity: 3,
		durability: 0,
		flabour: 0,
		texture: -3,
		calories: 2,
	},
	Sprinkles: {
		capacity: -3,
		durability: 3,
		flabour: 0,
		texture: 0,
		calories: 9,
	},
	Candy: {
		capacity: -1,
		durability: 0,
		flabour: 4,
		texture: 0,
		calories: 1,
	},
	Chocolate: {
		capacity: 0,
		durability: 0,
		flabour: -2,
		texture: 2,
		calories: 8,
	},
}; */

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

getIngAmounts(ings);

function getIngAmounts(ings) {
	const amounts = new Array(ings.length).fill(1);
	incAmount(amounts);
}

function incAmount(amounts = [1, 1, 1, 1]) {
	amounts = [];
}

function cookieScore(ings, ingAmounts) {
	const totals = [0, 0, 0, 0];
	ings.forEach((ing, i) => {
		Object.values(ing)
			.slice(0, 4)
			.forEach((stat, j) => {
				totals[j] += stat * ingAmounts[i];
			});
	});

	if (totals.filter(t => t < 0).length > 0) return 0;
	return totals[0] * totals[1] * totals[2] * totals[3];
}

// console.log(cookieScore(ings, [44, 56]));
