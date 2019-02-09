import Contact from './Contact';

export default class ParticleContact extends Contact {
    constructor(particles) {
        super();
        this.particles = particles;
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
        this.particles[0].velocity = this.normal.scaled(-this.particleSpeed(this.particles[1].mass));
        this.particles[1].velocity = this.normal.scaled(this.particleSpeed(this.particles[0].mass));
    }

    particleSpeed(mass) {
        return mass * this.netSpeed / this.netMass;
    }

    get interpenetration() {
        const distance = this.particles[0].position.distance(this.particles[1].position);
        return this.particles[0].radius + this.particles[1].radius - distance;
    }

    get normal() {
        return this.particles[0].position.direction(this.particles[1].position);
    }

    get netMass() {
        return this.particles[0].mass + this.particles[1].mass;
    }

    get netSpeed() {
        return this.particles[0].speed + this.particles[1].speed;
    }
}
