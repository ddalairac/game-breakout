import { Particle } from './particle.js';
import { Render } from './render.js';
export class Explotion {
    constructor(brick) {
        this.particles = [];
        this._x = brick.x + brick.width / 2;
        this._y = brick.y + brick.height / 2;
        this._size = (brick.width + brick.height) / 3;
        this._brick = brick;
        this.explode();
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
    update() {
        this.particles = this.particles.filter((part) => {
            part.update();
            return part.size > 0;
        });
    }
    explode() {
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
        ];
    }
    draw() {
        this.particles.forEach(part => {
            Render.ins.drawPolygonAndMove(0, part.x, part.y, part.sideCount, part.size, part.stroke, part.strokeColor, part.color);
        });
    }
}
//# sourceMappingURL=explotion.js.map