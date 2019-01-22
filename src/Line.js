export default class Line {
    constructor(origin, offset) {
        this.origin = origin;
        this.offset = offset;
    }

    get length() {
        return Math.sqrt(this.lengthSquared);
    }

    get lengthSquared() {
        return this.offset.x * this.offset.x + this.offset.y * this.offset.y;
    }
}
