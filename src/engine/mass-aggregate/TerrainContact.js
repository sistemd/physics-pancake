import Contact from './Contact';
import Vector from '../../Vector';

const minimumSlideSpeed = 1e-6;

const minimumSlideSpeedSquared = minimumSlideSpeed * minimumSlideSpeed;

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

        this.removePenetration(edge, normal, penetrationDepth);
        if (this.bounceParticle(normal))
            return;
        this.slideParticle(edge, penetrationDepth);
        this.applyFriction(edge);
    }

    removePenetration(edge, normal, penetrationDepth) {
        this.particle.position.add(normal.scaled(penetrationDepth));
    }

    slideParticle(edge, penetrationDepth) {
        const direction = edge.offset.flippedTowards(this.particle.velocity);
        this.particle.velocity = this.particle.velocity.projected(direction);
    }

    applyFriction(edge) {
        this.particle.velocity.scale(1 - this.terrainElement.friction);
    }

    bounceParticle(normal) {
        // XXX Maybe don't look at velocity projected onto the normal,
        // look at overall velocity instead
        // I think it would look more realistic
        const normalVelocity = this.particle.velocity.projected(normal);
        if (normalVelocity.magnitudeSquared < minimumBounceSpeedSquared)
            return false;
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
