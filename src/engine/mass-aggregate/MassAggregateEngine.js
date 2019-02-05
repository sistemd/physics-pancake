import Engine from '../Engine';
import Contact from './Contact';

const positionBound = 10;

function positionWithinBounds({ x, y }) {
    return (x >= -positionBound && x <= positionBound &&
            y >= -positionBound && y <= positionBound);
}

export default class MassAggregateEngine extends Engine {
    constructor({ timestep, gravity = 1e-6, damping = 7e-4, particles = [], springs = [], terrain = [] } = {}) {
        super(timestep);
        this.damping = Math.pow(damping, this.timestep);
        this.gravity = gravity;
        this.particles = particles;
        this.springs = springs;
        this.terrain = terrain;
    }

    clearDeadParticles() {
        this.particles = this.particles.filter(
            particle => positionWithinBounds(particle.position));
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
            const contact = Contact.find(particle, this.terrain);
            if (contact)
                contact.solve();
            particle.update(this.timestep, this.gravity, this.damping);
        }
    }

    updateSprings() {
        for (const spring of this.springs)
            spring.update(this.timestep);
    }
}
