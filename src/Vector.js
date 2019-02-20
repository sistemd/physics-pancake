import { almostEquals } from './utils';

export default class Vector {
    static get zero() {
        return new Vector(0, 0);
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    reset() {
        this.x = 0;
        this.y = 0;
    }

    normal(positiveDirection) {
        const normal = new Vector(-this.y, this.x).normalized;
        if (normal.dot(positiveDirection) > 0)
            return normal;
        return normal.negated;
    }

    flippedTowards(direction) {
        if (this.dot(direction) > 0)
            return this.cloned;
        return this.negated;
    }

    get cloned() {
        return new Vector(this.x, this.y);
    }

    get magnitude() {
        return Math.sqrt(this.magnitudeSquared);
    }

    get magnitudeSquared() {
        return this.x * this.x + this.y * this.y;
    }

    get normalized() {
        return this.scaled(1 / this.magnitude);
    }

    get negated() {
        return new Vector(-this.x, -this.y);
    }

    get isNormalized() {
        return almostEquals(this.magnitudeSquared, 1);
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

    added(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    subtracted(other) {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    scaled(factor) {
        return new Vector(this.x * factor, this.y * factor);
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

    distanceSquared(other) {
        return this.subtracted(other).magnitudeSquared;
    }

    distance(other) {
        return Math.sqrt(this.distanceSquared(other));
    }

    direction(other) {
        return other.subtracted(this).normalized;
    }

    projected(other) {
        if (!other.isNormalized)
            other = other.normalized;
        return other.scaled(this.dot(other));
    }

    toString() {
        return `Vector(${this.x}, ${this.y})`;
    }
}
