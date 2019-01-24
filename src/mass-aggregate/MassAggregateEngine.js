import Engine from '../Engine';
import Vector2 from '../Vector2';

export default class MassAggregateEngine extends Engine {
    constructor({ timestep, options, particles, springs }) {
        super(timestep);
        this.particles = particles;
        this.springs = springs;
        this.options = options;
        this.addGravity();
    }

    addGravity() {
        for (const particle of this.particles) {
            particle.forces.push(
                particle => new Vector2(0, -this.options.gravity * particle.mass));
        }
    }

    clearDeadParticles() {
        this.particles = this.particles.filter(particle => particle.positionIsValid);
    }

    integrateStep() {
        this.updateParticles();
        this.updateSprings();
        this.clearDeadParticles();

        // clearDeadParticles doesn't strictly need to be called whenever we
        // integrate, but I decided to call it here for simplicity.
    }

    updateParticles() {
        for (const particle of this.particles) {
            this.updateVelocity(particle);
            this.updatePosition(particle);
        }
    }

    updateVelocity(particle) {
        particle.velocity.add(particle.accumulateAcceleration().scaled(this.timestep));
    }

    updatePosition(particle) {
        particle.position.add(particle.velocity.scaled(this.timestep));
    }

    updateSprings() {
        // TODO
    }
}
