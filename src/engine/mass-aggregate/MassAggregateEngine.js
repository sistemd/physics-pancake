import Engine from '../Engine';
import ParticleContact from './ParticleContact';
import TerrainContact from './TerrainContact';

const positionBound = 10;

function positionWithinBounds({ x, y }) {
    return (x >= -positionBound && x <= positionBound &&
            y >= -positionBound && y <= positionBound);
}

export default class MassAggregateEngine extends Engine {
    static get defaultTimestep() {
        return 1;
    }

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
        this.damping = undefined;

        this.setDamping(damping);
    }

    setDamping(damping) {
        console.log(`Setting damping ${damping}`);
        this.damping = Math.pow(damping, this.timestep);
        console.log(`Set to ${this.damping}`);
    }
    
    // Used mostly in the UI so that the user can see damping independent of timestep
    get humanReadableDamping() {
        console.log(`Human readable damping ${Math.pow(this.damping, 1/this.timestep)}`);
        return Math.pow(this.damping, 1/this.timestep);
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
                if (otherParticle.touches(particle))
                    yield new ParticleContact([particle, otherParticle]);
            }
        }
    }

    * findTerrainContacts() {
        for (const particle of this.particles) {
            for (const { polygon, restitution } of this.terrain) {
                if (polygon.containsPoint(particle.position))
                    yield new TerrainContact({ particle, polygon, restitution });
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
            particle.update(this.timestep, this.gravity, this.damping);
    }
}
