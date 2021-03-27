import { Render } from './render.js';

export class Ball {
    constructor() {
        this.ballRadius = Render.ins.canvas.width / 60; //10
        this.x = Render.ins.canvas.width / 2;
        this.y = Render.ins.canvas.height * 0.8;
        this.dx = 8
        this.dy = -8
        this.color = "white";

    }

    ballRadius: number;
    x: number;
    y: number;
    dx: number;
    dy: number;
    color: string;

    private update() {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }
    draw(): void {
        this.update()
        let ctx: CanvasRenderingContext2D = Render.ins.ctx
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}