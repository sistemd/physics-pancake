import Engine from '../Engine';

export default class MassAggregateEngine extends Engine {
    constructor({ timestep, gravity = 1e-6, particles = [], springs = [] } = {}) {
        super(timestep);
        this.gravity = gravity;
        this.particles = particles;
        this.springs = springs;
    }

    clearDeadParticles() {
        this.particles = this.particles.filter(particle => particle.positionIsValid);
    }

    integrateStep() {
        this.resetForces();
        this.updateSprings();
        this.updateParticles();
        this.clearDeadParticles();

        // clearDeadParticles doesn't strictly need to be called whenever we
        // integrate, but I decided to call it here for simplicity.
    }

    resetForces() {
        for (const particle of this.particles)
            particle.force.reset();
    }

    updateParticles() {
        for (const particle of this.particles) {
            particle.applyGravity(this.gravity);
            particle.update(this.timestep);
        }
    }

    updateSprings() {
        for (const spring of this.springs)
            spring.update(this.timestep);
    }
}
