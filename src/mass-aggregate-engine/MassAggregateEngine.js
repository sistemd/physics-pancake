import Engine from '../Engine';
import Vector2 from '../Vector2';

export default class MassAggregateEngine extends Engine {
    constructor({ timestep, gravity, particles, springs }) {
        super(timestep);
        this.gravity = gravity;
        this.particles = particles;
        this.springs = springs;
        this.addGravity();
    }

    addGravity() {
        for (const particle of this.particles) {
            particle.forces.push(
                particle => new Vector2(0, -this.gravity * particle.mass));
        }
    }

    integrateStep() {
        this.updateParticles();
        this.updateSprings();
    }

    updateParticles() {
        for (const particle of this.particles) {
            this.updateVelocity(particle);
            this.updatePosition(particle);
        }
    }

    updateVelocity(particle) {
        particle.velocity += particle.accumulateAcceleration() * this.timestep;
    }

    updatePositon(particle) {
        particle.position += particle.velocity * this.timestep;
    }
}
