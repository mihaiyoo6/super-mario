import {
	Trait
} from '../Entity.js';

export default class Velocity extends Trait {
	constructor() {
		super('go');

		this.dir = 0;
		this.speed = 6000;

	}

	update(entity, deltaTime) {
		entity.vel.x = this.speed * this.dir * deltaTime;
	}
}
