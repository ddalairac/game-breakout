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
}