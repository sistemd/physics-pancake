import Contact from './Contact';

const minimumBounceSpeed = 1.3e-4;

const minimumBounceSpeedSquared = minimumBounceSpeed * minimumBounceSpeed;

export default class TerrainContact extends Contact {
    constructor({ particle, terrainElement }) {
        super();
        this.particle = particle;
        this.terrainElement = terrainElement;
        this.edge = this.terrainElement.polygon.closestEdge(this.particle.position);
        this.normal = this.edge.normal(this.particle.velocity.negated);
        this.interpenetration = this.edge.distance(this.particle.position);
    }

    solve() {
        this.removePenetration();
        if (this.bounceParticle())
            return;
        this.slideParticle();
        this.applyFriction();
    }

    removePenetration() {
        this.particle.position.add(this.normal.scaled(this.interpenetration));
    }

    slideParticle(edge) {
        const direction = this.edge.offset.flippedTowards(this.particle.velocity);
        this.particle.velocity = this.particle.velocity.projected(direction);
    }

    applyFriction() {
        this.particle.velocity.scale(1 - this.terrainElement.friction);
    }

    bounceParticle() {
        if (this.particle.speedSquared < minimumBounceSpeedSquared)
            return false;
        const normalVelocity = this.particle.velocity.projected(this.normal).negated;
        this.particle.velocity.add(normalVelocity.scaled(1 + this.terrainElement.restitution));
        return true;
    }
}
