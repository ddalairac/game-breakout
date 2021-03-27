import { Game } from './game.js';
import { Render } from './render.js';
export class Paddle {
    constructor() {
        this.paddleHeight = (Game.ins.ball) ? Game.ins.ball.ballRadius * 1.5 : 10;
        this.paddleWidth = (Game.ins.ball) ? Game.ins.ball.ballRadius * 8 : 10;
        this.paddleX = (Render.ins.canvas.width - this.paddleWidth) / 2;
        this.leftMove = false;
        this.rightMove = false;
    }
    paddleMovement() {
        let canvas = Render.ins.canvas;
        if (this.rightMove && this.paddleX < canvas.width - this.paddleWidth) {
            this.paddleX += 8;
        }
        else if (this.leftMove && this.paddleX > 0) {
            this.paddleX -= 8;
        }
    }
    draw() {
        this.paddleMovement();
        let ctx = Render.ins.ctx;
        ctx.beginPath();
        ctx.rect(this.paddleX, Render.ins.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}
//# sourceMappingURL=paddle.js.map