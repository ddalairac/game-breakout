import { Game } from './game.js';
import { Render } from './render.js';
export class Collitions {
    constructor() {
        this.colorFramesTotal = 5;
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
        let canvas = Render.ins.canvas;
        if (bricks && bricks.list && paddle && ball) {
            if (ball.y > canvas.height) {
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
    eval() {
        this.evalEndGame();
        let ball = Game.ins.ball;
        let bricks = Game.ins.bricks;
        let paddle = Game.ins.paddle;
        let canvas = Render.ins.canvas;
        if (bricks && bricks.list && paddle && ball) {
            bricks.list.forEach((brick) => {
                if (brick.status == 1) {
                    if (ball && bricks &&
                        ball.x > brick.x &&
                        ball.x < brick.x + bricks.brickWidth &&
                        ball.y > brick.y &&
                        ball.y < brick.y + bricks.brickHeight) {
                        ball.dy = -ball.dy;
                        this.colorFramesCount = this.colorFramesTotal;
                        brick.status = 0;
                    }
                }
            });
            if (ball.y > canvas.height - ball.ballRadius - paddle.paddleHeight &&
                ball.x + ball.dx > paddle.paddleX &&
                ball.x + ball.dx < paddle.paddleX + paddle.paddleWidth) {
                ball.dy = ball.dy > 0 ? -ball.dy : ball.dy;
                this.colorFramesCount = this.colorFramesTotal;
            }
            if (ball.x + ball.dx > canvas.width - ball.ballRadius || ball.x + ball.dx < ball.ballRadius) {
                ball.dx = -ball.dx;
                this.colorFramesCount = this.colorFramesTotal;
            }
            if (ball.y + ball.dy < ball.ballRadius) {
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
//# sourceMappingURL=collitions.js.map