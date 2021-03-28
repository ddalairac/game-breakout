import { Render } from './render.js';
export class Ball {
    constructor() {
        let modulo = Render.ins.modulo;
        this.radius = modulo;
        this.x = Render.ins.canvas.width / 2;
        this.y = Render.ins.canvas.height - this.radius - (modulo * 3);
        this.speed = 12;
        this.dx = this.speed;
        this.dy = -this.speed;
        this.color = "white";
    }
    update() {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }
    draw() {
        let ctx = Render.ins.ctx;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}
//# sourceMappingURL=ball.js.map