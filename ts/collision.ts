import { Ball } from './ball.js';
import { Brick } from './brick.js';
import { Game } from './game.js';
import { Paddle } from './paddle.js';
import { Render } from './render.js';

export class Collision {
    constructor() {
        this.colorFramesCount = 0
        this.colorFramesTotal = 10
    }
    private colorFramesCount: number;
    private colorFramesTotal: number;

    private getRandomColor(): string {
        let chars = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += chars[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    private evalEndGame(ball: Ball, list: Brick[]) {
        // loose
        if (ball.y > Render.ins.stageLimitY) {
            // ball.dy = -ball.dy;
            Game.ins.gameOver()

            // win
        } else {
            let winGame = 0;
            list.forEach((brick) => winGame += brick.status)

            if (winGame == 0) {
                Game.ins.gameOver()
            }
        }
    }
    private ballBrickListCollision(ball: Ball, list: Brick[]) {
        list.forEach(
            (brick) => {
                if (brick.status >= 1) {
                    if (this.ballBrickCollition(ball, brick)) {
                        brick.status--;
                    }
                }
            }
        )
    }
    private ballBrickCollition(ball: Ball, brick: Brick): boolean {
        if (
            // If the edge of the ball is within the area of the brick
            (ball.x + ball.radius) > brick.x &&
            (ball.x - ball.radius) < (brick.x + brick.width) &&
            (ball.y + ball.radius) > brick.y &&
            (ball.y - ball.radius) < (brick.y + brick.height)
        ) {
            if ((ball.x + ball.radius) > brick.x && (ball.x - ball.radius) < (brick.x + brick.width)) {
                ball.dy = -ball.dy;

            } else if ((ball.y + ball.radius) > brick.y && (ball.y - ball.radius) < (brick.y + brick.height)) {
                ball.dx = -ball.dx;

            } else {
                ball.dy = -ball.dy;
                ball.dx = -ball.dx;
            }

            this.colorFramesCount = this.colorFramesTotal;
            return true
        }
        return false
    }
    private ballPaddleCollision(paddle: Paddle): boolean {
        let ball = Game.ins.ball
        if (ball) {
            if (
                // If the edge of the ball is within the area of the brick
                (ball.x + ball.radius) > paddle.x &&
                (ball.x - ball.radius) < (paddle.x + paddle.width) &&
                (ball.y + ball.radius) > paddle.y
                // && (ball.y - ball.radius) < (paddle.y + paddle.height)
            ) {
                if ((ball.x + ball.radius) > paddle.x && (ball.x - ball.radius) < (paddle.x + paddle.width)) {
                    ball.dy = -ball.dy;
                    ball.dx += this.changeBallAngle(ball, paddle)

                } else if ((ball.y + ball.radius) > paddle.y) {
                    ball.dx = -ball.dx;

                    // } else if ((ball.y - ball.radius) < (paddle.y + paddle.height)) {
                    //     // none
                    // } else {
                    //     ball.dy = -ball.dy;
                    //     ball.dx = -ball.dx;
                }

                this.colorFramesCount = this.colorFramesTotal;
                return true
            }
        }
        return false
    }
    private changeBallAngle(ball: Ball, paddle: Paddle): number {
        let ballCenter: number = ball.x;
        let oneFifth: number = paddle.width / 5
        let z1: number = paddle.x
        let z2: number = paddle.x + oneFifth
        let z3: number = paddle.x + oneFifth * 2
        let z4: number = paddle.x + oneFifth * 3
        let z5: number = paddle.x + oneFifth * 4

        let xAngle: number = 0

        if (ballCenter < z2) {
            xAngle = -ball.speed/2
        } else if (ballCenter > z2 && ballCenter < z3) {
            xAngle = -ball.speed/4
        } else if (ballCenter > z3 && ballCenter < z4) {
            xAngle = 0
        } else if (ballCenter > z4 && ballCenter < z5) {
            xAngle = ball.speed/4
        } else if(ballCenter > z5 ){
            xAngle = ball.speed /2
        }
        // console.log("xAngle: " + xAngle)
        return xAngle
    }
    private ballStageEdgesCollision(ball: Ball) {
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
    }
    eval() {
        let ball = Game.ins.ball
        let bricks = Game.ins.bricks
        let paddle = Game.ins.paddle

        if (bricks && bricks.list && paddle && ball) {
            this.evalEndGame(ball, bricks.list)

            this.ballBrickListCollision(ball, bricks.list)

            this.ballPaddleCollision(paddle)

            this.ballStageEdgesCollision(ball)

            // Random color in ball hit
            ball.color = (this.colorFramesCount > 0) ? this.getRandomColor() : "white";
            if (this.colorFramesCount > 0) { this.colorFramesCount-- };

        }
    }

    getRadian(angle: number): number {
        return angle * Math.PI / 180;
    }
}