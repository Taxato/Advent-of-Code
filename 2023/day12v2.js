import { readFileSync } from "fs";
import { time } from "../helper.js";
const startTime = process.hrtime();

// const input = readFileSync("./day12input.txt", { encoding: "utf8" });
const input = readFileSync("./day12test.txt", { encoding: "utf8" });

time(startTime);
