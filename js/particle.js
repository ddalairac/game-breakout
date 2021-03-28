import { Game } from './game.js';
export class Particle {
    constructor(x, y, size, sideCount, color = "white", strokeColor = "white", stroke = 0) {
        this._maxSpeed = 4;
        this._x = x;
        this._y = y;
        this._size = size / 4;
        this._sideCount = sideCount;
        this._speedX = Game.ins.getRandomNum(-this._maxSpeed, this._maxSpeed);
        this._speedY = Game.ins.getRandomNum(-this._maxSpeed, this._maxSpeed);
        this.color = color;
        this.strokeColor = strokeColor;
        this.stroke = stroke;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get size() {
        return this._size;
    }
    get sideCount() {
        return this._sideCount;
    }
    update() {
        this._x += this._speedX;
        this._y += this._speedY;
        this._size -= 0.6;
    }
}
//# sourceMappingURL=particle.js.map