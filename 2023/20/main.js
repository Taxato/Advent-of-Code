import { readFileSync } from "fs";
import { time } from "../../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./input.txt", { encoding: "utf8" });
const test = readFileSync("./test.txt", { encoding: "utf8" });
const data = input;

const LOW = false;
const HIGH = true;

class Module {
	constructor(str) {
		if (str.startsWith("broad")) {
			this.type = "broadcaster";
		} else {
			switch (str.charAt(0)) {
				case "%":
					this.type = "flipFlop";
					this.state = false;
					break;
				case "&":
					this.type = "conjunct";
					break;
				default:
					this.type = "output";
			}
		}

		if (this.type === "broadcaster") {
			const [_, rawDsts] = str.match(/broadcaster -> (.*)/);
			this.name = "broadcaster";
			this.dsts = rawDsts.split(", ");
		} else if (this.type === "output") {
			this.name = str;
		} else {
			const [_, name, rawDsts] = str.match(/.(\w+) -> (.*)/);
			this.name = name;
			this.dsts = rawDsts.split(", ");
		}

		this.srcs = [];
	}

	recievePulse(from, amp) {
		switch (this.type) {
			case "flipFlop":
				if (amp === LOW) {
					this.state = !this.state;
					this.emitPulse(this.state);
				}
				break;
			case "conjunct":
				this.inputs[from] = amp;
				if (Object.values(this.inputs).every(inp => inp === HIGH))
					this.emitPulse(LOW);
				else this.emitPulse(HIGH);
				break;
			case "broadcaster":
				this.emitPulse(LOW);
				break;
		}
	}

	emitPulse(amp) {
		if (amp === HIGH) this.machine.highPulses += this.dsts.length;
		else this.machine.lowPulses += this.dsts.length;

		this.machine.pulseQueue.push({ from: this.name, amp });
	}
}

class Machine {
	constructor(rawStr) {
		// Create modules
		this.modules = rawStr.split("\n").map(str => {
			const module = new Module(str);
			module.machine = this;
			return module;
		});
		// Link modules to their inputs
		this.modules.forEach(m => {
			m.dsts.forEach(dst => {
				let dstMod = this.modules.find(dM => dM.name === dst);
				if (!dstMod) {
					const newMod = new Module(dst);
					this.modules.push(newMod);
					dstMod = newMod;
				}
				dstMod.srcs.push(m.name);
			});
		});
		// Set all inputs on conjunction type modules to low
		this.modules
			.filter(m => m.type === "conjunct")
			.forEach(m => {
				m.inputs = Object.fromEntries(m.srcs.map(src => [src, false]));
			});

		this.broadcaster = this.modules.find(m => m.type === "broadcaster");
		this.pulseQueue = [];
		this.buttonPresses;
		this.lowPulses = 0;
		this.highPulses = 0;
	}

	pushButton(numTimes = 1) {
		for (
			this.buttonPresses = 0;
			this.buttonPresses < numTimes;
			this.buttonPresses++
		) {
			this.broadcaster.recievePulse(LOW);
			this.run();
		}
		return (this.lowPulses + this.buttonPresses) * this.highPulses;
	}

	logState() {
		console.log(
			this.lowPulses,
			this.highPulses,
			this.modules
				.filter(m => m.type !== "broadcaster")
				.map(
					m =>
						`${m.name}:${
							m.type === "flipFlop"
								? m.state
								: Object.entries(m.inputs)
						}`
				)
				.join(",")
		);
	}

	run() {
		while (this.pulseQueue.length) {
			const { from, amp } = this.pulseQueue.shift();
			this.modules
				.filter(m => m.type !== "output" && m.srcs.includes(from))
				.forEach(m => m.recievePulse(from, amp));
		}
	}

	reset() {
		this.buttonPresses = 0;
		this.lowPulses = 0;
		this.highPulses = 0;
		this.modules.forEach(m => {
			if (m.type === "conjunct")
				Object.keys(m.inputs).forEach(k => (m.inputs[k] = false));
			else if (m.type === "flipFlop") m.state = false;
		});
	}
}

const machine = new Machine(data);
console.log("Part one:", machine.pushButton(1000));

// Part two
machine.reset();

const output = machine.modules.find(m => m.name === "rx");

time(startTime);
