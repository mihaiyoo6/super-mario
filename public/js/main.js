function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

class SpriteSheet {
    constructor(image, width, height){
        this.image = image;
        this.width = width;
        this.height = height;
    }

    define(name, x, y) {
        const buffer = [];
    }
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadImage('images/tile-set.png')
    .then(image => {
        const sprites = new SpriteSheet(image);
        sprites.define('ground', 0, 0);
        sprites.draw('ground', context, 45, 62);
    });