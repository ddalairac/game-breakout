import { Game } from './game.js';

export class Render{
    constructor() {
        if (Render._instance) {
            throw "Ya existe una instancia de Render";
        }
        Render._instance = this
        this.canvas = document.getElementById("stage") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        // set Canvas Size
        this.rezize()
        window.onresize = function () {
            Render.ins.rezize()
        }
    }
    private static _instance: Render
    public static get ins() {
        return this._instance;
    }

    rezize() {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
    }

    public ctx: CanvasRenderingContext2D
    public canvas: HTMLCanvasElement

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