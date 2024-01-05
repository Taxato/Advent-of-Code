import { readFileSync } from "fs";
import { arrProduct, sumArr, time } from "../../helper.js";
const startTime = process.hrtime();

const input = readFileSync("./input.txt", { encoding: "utf8" });
const test = readFileSync("./test.txt", { encoding: "utf8" });
let data = input;
data = data.split("\n\n");

function parseWorkflow(rawStr, builder) {
	const [_, key, rawFilters, fallback] = rawStr.match(/(.*){(.*),(.*)}/);
	return [key, builder(rawFilters, fallback)];
}

function extractFilterComponents(str) {
	const category = str.charAt(0);
	const op = str.charAt(1);
	const [valStr, dst] = str.slice(2).split(":");
	return { category, op, val: +valStr, dst };
}

function buildWorkflow(rawFilters, fallback) {
	return function _getNextDst(part) {
		for (const rawFilter of rawFilters.split(",")) {
			const { category, op, val, dst } =
				extractFilterComponents(rawFilter);
			if (eval?.(`${part[category]}${op}${val}`)) return dst;
		}
		return fallback;
	};
}

function buildCountingWorkflow(rawFilters, fallback) {
	return function _getNextDst(part) {
		const ranges = [];

		for (const rawFilter of rawFilters.split(",")) {
			const { category, op, val, dst } =
				extractFilterComponents(rawFilter);

			let keep, send;
			if (op === ">") [keep, send] = splitRange(part[category], val + 1);
			else [send, keep] = splitRange(part[category], val);

			const cloneOne = JSON.parse(JSON.stringify(part));
			const cloneTwo = JSON.parse(JSON.stringify(part));
			cloneOne[category] = send;
			cloneTwo[category] = keep;
			ranges.push({ dst, part: cloneOne });
			part = cloneTwo;
		}

		return ranges.concat({ dst: fallback, part });
	};
}

function parseParts(block) {
	return block.split("\n").map(p => {
		const [x, m, a, s] = p.match(/\d+/g).map(Number);
		return { x, m, a, s };
	});
}

function range(min, max) {
	return { start: min, stop: max, len: max - min };
}

function splitRange(r, val) {
	return [range(r.start, val), range(val, r.stop)];
}

function partOne() {
	const [workflowsBlock, partsBlock] = data;

	const wfs = Object.fromEntries(
		workflowsBlock.split("\n").map(wf => parseWorkflow(wf, buildWorkflow))
	);
	const parts = parseParts(partsBlock);

	function scorePart(part, wfKey) {
		if (wfKey === "R") return 0;
		if (wfKey === "A") return sumArr(Object.values(part));

		return scorePart(part, wfs[wfKey](part));
	}

	return sumArr(parts.map(p => scorePart(p, "in")));
}

function partTwo() {
	const workflowsBlock = data[0];
	const wfs = Object.fromEntries(
		workflowsBlock
			.split("\n")
			.map(wf => parseWorkflow(wf, buildCountingWorkflow))
	);

	function scoreWorkflow(wfKey, part) {
		if (wfKey === "R") return 0;
		if (wfKey === "A")
			return arrProduct(Object.values(part).map(c => c.len));

		return sumArr(
			wfs[wfKey](part).map(res => scoreWorkflow(res.dst, res.part))
		);
	}

	return scoreWorkflow(
		"in",
		Object.fromEntries("xmas".split("").map(l => [l, range(1, 4001)]))
	);
}

console.log(partOne());
console.log(partTwo());

time(startTime);
