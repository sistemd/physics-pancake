import Engine from '../Engine';
import Vector from '../../Vector';
import Circle, {circlesOverlap} from '../../Circle';

const baseRadius = 1.2e-2;

interface ParticleParams {
    origin: Vector;
    mass?: number;
    gravityScale?: number;
    fixedRadius?: number;
    fixed?: boolean;
}

export default class Particle implements Circle {
    public origin: Vector;
    public mass: number;
    public gravityScale: number;
    public fixedRadius?: number;
    public fixed: boolean;
    public force: Vector = Vector.zero;
    public velocity: Vector = Vector.zero;

    public constructor(params: ParticleParams) {
        this.origin = params.origin;
        this.mass = params.mass || 1;
        this.gravityScale = params.gravityScale || 1;
        this.fixedRadius = params.fixedRadius;
        this.fixed = params.fixed || false;
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

    public applyGravity(gravity: number): void {
        this.force.add(new Vector(0, -gravity * this.mass).scaled(this.gravityScale));
    }

    public overlaps(other: Particle): boolean {
        return circlesOverlap(this, other);
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
        this.origin.add(this.velocity.scaled(Engine.timestep));
    }

    public get acceleration(): Vector {
        return this.force.scaled(1 / this.mass);
    }
}
