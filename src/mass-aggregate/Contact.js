export default class Contact {
    static find() {
        return min(allContacts(), contact => contact.particle.origin.distanceTo(contact.intersection));

        function allContacts() {
            return terrain.map(terrainElement => {
                const velocity = new Line({ origin: particle.position.origin, offset: particle.velocity });
                const approachIntersection = velocity.intersection(terrainElement.line);
                return new Contact({
                    particle,
                    approachIntersection,
                    restitution: terrainElement.restitution,
                    normal: terrainElement.line.normal(velocity),
                });
            });
        }
    }

    constructor({ particle, restitution, normal, approachIntersecion }) {
        this.particle = particle;
        this.restitution = restitution;
        this.normal = normal;
        this.approachIntersecion = approachIntersecion;
    }

    solve(timestep) {
        this.solveApproach();
        this.solveBounce(timestep);
    }

    solveApproach() {
        this.particle.position = this.approachIntersecion;
    }

    solveBounce(timestep) {
        if (this.particle.wasStationary(timestep)) {
            this.restitution = 1;
            this.normal = this.normal.normal(this.particle.velocity);
        }

        this.particle.velocity = this.normal.negated
            .scaled(this.restitution)
            .scaled(this.particle.velocity.dot(this.normal));
    }
}
