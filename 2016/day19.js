const input = 3012210;
console.log(input.toString(2));
console.log(0b11011111011001110010);

console.log(2 * 915058 + 1);

function josephus(n) {
	return 2 * Number(`0b${n.toString(2).slice(1)}`) + 1;
}

console.log(josephus(input));
