import { readFile } from "node:fs";
import { maxInArr, minInArr } from "./helper.js";
readFile("./day9input.txt", { encoding: "ascii" }, readInput);
function readInput(err, raw) {
	if (err) return err;
	const input = raw.replaceAll("\r", "").split("\n");
	processInput(input);
}

function processInput(input) {
	const parseDistRegex = /(?<loc1>\w+) to (?<loc2>\w+) = (?<dist>\d+)/;
	const locations = {};
	input.forEach(line => {
		const { loc1, loc2, dist } = line.match(parseDistRegex).groups;
		if (!locations[loc1]) locations[loc1] = {};
		if (!locations[loc2]) locations[loc2] = {};
		locations[loc1][loc2] = +dist;
		locations[loc2][loc1] = +dist;
	});

	const allDistances = travelToLocs(locations);
	const answer1 = minInArr(allDistances);
	const answer2 = maxInArr(allDistances);
	console.log(answer1, answer2);
}

function travelToLocs(
	locations,
	curLoc = undefined,
	alreadyVisited = [],
	totalDist = 0,
	allRuns = []
) {
	const locKeys = Object.keys(locations);
	if (curLoc) alreadyVisited.push(curLoc);

	const untraveled = locKeys.filter(loc => !alreadyVisited.includes(loc));

	if (untraveled.length === 0) {
		allRuns.push(totalDist);
	}

	for (let i = 0; i < untraveled.length; i++) {
		const newLoc = untraveled[i];
		const distToNewLoc = curLoc ? locations[curLoc][newLoc] : 0;
		const newTotalDist = totalDist + distToNewLoc;
		const newAlreadyVisited = [...alreadyVisited];

		travelToLocs(
			locations,
			newLoc,
			newAlreadyVisited,
			newTotalDist,
			allRuns
		);
	}
	return allRuns;
}
