import { Render } from './render.js';
export class Brick {
    constructor(x, y, status, width, height) {
        this.x = x;
        this.y = y;
        this.stroke = 0;
        this.height = height - this.stroke;
        this.width = width - this.stroke;
        if (status <= 0) {
            this.status = 1;
        }
        else if (status > 3) {
            this.status = 3;
        }
        else {
            this.status = status;
        }
        this.color = this.setFillColor();
        this.strokeColor = this.setStrokeColor();
    }
    setFillColor() {
        let color;
        switch (this.status) {
            case 1:
                color = "#00e4a0";
                break;
            case 2:
                color = "#4ab4df";
                break;
            default:
                color = "#bb59e2";
        }
        this.color = color;
        return color;
    }
    setStrokeColor() {
        let color;
        switch (this.status) {
            case 1:
                color = "#006b48";
                break;
            case 2:
                color = "#00648e";
                break;
            default:
                color = "#7c0098";
        }
        this.strokeColor = color;
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