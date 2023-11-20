import { timeUsed } from "../helper.js";
const startTime = Date.now();

import { day20input as input } from "./inputs.js";

class GPU {
	constructor(particles) {
		this.particles = [...particles];
	}

	freshParticles() {
		return this.particles.map(p => p.clone());
	}

	closestParticle() {
		const testParticles = this.freshParticles();
		for (let i = 0; i < 500; i++) {
			this.updateParticles(testParticles);
		}

		return this.particles.reduce((min, cur) =>
			cur.dstToCenter < min.dstToCenter ? cur : min
		).num;
	}

	getRemaining() {
		let testParticles = this.freshParticles();
		for (let i = 0; i < 500; i++) {
			let positions = new Set();
			let duplicates = new Set();
			testParticles.forEach(p => {
				const key = p.posKey;
				if (positions.has(key)) duplicates.add(key);
				else positions.add(key);
			});
			testParticles = testParticles.filter(
				p => !duplicates.has(p.posKey)
			);

			this.updateParticles(testParticles);
		}
		return testParticles.length;
	}

	updateParticles(particles) {
		particles.forEach(p => {
			p.update();
		});
	}
}

class Particle {
	constructor(num, pos, vel, acc) {
		this.num = num;
		this.pos = { ...pos };
		this.vel = { ...vel };
		this.acc = { ...acc };
	}

	update() {
		this.vel.x += this.acc.x;
		this.vel.y += this.acc.y;
		this.vel.z += this.acc.z;

		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		this.pos.z += this.vel.z;
	}

	get posKey() {
		return Object.values(this.pos).join("/");
	}

	get dstToCenter() {
		return (
			Math.abs(this.pos.x) + Math.abs(this.pos.y) + Math.abs(this.pos.z)
		);
	}

	clone() {
		return new Particle(this.num, this.pos, this.vel, this.acc);
	}
}

const gpu = new GPU(
	input.map((line, i) => {
		const [_, p, v, a] = line.match(
			/p=<([\d,-]+)>, v=<([\d,-]+)>, a=<([\d,-]+)>/
		);
		const [posX, posY, posZ] = p.split(",").map(n => +n);
		const [velX, velY, velZ] = v.split(",").map(n => +n);
		const [accX, accY, accZ] = a.split(",").map(n => +n);

		const pos = { x: posX, y: posY, z: posZ };
		const vel = { x: velX, y: velY, z: velZ };
		const acc = { x: accX, y: accY, z: accZ };

		return new Particle(i, pos, vel, acc);
	})
);

console.log("Part one:", gpu.closestParticle());
console.log("Part two:", gpu.getRemaining());

const endTime = Date.now();
timeUsed(startTime, endTime);
