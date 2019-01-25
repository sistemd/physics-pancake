export default class Line {
    static between(origin, end) {
        return new Line(origin, origin.subtractedFrom(end));
    }

    constructor(origin, offset) {
        this.origin = origin;
        this.offset = offset;
    }

    get end() {
        return this.origin.addTo(this.offset);
    }

    get length() {
        return Math.sqrt(this.lengthSquared);
    }

    get lengthSquared() {
        return this.offset.x * this.offset.x + this.offset.y * this.offset.y;
    }
}
