export default class Vector2 {
    static get zero() {
        return new Vector2(0, 0);
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dot(other) {

    }

    cross(other) {

    }

    addedTo(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    scaled(factor) {
        return new Vector2(this.x * factor, this.y * factor);
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
    }

    scale(factor) {
        this.x *= factor;
        this.y *= factor;
    }
}
