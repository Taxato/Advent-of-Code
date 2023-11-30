import { create2DArr, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day3input as input } from "./inputs.js";

class Fabric {
	constructor(input) {
		this.claims = input.map(line => {
			const [_, id, x, y, w, h] = line.match(
				/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/
			);
			return new Claim(+id, { x: +x, y: +y }, { w: +w, h: +h });
		});

		this.solve();
	}

	solve() {
		const cells = {};

		for (const claim of this.claims) {
			for (let x = claim.pos.x; x < claim.pos.x + claim.size.w; x++) {
				for (let y = claim.pos.y; y < claim.pos.y + claim.size.h; y++) {
					const key = x + "/" + y;

					if (!(key in cells)) cells[key] = 1;
					else cells[key]++;
				}
			}
		}

		this.partOne = Object.values(cells).reduce(
			(numSquares, curSquare) =>
				curSquare > 1 ? numSquares + 1 : numSquares,
			0
		);

		partTwo: for (const claim of this.claims) {
			for (let x = claim.pos.x; x < claim.pos.x + claim.size.w; x++) {
				for (let y = claim.pos.y; y < claim.pos.y + claim.size.h; y++) {
					const key = x + "/" + y;

					if (cells[key] > 1) continue partTwo;
				}
			}
			this.partTwo = claim.id;
		}
	}

	results() {
		console.log("Part one:", this.partOne);
		console.log("Part two:", this.partTwo);
	}
}

class Claim {
	constructor(id, pos, size) {
		this.id = id;
		this.pos = pos;
		this.size = size;
	}
}

const fabric = new Fabric(input);

fabric.results();

const endTime = Date.now();
timeUsed(startTime, endTime);
