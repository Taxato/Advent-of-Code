import { day4input as input } from "./inputs.js";

let idSum = 0;
// input.forEach(line => {
// 	idSum += checkValid(line);
// });

function checkValid(str) {
	const parseRegex = /([a-z-]+)(\d+)\[(\w+)\]/;
	const [_, encrName, id, checkSum] = str.match(parseRegex);
	const name = encrName.replaceAll("-", "");

	console.log(name, +id, checkSum);
	const realSum = getRealSum(name);
	if (realSum === checkSum) return +id;
	return 0;
}

function getRealSum(name) {
	const letterCount = {};
	for (let i = 0; i < name.length; i++) {
		if (!letterCount[name[i]]) letterCount[name[i]] = 1;
		else letterCount[name[i]]++;
	}

	return Object.entries(letterCount)
		.sort((a, b) => {
			const countA = a[1];
			const countB = b[1];
			const letterA = a[0];
			const letterB = b[0];

			if (countA !== countB) return countB - countA;
			else return letterA - letterB;
		})
		.slice(0, 5)
		.map(letter => letter[0])
		.join("");
}

console.log(checkValid("aaaaa-bbb-z-y-x-123[abxyz]"));
