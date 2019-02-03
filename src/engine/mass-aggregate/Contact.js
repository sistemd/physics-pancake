import { min, epsilon } from '../../utils';
import Line from '../../Line';

export default class Contact {
    static find(particle, terrain) {
        return min(allContacts(), contact => contact.particle.position.distanceTo(contact.approachIntersection));

        function* allContacts() {
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
    }

    constructor({ particle, restitution, normal, approachIntersection }) {
        this.particle = particle;
        this.restitution = restitution;
        this.normal = normal;
        this.approachIntersection = approachIntersection;
    }

    solve(timestep) {
        this.solveApproach();
        this.solveBounce(timestep);
    }

    solveApproach() {
        this.particle.position = this.approachIntersection.addedTo(this.normal.scaled(1e-3));
    }

    solveBounce(timestep) {
        if (this.particle.wasStationary(timestep)) {
            this.restitution = 1;
            this.normal = this.normal.normal(this.particle.velocity);
        }

        this.particle.velocity = this.normal
            .scaled(this.restitution)
            .scaled(this.particle.velocity.dot(this.normal.negated));
    }
}
