import { epsilon, almostEquals } from './utils';

export default class Line {
    constructor({ origin, offset, end }) {
        if (offset !== undefined && end !== undefined)
            throw new TypeError('Either offset or end may be specified, but not both');

        this.origin = origin;
        this.offset = offset;

        if (end !== undefined)
            this.end = end;
    }

    normal(positiveDirection) {
        return this.offset.normal(positiveDirection);
    }

    intersection(other) {
        const a = this.origin.subtractedFrom(other.origin);
        const b = other.origin.subtractedFrom(other.end);
        const c = this.origin.subtractedFrom(this.end);
        const div = c.cross(b);

        if (almostEquals(div, 0))
            return undefined;

        const t = a.cross(b) / div;
        const u = a.negated.cross(c) / (-div);

        if (t > 1 + epsilon || t < -epsilon || u > 1 + epsilon || u < -epsilon)
            return undefined;

        return c.scaled(t).addedTo(this.origin);
    }

    get end() {
        return this.origin.addedTo(this.offset);
    }

    set end(value) {
        this.offset = this.origin.subtractedFrom(value);
    }

    get length() {
        return Math.sqrt(this.lengthSquared);
    }

    get lengthSquared() {
        return this.offset.x * this.offset.x + this.offset.y * this.offset.y;
    }
}
