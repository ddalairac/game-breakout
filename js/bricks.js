import { Brick } from './brick.js';
import { Game } from './game.js';
import { Render } from './render.js';
export class Bricks {
    constructor() {
        let canvas = Render.ins.canvas;
        this.brickRowCount = 4;
        this.brickColumnCount = 7;
        this.brickWidth = (canvas.width / this.brickColumnCount) * 0.8;
        this.brickHeight = (Game.ins.ball) ? Game.ins.ball.ballRadius * 1.5 : 10;
        this.brickPadding = (canvas.width / this.brickColumnCount) * 0.1;
        this.brickOffsetTop = this.brickHeight * 2;
        this.brickOffsetLeft =
            (canvas.width - (this.brickWidth + this.brickPadding) * this.brickColumnCount) / 2;
        this.list = this.buildGrid();
    }
    buildGrid() {
        let bricks = [];
        for (let indexX = 0; indexX < this.brickColumnCount; indexX++) {
            for (let indexY = 0; indexY < this.brickRowCount; indexY++) {
                let brickX = indexX * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
                let brickY = indexY * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
                bricks.push(new Brick(brickX, brickY, 1, "white"));
            }
        }
        return bricks;
    }
    draw() {
        let ctx = Render.ins.ctx;
        this.list.forEach((brick) => {
            if (brick.status == 1) {
                ctx.beginPath();
                ctx.rect(brick.x, brick.y, this.brickWidth, this.brickHeight);
                ctx.fillStyle = brick.color;
                ctx.fill();
                ctx.closePath();
            }
        });
    }
}
//# sourceMappingURL=bricks.js.map