import { readFileSync } from "fs";
import { create2DArr, loop2DArr, manhattanDist, time } from "../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./day6input.txt", { encoding: "utf8" });
// const input = readFileSync("./day6test.txt", { encoding: "utf8" });

const points = input
	.split("\n")
	.map(l => l.split(", ").map(Number))
	.map((p, i) => ({ i, x: p[0], y: p[1] }));

const a1 = getAreas(1000);
const a2 = getAreas(1400);

const a1Keys = new Set(Object.entries(a1).map(a => a[0] + "/" + a[1]));
const a2Keys = new Set(Object.entries(a2).map(a => a[0] + "/" + a[1]));

const same = new Set();
a1Keys.forEach(k => {
	if (a2Keys.has(k)) same.add(k);
});
console.log(
	[...same].reduce((maxA, curK) => {
		const num = +curK.split("/")[1];
		return num > maxA ? num : maxA;
	}, 0)
);

function getAreas(size) {
	const areas = {};
	points.forEach(p => (areas[p.i] = 0));

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			let dstToPoints = [];
			for (const p of points) {
				dstToPoints.push({ i: p.i, dst: manhattanDist({ x, y }, p) });
			}

			const lowestDst = dstToPoints.reduce(
				(min, cur) => (cur.dst < min ? cur.dst : min),
				Infinity
			);
			const closestPoints = dstToPoints.filter(p => p.dst === lowestDst);
			if (closestPoints.length === 1) areas[closestPoints[0].i]++;
		}
	}
	return areas;
}

time(startTime);
