import { sumArr } from "./helper.js";

const input = [
	1, 2, 3, 7, 11, 13, 17, 19, 23, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73,
	79, 83, 89, 97, 101, 103, 107, 109, 113,
];

const totalWeight = sumArr(input);
const singleWeight = totalWeight / 3;

console.log(singleWeight);

const allCombos = [];

for (let i = 0; i < input.length; i++) {
	let sum = input[i];
	while (sum < singleWeight) {
		for (let j = 0; j < array.length; j++) {
			if (j === i) continue;
            sum+=
		}
	}
}

function addEl(sum,usedEls){
    
}

console.log(allCombos);
