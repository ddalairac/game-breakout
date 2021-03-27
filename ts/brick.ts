export class Brick {
    constructor(x:number, y:number,status:number, color: string) {
        this.x = x
        this.y = y
        this.status = status
        this.color = color
    }
    x: number;
    y: number;
    status: number;
    color: string;
    draw() { }
}