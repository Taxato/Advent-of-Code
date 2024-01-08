import * as readline from "node:readline/promises";
import { chdir, stdin as input, stdout as output } from "node:process";
import { mkdirSync } from "node:fs";
import { writeFileSync } from "fs";
import { configDotenv } from "dotenv";
configDotenv();

const rl = readline.createInterface({ input, output });

const year = await rl.question("Which year: ");
const day = await rl.question("Day nr: ");

try {
	chdir(year);
} catch (error) {
	mkdirSync(year);
	chdir(year);
}

console.log(`Creating dir: ${day}`);
mkdirSync(day);
console.log(`Creating main.js`);
writeFileSync(`./${day}/main.js`, "");

console.log(`Creating input and test files`);

let inputData = await (
	await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
		// credentials: "include",
		headers: {
			Cookie: process.env.AOC_TOKEN,
		},
	})
).text();

writeFileSync(`./${day}/input.txt`, inputData.trimEnd());
writeFileSync(`./${day}/test.txt`, "");

rl.close();

console.log(process.cwd());
console.log(process.execPath);
