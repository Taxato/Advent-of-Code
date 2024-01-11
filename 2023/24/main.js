import { readFileSync } from "fs";
import { combinations, time } from "../../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./input.txt", { encoding: "utf8" });
const test = readFileSync("./test.txt", { encoding: "utf8" });
let data = input;

class Hailstone {
	constructor(i, pX, pY, pZ, vX, vY, vZ) {
		this.i = i;
		this.pX = pX;
		this.pY = pY;
		this.pZ = pZ;
		this.vX = vX;
		this.vY = vY;
		this.vZ = vZ;

		this.m = this.vY / this.vX;
		this.b = this.pY - this.pX * this.m;
	}

	slopeIntercept() {
		console.log(`y = ${this.m}x + ${this.b}`);
	}

	collisionEquation() {
		console.log(
			`x(${this.pX} + ${this.vX}*t${this.i}) + y(${this.pY} + ${this.vY}*t${this.i}) + z(${this.pZ} + ${this.vZ}*t${this.i})`
		);
	}

	static willIntersect(A, B, minXY, maxXY) {
		const m1 = A.m;
		const b1 = A.b;

		const m2 = B.m;
		const b2 = B.b;

		const x = m1 - m2;
		const n = b2 - b1;

		if (x === 0) return 0;

		const collisionX = (n / x).toFixed(3);
		const collisionY = (A.b + A.m * (n / x)).toFixed(3);

		if (
			collisionX >= minXY &&
			collisionX <= maxXY &&
			collisionY >= minXY &&
			collisionY <= maxXY &&
			(A.vX > 0 ? collisionX >= A.pX : collisionX <= A.pX) &&
			(B.vX > 0 ? collisionX >= B.pX : collisionX <= B.pX)
		)
			return 1;
		else return 0;
	}
}

// const minPos = 7;
// const maxPos = 27;
const minPos = 200000000000000;
const maxPos = 400000000000000;

const hail = data
	.split("\n")
	.map((line, i) => new Hailstone(i, ...line.match(/[\d-]+/g).map(Number)));

// Part one
let sum = 0;
for (const [a, b] of combinations(hail, 2)) {
	sum += Hailstone.willIntersect(a, b, minPos, maxPos);
}
console.log("Total collisions within test area:", sum);

const velocitiesX = {};
const velocitiesY = {};
const velocitiesZ = {};

hail.forEach(h => {
	if (!(h.vX in velocitiesX)) velocitiesX[h.vX] = [];
	if (!(h.vY in velocitiesY)) velocitiesY[h.vY] = [];
	if (!(h.vZ in velocitiesZ)) velocitiesZ[h.vZ] = [];

	velocitiesX[h.vX].push(h.pX);
	velocitiesY[h.vY].push(h.pY);
	velocitiesZ[h.vZ].push(h.pZ);
});

const getRockVelocity = velocities => {
	let possibleV = [];
	for (let x = -1000; x <= 1000; x++) {
		possibleV.push(x);
	}

	Object.keys(velocities).forEach(velocity => {
		if (velocities[velocity].length < 2) {
			return;
		}

		let newPossibleV = [];
		possibleV.forEach(possible => {
			if (
				(velocities[velocity][0] - velocities[velocity][1]) %
					(possible - velocity) ===
				0
			) {
				newPossibleV.push(possible);
			}
		});

		possibleV = newPossibleV;
	});

	return possibleV[0];
};

let possibleV = [];
for (let x = -1000; x <= 1000; x++) {
	possibleV.push(x);
}

const rvx = getRockVelocity(velocitiesX);
const rvy = getRockVelocity(velocitiesY);
const rvz = getRockVelocity(velocitiesZ);

const results = {};
for (let i = 0; i < hail.length; i++) {
	for (let j = i + 1; j < hail.length; j++) {
		const stoneA = hail[i];
		const stoneB = hail[j];

		const ma = (stoneA.vY - rvy) / (stoneA.vX - rvx);
		const mb = (stoneB.vY - rvy) / (stoneB.vX - rvx);

		const ca = stoneA.pY - ma * stoneA.pX;
		const cb = stoneB.pY - mb * stoneB.pX;

		const rpx = parseInt((cb - ca) / (ma - mb));
		const rpy = parseInt(ma * rpx + ca);

		const time = Math.round((rpx - stoneA.pX) / (stoneA.vX - rvx));
		const rpz = stoneA.pZ + (stoneA.vZ - rvz) * time;

		const result = rpx + rpy + rpz;
		if (!results[result]) {
			results[result] = 1;
		} else {
			results[result]++;
		}
	}
}

const result = Object.keys(results).sort((a, b) => results[b] - results[a])[0];

console.log(result);

time(startTime);
