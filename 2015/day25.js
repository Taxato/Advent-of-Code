import { pipe, timeUsed } from "../helper.js";
const startTime = Date.now();

const input =
	"To continue, please consult the code grid in the manual.  Enter the code at row 3010, column 3019.";

function nextCode(code) {
	return (code * 252533) % 33554393;
}

let row = 1;
let col = 1;
let code = 20151125;

while (true) {
	if (row === 3010 && col === 3019) {
		console.log(code);
		break;
	}
	if (row === 1) {
		row = col + 1;
		col = 1;
	} else {
		row--;
		col++;
	}
	code = nextCode(code);
}

const finishedTime = Date.now();
timeUsed(startTime, finishedTime);
