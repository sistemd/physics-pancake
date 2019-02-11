import Contact from './Contact';

const minimumBounceSpeed = 1.3e-4;

const minimumBounceSpeedSquared = minimumBounceSpeed * minimumBounceSpeed;

export default class TerrainContact extends Contact {
    constructor({ particle, terrainElement }) {
        super();
        this.particle = particle;
        this.terrainElement = terrainElement;
    }

    solve() {
        const edge = this.edge();
        const normal = this.normal(edge);
        const penetrationDepth = this.penetrationDepth(edge);

        this.removePenetration(normal, penetrationDepth);
        if (this.bounceParticle(normal))
            return;
        this.slideParticle(edge);
        this.applyFriction();
    }

    removePenetration(normal, penetrationDepth) {
        this.particle.position.add(normal.scaled(penetrationDepth));
    }

    slideParticle(edge) {
        const direction = edge.offset.flippedTowards(this.particle.velocity);
        this.particle.velocity = this.particle.velocity.projected(direction);
    }

    applyFriction() {
        this.particle.velocity.scale(1 - this.terrainElement.friction);
    }

    bounceParticle(normal) {
        if (this.particle.speedSquared < minimumBounceSpeedSquared)
            return false;
        const normalVelocity = this.particle.velocity.projected(normal);
        this.particle.velocity.subtract(normalVelocity);
        this.particle.velocity.add(normalVelocity.scaled(-this.terrainElement.restitution));
        return true;
    }

    edge() {
        return this.terrainElement.polygon.closestEdge(this.particle.position);
    }

    normal(edge) {
        return edge.normal(this.particle.velocity.negated);
    }

    penetrationDepth(edge) {
        return edge.distance(this.particle.position);
    }
}
