const input = "vzbxxyzz";
const alphabet = "abcdefghijklmnopqrstuvwxyz";

let valid = false;

let password = input;
while (!valid) {
	password = incPassword(password);
	valid = validate(password);
}

console.log(password);

function incPassword(password, letterIndex = password.length - 1) {
	const newLetter = incLetter(password.at(letterIndex));
	const newPass =
		password.slice(0, letterIndex) +
		newLetter +
		password.slice(letterIndex + 1, password.length);

	if (newLetter === "a") {
		return incPassword(newPass, letterIndex - 1);
	} else return newPass;
}

function incLetter(letter) {
	const letterIndex = alphabet.indexOf(letter);
	return alphabet[(letterIndex + 1) % alphabet.length];
}

function firstReq(password) {
	for (let i = 0; i < password.length - 2; i++) {
		const straight = password.slice(i, i + 3);
		const valid = alphabet.includes(straight);
		if (valid) return true;
	}
	return false;
}
function secondReq(password) {
	const forbiddenChars = /[iol]/;
	return !forbiddenChars.test(password);
}
function thirdReq(password) {
	const twoDoublesRegex = /(\w)\1\w*([^\W\1])\2/;
	return twoDoublesRegex.test(password);
}
function validate(password) {
	return firstReq(password) && secondReq(password) && thirdReq(password);
}
