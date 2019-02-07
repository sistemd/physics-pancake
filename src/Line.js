import { epsilon, almostEquals, valueIsBetween } from './utils';
import Vector from './Vector';

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

    // Treat self as if it were a ray directed from origin into end
    rayIntersects(other) {
        const { t, u } = this.intersectionParameters(other);

        if (t === undefined || u === undefined)
            return false;

        return -epsilon < t && -epsilon < u && u < 1 + epsilon;
    }

    intersects(other) {
        const { t, u } = this.intersectionParameters(other);

        if (t === undefined || u === undefined)
            return false;

        return -epsilon < t && t < 1 + epsilon && -epsilon < u && u < 1 + epsilon;
    }

    intersection(other) {
        const { t, u } = this.intersectionParameters(other);

        if (t === undefined || u === undefined)
            return undefined;

        if (t > 1 + epsilon || t < -epsilon || u > 1 + epsilon || u < -epsilon)
            return undefined;

        return this.offset.scaled(t).addedTo(this.origin);
    }

    // XXX Document this, stackoverflow link or have a local copy
    intersectionParameters(other) {
        const a = other.origin.subtracted(this.origin);
        const div = this.offset.cross(other.offset);

        if (almostEquals(div, 0))
            return {};

        return {
            t: a.cross(other.offset) / div,
            u: a.negated.cross(this.offset) / (-div),
        };
    }

    containsPoint(p) {
        return almostEquals(p.subtracted(this.origin).cross(this.offset), 0) &&
               valueIsBetween({ value: p.x, limits: [this.origin.x, this.end.x] }) &&
               valueIsBetween({ value: p.y, limits: [this.origin.y, this.end.y] });
    }

    closestPoint(point) {
        // XXX This also isn't quite right.
        // The line is treated as if it was infinite rather than a line segment.
        if (this.offset.x === 0) {
            return new Vector(this.origin.x, point.y);
        }

        if (this.offset.y === 0) {
            return new Vector(point.x, this.origin.y);
        }

        const t = this.offset.dot(point);
        const y = (t * this.offset.y + this.offset.x * this.offset.cross(this.origin)) / this.offset.magnitudeSquared;
        return new Vector((t - y * this.offset.y) / this.offset.x, y);
    }

    distanceToPoint(point) {
        return Math.sqrt(this.distanceToPointSquared(point));
    }

    distanceToPointSquared(point) {
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
