import { Game } from './game.js';
import { Render } from './render.js';
export class Collision {
    constructor() {
        this.colorFramesTotal = 10;
        this.colorFramesCount = 0;
    }
    getRandomColor() {
        let chars = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += chars[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    evalEndGame() {
        let ball = Game.ins.ball;
        let bricks = Game.ins.bricks;
        let paddle = Game.ins.paddle;
        if (bricks && bricks.list && paddle && ball) {
            if (ball.y > Render.ins.stageLimitY) {
                Game.ins.gameOver();
            }
            else {
                let winGame = 0;
                bricks.list.forEach((brick) => winGame += brick.status);
                if (winGame == 0) {
                    Game.ins.gameOver();
                }
            }
        }
    }
    ballCollitionWith(rectangle) {
        let ball = Game.ins.ball;
        if (ball) {
            if ((ball.x + ball.radius) > rectangle.x &&
                (ball.x - ball.radius) < (rectangle.x + rectangle.width) &&
                (ball.y + ball.radius) > rectangle.y &&
                (ball.y - ball.radius) < (rectangle.y + rectangle.height)) {
                if ((ball.x + ball.radius) > rectangle.x && (ball.x - ball.radius) < (rectangle.x + rectangle.width)) {
                    ball.dy = -ball.dy;
                }
                else if ((ball.y + ball.radius) > rectangle.y && (ball.y - ball.radius) < (rectangle.y + rectangle.height)) {
                    ball.dx = -ball.dx;
                }
                else {
                    ball.dy = -ball.dy;
                    ball.dx = -ball.dx;
                }
                if (rectangle.constructor.name == "Paddle") {
                }
                else {
                }
                this.colorFramesCount = this.colorFramesTotal;
                return true;
            }
        }
        return false;
    }
    eval() {
        this.evalEndGame();
        let ball = Game.ins.ball;
        let bricks = Game.ins.bricks;
        let paddle = Game.ins.paddle;
        if (bricks && bricks.list && paddle && ball) {
            bricks.list.forEach((brick) => {
                if (brick.status >= 1) {
                    if (this.ballCollitionWith(brick)) {
                        brick.status--;
                    }
                }
            });
            this.ballCollitionWith(paddle);
            if (ball.x + ball.dx > Render.ins.stageLimitX - ball.radius || ball.x + ball.dx < ball.radius) {
                ball.dx = -ball.dx;
                this.colorFramesCount = this.colorFramesTotal;
            }
            if (ball.y + ball.dy < ball.radius) {
                ball.dy = -ball.dy;
                this.colorFramesCount = this.colorFramesTotal;
            }
            ball.color = (this.colorFramesCount > 0) ? this.getRandomColor() : "white";
            if (this.colorFramesCount > 0) {
                this.colorFramesCount--;
            }
            ;
        }
    }
}
//# sourceMappingURL=collision.js.map