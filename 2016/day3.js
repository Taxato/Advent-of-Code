import { day3input as input } from "./inputs.js";

const verticalInput = input.map((_, i, arr) => {
	const col = Math.floor(i / (arr.length / 3));
	const row = (i * 3) % arr.length;
	return [arr[row][col], arr[row + 1][col], arr[row + 2][col]];
});

console.log(getNumTriangles(input));
console.log(getNumTriangles(verticalInput));

function getNumTriangles(input) {
	return input.filter(triangle => possibleTriangle(triangle)).length;
}
function possibleTriangle([l1, l2, l3]) {
	return l1 + l2 > l3 && l1 + l3 > l2 && l2 + l3 > l1;
}
