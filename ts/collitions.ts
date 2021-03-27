import { Game } from './game.js';
import { Render } from './render.js';

export class Collitions {
    constructor() {
        this.colorFramesCount = 0
    }

    colorFramesCount: number
    colorFramesTotal: number = 5


    private getRandomColor(): string {
        let chars = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += chars[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    eval() {
        let ball = Game.ins.ball
        let bricks = Game.ins.bricks
        let paddle = Game.ins.paddle
        let canvas = Render.ins.canvas

        if (bricks && bricks.list && paddle && ball) {
            // Colision ladrillo
            bricks.list.forEach(
                (brick) => {
                    if (brick.status == 1) {
                        if (ball && bricks &&
                            ball.x > brick.x &&
                            ball.x < brick.x + bricks.brickWidth &&
                            ball.y > brick.y &&
                            ball.y < brick.y + bricks.brickHeight
                        ) {
                            ball.dy = -ball.dy;
                            this.colorFramesCount = this.colorFramesTotal;

                            brick.status = 0;
                        }
                    }
                }
            )


            // Colision paleta
            if (ball.y > canvas.height - ball.ballRadius - paddle.paddleHeight &&
                ball.x + ball.dx > paddle.paddleX &&
                ball.x + ball.dx < paddle.paddleX + paddle.paddleWidth
            ) {
                ball.dy = ball.dy > 0 ? -ball.dy : ball.dy;
                this.colorFramesCount = this.colorFramesTotal;

            }

            // Colision bordes
            if (ball.x + ball.dx > canvas.width - ball.ballRadius || ball.x + ball.dx < ball.ballRadius) {
                // lateral
                ball.dx = -ball.dx;
                this.colorFramesCount = this.colorFramesTotal;
            }
            if (ball.y + ball.dy < ball.ballRadius) {
                // top
                ball.dy = -ball.dy;
                this.colorFramesCount = this.colorFramesTotal;
            }

            // hit color un ball
            ball.color = (this.colorFramesCount > 0) ? this.getRandomColor() : "white";
            if (this.colorFramesCount > 0) { this.colorFramesCount-- };

        }
    }
}