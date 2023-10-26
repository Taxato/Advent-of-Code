import { readFile } from "node:fs";
readFile("./day16input.txt", { encoding: "ascii" }, readInput);

const auntProfile = {
	children: 3,
	cats: 7,
	samoyeds: 2,
	pomeranians: 3,
	akitas: 0,
	vizslas: 0,
	goldfish: 5,
	trees: 3,
	cars: 2,
	perfumes: 1,
};

function readInput(err, raw) {
	if (err) return err;
	const input = raw.replaceAll("\r", "").split("\n");
	const aunts = processInput(input);
	const answerPart1 = findAuntPart1(aunts, auntProfile)[0].num;
	const answerPart2 = findAuntPart2(aunts, auntProfile)[0].num;
	console.log(answerPart1, answerPart2);
}

function processInput(input) {
	const aunts = [];
	input.forEach(line => {
		const auntInfo = line
			.split(",")
			.map(i => i.split(":"))
			.flat();
		const aunt = {
			num: +auntInfo[0].slice(4),
		};

		for (let i = 1; i < auntInfo.length; i += 2) {
			aunt[auntInfo[i].trim()] = Number(auntInfo[i + 1]);
		}
		aunts.push(aunt);
	});
	return aunts;
}

function findAuntPart1(aunts, auntProfile) {
	// console.log(aunts.slice(0, 10));

	return aunts.filter(aunt => {
		for (const compound of Object.keys(auntProfile)) {
			if (aunt[compound]) {
				const match = aunt[compound] === auntProfile[compound];
				if (!match) return false;
			}
		}
		return true;
	});
}

function findAuntPart2(aunts, auntProfile) {
	return aunts.filter(aunt => {
		for (const compound of Object.keys(auntProfile)) {
			if (aunt[compound] !== undefined) {
				let match;
				switch (compound) {
					case "cats":
					case "trees":
						match = aunt[compound] > auntProfile[compound];
						break;
					case "pomeranians":
					case "goldfish":
						match = aunt[compound] < auntProfile[compound];
						break;
					default:
						match = aunt[compound] === auntProfile[compound];
						break;
				}
				if (!match) return false;
			}
		}
		return true;
	});
}
