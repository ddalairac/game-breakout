import { Game } from './game.js';
import { Render } from './render.js';
export class Collision {
    constructor() {
        this.colorFramesCount = 0;
        this.colorFramesTotal = 10;
    }
    getRandomColor() {
        let chars = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += chars[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    evalEndGame(ball, list) {
        if (ball.y > Render.ins.stageLimitY) {
            ball.dy = -ball.dy;
        }
        else {
            let winGame = 0;
            list.forEach((brick) => winGame += brick.status);
            if (winGame == 0) {
                Game.ins.gameOver();
            }
        }
    }
    ballBrickListCollision(ball, list) {
        list.forEach((brick) => {
            if (brick.status >= 1) {
                if (this.ballBrickCollition(ball, brick)) {
                    brick.status--;
                }
            }
        });
    }
    ballBrickCollition(ball, brick) {
        if ((ball.x + ball.radius) >= brick.x &&
            (ball.x - ball.radius) <= (brick.x + brick.width) &&
            (ball.y + ball.radius) >= brick.y &&
            (ball.y - ball.radius) <= (brick.y + brick.height)) {
            if ((ball.x + ball.radius) >= brick.x && (ball.x - ball.radius) <= (brick.x + brick.width)) {
                ball.dy = -ball.dy;
            }
            else if ((ball.y + ball.radius) >= brick.y && (ball.y - ball.radius) <= (brick.y + brick.height)) {
                ball.dx = -ball.dx;
            }
            else {
                ball.dy = -ball.dy;
                ball.dx = -ball.dx;
            }
            Game.ins.newExplotion(brick);
            this.colorFramesCount = this.colorFramesTotal;
            return true;
        }
        return false;
    }
    ballPaddleCollision(paddle) {
        let ball = Game.ins.ball;
        if (ball) {
            if ((ball.x + ball.radius) >= paddle.x &&
                (ball.x - ball.radius) <= (paddle.x + paddle.width) &&
                (ball.y + ball.radius) >= paddle.y) {
                if ((ball.x + ball.radius) >= paddle.x && (ball.x - ball.radius) <= (paddle.x + paddle.width)) {
                    ball.dy = -ball.dy;
                    ball.dx += this.changeBallAngle(ball, paddle);
                }
                else if ((ball.y + ball.radius) > paddle.y) {
                    ball.dx = -ball.dx;
                }
                this.colorFramesCount = this.colorFramesTotal;
                return true;
            }
        }
        return false;
    }
    changeBallAngle(ball, paddle) {
        let ballCenter = ball.x;
        let oneFifth = paddle.width / 5;
        let z1 = paddle.x;
        let z2 = paddle.x + oneFifth;
        let z3 = paddle.x + oneFifth * 2;
        let z4 = paddle.x + oneFifth * 3;
        let z5 = paddle.x + oneFifth * 4;
        let xAngle = 0;
        if (ballCenter < z2) {
            xAngle = -ball.speed / 2;
        }
        else if (ballCenter > z2 && ballCenter < z3) {
            xAngle = -ball.speed / 4;
        }
        else if (ballCenter > z3 && ballCenter < z4) {
            xAngle = 0;
        }
        else if (ballCenter > z4 && ballCenter < z5) {
            xAngle = ball.speed / 4;
        }
        else if (ballCenter > z5) {
            xAngle = ball.speed / 2;
        }
        return xAngle;
    }
    ballStageEdgesCollision(ball) {
        if (ball.x + ball.dx > Render.ins.stageLimitX - ball.radius || ball.x + ball.dx < ball.radius) {
            ball.dx = -ball.dx;
            this.colorFramesCount = this.colorFramesTotal;
        }
        if (ball.y + ball.dy < ball.radius) {
            ball.dy = -ball.dy;
            this.colorFramesCount = this.colorFramesTotal;
        }
    }
    eval() {
        let ball = Game.ins.ball;
        let bricks = Game.ins.bricks;
        let paddle = Game.ins.paddle;
        if (bricks && bricks.list && paddle && ball) {
            this.evalEndGame(ball, bricks.list);
            this.ballBrickListCollision(ball, bricks.list);
            this.ballPaddleCollision(paddle);
            this.ballStageEdgesCollision(ball);
            ball.color = (this.colorFramesCount > 0) ? this.getRandomColor() : "white";
            if (this.colorFramesCount > 0) {
                this.colorFramesCount--;
            }
            ;
        }
    }
    getRadian(angle) {
        return angle * Math.PI / 180;
    }
}
//# sourceMappingURL=collision.js.map