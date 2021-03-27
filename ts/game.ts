import { Ball } from './ball.js';
import { Bricks } from './bricks.js';
import { Collitions } from './collitions.js';
import { Paddle } from './paddle.js';
import { Render } from './render.js';

export class Game {
    constructor() {
        if (Game._instance) {
            throw "Ya existe una instancia de Game";
        }
        Game._instance = this
        this.starGame()
    }
    private static _instance: Game
    public static get ins() {
        return this._instance;
    }

    public gameOver: boolean = false
    private delay: number = Math.round(1000 / 30)
    private nextTime: number = 0
    ball: Ball | null = null
    paddle: Paddle | null = null
    bricks: Bricks | null = null
    collitions: Collitions | null = null

    public starGame() {
        this.ball = new Ball();
        this.paddle = new Paddle();
        this.bricks = new Bricks();
        this.collitions = new Collitions();
        (window as any).requestAnimationFrame(Game.ins.frameLoop);
    }

    private drawBoard() {
        Render.ins.clean()
        if (this.collitions) this.collitions.eval()
        if (this.paddle) this.paddle.draw()
        if (this.ball) this.ball.draw()
        if (this.bricks) this.bricks.draw()

    }

    private frameLoop(time: number) {
        if (time < Game.ins.nextTime) {
            (window as any).requestAnimationFrame(Game.ins.frameLoop);
            return;
        }
        Game.ins.nextTime = time + Game.ins.delay;


        Game.ins.drawBoard()
        if (Game.ins.gameOver == false) {
            requestAnimationFrame(Game.ins.frameLoop);
        }
    }

    
}