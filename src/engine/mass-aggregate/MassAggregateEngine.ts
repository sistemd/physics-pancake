import Engine from '../Engine';
import ParticleContact from './ParticleContact';
import TerrainContact from './TerrainContact';
import Particle from './Particle';
import Spring from './Spring';
import TerrainElement from './TerrainElement';
import Vector from '../../Vector';

const positionBound = 10;

function positionWithinBounds(p: Vector) {
    return (p.x >= -positionBound && p.x <= positionBound &&
            p.y >= -positionBound && p.y <= positionBound);
}

interface MassAggregateEngineParams {
    gravity?: number;
    damping?: number;
    particles?: Particle[];
    springs?: Spring[];
    terrain?: TerrainElement[];
}

export default class MassAggregateEngine extends Engine {
    public gravity: number;
    public damping: number;
    public particles: Particle[];
    public springs: Spring[];
    public terrain: TerrainElement[];

    public constructor(params: MassAggregateEngineParams) {
        super();
        this.gravity = params.gravity || 1e-6;
        this.particles = params.particles || [];
        this.springs = params.springs || [];
        this.terrain = params.terrain || [];
        this.damping = params.damping || 7e-4;
    }

    public clearUselessParticles() {
        this.particles = this.particles.filter(
            particle => positionWithinBounds(particle.origin));
    }

    public integrateStep() {
        this.resetForces();
        this.solveContacts();
        this.updateSprings();
        this.updateParticles();
        this.clearUselessParticles();

        // clearUselessParticles doesn't strictly need to be called whenever we
        // integrate, but I decided to call it here for simplicity.
    }

    public solveContacts() {
        for (const contact of this.findContacts())
            contact.solve();
    }

    public findContacts() {
        return [
            ...this.findParticleContacts(),
            ...this.findTerrainContacts(),
        ];
    }

    public * findParticleContacts() {
        for (let i = 0; i < this.particles.length - 1; ++i) {
            const particle = this.particles[i];
            for (const otherParticle of this.particles.slice(i + 1)) {
                if (otherParticle.overlaps(particle))
                    yield new ParticleContact([particle, otherParticle]);
            }
        }
    }

    public * findTerrainContacts() {
        for (const particle of this.particles) {
            for (const terrainElement of this.terrain) {
                if (terrainElement.polygon.overlapsCircle(particle))
                    yield new TerrainContact({ particle, terrainElement });
            }
        }
    }

    public resetForces() {
        for (const particle of this.particles)
            particle.force.reset();
    }

    public updateSprings() {
        for (const spring of this.springs)
            spring.update();
    }

    public updateParticles() {
        for (const particle of this.particles)
            particle.update(this.gravity, this.damping);
    }
}
