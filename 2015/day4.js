import md5 from "md5";

const input = "ckczppom";

let solved = false;
let i = 1;
while (!solved) {
	const hash = md5(input + i);
	if (hash.slice(0, 6) === "000000") {
		solved = true;
		console.log(i);
	}

	i++;
}
