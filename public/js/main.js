import {
    loadLevel
} from './loaders.js';
import {
    loadBackgroundSprites,
} from './sprites.js';
import {
    createMario
} from './entities.js';
import Compositor from './Compositor.js';
import Timer from './Timer.js';
import {
    createBackgroundLayer,
    createSpriteLayer
} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
        loadBackgroundSprites(),
        loadLevel('1-1'),
        createMario()
    ])
    .then(([
        backgroundSprites,
        level,
        mario
    ]) => {
        const com = new Compositor();
        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
        com.layers.push(backgroundLayer);

        const gravity = 30;
        mario.pos.set(64, 180);
        mario.vel.set(200, -600);

        const spriteLayer = createSpriteLayer(mario);
        com.layers.push(spriteLayer); 

        const deltaTime = 1 / 60;
        let accumulatedTime = 0;
        let lastTime = 0;

        const timer = new Timer(1 / 60);
        timer.update = function update(time) {
            com.draw(context);
            mario.update(deltaTime);
            mario.vel.y += gravity;
        }
        timer.start();
    });