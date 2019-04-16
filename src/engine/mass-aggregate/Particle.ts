import Engine from '../Engine';
import Vector from '../../Vector';

const baseRadius = 1.2e-2;

interface ParticleParams {
    position: Vector;
    mass?: number;
    gravityScale?: number;
    fixedRadius?: number;
    fixed?: boolean;
}

export default class Particle {
    public position: Vector;
    public mass: number;
    public gravityScale: number;
    public fixedRadius?: number;
    public fixed: boolean;
    public force: Vector = Vector.zero;
    public velocity: Vector = Vector.zero;

    public constructor(params: ParticleParams) {
        this.position = params.position;
        this.mass = params.mass || 1;
        this.gravityScale = params.gravityScale || 1;
        this.fixedRadius = params.fixedRadius;
        this.fixed = params.fixed || false;
    }

    public applyGravity(gravity: number): void {
        this.force.add(new Vector(0, -gravity * this.mass).scaled(this.gravityScale));
    }

    public update(gravity: number, damping: number): void {
        if (this.fixed) {
            this.velocity = Vector.zero;
            return;
        }

        this.applyGravity(gravity);
        this.updateVelocity();
        this.applyDamping(damping);
        this.updatePosition();
    }

    // XXX Test this
    public overlaps(other: Particle): boolean {
        const radiiSum = this.radius + other.radius;
        return radiiSum * radiiSum >= this.position.distanceSquared(other.position);
    }

    public get radius(): number {
        if (this.fixedRadius !== undefined)
            return this.fixedRadius;
        return baseRadius * Math.sqrt(this.mass);
    }

    public get speed(): number {
        return this.velocity.magnitude;
    }

    public get speedSquared(): number {
        return this.velocity.magnitudeSquared;
    }

    public applyDamping(damping: number): void {
        this.velocity.scale(Math.pow(1 - damping, Engine.timestep));
    }

    public updateVelocity(): void {
        this.velocity.add(this.acceleration.scaled(Engine.timestep));
    }

    public updatePosition(): void {
        this.position.add(this.velocity.scaled(Engine.timestep));
    }

    public get acceleration(): Vector {
        return this.force.scaled(1 / this.mass);
    }
}
