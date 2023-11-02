import md5 from "md5";

import { day5input as input } from "./inputs.js";

/* // PART ONE
let password = "";
let i = 0;
while (password.length < 8) {
	const hash = md5(input + i);
	if (hash.slice(0, 5) === "00000") {
		password += hash.slice(5, 6);
	}
	i++;
}
console.log(password)
*/

// PART TWO
let password = new Array(8).fill(null);

let i = 0;
while (password.includes(null)) {
	const hash = md5(input + i);
	if (hash.slice(0, 5) === "00000") {
		const pos = +hash.charAt(5);
		if (!isNaN(pos) && pos <= 7) {
			const char = hash.charAt(6);
			if (!password[pos]) password[pos] = char;
		}
	}
	i++;
}

console.log(password.join(""));
