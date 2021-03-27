import { Game } from './game.js';
export class EventHandler {
    constructor() {
        document.addEventListener('keydown', this.keydownEventHandler);
        document.addEventListener('keyup', this.keyupEventHandler);
    }
    keydownEventHandler(e) {
        if (Game.ins.paddle) {
            switch (e.code) {
                case eKey.Left:
                    Game.ins.paddle.leftMove = true;
                    break;
                case eKey.Right:
                    Game.ins.paddle.rightMove = true;
                    break;
            }
        }
    }
    keyupEventHandler(e) {
        if (Game.ins.paddle) {
            switch (e.code) {
                case eKey.Left:
                    Game.ins.paddle.leftMove = false;
                    break;
                case eKey.Right:
                    Game.ins.paddle.rightMove = false;
                    break;
            }
        }
    }
}
export var eKey;
(function (eKey) {
    eKey["Right"] = "ArrowRight";
    eKey["Left"] = "ArrowLeft";
})(eKey || (eKey = {}));
//# sourceMappingURL=event-handler.js.map