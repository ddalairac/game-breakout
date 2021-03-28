import { Ball } from './ball.js';
import { Brick } from './brick.js';
import { Game } from './game.js';
import { Paddle } from './paddle.js';
import { Render } from './render.js';

export class Collision {
    constructor() {
        this.colorFramesCount = 0
    }

    colorFramesCount: number
    colorFramesTotal: number = 10


    private getRandomColor(): string {
        let chars = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += chars[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    private evalEndGame() {
        let ball = Game.ins.ball
        let bricks = Game.ins.bricks
        let paddle = Game.ins.paddle

        if (bricks && bricks.list && paddle && ball) {
            // loose
            if (ball.y > Render.ins.stageLimitY) {
                // ball.dy = -ball.dy;
                Game.ins.gameOver()

                // win
            } else {
                let winGame = 0;
                bricks.list.forEach((brick) => winGame += brick.status)

                if (winGame == 0) {
                    Game.ins.gameOver()
                }
            }
        }
    }

    private ballCollitionWith(rectangle: Brick | Paddle): boolean {
        let ball = Game.ins.ball
        if (ball) {
            //     if ((rectangle as any).constructor.name == "Paddle") {
            //         console.log("Paddle | x: " + Math.round(rectangle.x) + " y: " + rectangle.y + " width: " + Math.round(rectangle.width) + " height: " + rectangle.height)
            //         // console.log("ball | x: " + Math.round(ball.x) + " y: " + ball.y + " radius: " + Math.round(ball.radius) )
            //     }
            if (
                // If the edge of the ball is within the area of the brick
                (ball.x + ball.radius) > rectangle.x &&
                (ball.x - ball.radius) < (rectangle.x + rectangle.width) &&
                (ball.y + ball.radius) > rectangle.y &&
                (ball.y - ball.radius) < (rectangle.y + rectangle.height)
            ) {
                if ((ball.x + ball.radius) > rectangle.x && (ball.x - ball.radius) < (rectangle.x + rectangle.width)) {
                    ball.dy = -ball.dy;

                } else if ((ball.y + ball.radius) > rectangle.y && (ball.y - ball.radius) < (rectangle.y + rectangle.height)) {
                    ball.dx = -ball.dx;

                } else {
                    ball.dy = -ball.dy;
                    ball.dx = -ball.dx;
                }

                if ((rectangle as any).constructor.name == "Paddle") {
                    // console.log("Paddle hit")
                } else {
                    // console.log("Brick hit")
                }
                this.colorFramesCount = this.colorFramesTotal;
                return true
            }
        }
        return false
    }

    eval() {
        this.evalEndGame()

        let ball = Game.ins.ball
        let bricks = Game.ins.bricks
        let paddle = Game.ins.paddle

        if (bricks && bricks.list && paddle && ball) {
            // Brick collision
            bricks.list.forEach(
                (brick) => {
                    if (brick.status >= 1) {
                        if (this.ballCollitionWith(brick)) {
                            brick.status--;
                        }
                    }
                }
            )


            // Paddle collision
            this.ballCollitionWith(paddle)

            // Stage edge collision
            if (ball.x + ball.dx > Render.ins.stageLimitX - ball.radius || ball.x + ball.dx < ball.radius) {
                // lateral
                ball.dx = -ball.dx;
                this.colorFramesCount = this.colorFramesTotal;
            }
            if (ball.y + ball.dy < ball.radius) {
                // top
                ball.dy = -ball.dy;
                this.colorFramesCount = this.colorFramesTotal;
            }

            // Random color in ball hit
            ball.color = (this.colorFramesCount > 0) ? this.getRandomColor() : "white";
            if (this.colorFramesCount > 0) { this.colorFramesCount-- };

        }
    }
}