import { Game } from './game.js';

export class EventHandler {
    constructor() {
        document.addEventListener('keydown', this.keydownEventHandler)
        document.addEventListener('keyup', this.keyupEventHandler)
        this.start = document.getElementById('newBTN')
        if (this.start) this.start.addEventListener('click', Game.ins.starGame)
    }
    start: HTMLElement | null

    private keydownEventHandler(e: KeyboardEvent) {
        // console.log("keydown", e)
        if (Game.ins.paddle) {
            switch (e.code) {
                case eKey.Left:
                    Game.ins.paddle.leftMove = true
                    break;
                case eKey.Right:
                    Game.ins.paddle.rightMove = true
                    break;
                case eKey.Enter:
                    if (Game.ins.isGameOver) Game.ins.starGame()
                    break;
            }
        }
    }
    private keyupEventHandler(e: KeyboardEvent) {
        // console.log("keyup", e)
        if (Game.ins.paddle) {
            switch (e.code) {
                case eKey.Left:
                    Game.ins.paddle.leftMove = false
                    break;
                case eKey.Right:
                    Game.ins.paddle.rightMove = false
                    break;
            }
        }
    }
}

export enum eKey {
    Right = "ArrowRight",
    Left = "ArrowLeft",
    Enter = "Enter"
}
