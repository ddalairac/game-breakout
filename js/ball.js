import { Render } from './render.js';
export class Ball {
    constructor() {
        this.ballRadius = Render.ins.canvas.width / 60;
        this.x = Render.ins.canvas.width / 2;
        this.y = Render.ins.canvas.height * 0.8;
        this.dx = 8;
        this.dy = -8;
        this.color = "white";
    }
    update() {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }
    draw() {
        this.update();
        let ctx = Render.ins.ctx;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}
//# sourceMappingURL=ball.js.map