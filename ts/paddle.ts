import { Game } from './game.js';
import { Render } from './render.js';

export class Paddle {
    constructor() {
        this.paddleHeight = (Game.ins.ball) ? Game.ins.ball.ballRadius * 1.5 : 10; //10;
        this.paddleWidth = (Game.ins.ball) ? Game.ins.ball.ballRadius * 8 : 10; //75;
        this.paddleX = (Render.ins.canvas.width - this.paddleWidth) / 2;
        this.leftMove = false
        this.rightMove = false
    }
    paddleHeight: number
    paddleWidth: number
    paddleX: number

    leftMove:boolean
    rightMove:boolean

    private paddleMovement() {
        // limites de movimiento de la paleta
        let canvas: HTMLCanvasElement = Render.ins.canvas
        if (this.rightMove && this.paddleX < canvas.width - this.paddleWidth) {
            this.paddleX += 8;
        } else if (this.leftMove && this.paddleX > 0) {
            this.paddleX -= 8
        }
    }
    draw() {
        this.paddleMovement() 
        let ctx: CanvasRenderingContext2D = Render.ins.ctx
        ctx.beginPath();
        ctx.rect(this.paddleX, Render.ins.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

}