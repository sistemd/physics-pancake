import { epsilon, almostEquals, valueIsBetween, sameSign } from './utils';
import Vector from './Vector';

interface LineParams {
    origin: Vector;
    offset?: Vector;
    end?: Vector;
}

interface IntersectionParameters {
    t?: number;
    u?: number;
}

export default class Line {
    public origin: Vector;
    public offset: Vector;

    public constructor(params: LineParams) {
        const { origin, offset, end } = params;

        if (offset !== undefined && end !== undefined)
            throw new TypeError('Either offset or end may be specified, but not both');

        this.origin = origin.cloned;

        if (end !== undefined)
            this.offset = end.subtracted(this.origin);
        else if (offset !== undefined)
            this.offset = offset;
        else
            throw new TypeError('Either offset or end must be specified');
    }

    public almostEquals(other: Line): boolean {
        return this.origin.almostEquals(other.origin) && this.offset.almostEquals(other.offset);
    }

    public normal(positiveDirection: Vector): Vector {
        return this.offset.normal(positiveDirection);
    }

    // Treats "this" line as if it were a ray directed from origin into end
    public rayIntersects(other: Line): boolean {
        const { t, u } = this.intersectionParameters(other);

        if (t === undefined || u === undefined)
            return false;

        return -epsilon < t && -epsilon < u && u < 1 + epsilon;
    }

    public intersects(other: Line): boolean {
        const { t, u } = this.intersectionParameters(other);

        if (t === undefined || u === undefined)
            return false;

        return -epsilon < t && t < 1 + epsilon && -epsilon < u && u < 1 + epsilon;
    }

    public intersection(other: Line): Vector|undefined {
        const { t, u } = this.intersectionParameters(other);

        if (t === undefined || u === undefined)
            return undefined;

        if (t > 1 + epsilon || t < -epsilon || u > 1 + epsilon || u < -epsilon)
            return undefined;

        return this.offset.scaled(t).added(this.origin);
    }

    // XXX Document this, stackoverflow link or have a local copy
    public intersectionParameters(other: Line): IntersectionParameters {
        const a = other.origin.subtracted(this.origin);
        const d = this.offset.cross(other.offset);

        if (almostEquals(d, 0))
            return { t: undefined, u: undefined };

        return {
            t: a.cross(other.offset) / d,
            u: a.negated.cross(this.offset) / (-d),
        };
    }

    public containsPoint(p: Vector): boolean {
        return almostEquals(p.subtracted(this.origin).cross(this.offset), 0) &&
               valueIsBetween({ value: p.x, limits: [this.origin.x, this.end.x] }) &&
               valueIsBetween({ value: p.y, limits: [this.origin.y, this.end.y] });
    }

    public closestPoint(point: Vector): Vector {
        const c = point.subtracted(this.origin).dot(this.offset);
        const d = point.subtracted(this.end).dot(this.offset.negated);

        if (!sameSign(c, d)) {
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

    public distance(point: Vector): number {
        return Math.sqrt(this.distanceSquared(point));
    }

    public distanceSquared(point: Vector): number {
        return this.closestPoint(point).distanceSquared(point);
    }

    public get opposite(): Line {
        return new Line({ origin: this.origin, offset: this.offset.negated });
    }

    public get end(): Vector {
        return this.origin.added(this.offset);
    }

    public set end(value: Vector) {
        this.offset = value.subtracted(this.origin);
    }

    public get length(): number {
        return Math.sqrt(this.lengthSquared);
    }

    public get lengthSquared(): number {
        return this.offset.x * this.offset.x + this.offset.y * this.offset.y;
    }
}
