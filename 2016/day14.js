import md5 from "md5";

import { feedBackOutInFunc } from "../helper.js";

const input = "ihaygndm";

function getKeyIndex(salt, keyNum, numHashes = 1) {
	const keys = [];
	const candidates = [];
	const hashes = [];

	for (let i = 0; keys.length < keyNum; i++) {
		let hash = salt + i;
		for (let j = 0; j < numHashes; j++) {
			hash = md5(hash);
		}
		hashes[i] = hash;

		let match;
		if ((match = hash.match(/(.)\1\1/))) {
			candidates[i] = { i, c: match[1] };
		}

		const candidate = candidates[i - 1000];
		if (candidate) {
			const matches = hashes
				.slice(i - 999)
				.filter(h => new RegExp(`${candidate.c}{5}`).test(h));
			if (matches.length) {
				keys.push(i - 1000);
				console.log(`Found key #${keys.length} at index ${i - 1000}`);
			}
		}
	}
	return keys.at(-1);
}

const partOne = getKeyIndex(input, 64);
const partTwo = getKeyIndex(input, 64, 2017);
console.log(partOne, partTwo);
