import { almostEquals } from './utils';

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

    // TODO Test this
    // The projection of normal onto positiveDirection (the dot product) should be positive
    normal(positiveDirection) {
        const oneNormal = new Vector2(-this.y, this.x).normalized;
        if (oneNormal.dot(positiveDirection) > 0)
            return oneNormal;
        return oneNormal.negated;
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get normalized() {
        return this.scaled(1 / this.magnitude);
    }

    get negated() {
        return new Vector2(-this.x, -this.y);
    }

    almostEquals(other) {
        return almostEquals(this.x, other.x) && almostEquals(this.y, other.y);
    }

    dot(other) {
        return this.x * other.x + this.y * other.y;
    }

    cross(other) {
        return this.x * other.y - this.y * other.x;
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
