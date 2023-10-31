import { day2input as input } from "./inputs.js";
const instructions = input.split("\n");

const part1Buttons = [
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
];

const part2Buttons = [
	[0, 0, 5, 0, 0],
	[0, 2, 6, 10, 0],
	[1, 3, 7, 11, 13],
	[0, 4, 8, 12, 0],
	[0, 0, 9, 0, 0],
];

function bathroomCode(buttons, startCoords) {
	const password = [];
	const buttonCoords = startCoords;
	instructions.forEach(inst => {
		for (let i = 0; i < inst.length; i++) {
			let { x, y } = buttonCoords;
			const d = inst[i];

			if (d === "R") x++;
			if (d === "L") x--;
			if (d === "D") y++;
			if (d === "U") y--;

			if (
				x < 0 ||
				x > buttons.length - 1 ||
				y < 0 ||
				y > buttons.length - 1 ||
				buttons[x][y] === 0
			)
				continue;
			buttonCoords.x = x;
			buttonCoords.y = y;
		}
		password.push(buttons[buttonCoords.x][buttonCoords.y]);
	});
	return password;
}

const part1 = bathroomCode(part1Buttons, { x: 1, y: 1 }).join("");
const part2 = bathroomCode(part2Buttons, { x: 0, y: 2 }).reduce(
	(password, digit) => {
		const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D"];
		const formattedDigit = digits[digit];
		return password + formattedDigit.toString();
	},
	""
);

console.log(part1, part2);
