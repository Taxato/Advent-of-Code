import { readFileSync } from "fs";
import { time } from "../../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./input.txt", { encoding: "utf8" });
const test = readFileSync("./test.txt", { encoding: "utf8" });
const data = input;

class Brick {
	constructor(id, x1, y1, z1, x2, y2, z2) {
		this.id = id;

		this.x1 = x1;
		this.y1 = y1;
		this.z1 = z1;
		this.x2 = x2;
		this.y2 = y2;
		this.z2 = z2;

		this.allOccupiedSpaces = new Set();
		this.topCoords = new Set();
		this.bottomCoords = new Set();
		this.touchingFloor = false;

		this.isResting = false;
		this.supporting = new Set();
		this.restingOn = new Set();
	}

	calcPos() {
		this.allOccupiedSpaces.clear();
		this.topCoords.clear();
		this.bottomCoords.clear();
		this.touchingFloor = Math.min(this.z1, this.z2) === 1;

		for (
			let i = Math.min(this.x1, this.x2);
			i <= Math.max(this.x1, this.x2);
			i++
		) {
			for (
				let j = Math.min(this.y1, this.y2);
				j <= Math.max(this.y1, this.y2);
				j++
			) {
				this.topCoords.add(`${i}-${j}-${Math.max(this.z1, this.z2)}`);
				this.bottomCoords.add(
					`${i}-${j}-${Math.min(this.z1, this.z2)}`
				);

				for (
					let k = Math.min(this.z1, this.z2);
					k <= Math.max(this.z1, this.z2);
					k++
				) {
					this.allOccupiedSpaces.add(`${i}-${j}-${k}`);
				}
			}
		}
		this.volume = this.allOccupiedSpaces.size;
	}

	occupiesSpace(x, y, z) {
		return this.allOccupiedSpaces.has(`${x}-${y}-${z}`);
	}

	calcRestingOn() {
		const resting = new Set();
		for (const bCoord of this.bottomCoords) {
			const [tx, ty, tz] = bCoord.split("-").map(Number);
			const matchingTopCoord = `${tx}-${ty}-${tz - 1}`;
			this.container.bricks
				.filter(b => b.topCoords.has(matchingTopCoord))
				.forEach(r => {
					r.supporting.add(this);
					resting.add(r);
				});
		}
		if (this.touchingFloor || resting.size !== 0) this.isResting = true;
		else this.isResting = false;
		this.restingOn = resting;
	}

	moveDown() {
		this.z1--;
		this.z2--;

		this.calcPos();
		this.supporting.clear();
	}

	get canBeDisintegrated() {
		return Array.from(this.supporting).every(sup => sup.restingOn.size > 1);
	}
}

class BricksContainer {
	constructor(input) {
		this.bricks = input.split("\n").map((line, i) => {
			const b = new Brick(i, ...line.match(/\d+/g).map(Number));
			b.container = this;
			return b;
		});
		this.bricks.forEach(b => b.calcPos());
		this.bricks.forEach(b => b.calcRestingOn());

		this.dropFloatingBricks();
	}

	dropFloatingBricks() {
		let unrestingBricks = this.bricks.filter(b => !b.isResting);
		while (unrestingBricks.length) {
			unrestingBricks.forEach(b => b.moveDown());
			this.bricks.forEach(b => b.calcRestingOn());
			unrestingBricks = this.bricks.filter(b => !b.isResting);
		}
	}

	totalDisintegrate() {
		return this.bricks.filter(b => b.canBeDisintegrated).length;
	}

	totalFallingBricks() {
		return this.bricks
			.filter(b => !b.canBeDisintegrated)
			.map(b => {
				const fallenBricks = new Set();
				let sum = 0;
				let remainingBricks = [b];
				while (remainingBricks.length) {
					const curB = remainingBricks.shift();
					fallenBricks.add(curB);
					const supporting = Array.from(curB.supporting);
					for (const supB of supporting) {
						const supRest = Array.from(supB.restingOn);
						if (
							supRest.length === 1 ||
							supRest.every(r => fallenBricks.has(r))
						) {
							sum++;
							remainingBricks.push(supB);
						}
					}
				}
				return sum;
			})
			.reduce((sum, cur) => sum + cur, 0);
	}
}

const bc = new BricksContainer(data);

console.log("Part one:", bc.totalDisintegrate());
console.log("Part two:", bc.totalFallingBricks());

time(startTime);
