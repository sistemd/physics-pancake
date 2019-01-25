export default class Vector2 {
    static get zero() {
        return new Vector2(0, 0);
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
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
}
