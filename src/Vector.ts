import { almostEquals } from './utils';

export default class Vector {
    public static get zero() {
        return new Vector(0, 0);
    }

    public constructor(public x: number, public y: number) {
    }

    public reset(): void {
        this.x = 0;
        this.y = 0;
    }

    public normal(positiveDirection: Vector): Vector {
        const normal = new Vector(-this.y, this.x).normalized;
        if (normal.dot(positiveDirection) > 0)
            return normal;
        return normal.negated;
    }

    public flippedTowards(direction: Vector): Vector {
        if (this.dot(direction) > 0)
            return this.cloned;
        return this.negated;
    }

    public get cloned(): Vector {
        return new Vector(this.x, this.y);
    }

    public get magnitude(): number {
        return Math.sqrt(this.magnitudeSquared);
    }

    public get magnitudeSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    public get normalized(): Vector {
        return this.scaled(1 / this.magnitude);
    }

    public get negated(): Vector {
        return new Vector(-this.x, -this.y);
    }

    public get isNormalized(): boolean {
        return almostEquals(this.magnitudeSquared, 1);
    }

    public almostEquals(other: Vector): boolean {
        return almostEquals(this.x, other.x) && almostEquals(this.y, other.y);
    }

    public dot(other: Vector): number {
        return this.x * other.x + this.y * other.y;
    }

    public cross(other: Vector): number {
        return this.x * other.y - this.y * other.x;
    }

    public added(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    public subtracted(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    public scaled(factor: number): Vector {
        return new Vector(this.x * factor, this.y * factor);
    }

    public add(other: Vector): void {
        this.x += other.x;
        this.y += other.y;
    }

    public subtract(other: Vector): void {
        this.x -= other.x;
        this.y -= other.y;
    }

    public scale(factor: number): void {
        this.x *= factor;
        this.y *= factor;
    }

    public distanceSquared(other: Vector): number {
        return this.subtracted(other).magnitudeSquared;
    }

    public distance(other: Vector): number {
        return Math.sqrt(this.distanceSquared(other));
    }

    public direction(other: Vector): Vector {
        return other.subtracted(this).normalized;
    }

    public projected(other: Vector): Vector {
        if (!other.isNormalized)
            other = other.normalized;
        return other.scaled(this.dot(other));
    }

    public toString(): string {
        return `Vector(${this.x}, ${this.y})`;
    }
}
