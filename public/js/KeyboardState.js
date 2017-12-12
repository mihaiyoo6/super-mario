const PRESED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        this.keyState = new Map();
        this.keyMap = new Map();
    }

    addMapping(keyCode, callbak) {
        this.keyMap.set(keyCode, callbak);
    }

    handleEvent(event) {
        const {
            keyCode
        } = event;

        if (!this.keyMap.has(keyCode)) {
            return;
        }
        event.preventDefault();
        const keyState = event.type === 'keydown' ? PRESED : RELEASED;

        if (this.keyState.get(keyCode) === keyState) {
            return;
        }

        this.keyState.set(keyCode, keyState);

        this.keyMap.get(keyCode)(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {

            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}
