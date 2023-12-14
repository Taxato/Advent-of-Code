import { readFileSync } from "fs";
import { sumArr, time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day12input.txt", { encoding: "utf8" });
// const input = readFileSync("./day12test.txt", { encoding: "utf8" });

class Row {
	constructor(springs, numbers) {
		this.springs = springs;
		this.numbers = numbers;
		this.groups = [];
	}

	get numArrangements() {
		let num = 0;

		const unknownIdcs = [];
		for (let i = 0; i < this.springs.length; i++)
			if (this.springs.charAt(i) === "?") unknownIdcs.push(i);

		const bin = "1".repeat(unknownIdcs.length);

		for (let i = 0; i <= Number("0b" + bin); i++) {
			const combo = i
				.toString(2)
				.padStart(bin.length, "0")
				.split("")
				.map(Number);

			const strArr = this.springs.split("");
			for (let j = 0; j < combo.length; j++) {
				strArr[unknownIdcs[j]] = combo[j] === 1 ? "#" : ".";
			}
			const newSprings = strArr.join("");

			if (this.isValid(newSprings)) num++;
		}

		return num;
	}

	isValid(springs) {
		if (springs.match(/#/g)?.length !== sumArr(this.numbers)) return false;

		const regex = new RegExp(
			`${this.numbers.map(n => "#".repeat(n)).join(".+")}`
		);
		return regex.test(springs);
	}
}

let sum = 0;
input.split("\n").forEach(line => {
	let [springs, numbers] = line.split(" ");
	numbers = numbers.split(",").map(Number);
	const newRow = new Row(springs, numbers);
	sum += newRow.numArrangements;
});
console.log(sum);

time(startTime);
