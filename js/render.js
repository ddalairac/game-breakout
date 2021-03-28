import { Game } from './game.js';
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
        let ww = window.innerWidth;
        let wh = window.innerHeight;
        this.ctx.canvas.width = (ww < wh) ? ww * 1.3 : wh * 1.3;
        this.ctx.canvas.height = (ww < wh) ? ww : wh;
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
    drawExplotion() {
        Game.ins.explotions.forEach(explotion => {
            explotion.particles.forEach(part => {
                this.drawPolygonAndMove(0, part.x, part.y, part.sideCount, part.size, part.stroke, part.strokeColor, part.color);
            });
        });
    }
    drawPolygonAndMove(radian, centerX, centerY, sideCount, size, strokeWidth = 0, strokeColor = 'white', fillColor = 'transparent') {
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(radian);
        this.drawPolygon(sideCount, size, strokeWidth, strokeColor, fillColor);
        this.ctx.restore();
    }
    drawPolygon(sideCount, size, strokeWidth, strokeColor, fillColor) {
        this.ctx.beginPath();
        this.ctx.moveTo(size * Math.cos(0), size * Math.sin(0));
        for (var i = 1; i <= sideCount; i += 1) {
            this.ctx.lineTo(size * Math.cos(i * 2 * Math.PI / sideCount), size * Math.sin(i * 2 * Math.PI / sideCount));
        }
        this.ctx.closePath();
        this.ctx.fillStyle = fillColor;
        this.ctx.fill();
        if (strokeWidth > 0) {
        }
    }
}
//# sourceMappingURL=render.js.map