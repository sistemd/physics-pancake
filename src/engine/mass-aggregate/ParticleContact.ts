import Contact from './Contact';
import Particle from './Particle';
import Vector from '../../Vector';

export default class ParticleContact implements Contact {
    public normal: Vector;
    public impactSpeed: number;
    public interpenetration: number;

    public constructor(public particles: Particle[]) {
        this.particles = particles;
        this.normal = this.particles[0].position.direction(this.particles[1].position);
        this.impactSpeed =
            this.particles[0].velocity.dot(this.normal) + this.particles[1].velocity.dot(this.normal.negated);
        const distance = this.particles[0].position.distance(this.particles[1].position);
        this.interpenetration = this.particles[0].radius + this.particles[1].radius - distance;
    }

    public solve(): void {
        this.solveInterpenetration();
        this.solveBounce();
    }

    public solveInterpenetration(): void {
        const delta = this.normal.scaled(this.interpenetration / 2);
        this.particles[0].position.subtract(delta);
        this.particles[1].position.add(delta);
    }

    public solveBounce(): void {
        const netMass = this.particles[0].mass + this.particles[1].mass;
        this.particles[0].velocity = this.normal.scaled(-this.particles[1].mass * this.impactSpeed / netMass);
        this.particles[1].velocity = this.normal.scaled(this.particles[0].mass * this.impactSpeed / netMass);
    }
}
