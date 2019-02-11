import Engine from '../Engine';
import ParticleContact from './ParticleContact';
import TerrainContact from './TerrainContact';

const positionBound = 10;

function positionWithinBounds({ x, y }) {
    return (x >= -positionBound && x <= positionBound &&
            y >= -positionBound && y <= positionBound);
}

export default class MassAggregateEngine extends Engine {
    constructor({
        timestep = MassAggregateEngine.defaultTimestep,
        gravity = 1e-6, damping = 7e-4,
        particles = [], springs = [], terrain = []
    } = {}) {
        super(timestep);
        this.gravity = gravity;
        this.particles = particles;
        this.springs = springs;
        this.terrain = terrain;
        this.damping = damping;
    }

    clearUselessParticles() {
        this.particles = this.particles.filter(
            particle => positionWithinBounds(particle.position));
    }

    integrateStep() {
        this.resetForces();
        this.updateSprings();
        this.solveContacts();
        this.updateParticles();
        this.clearUselessParticles();

        // clearUselessParticles doesn't strictly need to be called whenever we
        // integrate, but I decided to call it here for simplicity.
    }

    solveContacts() {
        const contacts = this.findContacts();
        const x = 0;
        for (const contact of this.findContacts())
            contact.solve();
    }

    findContacts() {
        return [
            ...this.findParticleContacts(),
            ...this.findTerrainContacts(),
        ];
    }

    * findParticleContacts() {
        for (let i = 0; i < this.particles.length - 1; ++i) {
            const particle = this.particles[i];
            for (const otherParticle of this.particles.slice(i + 1)) {
                if (otherParticle.overlaps(particle))
                    yield new ParticleContact([particle, otherParticle]);
            }
        }
    }

    * findTerrainContacts() {
        for (const particle of this.particles) {
            for (const terrainElement of this.terrain) {
                if (terrainElement.polygon.containsPoint(particle.position))
                    yield new TerrainContact({ particle, terrainElement });
            }
        }
    }

    resetForces() {
        for (const particle of this.particles)
            particle.force.reset();
    }

    updateSprings() {
        for (const spring of this.springs)
            spring.update(this.timestep);
    }

    updateParticles() {
        for (const particle of this.particles)
            particle.update(this.gravity, this.damping);
    }
}
