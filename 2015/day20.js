import { timeUsed } from "../helper.js";
const startTime = Date.now();

const target = 33100000;

// PART ONE
let houses = new Array(target / 10 + 1).fill(0);
for (let elf = 1; elf < houses.length; elf++) {
	for (let house = elf; house < houses.length; house += elf) {
		houses[house] += elf * 10;
	}
}
console.log(getTargetHouse(houses));

// PART TWO
houses = new Array(target / 10 + 1).fill(0);
for (let elf = 1; elf < houses.length; elf++) {
	for (let house = elf; house < elf * 50; house += elf) {
		if (house >= houses.length) continue;
		houses[house] += elf * 11;
	}
}
console.log(getTargetHouse(houses));

function getTargetHouse(houses) {
	for (let i = 0; i < houses.length; i++) {
		if (houses[i] >= target) {
			return i;
		}
	}
}

const finishTime = Date.now();
timeUsed(startTime, finishTime);
