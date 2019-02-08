import Contact from './Contact';

// XXX It's easier to just look at particles as if they had a certain finite radius,
// so add a radius field to Particle and change this

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
        const distance = this.particles[0].position.distanceTo(this.particles[1].position);
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
