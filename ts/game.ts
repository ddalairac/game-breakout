import { Ball } from './ball.js';
import { Brick } from './brick.js';
import { Bricks } from './bricks.js';
import { Collision } from './collision.js';
import { Explotion } from './explotion.js';
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

    public isGameOver: boolean = false
    private delay: number = Math.round(1000 / 80)
    private nextTime: number = 0
    ball: Ball | null = null
    paddle: Paddle | null = null
    bricks: Bricks | null = null
    collision: Collision | null = null
    timeStart: number = Date.now()
    explotions: Explotion[] = []

    public newExplotion(brick:Brick) {
        this.explotions.push(new Explotion(brick))
    }
    public gameOver() {
        this.isGameOver = true
        this.modalShow()
    }
    public starGame() {
        Game.ins.modalHide();
        Game.ins.timeStart = Date.now();
        Game.ins.isGameOver = false;
        Game.ins.ball = new Ball();
        Game.ins.paddle = new Paddle();
        Game.ins.bricks = new Bricks();
        Game.ins.collision = new Collision();
        Game.ins.explotions = [];
            (window as any).requestAnimationFrame(Game.ins.frameLoop);
    }

    private drawBoard() {
        Render.ins.clean();
        if (this.paddle) this.paddle.update();
        if (this.ball) this.ball.update();
        if (this.collision) this.collision.eval();
        if (this.ball) this.ball.draw();
        if (this.paddle) this.paddle.draw();
        if (this.bricks) this.bricks.draw();
        this.explotions.forEach(exp => exp.update());
        Render.ins.drawExplotion();
    }

    private frameLoop(time: number) {
        if (time < Game.ins.nextTime) {
            (window as any).requestAnimationFrame(Game.ins.frameLoop);
            return;
        }
        Game.ins.nextTime = time + Game.ins.delay;

        Game.ins.drawBoard()
        if (Game.ins.isGameOver == false) {
            requestAnimationFrame(Game.ins.frameLoop);
        }
    }


    private modalHide() {
        let modalElm: HTMLElement = document.getElementById('modal') as HTMLElement
        if (modalElm) modalElm.classList.add('hidden')
    }
    private modalShow() {
        let timeEnd: number = Date.now();
        let timeElapsed: number = (timeEnd - this.timeStart) * 10;
        let DateTime = new Date(timeElapsed);
        let hour: string = (DateTime.getUTCHours().toString().length < 2) ? "0" + DateTime.getUTCHours().toString() : DateTime.getUTCHours().toString()
        let minutes: string = (DateTime.getUTCMinutes().toString().length < 2) ? "0" + DateTime.getUTCMinutes().toString() : DateTime.getUTCMinutes().toString()
        let seconds: string = (DateTime.getUTCSeconds().toString().length < 2) ? "0" + DateTime.getUTCSeconds().toString() : DateTime.getUTCSeconds().toString()


        let modalElm: HTMLElement = document.getElementById('modal') as HTMLElement;
        let scoreElm: HTMLElement = document.getElementById('score') as HTMLElement;
        let bricksDestroyElm: HTMLElement = document.getElementById('bricksDestroy') as HTMLElement;
        let bricksLeftElm: HTMLElement = document.getElementById('bricksLeft') as HTMLElement;
        let timeElm: HTMLElement = document.getElementById('time') as HTMLElement;

        let bricksDestroy: number = 0
        let bricksLeft: number = 0
        if (this.bricks && this.bricks.list) {
            bricksDestroy = (this.bricks.list.filter((brick) => brick.status == 0)).length
            bricksLeft = (this.bricks.list.filter((brick) => brick.status > 0)).length
        }

        let score: number = (bricksDestroy * 60) - (timeElapsed / 1000)
        score = (score < 0) ? 0 : score

        if (modalElm) modalElm.classList.remove('hidden');
        if (scoreElm) scoreElm.innerText = "" + score.toFixed(0);
        if (bricksDestroyElm) bricksDestroyElm.innerText = "" + bricksDestroy;
        if (bricksLeftElm) bricksLeftElm.innerText = "" + bricksLeft;
        if (timeElm) timeElm.innerText = hour + ":" + minutes + ":" + seconds;
    }

}