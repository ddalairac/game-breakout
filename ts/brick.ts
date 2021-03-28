import { Render } from './render.js';

export class Brick {
    constructor(x: number, y: number, status: number, width: number, height: number,) {
        this.x = x
        this.y = y
        this._stroke = 0
        this.height = height - this._stroke
        this.width = width - this._stroke
        if (status <= 0) {
            this.status = 1
        } else if (status > 3) {
            this.status = 3
        } else {
            this.status = status
        }
    }
    height: number
    width: number
    x: number;
    y: number;
    status: number;
    private _stroke: number;

    private setFillColor() {
        let color: string
        switch (this.status) {
            case 1:
                // color = "white"
                color = "yellowgreen"
                break;
            case 2:
                // color = "cornflowerblue"
                color = "yellow"
                break;
            default:
                // color = "cornflowerblue"
                color = "crimson"

        }
        return color
    }
    private setStrokeColor() {
        let color: string
        switch (this.status) {
            case 1:
                color = "white"
                break;
            case 2:
                color = "green"
                break;
            default:
                color = "red"

        }
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
            // ctx.lineWidth = this._stroke;
            // ctx.stroke();
            ctx.closePath();
        }
    }
}