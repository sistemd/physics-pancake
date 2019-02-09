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
    }

    solveBounce() {
        this.particles[0].velocity = this.normal.scaled(this.particleSpeed(this.particles[0].mass));
        this.particles[1].velocity = this.normal.scaled(-this.particleSpeed(this.particles[1].mass));
    }

    particleSpeed(mass) {
        return this.netMass * this.netSpeed / mass;
    }

    get normal() {
        return this.particles[1].position.subtracted(this.particles[0].position);
    }

    get netMass() {
        return this.particles[0].mass + this.particles[1].mass;
    }

    get netSpeed() {
        return this.particles[0].speed + this.particles[1].speed;
    }
}
