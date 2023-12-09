import { readFileSync, writeFileSync } from "fs";
import { time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day7input.txt", { encoding: "utf8" });
// const input = readFileSync("./testinput.txt", { encoding: "utf8" });

// const vals = "23456789TJQKA";

// Part two vals
const vals = "J23456789TQKA";

const bids = input.split("\n").map(line => {
	const [hand, bid] = line.split(" ");
	return { hand, bid: +bid };
});

// for (const bid of bids) {
// 	bid.cards = {};
// 	for (const c of bid.hand.split("")) {
// 		bid.cards[c] = c in bid.cards ? bid.cards[c] + 1 : 1;
// 	}
// 	bid.cards = Object.entries(bid.cards).sort((a, b) => b[1] - a[1]);
// }

// Part two
for (const bid of bids) {
	bid.cards = {};
	let jokers = 0;
	for (const c of bid.hand.split("")) {
		if (c === "J") {
			jokers++;
			continue;
		}
		bid.cards[c] = c in bid.cards ? bid.cards[c] + 1 : 1;
	}
	bid.cards = Object.entries(bid.cards).sort((a, b) => b[1] - a[1]);
	// console.log(bid.cards);
	if (bid.cards.length > 0) {
		bid.cards[0][1] += jokers;
	} else {
		bid.cards = [["J", 5]];
	}
}

bids.sort((a, b) => {
	if (a.cards[0][1] !== b.cards[0][1]) return a.cards[0][1] - b.cards[0][1];
	if (a.cards.length !== b.cards.length)
		return b.cards.length - a.cards.length;
	if (vals.indexOf(a.hand.charAt(0)) !== vals.indexOf(b.hand.charAt(0)))
		return vals.indexOf(a.hand.charAt(0)) - vals.indexOf(b.hand.charAt(0));
	else if (vals.indexOf(a.hand.charAt(1)) !== vals.indexOf(b.hand.charAt(1)))
		return vals.indexOf(a.hand.charAt(1)) - vals.indexOf(b.hand.charAt(1));
	else if (vals.indexOf(a.hand.charAt(2)) !== vals.indexOf(b.hand.charAt(2)))
		return vals.indexOf(a.hand.charAt(2)) - vals.indexOf(b.hand.charAt(2));
	else if (vals.indexOf(a.hand.charAt(3)) !== vals.indexOf(b.hand.charAt(3)))
		return vals.indexOf(a.hand.charAt(3)) - vals.indexOf(b.hand.charAt(3));
	else return vals.indexOf(a.hand.charAt(4)) - vals.indexOf(b.hand.charAt(4));
});

// console.log(bids.map(b => [b.hand, b.bid, ...b.cards.map(c => c[0])]));

console.log(bids.reduce((sum, cur, i) => sum + cur.bid * (i + 1), 0));
time(startTime);
