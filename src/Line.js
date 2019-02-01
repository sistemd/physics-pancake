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
