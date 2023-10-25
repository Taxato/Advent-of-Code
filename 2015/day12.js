import input from "./day12input.json" assert { type: "json" };
import { sumArr } from "./helper.js";

let books = Object.entries(input).flat();

while (books.filter(el => typeof el === "object").length > 0) {
	// books = extractNums(books);
	books = extractNumsNoReds(books);
}
console.log(sumArr(books.filter(el => typeof el === "number")));

function extractNums(arr) {
	return arr.flatMap(el => {
		if (Array.isArray(el)) {
			return el.flat(10);
		} else if (typeof el === "object") {
			return Object.entries(el).flat(10);
		} else return el;
	});
}

function extractNumsNoReds(arr) {
	return arr.flatMap(el => {
		if (Array.isArray(el)) {
			return el.flat();
		} else if (typeof el === "object") {
			const flatObj = Object.entries(el).flat();
			if (flatObj.includes("red")) return undefined;
			return flatObj;
		} else return el;
	});
}
