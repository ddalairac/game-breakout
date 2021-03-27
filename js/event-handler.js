import { Game } from './game.js';
export class EventHandler {
    constructor() {
        document.addEventListener('keydown', this.keydownEventHandler);
        document.addEventListener('keyup', this.keyupEventHandler);
        this.start = document.getElementById('newBTN');
        if (this.start)
            this.start.addEventListener('click', Game.ins.starGame);
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
                case eKey.Enter:
                    if (Game.ins.isGameOver)
                        Game.ins.starGame();
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
    eKey["Enter"] = "Enter";
})(eKey || (eKey = {}));
//# sourceMappingURL=event-handler.js.map