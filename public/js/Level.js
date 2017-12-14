import Compositor from './Compositor.js';
import {
	Matrix
} from './math.js';
import TileColider from './TileColider.js';

export default class Level {
	constructor() {
		this.gravity = 2000;
		this.comp = new Compositor();
		this.entities = new Set();
		this.tiles = new Matrix();
		this.tileColider = new TileColider(this.tiles);
	}

	update(deltaTime) {
		this.entities.forEach(entity => {
			entity.update(deltaTime);

			entity.pos.x += entity.vel.x * deltaTime;
			this.tileColider.checkX(entity);

			entity.pos.y += entity.vel.y * deltaTime;
			entity.vel.y += this.gravity * deltaTime;
			this.tileColider.checkY(entity);
		});

	}
}
