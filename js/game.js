import { Ball } from './ball.js';
import { Bricks } from './bricks.js';
import { Collitions } from './collitions.js';
import { Paddle } from './paddle.js';
import { Render } from './render.js';
export class Game {
    constructor() {
        this.gameOver = false;
        this.delay = Math.round(1000 / 30);
        this.nextTime = 0;
        this.ball = null;
        this.paddle = null;
        this.bricks = null;
        this.collitions = null;
        if (Game._instance) {
            throw "Ya existe una instancia de Game";
        }
        Game._instance = this;
        this.starGame();
    }
    static get ins() {
        return this._instance;
    }
    starGame() {
        this.ball = new Ball();
        this.paddle = new Paddle();
        this.bricks = new Bricks();
        this.collitions = new Collitions();
        window.requestAnimationFrame(Game.ins.frameLoop);
    }
    drawBoard() {
        Render.ins.clean();
        if (this.collitions)
            this.collitions.eval();
        if (this.paddle)
            this.paddle.draw();
        if (this.ball)
            this.ball.draw();
        if (this.bricks)
            this.bricks.draw();
    }
    frameLoop(time) {
        if (time < Game.ins.nextTime) {
            window.requestAnimationFrame(Game.ins.frameLoop);
            return;
        }
        Game.ins.nextTime = time + Game.ins.delay;
        Game.ins.drawBoard();
        if (Game.ins.gameOver == false) {
            requestAnimationFrame(Game.ins.frameLoop);
        }
    }
}
//# sourceMappingURL=game.js.map