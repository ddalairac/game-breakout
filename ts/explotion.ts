
import { Brick } from './brick.js';
import { Particle } from './particle.js';
import { Render } from './render.js';

export class Explotion {
    constructor(brick: Brick) {
        this._x = brick.x + brick.width / 2
        this._y = brick.y + brick.height /2
        this._size = (brick.width + brick.height) / 3
        this._brick = brick
        this.explode()
    }

    private _brick: Brick
    private _x: number
    private _y: number
    private _size: number
    public particles: Particle[] = []

    get x(): number {
        return this._x
    }
    get y(): number {
        return this._y
    }
    get size(): number {
        return this._size
    }

    update() {
        // console.log("particle update")
        this.particles = this.particles.filter((part) => {
            part.update()
            return part.size > 0
        })
    }

    private explode() {
        // console.log("explode")
        this.particles = [
            new Particle(this.x, this.y, this.size, 5, this._brick.color, this._brick.strokeColor, this._brick.stroke),
            new Particle(this.x, this.y, this.size, 5, this._brick.color, this._brick.strokeColor, this._brick.stroke),
            new Particle(this.x, this.y, this.size, 5, this._brick.color, this._brick.strokeColor, this._brick.stroke),
            new Particle(this.x, this.y, this.size, 5, this._brick.color, this._brick.strokeColor, this._brick.stroke),
            new Particle(this.x, this.y, this.size, 5, this._brick.color, this._brick.strokeColor, this._brick.stroke),
            new Particle(this.x, this.y, this.size, 5, this._brick.color, this._brick.strokeColor, this._brick.stroke),
            new Particle(this.x, this.y, this.size, 5, this._brick.color, this._brick.strokeColor, this._brick.stroke),
            new Particle(this.x, this.y, this.size, 5, this._brick.color, this._brick.strokeColor, this._brick.stroke),
            new Particle(this.x, this.y, this.size, 5, this._brick.color, this._brick.strokeColor, this._brick.stroke),
            new Particle(this.x, this.y, this.size, 5, this._brick.color, this._brick.strokeColor, this._brick.stroke),
            new Particle(this.x, this.y, this.size, 5, this._brick.color, this._brick.strokeColor, this._brick.stroke),
            new Particle(this.x, this.y, this.size, 5, this._brick.color, this._brick.strokeColor, this._brick.stroke)
        ]
    }

    
    public draw() {
        // Game.ins.explotions.forEach(explotion => {
            this.particles.forEach(part => {
                Render.ins.drawPolygonAndMove(0, part.x, part.y, part.sideCount, part.size, part.stroke, part.strokeColor, part.color)
            });
        // });
    }
}