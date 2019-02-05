import { min, almostEquals } from '../../utils';
import Line from '../../Line';
import Vector2 from '../../Vector2';

const minDistance = 8e-5;

const minDistanceSquared = minDistance * minDistance;

function * allContacts(particle, terrain) {
    for (const terrainElement of terrain) {
        const velocity = new Line({ origin: particle.position, offset: particle.velocity });
        const approachIntersection = velocity.intersection(terrainElement.line);

        if (!approachIntersection)
            continue;

        yield new Contact({
            particle,
            approachIntersection,
            restitution: terrainElement.restitution,
            normal: terrainElement.line.normal(particle.velocity.negated),
        });
    }
}

export default class Contact {
    static find(particle, terrain) {
        return min(
            allContacts(particle, terrain),
            contact => contact.particle.position.distanceTo(contact.approachIntersection),
        );
    }

    constructor({ particle, restitution, normal, approachIntersection }) {
        this.particle = particle;
        this.restitution = restitution;
        this.normal = normal;
        this.approachIntersection = approachIntersection;
    }

    solve() {
        // if (this.particle.position.distanceSquared(this.approachIntersection) < minDistanceSquared)
        //    this.solveTouch();
        // else
        this.solveCollision();
    }

    solveTouch() {
        this.particle.velocity = Vector2.zero;
        this.particle.position = this.approachIntersection.addedTo(this.normal.scaled(minDistance));
    }

    solveCollision() {
        this.solveApproach();
        this.solveBounce();
    }

    solveApproach() {
        const delta = new Vector2(0, minDistance);
        console.log(delta.x);
        this.particle.position = this.approachIntersection.addedTo(delta);
    }

    solveBounce(timestep) {
        this.particle.velocity = this.normal
            .scaled(this.restitution)
            .scaled(this.particle.velocity.dot(this.normal.negated));
    }
}
