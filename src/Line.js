import { epsilon, almostEquals } from './utils';
import Vector2 from './Vector2';

export default class Line {
    constructor({ origin, offset, end }) {
        if (offset !== undefined && end !== undefined)
            throw new TypeError('Either offset or end may be specified, but not both');

        this.origin = origin.cloned;

        if (end !== undefined)
            this.end = end;
        else if (offset !== undefined)
            this.offset = offset;
        else
            throw new TypeError('Either offset or end must be specified');
    }

    normal(positiveDirection) {
        return this.offset.normal(positiveDirection);
    }

    intersects(other) {
        return this.intersection(other) !== undefined;
    }

    intersection(other) {
        const a = other.origin.subtracted(this.origin);
        const b = other.end.subtracted(other.origin);
        const c = this.end.subtracted(this.origin);
        const div = c.cross(b);

        if (almostEquals(div, 0))
            return undefined;

        const t = a.cross(b) / div;
        const u = a.negated.cross(c) / (-div);

        if (t > 1 + epsilon || t < -epsilon || u > 1 + epsilon || u < -epsilon)
            return undefined;

        return c.scaled(t).addedTo(this.origin);
    }

    containsPoint(p) {
        // XXX This isn't quite right
        // The line is treated as if it was infinite rather than a line segment.
        return almostEquals(p.subtracted(this.origin).cross(this.offset), 0);
    }

    closestPoint(point) {
        // XXX This also isn't quite right.
        // The line is treated as if it was infinite rather than a line segment.
        if (this.offset.x === 0) {
            return new Vector2(this.origin.x, point.y);
        }

        if (this.offset.y === 0) {
            return new Vector2(point.x, this.origin.y);
        }

        const t = this.offset.dot(point);
        const y = (t * this.offset.y + this.offset.x * this.offset.cross(this.origin)) / this.offset.magnitudeSquared;
        return new Vector2((t - y * this.offset.y) / this.offset.x, y);
    }

    distance(point) {
        return Math.sqrt(this.distanceSquared(point));
    }

    distanceSquared(point) {
        return this.closestPoint(point).distanceSquared(point);
    }

    get opposite() {
        return new Line({ origin: this.origin, offset: this.offset.negated });
    }

    get end() {
        return this.origin.addedTo(this.offset);
    }

    set end(value) {
        this.offset = value.subtracted(this.origin);
    }

    get length() {
        return Math.sqrt(this.lengthSquared);
    }

    get lengthSquared() {
        return this.offset.x * this.offset.x + this.offset.y * this.offset.y;
    }
}
