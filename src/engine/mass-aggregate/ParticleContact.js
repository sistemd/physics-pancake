import Contact from './Contact';

export default class ParticleContact extends Contact {
    constructor(particles) {
        super();
        this.particles = particles;
        this.normal = this.particles[0].position.direction(this.particles[1].position);
        this.impactSpeed = this.particles[0].velocity.dot(this.normal) + this.particles[1].velocity.dot(this.normal.negated);
        const distance = this.particles[0].position.distance(this.particles[1].position);
        this.interpenetration = this.particles[0].radius + this.particles[1].radius - distance;
    }

    solve() {
        this.solveInterpenetration();
        this.solveBounce();
    }

    solveInterpenetration() {
        const delta = this.normal.scaled(this.interpenetration / 2);
        this.particles[0].position.subtract(delta);
        this.particles[1].position.add(delta);
    }

    solveBounce() {
        const netMass = this.particles[0].mass + this.particles[1].mass;
        this.particles[0].velocity = this.normal.scaled(-this.particles[1].mass * this.impactSpeed / netMass);
        this.particles[1].velocity = this.normal.scaled(this.particles[0].mass * this.impactSpeed / netMass);
    }
}
