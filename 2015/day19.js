import { readFile } from "node:fs";
readFile("./day19input.txt", { encoding: "ascii" }, readInput);

const testInput = `H => HO
H => OH
O => HH

HOH`;

function readInput(err, raw) {
	if (err) return err;
	const input = raw.replaceAll("\r", "").split("\n");
	calibrateMachine(input);
	fabricateMolecule(input);
}

function calibrateMachine(input) {
	const allUniqueMolecules = [];
	const replacements = {};
	input.slice(0, -2).map(rep => {
		const [_, inp, out] = rep.match(/(\w+) => (\w+)/);
		if (replacements[inp] === undefined) replacements[inp] = [out];
		else replacements[inp].push(out);
	});

	const inputMolecule = input.at(-1);

	for (const input of Object.keys(replacements)) {
		const matchIndeces = [];
		[...inputMolecule.matchAll(new RegExp(input, "g"))].forEach(match => {
			matchIndeces.push(match.index);
		});
		// if (matchIndeces === 0) continue; // slight optimization
		const allOuts = replacements[input];
		allOuts.forEach(out => {
			matchIndeces.forEach(index => {
				const resultMolecule =
					inputMolecule.slice(0, index) +
					out +
					inputMolecule.slice(index + input.length);
				if (!allUniqueMolecules.includes(resultMolecule))
					allUniqueMolecules.push(resultMolecule);
			});
		});
	}
	console.log(allUniqueMolecules.length);
}

function fabricateMolecule(input) {
	let currentMolecule = "e";
	const allUniqueMolecules = [];
	const replacements = {};
	input.slice(0, -2).map(rep => {
		const [_, inp, out] = rep.match(/(\w+) => (\w+)/);
		if (replacements[inp] === undefined) replacements[inp] = [out];
		else replacements[inp].push(out);
	});
	// console.log(replacements);
}
