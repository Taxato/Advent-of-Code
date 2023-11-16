import { manhattanDist, timeUsed } from "../helper.js";
const startTime = Date.now();

import { day11input as input } from "./inputs.js";

class HexGrid {
	origin = { x: 0, y: 0 };
	curPos = { x: 0, y: 0 };
	maxDst = 0;

	move(pos, dir) {
		switch (dir) {
			case "n":
				pos.y++;
				break;
			case "ne":
				pos.x++;
				break;
			case "se":
				pos.x++;
				pos.y--;
				break;
			case "s":
				pos.y--;
				break;
			case "sw":
				pos.x--;
				break;
			case "nw":
				pos.x--;
				pos.y++;
				break;
		}
		const dst = this.dstToCoords(pos);
		if (dst > this.maxDst) this.maxDst = dst;
	}

	shortestDst(instructions) {
		const pos = { x: 0, y: 0 };
		instructions.forEach(dir => this.move(pos, dir));
		return this.dstToCoords(pos);
	}

	dstToCoords(coords) {
		const pos = { ...coords };

		let dst = 0;
		while (pos.x !== 0 && pos.y !== 0) {
			if (pos.x > 0 && pos.y < 0) {
				dst++;
				pos.x--;
				pos.y++;
			} else if (pos.x < 0 && pos.y > 0) {
				dst++;
				pos.x++;
				pos.y--;
			} else if (pos.x * pos.y > 0) {
				dst += manhattanDist(pos);
				pos.x = 0;
				pos.y = 0;
			}
		}
		dst += Math.max(Math.abs(pos.x), Math.abs(pos.y));
		return dst;
	}
}

const grid = new HexGrid();

console.log("Part one:", grid.shortestDst(input));
console.log("Part two:", grid.maxDst);

const endTime = Date.now();
timeUsed(startTime, endTime);
