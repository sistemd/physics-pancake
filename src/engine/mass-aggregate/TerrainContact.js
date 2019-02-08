import Contact from './Contact';

export default class TerrainContact extends Contact {
    constructor({ particle, polygon, restitution }) {
        super();
        this.particle = particle;
        this.polygon = polygon;
        this.restitution = restitution;
    }

    get severity() {
        return this.particle.speed;
    }

    solve() {
        const edge = this.edge();
        const normal = this.normal(edge);
        const penetrationDepth = this.penetrationDepth(edge);
        this.solvePenetration(normal, penetrationDepth);
        this.solveBounce(normal);
    }

    solvePenetration(normal, penetrationDepth) {
        this.particle.position.add(normal.scaled(penetrationDepth));
    }

    solveBounce(normal) {
        const speed = this.particle.velocity.dot(normal);
        this.particle.velocity = normal.scaled(-speed * this.restitution);
    }

    edge() {
        return this.polygon.closestEdge(this.particle.position);
    }

    normal(edge) {
        return edge.normal(this.particle.velocity.negated);
    }

    penetrationDepth(edge) {
        return edge.distanceToPoint(this.particle.position);
    }
}
