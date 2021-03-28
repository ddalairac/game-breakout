export class Render {
    constructor() {
        if (Render._instance) {
            throw "Ya existe una instancia de Render";
        }
        Render._instance = this;
        this.canvas = document.getElementById("stage");
        this.ctx = this.canvas.getContext("2d");
        this.rezizeStage();
        this.modulo = this.canvas.width / 80;
    }
    static get ins() {
        return this._instance;
    }
    rezizeStage() {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
    }
    get stageLimitX() {
        return this.ctx.canvas.width;
    }
    get stageLimitY() {
        return this.ctx.canvas.height;
    }
    clean() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
//# sourceMappingURL=render.js.map