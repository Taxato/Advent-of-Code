import { permutations, reverseStr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day21input as input } from "./inputs.js";

function run(instructions, startStr) {
	let outputStr = startStr;

	instructions.forEach(inst => {
		const op = inst.match(/^(swap|reverse|rotate|move)/)[0];

		switch (op) {
			case "swap": {
				const [_, a, b] = inst.match(/\b(\w)\b.+\b(\w)\b/);
				outputStr = swap(outputStr, a, b);
				break;
			}
			case "reverse": {
				const [_, a, b] = inst.match(/(\d+).+(\d+)/);
				outputStr = reverse(outputStr, +a, +b);
				break;
			}
			case "rotate": {
				const { dir, num, letter } = inst.match(
					/((?<dir>left|right) (?<num>\d))|\b(?<letter>\w)$/
				).groups;
				outputStr = rotate(outputStr, dir, +num, letter);
				break;
			}
			case "move": {
				const [_, pos1, pos2] = inst.match(/(\d).+(\d)/);
				outputStr = move(outputStr, +pos1, +pos2);
				break;
			}
		}
	});
	return outputStr;
}

function swap(str, x, y) {
	let newStr = "";

	if (isNaN(+x)) {
		for (let i = 0; i < str.length; i++) {
			if (str.at(i) === x) newStr += y;
			else if (str.at(i) === y) newStr += x;
			else newStr += str.at(i);
		}
	} else {
		for (let i = 0; i < str.length; i++) {
			if (i === +x) newStr += str.at(+y);
			else if (i === +y) newStr += str.at(+x);
			else newStr += str.at(i);
		}
	}
	return newStr || str;
}

function reverse(str, x, y) {
	return str.slice(0, x) + reverseStr(str.slice(x, y + 1)) + str.slice(y + 1);
}

function rotate(str, dir, num, letter) {
	if (dir) {
		num = dir === "right" ? num : (-num + str.length) % str.length;
	} else {
		const letterIndex = str.indexOf(letter);
		num = 1 + letterIndex + (letterIndex >= 4 ? 1 : 0);
	}
	num %= str.length;

	if (num === 0) return str;

	return str.slice(-num) + str.slice(0, str.length - num);
}

function move(str, pos1, pos2) {
	const letter = str.charAt(pos1);

	let newStr = str.slice(0, pos1) + str.slice(pos1 + 1);
	newStr = newStr.slice(0, pos2) + letter + newStr.slice(pos2);
	return newStr;
}

const part1 = run(input, "abcdefgh");

console.log(part1);
let part2Out = "fbgdceah";

for (const perm of permutations("abcdefgh".split(""))) {
	const out = run(input, perm.join(""));
	if (out === part2Out) {
		console.log(perm.join(""));
		break;
	}
}

const endTime = Date.now();
timeUsed(startTime, endTime);
