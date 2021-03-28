import { Render } from './render.js';
export class Paddle {
    constructor() {
        let modulo = Render.ins.modulo;
        this.height = modulo * 2;
        this.width = modulo * 10;
        this.x = (Render.ins.canvas.width - this.width) / 2;
        this.y = Render.ins.stageLimitY - this.height - modulo;
        this.leftMove = false;
        this.rightMove = false;
        this.speed = modulo * 2;
    }
    update() {
        let canvas = Render.ins.canvas;
        if (this.rightMove && this.x < canvas.width - this.width) {
            this.x += this.speed;
        }
        else if (this.leftMove && this.x > 0) {
            this.x -= this.speed;
        }
    }
    draw() {
        let ctx = Render.ins.ctx;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}
//# sourceMappingURL=paddle.js.map