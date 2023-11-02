import { day7input as input } from "./inputs.js";

const abbaRegex = /((\w)(?!\2)(\w)\3\2)/;
const negAbbaRegex = /\[\w*((\w)(?!\2)(\w)\3\2)\w*\]/;

const sslRegex =
	/(?<!\[\w*)(\w)(?!\1)(\w)\1\w*\[\w*\2\1\2|(\w)(?!\3)(\w)\3\w*\]\w*\4\3\4/;

let totalTlsIps = 0;
input.forEach(ip => {
	if (!negAbbaRegex.test(ip) && abbaRegex.test(ip)) totalTlsIps++;
});

console.log(totalTlsIps);

let totalSslIps = 0;
input.forEach(ip => {
	let netLevel = 0;
	const text = [];
	ip.split("").forEach(char => {
		if (char === "[") netLevel++;
		else if (char === "]") netLevel--;
		else {
			if (!text[netLevel]) text[netLevel] = "";

			text[netLevel] += char;
		}
	});

	const joinedText = (text[0] + ":").concat(text.slice(1));
	const sllRegex = /(?<abaStr>(\w)(?!\2)(\w)\2)\w*:\w*(?<babStr>\3\2\3)/;

	if (sllRegex.test(joinedText)) totalSslIps++;
});
console.log(totalSslIps);
