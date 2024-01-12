import { readFileSync } from "fs";
import { sumArr, time } from "../../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./input.txt", { encoding: "utf8" });
const test = readFileSync("./test.txt", { encoding: "utf8" });
const data = input;

const G = {};

data.split("\n").forEach(line => {
	const [u, ...vs] = line.replace(":", "").split(" ");
	vs.forEach(v => {
		if (!(u in G)) G[u] = new Set();
		if (!(v in G)) G[v] = new Set();
		G[u].add(v);
		G[v].add(u);
	});
});
const S = new Set(Object.keys(G));

const count = v => [...G[v]].filter(neighbor => !S.has(neighbor)).length;

while (sumArr([...S].map(count)) !== 3) {
	S.delete(
		[...S].reduce((max, cur) => (count(max) > count(cur) ? max : cur))
	);
}
console.log(S.size * (Object.keys(G).length - S.size));

time(startTime);
