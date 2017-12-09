import {
    loadLevel
} from './loaders.js';
import {
    loadBackgroundSprites,
    loadMarioSprite
} from './sprites.js';
import Compositor from './Compositor.js';
import {
    createBackgroundLayer,
    createSpriteLayer 
} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
        loadBackgroundSprites(),
        loadLevel('1-1'),
        loadMarioSprite()
    ])
    .then(([
        backgroundSprites,
        level,
        marioSrpite
    ]) => {
        const com = new Compositor();
        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
        com.layers.push(backgroundLayer);

        const pos = {
            x: 64,
            y: 64
        };
        const spriteLayer = createSpriteLayer(marioSrpite, pos);
        com.layers.push(spriteLayer); 
        function update() {
            com.draw(context);
            pos.x += 2;
            pos.y += 2;
            requestAnimationFrame(update);
        }
        update();
    });