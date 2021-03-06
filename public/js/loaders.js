import Level from './Level.js';
import {
	createBackgroundLayer,
	createSpriteLayer
} from './layers.js';
import {
	loadBackgroundSprites,
} from './sprites.js';


export function loadImage(url) {
	return new Promise(resolve => {
		const image = new Image();
		image.addEventListener('load', () => {
			resolve(image);
		});
		image.src = url;
	});
}

export function loadLevel(level) {
	return Promise.all([
			fetch(`./levels/${level}.json`)
			.then(r => r.json()),
			loadBackgroundSprites()
		])
		.then(([levelSpec, backgroundSprites]) => {
			const level = new Level();
			createTiles(level, levelSpec.backgrounds);
			const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
			const spriteLayer = createSpriteLayer(level.entities);
			level.comp.layers.push(backgroundLayer);
			level.comp.layers.push(spriteLayer);

			return level;
		});
}

export function createTiles(level, backgrounds) {
	backgrounds.forEach(background => {
		background.ranges.forEach(([x1, x2, y1, y2]) => {
			for (let x = x1; x < x2; ++x) {
				for (let y = y1; y < y2; ++y) {
					level.tiles.set(x, y, {
						name: background.tile
					});
				}
			}
		});
	});
}
