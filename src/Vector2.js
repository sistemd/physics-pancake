export default class Vector2 {
    static get zero() {
        return new Vector2(0, 0);
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    reset() {
        this.x = 0;
        this.y = 0;
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get normalized() {
        return this.scaled(1 / this.magnitude);
    }

    dot(other) {

    }

    cross(other) {

    }

    addedTo(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    subtractedFrom(other) {
        return new Vector2(other.x - this.x, other.y - this.y);
    }

    scaled(factor) {
        return new Vector2(this.x * factor, this.y * factor);
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
    }

    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
    }

    scale(factor) {
        this.x *= factor;
        this.y *= factor;
    }

    distanceTo(other) {
        return this.subtractedFrom(other).magnitude;
    }

    directionTo(other) {
        return this.subtractedFrom(other).normalized;
    }
}
