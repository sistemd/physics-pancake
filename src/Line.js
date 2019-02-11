import { epsilon, almostEquals, valueIsBetween, sameSigns } from './utils';
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

    almostEquals(other) {
        return this.origin.almostEquals(other.origin) && this.offset.almostEquals(other.offset);
    }

    normal(positiveDirection) {
        return this.offset.normal(positiveDirection);
    }

    // Treats self as if it were a ray directed from origin into end
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

        return this.offset.scaled(t).added(this.origin);
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
        const c = point.subtracted(this.origin).dot(this.offset);
        const d = point.subtracted(this.end).dot(this.offset.negated);

        if (!sameSigns(c, d)) {
            if (this.origin.distanceSquared(point) < this.end.distanceSquared(point))
                return this.origin;
            return this.end;
        }

        // Call the closest point a.
        // Two conditions hold:
        // 1) the vector from p to a must be perpendicular to the line's offset,
        //    therefore their dot product must be zero and
        // 2) a must be on the line, therefore the cross product between
        //    a and the line's offset must be 0.
        // Get a by solving the two equations.

        if (this.offset.x === 0)
            return new Vector(this.origin.x, point.y);

        if (this.offset.y === 0)
            return new Vector(point.x, this.origin.y);

        const t = this.offset.dot(point);
        const y = (t * this.offset.y + this.offset.x * this.offset.cross(this.origin)) / this.offset.magnitudeSquared;
        return new Vector((t - y * this.offset.y) / this.offset.x, y);
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
        return this.origin.added(this.offset);
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
