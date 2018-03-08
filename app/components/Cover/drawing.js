import { Noise } from 'noisejs';
import { lerpRGBColour } from '../../utils/colour.js';
import { convertToRange } from '../../utils/maths.js';

let canvas, ctx, noise;
let w, h, raf;

let crntRow = 0, crntX = 0, crntY = 0, colourOne, colourTwo, colourThree, waveLength, waveHeight, paused;
const colCurrentYs = [];

const lightCols = [
	[229, 49, 29],
	[8, 103, 219],
	[17, 132, 61],
	[191, 17, 121],
];

const darkCols = [
	[28, 37, 68],
	[37, 55, 56],
	[71, 71, 71],
	[52, 44, 68],
	[43, 68, 66],
];

const onResize = () => {
	w = canvas.clientWidth;
	h = canvas.clientHeight;
};

export const init = () => {
	canvas = document.querySelector('.cover__canvas');
	canvas.width = window.innerWidth;
	canvas.height = canvas.clientHeight;
	ctx = canvas.getContext('2d');
	document.addEventListener('resize', onResize);
	reset();
	onResize();
	animate();
};

const reset = () => {
	crntX = 0;
	crntRow = 0;
	noise = new Noise(Math.random());

	const idxOne = Math.floor(Math.random() * darkCols.length);
	const idxTwo = Math.floor(Math.random() * lightCols.length);
	const idxThree = Math.floor(Math.random() * lightCols.length);

	colourOne = { r: 240, g: 240, b: 240 };
	colourTwo = { r: lightCols[idxTwo][0], g: lightCols[idxTwo][1], b: lightCols[idxTwo][2] };
	colourThree = { r: lightCols[idxThree][0], g: lightCols[idxThree][1], b: lightCols[idxThree][2] };

	waveLength = convertToRange(Math.random(), [0, 1], [0.1, 0.01]);
	waveHeight = convertToRange(Math.random(), [0, 1], [10, 30]);
};

const draw = () => {
	crntX = 0;

	const getFillStyle = (x, y) => {
		let colour;

		const c = noise.simplex2(x * 0.1, y * 0.0002);
		if (c <= 0.2) colour = colourOne;
		if (c > 0.2 && c <= 0.3 ) {
			colour = lerpRGBColour(convertToRange(c, [0.25, 0.3], [0, 1]), colourOne, colourTwo);
		}
		if (c > 0.3 && c < 0.4 ) {
			colour = lerpRGBColour(convertToRange(c, [0.35, 0.4], [0, 1]), colourTwo, colourThree);
		}
		if (c >= 0.4) colour = colourThree;

		return colour;
		// return `rgba(${colour.r}, ${colour.g}, ${colour.b}, 1.0)`;
	};

	while (crntX < w) {
		crntY = crntRow - (noise.simplex2(1, crntRow) * 10);

		if (crntY > 0 && crntY < h) {
			if (colCurrentYs[crntX]) {
				let tmpY = colCurrentYs[crntX];
				while (tmpY <= crntY) {
					let n = noise.simplex2(1, crntRow * waveLength);

					const offset = n * waveHeight;
					const colour = getFillStyle(crntX + offset, crntY);

					// n = noise.simplex2(1, crntRow);
					// const colour = lerpRGBColour(convertToRange(n, [-1, 1], [0, 0.025]), c, {r: 255, g: 255, b: 255});

					ctx.fillStyle = `rgba(${colour.r}, ${colour.g}, ${colour.b}, 1.0)`;
					ctx.fillRect(crntX, tmpY - 1, 1, 2);
					tmpY++;
				}
			} else {
				const colour = getFillStyle(crntX, crntY);
					ctx.fillStyle = `rgba(${colour.r}, ${colour.g}, ${colour.b}, 1.0)`;
				ctx.fillRect(crntX, crntY - 1, 1, 2);
			}
			colCurrentYs[crntX] = crntY;
		}

		crntX++;
	}

	crntRow++;

	if (crntRow > h + 160) {
		reset();
	}
};

const animate = () => {
	for (let i = 0; i < 2; i++) {
		draw();
	}
	raf = requestAnimationFrame(animate);
};


export const pause = () => cancelAnimationFrame(raf);
export const play = () => raf = requestAnimationFrame(animate);