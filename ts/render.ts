import { Game } from './game.js';

export class Render {
    constructor() {
        if (Render._instance) {
            throw "Ya existe una instancia de Render";
        }
        Render._instance = this
        this.canvas = document.getElementById("stage") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        // set Canvas Size
        this.rezizeStage()
        this.modulo = this.canvas.width / 80; //10
        // window.onresize = function () {
        //     Render.ins.rezizeStage()
        // }
    }
    private static _instance: Render
    public static get ins() {
        return this._instance;
    }

    rezizeStage() {
        let ww: number = window.innerWidth;
        let wh: number = window.innerHeight;
        this.ctx.canvas.width = (ww < wh) ? ww * 1.3 : wh * 1.3
        this.ctx.canvas.height = (ww < wh) ? ww : wh
    }

    public ctx: CanvasRenderingContext2D
    public canvas: HTMLCanvasElement
    public modulo: number

    get stageLimitX() {
        return this.ctx.canvas.width
    }
    get stageLimitY() {
        return this.ctx.canvas.height
    }


    public clean() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }



    public drawExplotion() {
        Game.ins.explotions.forEach(explotion => {
            explotion.particles.forEach(part => {
                this.drawPolygonAndMove(0, part.x, part.y, part.sideCount, part.size, part.stroke, part.strokeColor, part.color)
            });
        });
    }

    private drawPolygonAndMove(radian: number, centerX: number, centerY: number, sideCount: number, size: number, strokeWidth: number = 0, strokeColor: string = 'white', fillColor: string = 'transparent') {
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(radian);
        this.drawPolygon(sideCount, size, strokeWidth, strokeColor, fillColor)
        this.ctx.restore()
    }

    private drawPolygon(sideCount: number, size: number, strokeWidth: number, strokeColor: string, fillColor: string) {

        this.ctx.beginPath();
        this.ctx.moveTo(size * Math.cos(0), size * Math.sin(0));
        for (var i = 1; i <= sideCount; i += 1) {
            this.ctx.lineTo(size * Math.cos(i * 2 * Math.PI / sideCount), size * Math.sin(i * 2 * Math.PI / sideCount));
        }
        this.ctx.closePath();

        this.ctx.fillStyle = fillColor;
        this.ctx.fill();
        if (strokeWidth > 0) {
            // this.ctx.strokeStyle = strokeColor;
            // this.ctx.lineWidth = strokeWidth;
            // this.ctx.stroke();
        }
    }
}