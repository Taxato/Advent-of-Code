import { feedBackOutInFunc } from "../helper.js";

const input = "1113122113";

console.log(feedBackOutInFunc(input, lookAndSay, 50).length);

function lookAndSay(num) {
	const parts = num.match(/(?:(\d)\1*)/g);
	return parts.map(p => p.length + p[0]).join("");
}
