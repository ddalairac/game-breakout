import { Brick } from './brick.js';
import { Game } from './game.js';
import { Render } from './render.js';
export class Bricks {
    constructor(brickRowCount = 4, brickColumnCount = 7) {
        let canvas = Render.ins.canvas;
        this.brickRowCount = brickRowCount;
        this.brickColumnCount = brickColumnCount;
        this.brickWidth = (canvas.width / this.brickColumnCount) * 0.9;
        this.brickHeight = Render.ins.modulo * 2;
        this.brickPadding = (canvas.width / this.brickColumnCount) * 0.05;
        this.brickOffsetTop = this.brickHeight * 2;
        this.brickOffsetLeft = (canvas.width - (this.brickWidth + this.brickPadding) * this.brickColumnCount) / 2;
        this.list = this.buildGrid();
    }
    buildGrid() {
        let bricks = [];
        for (let indexX = 0; indexX < this.brickColumnCount; indexX++) {
            for (let indexY = 0; indexY < this.brickRowCount; indexY++) {
                let brickX = indexX * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
                let brickY = indexY * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
                let status = Game.ins.getRandomNum(0, 3);
                console.log("status", status);
                bricks.push(new Brick(brickX, brickY, status, this.brickWidth, this.brickHeight));
            }
        }
        return bricks;
    }
    draw() {
        this.list.forEach((brick) => brick.draw());
    }
}
//# sourceMappingURL=bricks.js.map