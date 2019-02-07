import Contact from './Contact';

// XXX Treat the particles as if they were circles and the radius of the circle increases with particle velocity

export default class ParticleContact extends Contact {
    constructor(particles) {
        super();
        this.particles = particles;
    }

    get severity() {
        return (this.particles[0].speed + this.particles[1].speed) / 2;
    }

    solve() {
        this.particles[0].velocity = this.normal.scaled(this.particleSpeed(this.particles[0].mass));
        this.particles[1].velocity = this.normal.scaled(-this.particleSpeed(this.particles[1].mass));
    }

    particleSpeed(mass) {
        return this.netMass / mass * this.netSpeed;
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
