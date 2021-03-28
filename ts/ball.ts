import { Game } from './game.js';
import { Render } from './render.js';

export class Ball {
    constructor() {
        let modulo = Render.ins.modulo
        this.radius = modulo
        this.x = Render.ins.canvas.width / 2;
        this.y = Render.ins.canvas.height - this.radius - (modulo * 3);
        this.speed = modulo 
        this.dx = this.speed
        this.dy = -this.speed
        this.color = "white";
    }

    radius: number;
    x: number;
    y: number;
    dx: number;
    dy: number;
    color: string;
    speed: number;

    update() {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }
    draw(): void {
        let ctx: CanvasRenderingContext2D = Render.ins.ctx
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}