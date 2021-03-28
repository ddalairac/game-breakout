
export class Particle {
    constructor(x: number, y: number, size: number, sideCount: number, color: string = "white", strokeColor: string = "white", stroke: number = 0) {
        this._x = x
        this._y = y
        this._size = size / 4
        this._sideCount = sideCount
        this._speedX = this.getRandomNum(-this._maxSpeed, this._maxSpeed)
        this._speedY = this.getRandomNum(-this._maxSpeed, this._maxSpeed)
        this.color = color
        this.strokeColor = strokeColor
        this.stroke = stroke

    }
    private _x: number
    private _y: number
    private _size: number
    private _sideCount: number
    private _speedX: number
    private _speedY: number
    private _maxSpeed: number = 4
    public color: string
    public strokeColor: string
    public stroke: number

    get x(): number {
        return this._x
    }
    get y(): number {
        return this._y
    }
    get size(): number {
        return this._size
    }
    get sideCount(): number {
        return this._sideCount
    }
    update() {
        this._x += this._speedX
        this._y += this._speedY
        this._size -= 0.6
    }

    private getRandomNum(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}