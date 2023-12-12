function setup() {
	createCanvas(400, 400);
	pixelDensity(8);
}

// Part one
function draw() {
	background(50);

	const colors = Array.from({ length: points.length }, _ => [
		floor(random(255)),
		floor(random(255)),
		floor(random(255)),
	]);

	loadPixels();

	const regions = {};
	points.forEach(p => (regions[p.i] = { area: 0 }));

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			let dstToPoints = [];

			for (const p of points) {
				dstToPoints.push({ i: p.i, dst: manhattanDist({ x, y }, p) });
			}

			const lowestDst = dstToPoints.reduce(
				(min, cur) => (cur.dst < min ? cur.dst : min),
				Infinity
			);
			const closestPoints = dstToPoints.filter(p => p.dst === lowestDst);

			let r, g, b;
			if (closestPoints.length === 1) {
				regions[closestPoints[0].i].area++;
				regions[closestPoints[0].i].color = colors[closestPoints[0].i];
				[r, g, b] = colors[closestPoints[0].i];
			} else [r, g, b] = [0, 0, 0];

			const d = pixelDensity();
			for (let i = 0; i < d; i++) {
				for (let j = 0; j < d; j++) {
					const index = 4 * ((y * d + j) * width * d + (x * d + i));
					pixels[index] = r;
					pixels[index + 1] = g;
					pixels[index + 2] = b;
				}
			}
		}
	}

	console.log(regions);
	updatePixels();
	for (const p of points) {
		textSize(10);
		text(p.i, p.x, p.y);
	}

	noLoop();
}

// Part two
// function draw() {
// 	background(50);

// 	let area = 0;
// 	for (let y = -5000; y < 5000; y++) {
// 		for (let x = -5000; x < 5000; x++) {
// 			let dstToPoints = [];

// 			for (const p of points) {
// 				dstToPoints.push({ i: p.i, dst: manhattanDist({ x, y }, p) });
// 			}

// 			const dstSum = dstToPoints.reduce((sum, cur) => sum + cur.dst, 0);
// 			if (dstSum < 10000) {
// 				area++;
// 			}
// 		}
// 	}
// 	console.log(area);

// 	noLoop();
// }

function manhattanDist(a, b) {
	return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
