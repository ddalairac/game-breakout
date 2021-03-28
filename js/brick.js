import { Render } from './render.js';
export class Brick {
    constructor(x, y, status, width, height) {
        this.x = x;
        this.y = y;
        this._stroke = 0;
        this.height = height - this._stroke;
        this.width = width - this._stroke;
        if (status <= 0) {
            this.status = 1;
        }
        else if (status > 3) {
            this.status = 3;
        }
        else {
            this.status = status;
        }
    }
    setFillColor() {
        let color;
        switch (this.status) {
            case 1:
                color = "yellowgreen";
                break;
            case 2:
                color = "yellow";
                break;
            default:
                color = "crimson";
        }
        return color;
    }
    setStrokeColor() {
        let color;
        switch (this.status) {
            case 1:
                color = "white";
                break;
            case 2:
                color = "green";
                break;
            default:
                color = "red";
        }
        return color;
    }
    draw() {
        if (this.status > 0) {
            let ctx = Render.ins.ctx;
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.setFillColor();
            ctx.fill();
            ctx.closePath();
        }
    }
}
//# sourceMappingURL=brick.js.map