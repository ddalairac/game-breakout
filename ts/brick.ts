import { Render } from './render.js';

export class Brick {
    constructor(x: number, y: number, status: number, width: number, height: number,) {
        this.x = x
        this.y = y
        this.stroke = 0
        this.height = height - this.stroke
        this.width = width - this.stroke
        if (status <= 0) {
            this.status = 1
        } else if (status > 3) {
            this.status = 3
        } else {
            this.status = status
        }
        this.color = this.setFillColor()
        this.strokeColor = this.setStrokeColor()
    }
    height: number
    width: number
    x: number;
    y: number;
    status: number;
    color: string
    strokeColor: string;
    stroke: number;

    private setFillColor() {
        let color: string
        switch (this.status) {
            case 1:
                // color = "white"
                color = "#00e4a0"
                break;
            case 2:
                // color = "cornflowerblue"
                color = "#4ab4df"
                break;
            default:
                // color = "cornflowerblue"
                color = "#bb59e2"

        }
        this.color = color
        return color
    }
    private setStrokeColor() {
        let color: string
        switch (this.status) {
            case 1:
                color = "#006b48"
                break;
            case 2:
                color = "#00648e"
                break;
            default:
                color = "#7c0098"

        }
        this.strokeColor = color
        return color
    }

    draw() {
        if (this.status > 0) {
            let ctx = Render.ins.ctx
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.setFillColor();
            ctx.fill();
            // ctx.strokeStyle = this.setStrokeColor();
            // ctx.lineWidth = this.stroke;
            // ctx.stroke();
            ctx.closePath();
        }
    }
}