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

    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
}
